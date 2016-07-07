import {createElement} from '../utils/element';
import {Component} from '../utils/component'
function Test(props){
    Component.call(this);
    var _this = this;
    function testEvent(){
        console.log(this.state);
        this.setState({detail:'detail'})
    }
    this.state={
        detail:'测试'
    }
    this.props = props;
    this.render = function() {
        var detail = this.state.detail;
        return  createElement(
            "section",
            { className: "grid-box" },
            createElement(
                "div",
                { className: "info-text ma-lr14",onClick: testEvent.bind(_this)},
                createElement(
                    "p",
                    null,
                    detail
                ),
                createElement(
                    "p",
                    null,
                    detail
                )
            )
        );
    }
}
Test.prototype = Component.prototype
export default Test