import React from 'react'
import Calender from 'bundle?lazy!./calender'
import Grade from 'bundle?lazy!./grade'
import Home from 'bundle?lazy!./home'
//import { Router, Route } from 'react-router'
//import createHashHistory from 'history/lib/createHashHistory'
import Router from './react-router/router'
import Route from './react-router/route'
import createHashHistory from  './react-router/createHashHistory'
let history = createHashHistory({ queryKey: false });

const lazyLoading = bundle=>(nextState, cb)=>{
    bundle(component=>{
        cb(null,component)
    })
}

export default (
    <Router history={history}>
        <Route getComponent={lazyLoading(Home)} path="/"/>
        <Route getComponent={lazyLoading(Calender)} path="/calender"/>
        <Route getComponent={lazyLoading(Grade)} path="/grade"/>
    </Router>
)