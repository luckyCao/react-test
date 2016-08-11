import React from 'react'

class RoutingContext extends React.Component{
    render(){
        var component = this.props.components[0];
        var element = null;

        return React.createElement(component);
    }
}

export default RoutingContext