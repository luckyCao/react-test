import {clearPendingComponents,updateQueue} from './component'
import {initVnode} from './element'

function renderTreeIntoContainer(vnode, container, callback, parentContext) {
    var rootNode = initVnode(vnode, parentContext, container.namespaceURI);
    var childNode = null;

    container.appendChild(rootNode);

    var isPending = updateQueue.isPending;
    updateQueue.isPending = true;
    clearPendingComponents();

    if (!isPending) {
        updateQueue.isPending = false;
        updateQueue.batchUpdate();
    }
}

function render(vnode, container, callback) {
    return renderTreeIntoContainer(vnode, container, callback);
}

export {render}