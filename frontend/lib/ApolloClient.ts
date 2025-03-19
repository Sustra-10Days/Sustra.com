import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://sustracom-production.up.railway.app/graphql", // Absolute URL for the GraphQL endpoint
  }),
});

export default client;