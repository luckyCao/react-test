import {createElement} from 'react-lite'
import React from 'react'
const isCustom = process.env.NODE_ENV == 'custom';
let Layout = null;
function layout1(props){
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

class layout2 extends React.Component {
  render () {
    return (
      <div className='page-container'>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

if(isCustom){
  Layout = layout1
}
else{
  Layout = layout2
}
export default Layout
