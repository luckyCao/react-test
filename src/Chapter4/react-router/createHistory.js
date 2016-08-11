function createHistory() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var getCurrentLocation = options.getCurrentLocation;
    var changeListeners = []
    var location = undefined;
    function updateLocation(newLocation) {
        location = newLocation;
        changeListeners.forEach(function (listener) {
            listener(location);
        });
    }


    function transitionTo(nextLocation) {
        updateLocation(nextLocation)
    }

    function listen(listener) {
        changeListeners.push(listener);

        if (location) {
            listener(location);
        }
        else{
            var _location = getCurrentLocation();
            updateLocation(_location);
        }
        return function () {
            changeListeners = changeListeners.filter(function (item) {
                return item !== listener;
            });
        };
    }

    return {
        listen: listen,
        transitionTo:transitionTo
    };
}

export default createHistory
