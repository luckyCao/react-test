const IS_EVENT = /^on/i

function render(vnode,container){
    var node = renderTreeIntoContainer(vnode,container);
}

function renderTreeIntoContainer(vnode, container) {
    var node = initVnode(vnode)
    container.appendChild(node);
}

function initVnode(vnode){
    var node = null;
    var vtype = vnode.vtype;
    if(!vtype){
        node = document.createTextNode(vnode);
    }
    else if(vtype === 2){
        node = initVelem(vnode);
    }
    else if(vtype === 4){ //component
        node = initVcomponent(vnode);
    }
    return node;
}

function initVelem(vnode){
    var type = vnode.type,
        tempChild = vnode.props.children;
    var node = document.createElement(type);
    if(!(tempChild instanceof Array)){
        tempChild = [tempChild];
    }

    for(var i=0;i<tempChild.length;i++){
        node.appendChild(initVnode(tempChild[i]));
    }

    //设置props
    setProps(node,vnode.props);
    return node;
}

function initVcomponent(vnode){
    var Component = vnode.type;
    var component = new Component();
    component.props = vnode.props;
    var vnode = component.render();
    var node = initVnode(vnode);
    return node;
}

function setProps(node,props){
    for(var prop in props){
        setProp(node,prop,props[prop]);
    }
}
function setProp(node,prop,content){
    if(prop == 'children'){
        return;
    }
    if(IS_EVENT.test(prop)){
        setEvent(node,prop,content);
    }
}

function setEvent(node,key,content){
    var eType = key.replace(IS_EVENT,'').toLowerCase();
    document.addEventListener(eType,eventDispatcher);
    //把真正的回调放在
    var eventStore = node.eventStore || {};
    eventStore[eType] = content;

    node.eventStore = eventStore;
}

function eventDispatcher(e){
    var path = e.path,
        index = 0,
        target = path[index],
        type = e.type;
    while(target){
        if(target.eventStore && target.eventStore[type]){
            let listener = target.eventStore[type];
            listener.call(this);
        }
        target = path[++index];
    }

}

export default render;