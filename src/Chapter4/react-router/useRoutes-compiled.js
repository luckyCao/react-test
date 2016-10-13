import getComponents from './getComponents';
function useRoutes(createHistory) {
    return function () {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var routes = options.routes;
        var history = createHistory();
        var state = {};
        function match(location, cb) {
            //location和routes匹配
            let nextRoute = routes.filter(route => {
                return route.path == location.path ? true : false;
            });
            cb(null, null, { routes: nextRoute });
        }
        function listen(listener) {

            return history.listen(function (location) {
                if (state.location === location) {
                    listener(null, state);
                } else {
                    match(location, function (error, redirectLocation, nextState) {
                        getComponents(nextState, function (err, component) {
                            listener(null, component);
                        });
                    });
                }
            });
        }

        return Object.assign({}, history, {
            match: match,
            listen: listen
        });
    };
}

export default useRoutes;

//# sourceMappingURL=useRoutes-compiled.js.map