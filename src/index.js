import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer, AuthorizationError } from 'apollo-server-express';
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

      playground: {
        settings: {
          'editor.theme': 'dark',
        },
      },
      // context: ({ req }) => {
      //   // get the user token from the headers
      //   const token = req.headers.authorization || '';
      //   const { id } = jwt.verify(token, process.env.SECRET);
      //   // try to retrieve a user with the token
      //   if (token && !mongoose.Types.ObjectId.isValid(id)) throw new AuthorizationError('you must be logged in');
      //   // add the user to the context
      //   return { id };
      // },
    });
    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () => console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`));
  } catch (e) {
    console.error(e);
  }
})();
