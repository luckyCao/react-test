/**
 * Created by caolei on 16/7/18.
 */
function render(vnode, container) {
    var node = initVnode(vnode);
    container.appendChild(node);
}

function initVnode(vnode) {
    var vType = vnode.vtype;
    var node = null;

    if (!vType) {
        node = document.createTextNode(vnode);
    } else if (vType == 2) {
        node = initVelem(vnode);
    } else if (vType == 4) {
        node = initVcomponent(vnode);
    }
    return node;
}
function initVelem(vnode) {
    var type = vnode.type,
        node;
    var tempChild = vnode.props.children;
    if (!(tempChild instanceof Array)) {
        tempChild = [tempChild];
    }
    node = document.createElement(type);
    for (var i = 0; i < tempChild.length; i++) {
        node.appendChild(initVnode(tempChild[i]));
    }
    return node;
}

function initVcomponent(vnode) {
    var Component = vnode.type;
    var component = new Component();
    component.props = vnode.props;
    var vNode = component.render();
    var node = initVnode(vNode);
    return node;
}

export default render;

//# sourceMappingURL=index-compiled.js.map