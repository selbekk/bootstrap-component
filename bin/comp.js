#!/usr/bin/env node

const toCase = require('case');
const fs = require('fs');
const inquirer = require('inquirer');
const minimist = require('minimist');
const mkdirp = require('mkdirp');
const path = require('path');

const EXIT_CODES = {
    OK: 0,
    NOT_IN_ROOT_FOLDER: 1,
    COMPONENT_NAME_MISSING: 3,
    ALREADY_EXISTS: 4,
};

const CURRENT_DIR = process.cwd();

const getIndexTemplate = name => `import ${name} from './${name}';
export default ${name};
`;

const app = async () => {
    const isInRootFolder = fs.existsSync(path.resolve(CURRENT_DIR, 'package.json'));

    if (!isInRootFolder) {
        console.error(
            '💩  Looks like you\'re not in the root folder, since there isn\'t a package.json there. ' +
            'Please navigate to your root folder and try again'
        );
        process.exit(EXIT_CODES.NOT_IN_ROOT_FOLDER);
    }
    const args = minimist(process.argv.slice(2));

    let componentName = args._[0];
    if (!componentName) {
        const result = await inquirer.prompt([{
            message: 'What do you want to name your component?',
            name: 'componentName',
        }]);
        componentName = result.componentName;
    }

    if(!componentName) {
        console.error(
            '💩  You didn\'t provide a component name. That means we\'re done here. Kthxbai! 👋'
        );
        exit(EXIT_CODES.COMPONENT_NAME_MISSING);
    }

    let componentPath = args.path;
    if (!componentPath) {
        const result = await inquirer.prompt([{
            message: 'Where do you want to place your new component?',
            name: 'path',
            default: 'src/components',
        }])
        componentPath = result.path;
    }

    const componentFolder = path.resolve(CURRENT_DIR, componentPath, toCase.kebab(componentName));
    if (fs.existsSync(componentFolder)) {
        console.error(
            `💩  There is already a component folder with the name '${toCase.pascal(componentName)}'. ` +
            'Please try another name.'
        );
        process.exit(EXIT_CODES.ALREADY_EXISTS);
    }

    // Dope! Now let's create stuff!
    mkdirp.sync(componentFolder);

    fs.writeFileSync(
        path.resolve(componentFolder, 'index.js'),
        getIndexTemplate(toCase.pascal(componentName))
    );

    fs.writeFileSync(
        path.resolve(componentFolder, toCase.pascal(componentName) + '.js'),
        ''
    );

    console.log(`🎉  ${toCase.pascal(componentName)} created! 🎉`);
    process.exit(EXIT_CODES.OK);
};
app();