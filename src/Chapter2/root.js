import {createElement} from 'react-lite'
import Test from './test'
import Deep from './deep'
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
                <div>
                    <div>
                        <Test />
                        <div>
                          <div>
                            <Deep></Deep>
                          </div>
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default RootC2

