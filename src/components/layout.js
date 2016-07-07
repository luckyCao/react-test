import {createElement} from '../utils/element';
import {Component} from '../utils/component'
export default function(props){
    Component.call(this);
    this.props = props;
    this.render = function() {
        var children = this.props.children;
        return createElement(
            'div',
            { className: 'page-container' },
            createElement(
                'div',
                { className: 'view-container' },
                children
            )
        );
    }
}