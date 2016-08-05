const EVENT_KEYS = /^on/i;
function initVnode(vNode){
    //return document.createTextNode('null');
    let vtype = vNode.vtype;
    let node = null;
    if(!vtype){
        node = document.createTextNode(vNode);
    }
    else if(vtype == 2){
        node = initVelement(vNode);
    }
    else if(vtype == 3){
        node = initVcomponent(vNode);
    }
    return node;
}

function initVelement(vNode){
    //return document.createTextNode('null');
    let type = vNode.type;
    let children = vNode.props.children;
    let node = document.createElement(type);
    let props = vNode.props
    setProps(node,props);

    if(!(children instanceof Array)){
        children = [children]
    }
    let length = children.length;
    for(var i=0;i<length;i++){
        node.appendChild(initVnode(children[i]));
    }
    return node;
}

function initVcomponent(vNode){
    let Component = vNode.type;
    let component = new Component(vNode.props);
    let virtualNode = component.render();

    return initVnode(virtualNode);
}

function setProps(node,props){
    for(let prop in props){
        if(prop == 'children'){
            return;
        }
        if(EVENT_KEYS.test(prop)){
            setEvent(node,props[prop],prop)
        }
    }
}
function setEvent(node,event,key){
    let eventStore = node.eventStore?node.eventStore:{};
    let eType =  key.replace(/^on/i,'').toLocaleLowerCase();
    eventStore[eType] = event;
    node.eventStore = eventStore;
    document.addEventListener(eType,dispatchEvent);
}
function dispatchEvent(e){
    let target = e.target;
    let eType = e.type;
    while(target){
        let eventStore = target.eventStore;
        if(eventStore && eventStore[eType]){
            eventStore[eType]();
        }
        target = target.parentNode;
    }
}



export {initVnode};