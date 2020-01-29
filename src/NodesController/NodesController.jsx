import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import NProgress from 'nprogress'

import { GET_NODE_MD_WITH_TRACE_AND_NETWORK } from './queries'
import SET_KEY from './mutations'
import { NodeRefetchContext, NodeMutationContext, TraceContext } from '../context/NodesContext'

import Error from '../Error/Error'
import Nodes from '../Nodes/Nodes'

const NodesController = () => {
  const [traceType, setTraceType] = useState('')
  const traceState = { traceType, setTraceType }

  NProgress.start()
  const {
    loading, error, data, refetch, variables,
  } = useQuery(GET_NODE_MD_WITH_TRACE_AND_NETWORK, {
    variables: { key: '' },
    // pollInterval: 60000,
  })

  const [runMutation, {
    loading: mutationLoading, error: mutationError, data: mutationData,
  }] = useMutation(SET_KEY)

  if (loading) return <div>Loading network...</div>
  if (error) return <Error error={error} />


  NProgress.done()

  return (
    <NodeMutationContext.Provider value={runMutation}>
      <NodeRefetchContext.Provider value={refetch}>
        <TraceContext.Provider value={traceState}>
          <Nodes
            data={data}
            mutationData={mutationData}
            variableKey={variables.key}
          />
          {mutationLoading && <p>Setting...</p>}
          {mutationError && <Error error={mutationError} />}
        </TraceContext.Provider>
      </NodeRefetchContext.Provider>
    </NodeMutationContext.Provider>
  )
}


export default NodesController
