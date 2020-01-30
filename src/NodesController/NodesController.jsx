import React, { useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import NProgress from 'nprogress'

import { GET_NODE_MD_WITH_TRACE_AND_NETWORK, GET_NODE_MD } from './queries'
import SET_KEY from './mutations'
import { NodeRefetchContext, NodeMutationContext } from '../context/NodesContext'

import Error from '../Error/Error'
import Nodes from '../Nodes/Nodes'

const NodesController = () => {
  NProgress.start()
  const { loading, error, data } = useQuery(GET_NODE_MD, {
    fetchPolicy: 'network-only',
  })

  const [getQuery, {
    loading: getLoading, error: getError, data: getData, variables,
  }] = useLazyQuery(GET_NODE_MD_WITH_TRACE_AND_NETWORK, {
    fetchPolicy: 'network-only',
  })

  const [runMutation, {
    loading: mutationLoading, error: mutationError, data: mutationData,
  }] = useMutation(SET_KEY, {
    fetchPolicy: 'no-cache',
  })

  if (loading) return <div>Loading network...</div>
  if (error) return <Error error={error} />
  if (getLoading) return <div>Loading network...</div>
  if (getError) return <Error error={getError} />

  NProgress.done()

  return (
    <NodeMutationContext.Provider value={runMutation}>
      <NodeRefetchContext.Provider value={getQuery}>
        <Nodes
          data={getData || data}
          mutationData={mutationData}
          variables={variables}
        />
        {mutationLoading && <p>Setting...</p>}
        {mutationError && <Error error={mutationError} />}
      </NodeRefetchContext.Provider>
    </NodeMutationContext.Provider>
  )
}


export default NodesController
