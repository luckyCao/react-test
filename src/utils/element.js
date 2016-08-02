import {setProps} from './props'
let jsdom;
if (!process.env.BROWSER) {
  jsdom = require('jsdom').jsdom;
}
let doc = (jsdom?jsdom("<html></html>"):document);

function initVnode(vnode, parentContext, namespaceURI) {
    var vtype = vnode.vtype;

    var node = null;
    if (!vtype) {
        // init text
        node = doc.createTextNode(vnode);
    } else if (vtype === 2) {
        // init element
        node = initVelem(vnode, parentContext, namespaceURI);
    }else if (vtype === 4 ||vtype===3) {
        // init state component
        node = initVcomponent(vnode, parentContext, namespaceURI);
    }
    return node;
}

function initVcomponent(vcomponent, parentContext, namespaceURI) {
    var Component = vcomponent.type;
    var props = vcomponent.props;

    var component = new Component(props);

    var vnode = renderComponent(component);
    var node = initVnode(vnode);
    return node;
}

function renderComponent(component, parentContext) {
    var vnode = component.render();
    return vnode;
}

function initVelem(velem, parentContext, namespaceURI) {
    var type = velem.type;
    var props = velem.props;

    var node = null;
    node = doc.createElement(type);

    initVchildren(velem, node, parentContext);
    setProps(node, props);
    return node;
}

function initVchildren(velem, node, parentContext) {
    var tempChild = velem.props.children;
    if(!(tempChild instanceof  Array)){
        tempChild = [tempChild];
    }
    var vchildren = node.vchildren = tempChild;
    var namespaceURI = node.namespaceURI;
    for (var i = 0, len = vchildren.length; i < len; i++) {
        node.appendChild(initVnode(vchildren[i], parentContext, namespaceURI));
    }
}

export {initVnode}