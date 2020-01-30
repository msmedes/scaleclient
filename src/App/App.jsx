import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import getApolloClient from '../utils/getApolloClient'
import { HeadNodeContext, TraceContext } from '../context/NodesContext'

import NodesController from '../NodesController/NodesController'


const App = () => {
  const [headNode, setHeadNode] = useState('8000')
  const [traceType, setTraceType] = useState('')

  const client = getApolloClient(headNode)

  return (
    <ApolloProvider client={client}>
      <HeadNodeContext.Provider value={setHeadNode}>
        <TraceContext.Provider value={{ traceType, setTraceType }}>
          <NodesController client={client} />
        </TraceContext.Provider>
      </HeadNodeContext.Provider>
    </ApolloProvider>
  )
}

export default App
