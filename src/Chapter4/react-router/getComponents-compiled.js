
function getComponentsForRoute(location, route, cb) {
    if (route.getComponent) {
        route.getComponent(location, cb);
    } else {
        cb(true, null);
    }
}

function getComponents(nextState, callback) {
    mapAsync(nextState.routes, function (route, index, cb) {
        getComponentsForRoute(nextState.location, route, cb);
    }, callback);
}

function mapAsync(routes, work, callback) {
    var length = routes.length,
        values = [],
        isDone = false,
        doneCount = 0;
    if (length == 0) {
        return callback(null, values);
    }

    function done(error, index, component) {

        if (error) {
            isDone = true;
            return callback(error, null);
        } else {
            values[index] = component;
            if (++doneCount == length) {
                isDone = true;
            }
            if (isDone) {
                return callback(error, values);
            }
        }
    }

    routes.map(function (route, index) {
        work(route, index, function (error, component) {
            done(error, index, component);
        });
    });
}

export default getComponents;

//# sourceMappingURL=getComponents-compiled.js.map