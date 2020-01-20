import gql from 'graphql-tag'

export const GET_NODE_MD_WITH_TRACE = gql`
  query GET_NODE_MD_WITH_TRACE($key:  String!){
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
        fingerTable
      }
    }
  }
`

export const GET_NODE_MD = gql`
  query GET_NODE_MD {
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
        fingerTable
      }
    }
  }
`