'use strict';

function createElement(block) {
    if ((block === undefined) || (block === null) || (block === false)) {
        return document.createTextNode('');
    }
    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
        return document.createTextNode(block.toString());
    }
    
    const element = document.createElement(block.name || 'div');
    if (block.props) {
        element.classList.add(...[].concat(block.props.class.split(' ')).filter(Boolean));
    }

    block.childs
        .map(createElement)
        .forEach(element.appendChild.bind(element));
    
    return element;
}