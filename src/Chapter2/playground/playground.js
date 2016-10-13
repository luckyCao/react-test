function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'REDUCE':
      return state - 1
    default:
      return state
  }
}
let store = createStore(counter)
class RootC2 extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <div>
          <div>
            <connectedTest />
          </div>
        </div>
      </Provider>
    )
  }
}
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
  return {count:state.count}
}
const actionCreaters = {
  add:function(){
    return {type:'ADD'}
  },
  reduce:function(){
    return {type:'REDUCE'}
  }
}
let connectedTest = connect(mapStateToProps,actionCreaters)(Test)
