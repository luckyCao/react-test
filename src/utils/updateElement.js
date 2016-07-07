import {patchProps} from './props'
import {VELEMENT} from './constants'
function updateVnode(vnode, newVnode, node, parentContext) {
    var vtype = vnode.vtype;

    // ignore VCOMMENT and other vtypes
    if (vtype !== VELEMENT) {
        return node;
    }

    var oldHtml = vnode.props[HTML_KEY] && vnode.props[HTML_KEY].__html;
    if (oldHtml != null) {
        updateVelem(vnode, newVnode, node, parentContext);
        initVchildren(newVnode, node, parentContext);
    } else {
        updateVChildren(vnode, newVnode, node, parentContext);
        updateVelem(vnode, newVnode, node, parentContext);
    }
    return node;
}

function updateVChildren(vnode, newVnode, node, parentContext) {
    var patches = {
        removes: [],
        updates: [],
        creates: []
    };
    diffVchildren(patches, vnode, newVnode, node, parentContext);
    flatEach(patches.removes, applyDestroy);
    flatEach(patches.updates, applyUpdate);
    flatEach(patches.creates, applyCreate);
}

function diffVchildren(patches, vnode, newVnode, node, parentContext) {
    var childNodes = node.childNodes;
    var vchildren = node.vchildren;
    var tempChild = newVnode.props.children;
    if(!(tempChild instanceof  Array)){
        tempChild = [tempChild];
    }
    var newVchildren = node.vchildren = tempChild;
    var vchildrenLen = vchildren?vchildren.length:0;
    var newVchildrenLen = newVchildren.length;

    if (vchildrenLen === 0) {
        if (newVchildrenLen > 0) {
            for (var i = 0; i < newVchildrenLen; i++) {
                patches.creates.push({
                    vnode: newVchildren[i],
                    parentNode: node,
                    parentContext: parentContext,
                    index: i
                });
            }
        }
        return;
    } else if (newVchildrenLen === 0) {
        for (var i = 0; i < vchildrenLen; i++) {
            patches.removes.push({
                vnode: vchildren[i],
                node: childNodes[i]
            });
        }
        return;
    }

    var updates = Array(newVchildrenLen);
    var removes = null;
    var creates = null;

    // isEqual
    for (var i = 0; i < vchildrenLen; i++) {
        var _vnode = vchildren[i];
        for (var j = 0; j < newVchildrenLen; j++) {
            if (updates[j]) {
                continue;
            }
            var _newVnode = newVchildren[j];
            if (_vnode === _newVnode) {
                var shouldIgnore = true;
                if (parentContext) {
                    if (_vnode.vtype === 4 || _vnode.vtype === 5) {
                        if (_vnode.type.contextTypes) {
                            shouldIgnore = false;
                        }
                    }
                }
                updates[j] = {
                    shouldIgnore: shouldIgnore,
                    vnode: _vnode,
                    newVnode: _newVnode,
                    node: childNodes[i],
                    parentContext: parentContext,
                    index: j
                };
                vchildren[i] = null;
                break;
            }
        }
    }

    // isSimilar
    for (var i = 0; i < vchildrenLen; i++) {
        var _vnode2 = vchildren[i];
        if (_vnode2 === null) {
            continue;
        }
        var shouldRemove = true;
        for (var j = 0; j < newVchildrenLen; j++) {
            if (updates[j]) {
                continue;
            }
            var _newVnode2 = newVchildren[j];
            if (_newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key && _newVnode2.refs === _vnode2.refs) {
                updates[j] = {
                    vnode: _vnode2,
                    newVnode: _newVnode2,
                    node: childNodes[i],
                    parentContext: parentContext,
                    index: j
                };
                shouldRemove = false;
                break;
            }
        }
        if (shouldRemove) {
            if (!removes) {
                removes = [];
            }
            removes.push({
                vnode: _vnode2,
                node: childNodes[i]
            });
        }
    }

    for (var i = 0; i < newVchildrenLen; i++) {
        var item = updates[i];
        if (!item) {
            if (!creates) {
                creates = [];
            }
            creates.push({
                vnode: newVchildren[i],
                parentNode: node,
                parentContext: parentContext,
                index: i
            });
        } else if (item.vnode.vtype === 2) {
            diffVchildren(patches, item.vnode, item.newVnode, item.node, item.parentContext);
        }
    }

    if (removes) {
        patches.removes.push(removes);
    }
    if (creates) {
        patches.creates.push(creates);
    }
    patches.updates.push(updates);
}


function updateVelem(velem, newVelem, node) {
    var isCustomComponent = velem.type.indexOf('-') >= 0 || velem.props.is != null;
    patchProps(node, velem.props, newVelem.props, isCustomComponent);

    return node;
}


export {updateVnode}