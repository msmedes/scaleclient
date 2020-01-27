import React, { useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import NProgress from 'nprogress'

import { calcNodes, findUniqueFingers } from '../utils/nodeUtils'
import { NodeMutationContext, NodeRefetchContext } from '../context/NodesContext'

import Error from '../Error/Error'
import GetForm from '../Forms/GetForm'
import SetForm from '../Forms/SetForm'

import NodeStyles from '../styles/NodeStyles'


const Node = ({
  node, rotateAngle,
}) => {
  const {
    headNode, isFinger, addr, start, end, inTrace,
  } = node
  console.log('headNode', headNode)
  const [mutationVariables, setMutationVariables] = useState({ setKey: '', setValue: '' })
  const refetch = useContext(NodeRefetchContext)
  const runMutation = useContext(NodeMutationContext)

  const handleGetSubmit = (e, get) => {
    e.preventDefault()
    refetch({ key: get })
  }

  const handleSetSubmit = (e, key, value) => {
    e.preventDefault()
    runMutation({ variables: { key, value } })
    setMutationVariables({ key, value })
  }

  return (
    <NodeStyles headNode={headNode} rotateAngle={rotateAngle} inTrace={inTrace} isFinger={isFinger}>
      <p>{`:${addr.split(':')[1]}`}</p>
      {
        headNode && (
          <>
            <GetForm handleGetSubmit={handleGetSubmit} command="Get" />
            <SetForm handleSetSubmit={handleSetSubmit} />
          </>
        )
      }
      {start && (
        <p>
          {`[${start} - ${end}]`}
        </p>
      )}
    </NodeStyles>
  )
}
export default Node
