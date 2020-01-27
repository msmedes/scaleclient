// calculates the rotation angle for the css transform
const calcRotateAngle = (i, numNodes) => {
  const offsetAngle = 360 / numNodes
  return offsetAngle * i
}

const calcNetwork = (network, headNodePort, fingers) => {
  const networkPorts = network.slice(1, network.length - 1)
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
const findUniqueFingers = (fingerTable) => {
  const uniqueEntries = []
  let prevEntry = ''
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
  return uniqueEntries
}

const calcTrace = (network, trace) => {
  const tracePorts = trace.map((node) => node.addr)
  const networkTrace = network.map((node) => {
    const currNode = { ...node }
    if (tracePorts.indexOf(node.addr) !== -1) {
      currNode.inTrace = true
    }
    return currNode
  })
  return networkTrace
}

const createTrace = (trace) => {
  // const tracePorts = trace.map((node) => node.addr)
  const traceInfo = trace.map((step, index) => {
    const to = index === trace.length - 1 ? trace[0].addr : trace[index + 1].addr
    return {
      from: step.addr,
      functionCall: step.functionCall,
      duration: step.duration,
      to,
    }
  })
  return traceInfo
}
export {
  findUniqueFingers, calcRotateAngle, calcNetwork, calcTrace, createTrace,
}
