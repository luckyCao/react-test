function bindActionCreator(actionCreator, dispatch) {
    return function () {
        return dispatch(actionCreator.apply(undefined, arguments));
    };
}

function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    var keys = Object.keys(actionCreators);
    var boundActionCreators = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return boundActionCreators;
}

export default function wrapActionCreators(actionCreators) {
    return dispatch => bindActionCreators(actionCreators, dispatch)
}