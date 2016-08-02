import {createElement} from 'react-lite'
import {initVnode} from 'utils/playground';
import Root from 'container/root';

import React from 'react'
import { render } from 'react-dom'
const isCustom = process.env.NODE_ENV == 'custom';

if(isCustom){
  let testVnode = createElement(Root);
  console.log(testVnode);
  let testNode = initVnode(testVnode); //
  document.getElementById('root').appendChild(testNode);
}
else{
  render(
    <Root/>,
    document.getElementById('root')
  )
}