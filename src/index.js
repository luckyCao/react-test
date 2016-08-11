import {createElement} from 'react-lite'
import {initVnode} from 'Chapter1/playground';
import RootC1 from 'Chapter1/container/root';
import RootC2 from 'Chapter2/root';
import compile from 'Chapter3/lite-sizzle';
import tokenize from 'Chapter3/tokenize';
import React from 'react'
import { render } from 'react-dom'
import routes from 'Chapter4'

const isCustom = process.env.NODE_ENV == 'custom';
const CHAPTER = process.env.CHAPTER;

switch (CHAPTER){
  case '1':
    if(isCustom){
      let testVnode = createElement(RootC1);
      console.log(testVnode);
      let testNode = initVnode(testVnode); //
      document.getElementById('root').appendChild(testNode);
    }
    else{
      render(
        <RootC1/>,
        document.getElementById('root')
      )
    }
    break;
  case '2':
    render(
        <RootC2/>,
        document.getElementById('root')
    )
    break;
  case '3':
    let selector = '.one p.two';
    let tokens = tokenize(selector);
    let results = [];
    compile(selector,tokens)(null,document,false,results,document);
    console.log(results);
    break;
  case '4':
    render(
      <div>{routes}</div>,
      document.getElementById('root')
    )
    break;
}

