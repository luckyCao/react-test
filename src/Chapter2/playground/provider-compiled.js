import { Component, PropTypes, Children } from 'react';

const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
});

export default class Provider extends Component {
    getChildContext() {
        return { store: this.store };
    }
    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }
    render() {
        const { children } = this.props;
        return children;
    }
}

Provider.propTypes = {
    store: storeShape.isRequired,
    children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
    store: storeShape.isRequired
};

//# sourceMappingURL=provider-compiled.js.map