import { addEvent } from './event';
import { HTML_KEY, EVENT_KEYS, ATTRIBUTE_NAME_CHAR } from './constants';

var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var setProp = function setProp(elem, key, value) {
    if (key === 'children') {
        return;
    }
    var originalKey = key;

    if (EVENT_KEYS.test(key)) {
        addEvent(elem, key, value);
    }
};
var setProps = function setProps(elem, props) {
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            setProp(elem, key, props[key]);
        }
    }
};

function patchProps(elem, props, newProps, isCustomComponent) {
    for (var key in props) {
        if (key !== 'children') {
            if (newProps.hasOwnProperty(key)) {
                patchProp(elem, key, newProps[key], props[key], isCustomComponent);
            } else {
                removeProp(elem, key, props[key], isCustomComponent);
            }
        }
    }
    for (var key in newProps) {
        if (key !== 'children' && !props.hasOwnProperty(key)) {
            setProp(elem, key, newProps[key], isCustomComponent);
        }
    }
}

function patchProp(elem, key, value, oldValue, isCustomComponent) {
    if (key === 'value' || key === 'checked') {
        oldValue = elem[key];
    }
    if (value === oldValue) {
        return;
    }
    if (value === undefined) {
        removeProp(elem, key, oldValue, isCustomComponent);
        return;
    }
    setProp(elem, key, value, isCustomComponent);
}

function removeProp(elem, key, oldValue, isCustomComponent) {
    if (EVENT_KEYS.test(key)) {
        removeEvent(elem, key);
    } else if (key === HTML_KEY) {
        elem.innerHTML = '';
    } else if (isCustomComponent) {
        elem.removeAttribute(key);
    } else {
        removePropValue(elem, key);
    }
}

function removePropValue(node, name) {
    var propInfo = properties.hasOwnProperty(name) && properties[name];
    if (propInfo) {
        if (propInfo.mustUseProperty) {
            var propName = propInfo.propertyName;
            if (propInfo.hasBooleanValue) {
                node[propName] = false;
            } else {
                // dom.value accept string value has side effect
                if (propName !== 'value' || '' + node[propName] !== '') {
                    node[propName] = '';
                }
            }
        } else {
            node.removeAttribute(propInfo.attributeName);
        }
    } else if (isCustomAttribute(name)) {
        node.removeAttribute(name);
    }
}

export { setProps, patchProps };

//# sourceMappingURL=props-compiled.js.map