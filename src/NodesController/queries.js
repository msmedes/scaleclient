import gql from 'graphql-tag'

const GET_NODE_MD_WITH_TRACE_AND_NETWORK = gql`
  query GET_NODE_MD_WITH_TRACE($key: String!){
    getNetwork {
      nodes
    }
    get(key: $key){
      value
      trace {
        addr
        functionCall
        duration
      }
    }
    metadata {
      node {
        id
        addr
        predecessor {
          id
          addr
        }
        successor {
          id
          addr
        }
        keys
        fingerTableAddrs
      }
    }
  }
`

const GET_NODE_MD = gql`
  query GET_NODE_MD {
    getNetwork {
      nodes
    }
    metadata {
      node {
        id
        addr
        predecessor {
          id
          addr
        }
        successor {
          id
          addr
        }
        keys
        fingerTableAddrs
      }
    }
  }
`

export { GET_NODE_MD_WITH_TRACE_AND_NETWORK, GET_NODE_MD }
