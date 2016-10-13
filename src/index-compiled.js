import { createElement, initVnode } from 'utils/element';
//import {render} from 'utils/render'
import Root from 'container/root';
import Test from 'components/test';
import render from 'playground/index';
import { f1, f2, f3, f4, serialize, parallel } from 'playground/serialize';

let testVnode = createElement(Root);
//let testNode = initVnode(testVnode);
//document.getElementById('root').appendChild(testNode);
render(testVnode, document.getElementById('root'));

//serialize([f1,f2,f3,f4]);

parallel([f1, f2, f3, f4], function (data) {
  console.log(data);
});

//# sourceMappingURL=index-compiled.js.map