import {createElement} from 'react-lite'
import {initVnode} from 'Chapter1/playground';
import RootC1 from 'Chapter1/container/root';
import RootC2 from 'Chapter2/root';
import compile from 'Chapter3/lite-sizzle';
import tokenize from 'Chapter3/tokenize';
import React from 'react'
import { render } from 'react-dom'
import routes from 'Chapter4'
import Promise from 'Chapter5'

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
  case '5':
    let promise = new Promise((resolve,reject)=>{
      //(1)这里创建了一个promise对象记为(p1)
      setTimeout((value)=>{
        //(4)一秒钟后p1的resolve(10)被执行
        resolve(10)
      },1000)
    })
    //(2)这里p1的then函数创建了一个promise对象p2
    promise.then((value)=>{
      //(5)因为p1的resolve被执行所以p1相应的onFulfilled函数被执行打印了log 10
      console.log(value);
      //(6)接下来新建了一个promise对象(记为p4)，重点是这个对象返回了
      return new Promise((resolve,reject)=>{
        setTimeout((value)=>{
          resolve(20)//(9)再一秒之后p4的resolve被执行
        },1000)
      });
    },()=>{}).then(value=>{ //(3)这是p2的then函数,它创建创建了一个promise对象p3
      console.log(value)//(12)打印log 20
    })
    break;

}

