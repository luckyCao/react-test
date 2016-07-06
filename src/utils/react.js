let jsdom;
if (!process.env.BROWSER) {
  jsdom = require('jsdom').jsdom;
}

function initVnode(vnode, parentContext, namespaceURI) {
    var vtype = vnode.vtype;

    var node = null;
    if (!vtype) {
        // init text
        let doc = (jsdom?jsdom("<html></html>"):document);
        node = doc.createTextNode(vnode);
    } else if (vtype === 2) {
        // init element
        node = initVelem(vnode, parentContext, namespaceURI);
    }else if (vtype === 4) {
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
    let doc = (jsdom?jsdom("<html></html>"):document);
    node = doc.createElement(type);

    initVchildren(velem, node, parentContext);
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

function createElement(type, props, children) {
    var vtype = null;
    if (typeof type === 'string') {
        vtype = 2;
    }
    else if (typeof type === 'function') {
        vtype = 4;
    }
    var key = null;
    var ref = null;
    var finalProps = {};
    if (props != null) {
        for (var propKey in props) {
            if (!props.hasOwnProperty(propKey)) {
                continue;
            }
            if (propKey === 'key') {
                if (props.key !== undefined) {
                    key = '' + props.key;
                }
            } else if (propKey === 'ref') {
                if (props.ref !== undefined) {
                    ref = props.ref;
                }
            } else {
                finalProps[propKey] = props[propKey];
            }
        }
    }

    var defaultProps = type.defaultProps;

    if (defaultProps) {
        for (var propKey in defaultProps) {
            if (finalProps[propKey] === undefined) {
                finalProps[propKey] = defaultProps[propKey];
            }
        }
    }

    var argsLen = arguments.length;
    var finalChildren = children;

    if (argsLen > 3) {
        finalChildren = Array(argsLen - 2);
        for (var i = 2; i < argsLen; i++) {
            finalChildren[i - 2] = arguments[i];
        }
    }

    if (finalChildren !== undefined) {
        finalProps.children = finalChildren;
    }

    return createVnode(vtype, type, finalProps, key, ref);
}

function createVnode(vtype, type, props, key, ref) {
    var vnode = {
        vtype: vtype,
        type: type,
        props: props,
        key: key,
        ref: ref
    };

    return vnode;
}

export {createElement,initVnode}