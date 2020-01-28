import React from 'react'
import LineTo from 'react-lineto'

import NodesStyles from '../styles/NodesStyles'
import { calcRotateAngle, createTrace } from '../utils/nodeUtils'
// import { NodesStateContext, NodesDispatchContext } from '../context/NodesContext'
// import nodesReducer from '../reducers/NodesReducer'

import Node from '../Node/Node'

const Nodes = ({ network, trace }) => {
  let traceInfo
  if (trace) {
    traceInfo = createTrace(trace)
    console.log('traceInfo', traceInfo)
  }

  // const { nodes } = state
  console.log('NODES', network)


  return (
    <NodesStyles>
      {
        network.map((node, index) => (
          <Node
            className={node.addr}
            key={node.addr}
            node={node}
            rotateAngle={calcRotateAngle(index, network.length)}
          />
        ))
      }
      {/*
        This shit is whack
        traceInfo && (
        traceInfo.map((entry) => <LineTo key={`${entry.functionCall}${entry.from}`} from={`${entry.from}`} to={`${entry.to}`} borderWidth={2} />)
      ) */}
    </NodesStyles>
  )
}

export default Nodes
