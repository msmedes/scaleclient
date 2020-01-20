import gql from 'graphql-tag'

export const SET_KEY = gql`
  mutation SET_KEY ($key: String!, $value: String!){
    set(key: $key, value: $value){
      trace {
        addr
        functionCall
        duration
      }
    }
  }
`