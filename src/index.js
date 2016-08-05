//import {createElement} from 'react-lite'
//import {initVnode} from 'utils/playground';
//import Root from 'container/root';
//
//import React from 'react'
//import { render } from 'react-dom'
//const isCustom = process.env.NODE_ENV == 'custom';
//
//if(isCustom){
//  let testVnode = createElement(Root);
//  console.log(testVnode);
//  let testNode = initVnode(testVnode); //
//  document.getElementById('root').appendChild(testNode);
//}
//else{
//  render(
//    <Root/>,
//    document.getElementById('root')
//  )
//}
//function a(cb){
//  setTimeout(()=>{
//    console.log('a')
//    cb();
//  },5000)
//}
//function b(cb){
//  setTimeout(()=>{
//    console.log('b')
//    cb();
//  },3000)
//}
//function c(cb){
//  setTimeout(()=>{
//    console.log('c')
//    cb();
//  },1000)
//}
//let arr = [a,b,c]
//
//function serial(arr,ccb){
//  let index = 0;
//  let length = arr.length;
//  //arr[index++](function(){
//  //  arr[index++](function(){
//  //    arr[index++](ccb)
//  //  })
//  //})
//
//  (function inner(){
//    if(index == length){
//       return ccb();
//    }
//    arr[index++](inner)
//  })()
//}
//
//
//function serial(arr,ccb){
//
//  return new Promise(function(resolve,reject){
//    var i = 0;
//    arr[i++].call(null,function(){
//
//      resolve(i);
//    })
//
//  }).then(function(i){
//    console.log(i)
//    console.log(arr)
//
//    if(arr.length == i){
//      return ccb();
//
//    }else {
//
//      return serial(arr.slice(i),ccb);
//
//    }
//  })
//}
//
//
//function  parallel(arr,ccb){
//
//  return new Promise(function(resolve,reject){
//
//      //if(arr.length)
//  });
//}
//
//function parallel(arr,ccb){
//
//  var count = 0;
//  for(var i = 0 ; i< arr.length;i++){
//    arr[i].call(this,function(){console.log(i);
//      count ++;
//      if(count == arr.length){
//        ccb();
//      }
//    });
//  }
//}
//
//serial(arr,()=>{
//  console.log('complete')
//})


