import createHashHistory from './createHashHistory'
import useRoutes from './useRoutes'
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
          this.setState({component:component})
        });
    }
    render(){
        var component = this.state.component[0];
        return React.createElement(component);
    }
}


export default Router