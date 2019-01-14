'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _http = require('http');

var _apolloServer = require('./apolloServer');

var _apolloServer2 = _interopRequireDefault(_apolloServer);

var _connectMongodb = require('./connectMongodb');

var _connectMongodb2 = _interopRequireDefault(_connectMongodb);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    (0, _connectMongodb2.default)();

    const app = (0, _express2.default)();
    app.disable('x-powered-by');
    (0, _images2.default)();
    const server = _apolloServer2.default;
    server.applyMiddleware({ app });
    const httpServer = (0, _http.createServer)(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
      console.log(`http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error(e);
    console.error('Something Went Worng!!');
  }
})();