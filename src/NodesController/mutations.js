import gql from 'graphql-tag'

const SET_KEY = gql`
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
export default SET_KEY
