import {createElement} from 'react-lite'
import React from 'react'

const isCustom = process.env.NODE_ENV == 'custom';
let Test = null;

function test1(props){
    function testEvent(){
        console.log('test');
    }
    return {
        props:props,
        render:function() {
            return  createElement(
                "section",
                { className: "grid-box" },
                createElement(
                    "div",
                    { className: "info-text ma-lr14",onClick: testEvent},
                    createElement(
                        "p",
                        null,
                        " 测试"
                    ),
                    createElement(
                        "p",
                        null,
                        "测试"
                    )
                )
            );
        }
    }
}
class test2 extends React.Component {
  testEvent(){
    console.log('test')
  }
  render () {
    return (
      <section className="grid-box">
        <div className="info-text ma-lr14" onClick={this.testEvent} >
          <p>测试</p>
          <p>测试</p>
        </div>
      </section>
    );
  }
}
if(isCustom){
  Test = test1;
}
else{
  Test = test2;
}

export default Test