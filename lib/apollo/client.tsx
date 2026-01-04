'use client';

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

let client: ApolloClient<any> | null = null;

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://rickandmortyapi.com/graphql',
    }),
    defaultOptions: {
      query: { fetchPolicy: 'cache-first' },
    },
  });
}

export function getClient() {
  if (!client) {
    client = createApolloClient();
  }
  return client;
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const client = getClient();
  return <Provider client={client}>{children}</Provider>;
}
