import { createContext } from 'react'

const NodesStateContext = createContext()
const NodesDispatchContext = createContext()
const NodeRefetchContext = createContext()
const NodeMutationContext = createContext()
const TraceContext = createContext()
const HeadNodeContext = createContext()

export {
  NodesStateContext,
  NodesDispatchContext,
  NodeRefetchContext,
  NodeMutationContext,
  TraceContext,
  HeadNodeContext,
}
