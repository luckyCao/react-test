import {createElement,initVnode} from 'utils/element';
import {render} from 'utils/render'
import Root from 'container/root';
import Test from 'components/test'
let testVnode = createElement(Root);
//let testNode = initVnode(testVnode);
//document.getElementById('root').appendChild(testNode);
render(testVnode,document.getElementById('root'))
