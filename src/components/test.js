import {createElement} from '../utils/element';
export default function(props){
    function testEvent(){
        console.log(1);
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