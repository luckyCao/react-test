/**
 * Created by caolei on 16/9/2.
 */
const PENDING = '0';
const FULFILLED = '1';
const REJECTED = '2';
export default Promise = function (fn) {
    let state = PENDING,
        handlers = [],
        value = null;

    function handle(obj) {
        if (state === PENDING) {
            handlers.push(obj);
        }
        if (state === FULFILLED) {
            obj.onFulfilled(value);
        }
        if (state === REJECTED) {
            obj.onRejected(value);
        }
    }
    this.done = function (onFulfilled, onRejected) {
        handle({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
    };
    this.then = function (onResolve, onReject) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.done(data => {
                resolve(onResolve(data));
            }, () => {});
        });
    };

    function onFulfill(val) {
        value = val;
        state = FULFILLED;
        handlers.map(item => {
            handle(item);
        });
    }
    function onReject(val) {
        value = val;
        state = REJECTED;
        handlers.map(item => {
            handle(item);
        });
    }
    function onResolve(val) {
        if (val && !val.then) {
            return onFulfill(val);
        }
        //如果返回的是一个promise
    }
    function doResolve(fn) {
        fn(onResolve, onReject);
    }
    doResolve(fn);
};

//# sourceMappingURL=index-compiled.js.map