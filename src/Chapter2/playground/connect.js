import { Component, createElement ,PropTypes} from 'react'
import wrapActionCreators from './wrapActionCreators'
const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
})
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
    ...parentProps,
    ...stateProps,
    ...dispatchProps
})

export default function connect(mapStateToProps, mapDispatchToProps) {
    let mapDispatch
    if (typeof mapDispatchToProps === 'function') {
        mapDispatch = mapDispatchToProps
    } else {
        mapDispatch = wrapActionCreators(mapDispatchToProps)
    }

    return function wrapWithConnect(WrappedComponent) {

        class Connect extends Component {

            constructor(props, context) {
                super(props, context)
                this.store = context.store
                const storeState = this.store.getState()
                this.state = { storeState }
            }
            configureFinalMapState(store) {
                const mappedState = mapStateToProps(store.getState())
                this.stateProps = mappedState;
                return mappedState
            }
            configureFinalMapDispatch(store) {
                const mappedDispatch = mapDispatch(store.dispatch)
                this.dispatchProps = mappedDispatch;
                return mappedDispatch
            }
            mergeProps(){
                const nextMergedProps = defaultMergeProps(this.stateProps, this.dispatchProps, this.props)
                this.mergedProps = nextMergedProps
            }
            trySubscribe() {
                this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
                this.handleChange()
            }
            componentDidMount() {
                this.trySubscribe()
            }
            handleChange() {
                const storeState = this.store.getState()

                this.setState({ storeState })
            }
            render() {
                this.configureFinalMapState(this.store);
                this.configureFinalMapDispatch(this.store);
                this.mergeProps();
                this.renderedElement = createElement(WrappedComponent,
                    this.mergedProps
                )
                return this.renderedElement
            }
        }
        Connect.WrappedComponent = WrappedComponent
        Connect.contextTypes = {
            store: storeShape
        }
        Connect.propTypes = {
            store: storeShape
        }
        return Connect
    }
}
