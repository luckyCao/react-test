//四个函数 f1 f2 f3 f4
//如何在f1执行返回后执行f2 f2返回后执行f3 ..
export let f1 = function (data, cb) {
    setTimeout(function () {
        console.log('f1');
        cb({ f1: 'f1' });
    }, 4000);
};

export let f2 = function (data, cb) {
    setTimeout(function () {
        console.log(data);
        cb({ f2: 'f2' });
    }, 3000);
};
export let f3 = function (data, cb) {
    setTimeout(function () {
        console.log(data);
        cb({ f3: 'f3' });
    }, 2000);
};

export let f4 = function (data, cb) {
    setTimeout(function () {
        console.log(data);
        cb({ f4: 'f4' });
    }, 1000);
};

var arr = [f1, f2, f3, f4];

export let serialize = function (arr) {
    var len = arr.length;
    var i = 0;
    (function inner(params) {
        if (i == len) {
            return;
        }
        var fun = arr[i++];
        fun(params, inner);
    })();
};

export let parallel = function (arr, cb) {
    var len = arr.length;
    var i = 0;
    var params = {};
    for (var j = 0; j < len; j++) {
        var fun = arr[j];
        fun.apply(fun, [null, inner]);
    }

    function inner(data) {
        extend(params, data);
        i++;
        if (i == len) {
            cb(params);
        }
    }
};

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

//# sourceMappingURL=serialize-compiled.js.map