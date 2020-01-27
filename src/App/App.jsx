import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import getApolloClient from '../utils/getApolloClient'

import NodesController from '../NodesController/NodesController'
import GetForm from '../Forms/GetForm'

const App = () => {
  const [headNode, setHeadNode] = useState('8000')

  const client = getApolloClient(headNode)

  const handleGetSubmit = (e, val) => {
    e.preventDefault()
    setHeadNode(val)
  }

  return (
    <ApolloProvider client={client}>
      {/* <GetForm handleGetSubmit={handleGetSubmit} command="Set Node" /> */}
      <NodesController client={client} />
    </ApolloProvider>
  )
}

export default App
