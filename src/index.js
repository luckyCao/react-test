import {createElement} from 'react-lite'
import {initVnode} from 'Chapter1/playground';
import Root from 'container/root';
import Test from 'components/test';

import React from 'react'
import { render } from 'react-dom'

const isCustom = process.env.NODE_ENV == 'custom';
const CHAPTER = process.env.CHAPTER;

switch (CHAPTER){
  case '1':
    if(isCustom){
      console.log({layout:new Test().render()});
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
    break;
  case '2':
    document.getElementById('root').innerHTML = 'chapter2'
}

