import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';
import resolvers from './resolvers.js';

// Load GraphQL schema from file
//const schemaPath = path.join(__dirname, '../schema.graphql');
const typeDefs = fs.readFileSync('./backend/graphql/schema.graphql', 'utf8');

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
  });
  console.log(`Server ready at ${url}`);
}

startServer();
