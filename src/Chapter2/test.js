import React from 'react'
//import {connect} from 'react-redux';
import connect from './playground/connect'
import actionCreaters from './action'
class Test extends React.Component {
    render () {
        return (
            <section className="grid-box">
                <div className="info-text ma-lr14">
                    <p>{this.props.count}</p>
                </div>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.reduce}>-</button>
            </section>
        );
    }
}

const mapStateToProps = (state)=>{
    return {count:state}
}

export default connect(mapStateToProps,actionCreaters)(Test)


