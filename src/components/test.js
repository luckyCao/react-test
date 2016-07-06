import {createElement} from '../utils/react';
export default function(props){
    return {
        props:props,
        render:function() {
            return  createElement(
                "section",
                { className: "grid-box" },
                createElement(
                    "div",
                    { className: "info-text ma-lr14" },
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