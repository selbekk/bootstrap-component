const toCase = require('case');

const empty = () => ``;

const functionComponent = name => 
`import React from 'react';

const ${toCase.pascal(name)} = (props) => {
    const {} = props;
    return (

    );
};

export default ${toCase.pascal(name)};
`;

const classComponent = name => 
`
import React, { Component } from 'react';

class ${toCase.pascal(name)} extends Component {
    render() {
        const {} = this.props;
        return (

        );
    }
}

export default ${toCase.pascal(name)};
`;

module.exports = {
    empty,
    functionComponent,
    function: functionComponent, // alias
    func: functionComponent, // alias
    classComponent,
    class: classComponent,
};
