import {createElement} from '../utils/element';
import {Component} from '../utils/component'
import Layout from '../components/layout';
import Test from '../components/test'
export default function(props){
    Component.call(this);
    this.props = props;
    this.render = function() {
        return  createElement(
            Layout,
            null,
            createElement(Test)
        );
    }
    this.componentWillMount = function(){
        console.log('componentWillMount');
    }
}