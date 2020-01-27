import React, { useReducer } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import NProgress from 'nprogress'

import { GET_NODE_MD_WITH_TRACE_AND_NETWORK } from './queries'
import SET_KEY from './mutations'
import { findUniqueFingers, calcNetwork, calcTrace } from '../utils/nodeUtils'
import { NodeRefetchContext, NodeMutationContext } from '../context/NodesContext'

import Error from '../Error/Error'
import Nodes from '../Nodes/Nodes'

const NodesController = () => {
  NProgress.start()
  const {
    loading, error, data, refetch, variables,
  } = useQuery(GET_NODE_MD_WITH_TRACE_AND_NETWORK, {
    variables: { key: '' },
  })

  const [runMutation, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(SET_KEY)

  if (loading) return <div>Loading network information...</div>
  if (error) return <Error error={error} />


  NProgress.done()
  const { nodes: networkAddrs } = data.getNetwork
  const { node: headNodePort } = data.metadata
  const { fingerTableAddrs } = headNodePort
  const { addr: predAddr } = headNodePort.predecessor

  fingerTableAddrs.push(predAddr)
  const uniqueFingers = findUniqueFingers(fingerTableAddrs)
  let network = calcNetwork(networkAddrs, headNodePort, uniqueFingers)
  let trace
  if (variables.key) {
    trace = data.get.trace
    network = calcTrace(network, data.get.trace)
  }

  if (mutationData) {
    trace = mutationData.set.trace
    network = calcTrace(network, mutationData.set.trace)
  }

  return (
    <NodeMutationContext.Provider value={runMutation}>
      <NodeRefetchContext.Provider value={refetch}>
        <Nodes network={network} trace={trace} />
        {mutationLoading && <p>Setting...</p>}
        {mutationError && <Error error={mutationError} />}
      </NodeRefetchContext.Provider>
    </NodeMutationContext.Provider>
  )
}


export default NodesController
