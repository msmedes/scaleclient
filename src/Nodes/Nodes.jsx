import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ArcherContainer } from 'react-archer'

import NodesStyles from '../styles/NodesStyles'

import {
  calcRotateAngle, calcNetwork, createTrace, findUniqueFingers, calcTraceLines,
} from '../utils/nodeUtils'
import { NodeRefetchContext, NodeMutationContext, TraceContext } from '../context/NodesContext'

import Node from '../Node/Node'
import GetForm from '../Forms/GetForm'
import SetForm from '../Forms/SetForm'

const Nodes = ({
  data, mutationData, variables,
}) => {
  const getQuery = useContext(NodeRefetchContext)
  const runMutation = useContext(NodeMutationContext)
  const { traceType, setTraceType } = useContext(TraceContext)
  const { nodes: networkAddrs } = data.getNetwork
  const { node: headNodePort } = data.metadata
  const { fingerTableAddrs } = headNodePort
  const { addr: predAddr } = headNodePort.predecessor

  const uniqueFingers = findUniqueFingers(headNodePort.addr, fingerTableAddrs)
  let network = calcNetwork(networkAddrs, headNodePort, uniqueFingers, predAddr)

  let val
  let trace
  let key

  if (mutationData && traceType === 'set') {
    trace = mutationData.set.trace
    console.log('mutation data', mutationData)
    network = createTrace(network, mutationData.set.trace)
  }

  if (variables && traceType === 'get') {
    trace = data.get.trace
    val = data.get.value
    key = variables.key
    console.log('data', val)
    network = createTrace(network, data.get.trace)
  }

  if (trace) {
    network = calcTraceLines(network, trace)
  }


  network = network.map((node, index) => {
    const currNode = node
    currNode.rotateAngle = calcRotateAngle(index, network.length)
    return currNode
  })

  network = network.map((node) => {
    const currNode = node
    if (currNode.inTrace) {
      currNode.targetAngle = network[currNode.targetId].rotateAngle
    }
    return currNode
  })

  const handleGetSubmit = (e, get) => {
    e.preventDefault()
    setTraceType('get')
    getQuery({ variables: { key: get } })
  }

  const handleSetSubmit = (e, setKey, value) => {
    e.preventDefault()
    setTraceType('set')
    runMutation({ variables: { key: setKey, value } })
  }

  return (
    <ArcherContainer strokeColor="hsl(206, 98%, 39%)" strokeWidth="3" arrowLength="0" arrowThickness="0">
      <NodesStyles>
        <div className="vals">
          <GetForm handleGetSubmit={handleGetSubmit} command="Get" />
          <SetForm handleSetSubmit={handleSetSubmit} />
        </div>
        {
          network.map((node, index) => (
            <Node
              queryKey={key}
              val={val}
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
}

export default Nodes
