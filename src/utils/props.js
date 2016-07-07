import {addEvent} from './event'

var EVENT_KEYS = /^on/i;

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

export {setProps}