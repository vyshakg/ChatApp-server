import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { createServer } from 'http';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

dotenv.config();
const { PORT } = process.env;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGOURL,
      {
        useNewUrlParser: true,
      },
    );

    const app = express();

    app.disable('x-powered-by');

    const server = new ApolloServer({
      schema,
      cors: false,
      // debug: false,
      playground: {
        settings: {
          'editor.theme': 'dark',
        },
      },
      context: ({ req }) => {
        let token = req.headers.authorization || '';
        [, token] = token.split(' ');

        try {
          if (token) {
            const { id } = jwt.decode(token);
            mongoose.Types.ObjectId.isValid(id);
            req.id = id;
          }
        } catch (e) {
          throw new AuthenticationError('you must be logged in');
        }
        return req;
      },
    });
    server.applyMiddleware({ app });
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen({ port: PORT }, () => {
      console.log(`http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`ws://localhost:${PORT}${server.subscriptionsPath}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
