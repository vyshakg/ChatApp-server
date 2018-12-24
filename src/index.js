import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import path from 'path';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

dotenv.config();

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
      typeDefs,
      resolvers,
      cors: false,
      // debug: false,
      playground: {
        settings: {
          'editor.theme': 'dark',
        },
      },
      context: ({ req }) => {
        const token = req.headers.authorization || '';
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

    app.listen({ port: process.env.PORT }, () => console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`));
  } catch (e) {
    console.error(e);
  }
})();
