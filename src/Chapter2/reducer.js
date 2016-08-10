const initState={
  count:1,
  deep:{
    deep1:'deep1',
    deep2:2
  }
}


export default function counter(state = initState, action) {
    switch (action.type) {
        case 'ADD':
            return Object.assign({},state,{count:state.count+1})
        case 'REDUCE':
            return Object.assign({},state,{count:state.count-1})
        default:
            return state
    }
}