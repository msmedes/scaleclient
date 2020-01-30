import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ArcherElement } from 'react-archer'

import { HeadNodeContext, TraceContext } from '../context/NodesContext'
import { calcSourceAnchor, calcTargetAnchor } from '../utils/nodeUtils'


import NodeStyles from '../styles/NodeStyles'


const Node = ({
  node, index, val, queryKey,
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
  const setHeadNode = useContext(HeadNodeContext)
  const { setTraceType } = useContext(TraceContext)

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
      setTraceType('')
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
          {(headNode && val) && (
            <p>
              {queryKey}
              :
              {val}
            </p>
          )}
          <p className="addr">{`:${addr.split(':')[1]}`}</p>
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
