const nodesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NETWORK': {
      return {
        ...state,
        nodes: [...action.payload],
      }
    }
    default:
      return state
  }
}

export default nodesReducer
