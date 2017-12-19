#!/usr/bin/env node

const toCase = require('case');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const mkdirp = require('mkdirp');

const EXIT_CODES = {
    OK: 0,
    NOT_IN_ROOT_FOLDER: 1,
    INCORRECT_FOLDER_STRUCTURE: 2,
    COMPONENT_NAME_MISSING: 3,
    ALREADY_EXISTS: 4,
};

const CURRENT_DIR = process.cwd();

const getIndexTemplate = name => `import ${name} from './${name}';
export default ${name};
`;

const app = async () => {
    const isInRootFolder = fs.existsSync(path.resolve(CURRENT_DIR, 'package.json'));
    const hasCorrectFolderStructure = fs.existsSync(path.resolve(CURRENT_DIR, 'src', 'components'));

    if (!isInRootFolder) {
        console.error(
            '💩  Looks like you\'re not in the root folder, since there isn\'t a package.json there. ' +
            'Please navigate to your root folder and try again'
        );
        process.exit(EXIT_CODES.NOT_IN_ROOT_FOLDER);
    }
    if (!hasCorrectFolderStructure) {
        console.error(
            '💩  Looks like you don\'t have a src/components folder. This tool is set up to follow this ' +
            'structure. If you came across this script and need it to work for you, please submit ' +
            'an issue or a pull request at https://www.github.com/selbekk/bootstrap-component.'
        );
        process.exit(EXIT_CODES.INCORRECT_FOLDER_STRUCTURE);
    }

    let componentName = process.argv[2];
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

    const componentFolder = path.resolve(CURRENT_DIR, 'src', 'components', toCase.kebab(componentName));
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