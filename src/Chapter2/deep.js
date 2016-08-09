import React from 'react'
//import {connect} from 'react-redux';
import connect from './playground/connect'
import actionCreaters from './action'
class Deep extends React.Component {
  render () {
    return (
      <div>
      {this.props.value}
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {value:state.deep.deep1}
}

export default connect(mapStateToProps,actionCreaters)(Deep)


