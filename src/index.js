import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import apolloServer from './apolloServer';

import connectMongoDb from './connectMongodb';

dotenv.config();
const { PORT } = process.env;

(async () => {
  try {
    connectMongoDb();

    const app = express();
    app.disable('x-powered-by');

    const server = apolloServer;
    server.applyMiddleware({ app });
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port: PORT }, () => {
      console.log(`http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error(e);
    console.error('Something Went Worng!!');
  }
})();
