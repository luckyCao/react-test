function createHistory() {
  var getCurrentLocation = arguments[0].getCurrentLocation;
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
    var _location = getCurrentLocation();
    updateLocation(_location);
  }
  return {
    listen: listen,
    transitionTo:transitionTo
  };
}
function createHashHistory() {
  let history = createHistory();
  function listen(listener) {
    //装饰listen，在这里监听hashChange函数
    //当hashChange被触发的时候调用
    //createHistory()的transitionTo函数
    history.listen(listener);
  }
  return Object.assign({}, history, {
    listen: listen
  });
}
import getComponents from  './getComponents'
function useRoutes(createHashHistory) {
  return function(){
    var history = createHashHistory();
    function match(location,cb){
    }
    function listen(listener) {
      return history.listen(function (location) {
        match(location, function (error, redirectLocation, nextState) {
          getComponents(nextState,function(err,component){
            listener(null, component);
          })
        });
      });
    }
    return Object.assign({}, history, {
      listen: listen
    });
  }
}

export default useRoutes;

export default createHashHistory