import {createElement} from 'react-lite'
import Test from './test'
import React from 'react'
import counter from './reducer'
import { createStore } from 'redux'
//import {Provider} from 'react-redux'
import Provider from './playground/provider'

let store = createStore(counter)
class RootC2 extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <Test />
            </Provider>
        )
    }
}

export default RootC2

