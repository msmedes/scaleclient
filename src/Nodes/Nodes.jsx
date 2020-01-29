import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ArcherContainer } from 'react-archer'

import NodesStyles from '../styles/NodesStyles'

import {
  calcRotateAngle, calcNetwork, createTrace, findUniqueFingers, calcTraceLines,
} from '../utils/nodeUtils'
import { TraceContext } from '../context/NodesContext'

import Node from '../Node/Node'

const Nodes = ({
  data, mutationData, variableKey,
}) => {
  const { traceType } = useContext(TraceContext)
  const { nodes: networkAddrs } = data.getNetwork
  const { node: headNodePort } = data.metadata
  const { fingerTableAddrs } = headNodePort
  const { addr: predAddr } = headNodePort.predecessor

  const uniqueFingers = findUniqueFingers(headNodePort.addr, fingerTableAddrs)
  let network = calcNetwork(networkAddrs, headNodePort, uniqueFingers, predAddr)


  let trace

  if (mutationData && traceType === 'set') {
    trace = mutationData.set.trace
    network = createTrace(network, mutationData.set.trace)
  }

  if (variableKey && traceType === 'get') {
    trace = data.get.trace
    network = createTrace(network, data.get.trace)
  }

  if (trace) {
    network = calcTraceLines(network, trace)
  }


  network = network.map((node, index) => {
    const currNode = { ...node }
    currNode.rotateAngle = calcRotateAngle(index, network.length)
    return currNode
  })

  network = network.map((node) => {
    if (node.inTrace) {
      node.targetAngle = network[node.targetId].rotateAngle
    }
    return node
  })

  return (
    <ArcherContainer strokeColor="hsl(206, 98%, 39%)" strokeWidth="3" arrowLength="0" arrowThickness="0">
      <NodesStyles>
        {
          network.map((node, index) => (
            <Node
              key={node.addr}
              node={node}
              index={index}
            />
          ))
        }
      </NodesStyles>
    </ArcherContainer>
  )
}

Nodes.propTypes = {
  data: PropTypes.object.isRequired,
  mutationData: PropTypes.object,
  variableKey: PropTypes.string.isRequired,
}

export default Nodes
