import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import getApolloClient from '../utils/getApolloClient'
import { HeadNodeContext } from '../context/NodesContext'

import NodesController from '../NodesController/NodesController'


const App = () => {
  const [headNode, setHeadNode] = useState('8000')

  const client = getApolloClient(headNode)

  return (
    <ApolloProvider client={client}>
      <HeadNodeContext.Provider value={setHeadNode}>
        <NodesController client={client} />
      </HeadNodeContext.Provider>
    </ApolloProvider>
  )
}

export default App
