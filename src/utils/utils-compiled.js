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

function flatEach(list, iteratee, a) {
    let len = list.length;
    let i = -1;

    while (len--) {
        let item = list[++i];
        if (isArr(item)) {
            flatEach(item, iteratee, a);
        } else {
            iteratee(item, a);
        }
    }
}

export { eachItem, isArr, isFn, extend, flatEach };

//# sourceMappingURL=utils-compiled.js.map