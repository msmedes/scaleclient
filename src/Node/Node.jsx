import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { NodeRefetchContext, NodeMutationContext } from '../context/NodesContext'

import GetForm from '../Forms/GetForm'
import SetForm from '../Forms/SetForm'

import NodeStyles from '../styles/NodeStyles'


const Node = ({
  node, rotateAngle,
}) => {
  const {
    headNode, isFinger, addr, start, end, inTrace, functionCall, duration,
  } = node
  const refetch = useContext(NodeRefetchContext)
  const runMutation = useContext(NodeMutationContext)

  const handleGetSubmit = (e, get) => {
    e.preventDefault()
    refetch({ key: get })
  }

  const handleSetSubmit = (e, key, value) => {
    e.preventDefault()
    runMutation({ variables: { key, value } })
  }

  return (
    <NodeStyles headNode={headNode} rotateAngle={rotateAngle} inTrace={inTrace} isFinger={isFinger}>
      <div>
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
        {functionCall && (
          <>
            <p>{functionCall}</p>
            <p>{duration}</p>
          </>
        )}
      </div>
    </NodeStyles>
  )
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  rotateAngle: PropTypes.number.isRequired,
}
export default Node
