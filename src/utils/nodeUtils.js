// parses the graphql port for an address in the format of 0.0.0.0:3001
// would return '8001' for the above example
const parsePort = (addr) => {
  const port = addr.split(':')[1]
  return `8${port.substr(1)}`
}

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
  console.log('traceports', tracePorts)
  console.log('network', network)
  const networkTrace = network.map((node) => {
    const currNode = { ...node }
    if (tracePorts.indexOf(node.addr) !== -1) {
      currNode.inTrace = true
    }
    return currNode
  })
  return networkTrace
}

export {
  findUniqueFingers, calcRotateAngle, calcNetwork, calcTrace,
}
