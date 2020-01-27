import { createContext } from 'react'

const NodesStateContext = createContext()
const NodesDispatchContext = createContext()
const NodeRefetchContext = createContext()
const NodeMutationContext = createContext()

export {
  NodesStateContext, NodesDispatchContext, NodeRefetchContext, NodeMutationContext,
}
