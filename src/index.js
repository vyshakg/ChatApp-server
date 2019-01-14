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
    server.applyMiddleware({
      app,
      cors: 'https://5c3cd61750ab38eaf9b73029--zealous-galileo-ff9e75.netlify.com',
    });
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
      console.log(`Running on port ==> ${PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error(e);
    console.error('Something Went Worng!!');
  }
})();
