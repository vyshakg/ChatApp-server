import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

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
      context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        // try to retrieve a user with the token

        // add the user to the context
      },
    });
    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () => console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`));
  } catch (e) {
    console.error(e);
  }
})();
