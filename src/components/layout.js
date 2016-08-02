import {createElement} from '../utils/element';

export default function(props){
    return {
        props:props,
        render:function() {
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
}