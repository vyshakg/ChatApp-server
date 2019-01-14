import express from 'express';
import { createServer } from 'http';
import apolloServer from './apolloServer';
import connectMongoDb from './connectMongodb';
// import startFunction from './images';

const PORT = process.env.PORT || 4000;
(async () => {
  try {
    await connectMongoDb();

    const app = express();
    app.disable('x-powered-by');
    // startFunction();
    const server = apolloServer;
    server.applyMiddleware({ app, cors: false });
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
      console.log(`http://localhost:${PORT}${server.graphqlPath}`);
    });
    // checking
  } catch (e) {
    console.error(e);
    console.error('Something Went Worng!!');
  }
})();
