import { createElement } from '../utils/element';
import { Component } from '../utils/component';
function Layout(props) {
    Component.call(this);
    this.props = props;
    this.render = function () {
        var children = this.props.children;
        return createElement('div', { className: 'page-container' }, createElement('div', { className: 'view-container' }, children));
    };
}
Layout.prototype = Component.prototype;
export default Layout;

//# sourceMappingURL=layout-compiled.js.map