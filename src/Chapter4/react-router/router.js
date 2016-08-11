import createHashHistory from './createHashHistory'
import useRoutes from './useRoutes'
import RoutingContext from './RoutingContext'
import React from 'react'
class Router extends React.Component{
    componentWillMount(){
        let children = this.props.children;
        let history = createHashHistory();
        var createHistory = function () {
            return history;
        }
        this.history = useRoutes(createHistory)({
            routes:children.map((child)=>{
                return {
                    getComponent:child.props.getComponent,
                    path:child.props.path
                }
            })
        });
        this.history.listen((error,component)=>{
            if (error) {
                console.log('error')
            } else {
                this.setState({component:component})
            }
        });
    }
    render(){

        var components = this.state.component;
        var RoutingContext = this.props.RoutingContext;
        // Only forward non-Router-specific props to routing context, as those are
        // the only ones that might be custom routing context props.

        return React.createElement(RoutingContext, Object.assign({}, this.props, {
            components: components
        }));
    }
}

Router.defaultProps = {
    RoutingContext: RoutingContext
};

export default Router