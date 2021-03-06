import { ApolloClient } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const getApolloClient = (port) => {
  const httpLink = new HttpLink({
    uri: `http://localhost:${port}/graphql`,
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ))
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const retryLink = new RetryLink()

  const link = ApolloLink.from([retryLink, errorLink, httpLink])

  const cache = new InMemoryCache()

  const client = new ApolloClient({
    link,
    cache,
  })

  return client
}

export default getApolloClient
