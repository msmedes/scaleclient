import React, { createContext, useReducer } from 'react'

import getApolloClient from '../utils/getApolloClient'
// import { NodesContext } from '../context/NodesContext'
import nodesReducer from '../reducers/NodesReducer'
import Nodes from '../Nodes/Nodes'
import { ApolloProvider } from '@apollo/client'

const StateContext = createContext()
const DispatchContext = createContext()

const App = () => {
  const initialState = { ports: [{ port: '8000' }] }
  const [state, dispatch] = useReducer(nodesReducer, initialState)
  const { ports } = state

  const calcRotateAngle = (i, numNodes) => {
    const offsetAngle = 360 / numNodes
    return offsetAngle * i
  }

  const nodes = ports.map((port, index) => {
    port.client = getApolloClient(port.port)
    return { port: port.port, client: port.client, rotateAngle: calcRotateAngle(index, ports.length) }
  })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ApolloProvider client={nodes[0].client}>
          <Nodes nodes={nodes} />
        </ApolloProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App