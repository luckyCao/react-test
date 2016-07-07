var eachItem = function eachItem(list, iteratee) {
    for (var i = 0, len = list.length; i < len; i++) {
        iteratee(list[i], i);
    }
};

var isFn = function isFn(obj) {
    return typeof obj === 'function';
};

var isArr = Array.isArray;

function extend(to, from) {
    if (!from) {
        return to;
    }
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
        if (from[keys[i]] !== undefined) {
            to[keys[i]] = from[keys[i]];
        }
    }
    return to;
}

export {eachItem,isArr,isFn,extend}