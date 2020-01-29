import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ArcherElement } from 'react-archer'

import {
  NodeRefetchContext, NodeMutationContext, TraceContext, HeadNodeContext,
} from '../context/NodesContext'
import { calcSourceAnchor, calcTargetAnchor } from '../utils/nodeUtils'

import GetForm from '../Forms/GetForm'
import SetForm from '../Forms/SetForm'

import NodeStyles from '../styles/NodeStyles'


const Node = ({
  node, index,
}) => {
  const {
    headNode,
    isFinger,
    addr,
    start,
    end,
    inTrace,
    functionCall,
    duration,
    targetId,
    rotateAngle,
  } = node
  const refetch = useContext(NodeRefetchContext)
  const runMutation = useContext(NodeMutationContext)
  const { setTraceType } = useContext(TraceContext)
  const setHeadNode = useContext(HeadNodeContext)

  const handleGetSubmit = (e, get) => {
    e.preventDefault()
    setTraceType('get')
    refetch({ key: get })
  }

  const handleSetSubmit = (e, key, value) => {
    e.preventDefault()
    setTraceType('set')
    runMutation({ variables: { key, value } })
  }

  let relations = []
  if (inTrace) {
    relations = [{
      targetId: `${targetId}`,
      sourceAnchor: `${calcSourceAnchor(rotateAngle)}`,
      targetAnchor: `${calcTargetAnchor(node.targetAngle)}`,
    }]
  }

  const handleHeadNodeClick = () => {
    if (!headNode) {
      const port = `8${node.addr.split(':')[1].slice(1)}`
      setHeadNode(port)
    }
  }

  return (
    <NodeStyles
      headNode={headNode}
      rotateAngle={rotateAngle}
      inTrace={inTrace}
      isFinger={isFinger}
      onClick={handleHeadNodeClick}
    >
      <ArcherElement
        id={`${index}`}
        relations={relations}
      >
        <div>
          <p className="addr">{`:${addr.split(':')[1]}`}</p>
          {
            headNode && (
              <>
                <GetForm handleGetSubmit={handleGetSubmit} command="Get" />
                <SetForm handleSetSubmit={handleSetSubmit} />
              </>
            )
          }
          {
            start && (
              <p className="fingerIndices">
                {`[${start} - ${end}]`}
              </p>
            )
          }
          {
            functionCall && (
              <>
                <p className="functionCall">{functionCall}</p>
                <p className="duration">{duration}</p>
              </>
            )
          }
        </div>
      </ArcherElement>
    </NodeStyles>
  )
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}
export default Node
