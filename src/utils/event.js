let jsdom;
if (!process.env.BROWSER) {
    jsdom = require('jsdom').jsdom;
}
let doc = (jsdom?jsdom("<html></html>"):document);

var eventTypes = {};
var addEvent = function addEvent(elem, eventType, listener) {
    eventType = eventType.toLowerCase();

    var eventStore = elem.eventStore || (elem.eventStore = {});
    eventStore[eventType] = listener;

    if (!eventTypes[eventType]) {
        // onclick -> click
        doc.addEventListener(eventType.substr(2), dispatchEvent);
        eventTypes[eventType] = true;
    }
};

var dispatchEvent = function dispatchEvent(event) {
    var target = event.target;
    var type = event.type;

    var eventType = 'on' + type;
    while (target) {
        var _target = target;
        var eventStore = _target.eventStore;

        var listener = eventStore && eventStore[eventType];
        if (!listener) {
            target = target.parentNode;
            continue;
        }
        listener.call(target, event);
        target = target.parentNode;
    }
};

export {addEvent}
