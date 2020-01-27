import React, { useState } from 'react'

import NodesStyles from '../styles/NodesStyles'
import { calcRotateAngle } from '../utils/nodeUtils'
import { NodesStateContext, NodesDispatchContext } from '../context/NodesContext'
import nodesReducer from '../reducers/NodesReducer'

import Node from '../Node/Node'

const initialState = { nodes: [] }

const Nodes = ({ network }) => {
  // const [state, dispatch] = useReducer(nodesReducer, initialState)
  // const [network, setNetwork] = useState(network)

  // dispatch({ type: 'UPDATE_NETWORK', payload: network })


  // const { nodes } = state
  console.log('NODES', network)

  return (
    <NodesStyles>
      {
        network.map((node, index) => (
          <Node
            key={node.addr}
            node={node}
            rotateAngle={calcRotateAngle(index, network.length)}
          />
        ))
      }
    </NodesStyles>
  )
}

export default Nodes
