// calculates the rotation angle for the css transform
const calcRotateAngle = (i, numNodes) => {
  const offsetAngle = 360 / numNodes
  return offsetAngle * i
}

const calcAnchor = (rotateAngle) => {
  if (rotateAngle >= 0 && rotateAngle < 90) {
    return 'bottom'
  } if (rotateAngle >= 90 && rotateAngle < 180) {
    return 'left'
  } if (rotateAngle >= 180 && rotateAngle < 270) {
    return 'top'
  } if (rotateAngle >= 270) {
    return 'right'
  }
}


const calcNetwork = (network, headNodePort, fingers) => {
  const networkPorts = network.slice(1)
  const fingerPorts = fingers.map((finger) => finger.addr)
  const headNode = {
    headNode: true, isFinger: false, addr: headNodePort.addr.toString(),
  }
  const nodes = networkPorts.map((node) => {
    const currNode = { headNode: false, addr: node }
    const fingerIndex = fingerPorts.indexOf(node)
    if (fingerIndex !== -1) {
      const finger = fingers[fingerIndex]
      currNode.isFinger = true
      currNode.start = finger.start.toString()
      currNode.end = finger.end.toString()
    }
    return currNode
  })

  return [headNode, ...nodes]
}

// gets the unique values of the finger table
const findUniqueFingers = (headNodePort, fingerTable) => {
  const uniqueEntries = []
  let prevEntry = ''
  if (fingerTable[0] !== headNodePort) {
    for (let i = 0; i < fingerTable.length; i += 1) {
      let start = 0
      let end = 0
      if (fingerTable[i] !== prevEntry) {
        start = i
        end = i
        const currEntry = { addr: fingerTable[i], start, end }
        prevEntry = fingerTable[i]
        uniqueEntries.push(currEntry)
      } else {
        uniqueEntries[uniqueEntries.length - 1].end = i
      }
    }
  }
  return uniqueEntries
}

const createTrace = (network, trace) => {
  const tracePorts = trace.map((node) => node.addr)
  const networkTrace = network.map((node) => {
    const traceIndex = tracePorts.indexOf(node.addr)
    const currNode = { ...node }
    if (traceIndex !== -1) {
      currNode.inTrace = true
      currNode.functionCall = trace[traceIndex].functionCall
      currNode.duration = trace[traceIndex].duration
    }
    return currNode
  })
  return networkTrace
}

const calcTraceLines = (network, trace) => {
  const currNetwork = [...network]
  const tracePorts = trace.map((entry) => entry.addr)
  const nodeIndices = network.map((node) => node.addr)
  for (let i = 0; i < tracePorts.length; i += 1) {
    const currTracePort = tracePorts[i]
    const nextTracePort = i === tracePorts.length - 1 ? 0 : i + 1
    const nodeIndex = nodeIndices.indexOf(currTracePort)
    const node = { ...currNetwork[nodeIndex] }
    node.targetId = nodeIndices.indexOf(tracePorts[nextTracePort])
    currNetwork[nodeIndex] = node
  }
  console.log('currNetwork', currNetwork)
  return currNetwork
}

const parsePort = (addr) => `8${addr.substr(1)}`

export {
  findUniqueFingers,
  calcRotateAngle,
  calcNetwork,
  calcTraceLines,
  createTrace,
  parsePort,
  calcAnchor,
}
