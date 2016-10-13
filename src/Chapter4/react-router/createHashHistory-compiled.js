import createHistory from './createHistory';
function createHashHistory() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    let listenerCount = 0,
        stopHashChangeListener = undefined;
    function getCurrentLocation() {
        return {
            path: window.location.href.split('#')[1] || ''
        };
    }
    let history = createHistory(Object.assign({}, options, {
        getCurrentLocation: getCurrentLocation
    }));
    function startHashChangeListener(_ref) {
        var transitionTo = _ref.transitionTo;
        function hashChangeListener() {
            transitionTo(getCurrentLocation());
        }
        window.addEventListener('hashchange', hashChangeListener, false);
        return function () {
            window.removeEventListener('hashchange', hashChangeListener, false);
        };
    }
    function listen(listener) {
        if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
        var unlisten = history.listen(listener);
        return function () {
            unlisten();
            if (--listenerCount === 0) stopHashChangeListener();
        };
    }
    return Object.assign({}, history, {
        listen: listen
    });
}

export default createHashHistory;

//# sourceMappingURL=createHashHistory-compiled.js.map