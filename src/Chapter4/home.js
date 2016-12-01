import React from 'react'
import maidian from './maidian'

export default class Home extends React.Component {
    @maidian('wrapper')
    onClick() {
      console.log(111)
    }
    render() {
        return (
            <div>
                <h2>Home</h2>
                <a href="#/calender" onTouchStart={this.onClick}>calender</a>
                <a href="#/grade" >grade</a>
            </div>
        )
    }

}