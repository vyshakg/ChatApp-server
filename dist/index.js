'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _apolloServer = require('./apolloServer');

var _apolloServer2 = _interopRequireDefault(_apolloServer);

var _connectMongodb = require('./connectMongodb');

var _connectMongodb2 = _interopRequireDefault(_connectMongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import startFunction from './images';

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await (0, _connectMongodb2.default)();

    const app = (0, _express2.default)();
    app.disable('x-powered-by');
    // startFunction();
    const server = _apolloServer2.default;
    server.applyMiddleware({ app, cors: true });
    const httpServer = (0, _http.createServer)(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
      console.log(`Running on port ==> ${PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error(e);
    console.error('Something Went Worng!!');
  }
})();