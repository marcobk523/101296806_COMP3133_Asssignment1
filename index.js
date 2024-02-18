const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const { loadSchemaSync } = require('@graphql-tools/load-files');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = loadFilesSync(path.join(__dirname, 'schema.graphql'));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

require('dotenv').config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ schema });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();