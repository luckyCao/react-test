import {renderComponent,initVnode} from './element'
import {updateVnode} from './updateElement'

import {eachItem,isFn,isArr,extend} from './utils'

var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
    var cache = component.$cache;
    cache.props = nextProps;
    cache.state = nextState;
    component.forceUpdate(callback);
};
export let  updateQueue = {
    updaters: [],
    isPending: false,
    add: function add(updater) {
        this.updaters.push(updater);
    },
    batchUpdate: function batchUpdate() {
        if (this.isPending) {
            return;
        }
        this.isPending = true;
        /*
         each updater.update may add new updater to updateQueue
         clear them with a loop
         event bubbles from bottom-level to top-level
         reverse the updater order can merge some props and state and reduce the refresh times
         see Updater.update method below to know why
         */
        var updaters = this.updaters;

        var updater = undefined;
        while (updater = updaters.pop()) {
            updater.updateComponent();
        }
        this.isPending = false;
    }
};

function Updater(instance) {
    this.instance = instance;
    this.pendingStates = [];
    this.pendingCallbacks = [];
    this.isPending = false;
    this.nextProps = this.nextContext = null;
    this.clearCallbacks = this.clearCallbacks.bind(this);
}

Updater.prototype={
    emitUpdate: function emitUpdate(nextProps, nextContext) {
        this.nextProps = nextProps;
        this.nextContext = nextContext;
        // receive nextProps!! should update immediately
        nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
    },
    addState: function addState(nextState) {
        if (nextState) {
            this.pendingStates.push(nextState);
            if (!this.isPending) {
                this.emitUpdate();
            }
        }
    },
    addCallback: function addCallback(callback) {
        if (isFn(callback)) {
            this.pendingCallbacks.push(callback);
        }
    },
    updateComponent: function updateComponent() {
        var instance = this.instance;
        var pendingStates = this.pendingStates;
        var nextProps = this.nextProps;
        var nextContext = this.nextContext;

        if (nextProps || pendingStates.length > 0) {
            nextProps = nextProps || instance.props;
            nextContext = nextContext || instance.context;
            this.nextProps = this.nextContext = null;
            // merge the nextProps and nextState and update by one time
            shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
        }
    },
    getState: function getState() {
        var instance = this.instance;
        var pendingStates = this.pendingStates;
        var state = instance.state;
        var props = instance.props;

        if (pendingStates.length) {
            state = extend({}, state);
            eachItem(pendingStates, function (nextState) {
                // replace state
                if (isArr(nextState)) {
                    state = extend({}, nextState[0]);
                    return;
                }
                if (isFn(nextState)) {
                    nextState = nextState.call(instance, state, props);
                }
                extend(state, nextState);
            });
            pendingStates.length = 0;
        }
        return state;
    },
    clearCallbacks: function clearCallbacks() {
        var pendingCallbacks = this.pendingCallbacks;
        var instance = this.instance;

        if (pendingCallbacks.length > 0) {
            this.pendingCallbacks = [];
            eachItem(pendingCallbacks, function (callback) {
                return callback.call(instance);
            });
        }
    },
}

function compareTwoVnodes(vnode, newVnode, node, parentContext) {
    var newNode = node;
    updateVnode(vnode, newVnode, node, parentContext);
    return newNode;
}

var pendingComponents = [];

var clearPendingComponents = function clearPendingComponents() {
    var components = pendingComponents;
    var len = components.length;
    if (!len) {
        return;
    }
    pendingComponents = [];
    var i = -1;
    while (len--) {
        var component = components[++i];
        var updater = component.$updater;

        updater.isPending = false;
        updater.emitUpdate();
    }
};
function Component(props, context) {
    this.$cache = { isMounted: false };
    this.$updater = new Updater(this);
    this.props = props;
    this.state = {};
    this.refs = {};
    this.context = context || {};
}

Component.prototype = {
    setState: function setState(nextState, callback) {
        var $updater = this.$updater;

        $updater.addCallback(callback);
        $updater.addState(nextState);
    },
    forceUpdate: function forceUpdate(callback) {
        var $updater = this.$updater;
        var $cache = this.$cache;
        var props = this.props;
        var state = this.state;
        var context = this.context;
        var node = $cache.node;
        var vnode = $cache.vnode;
        if ($updater.isPending) {
            return;
        }
        var nextProps = $cache.props || props;
        var nextState = $cache.state || state;
        var nextContext =  {};
        $updater.isPending = true;

        this.state = nextState;
        this.props = nextProps;
        this.context = nextContext;
        var newVnode = renderComponent(this);
        var newNode = compareTwoVnodes(vnode, newVnode, node, newVnode.context);
        $cache.vnode = newVnode;
        $cache.node = newNode;
        clearPendingComponents();

        $updater.isPending = false;
        $updater.emitUpdate();
    },
}

export {Component}