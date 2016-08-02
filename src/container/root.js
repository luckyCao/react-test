import {createElement} from 'react-lite'
import Layout from '../components/layout';
import Test from '../components/test'
import React from 'react'

const isCustom = process.env.NODE_ENV == 'custom';
let Root = null;
function root1(props){
    return {
        props:props,
        render:function() {
            return  createElement(
                Layout,
                null,
                createElement(Test)
            );
        }
    }
}

class root2 extends React.Component {
  render () {
    return (
      <Layout>
        <Test></Test>
      </Layout>
    );
  }
}

if(isCustom){
  Root = root1;
}
else{
  Root = root2;
}

export default Root


