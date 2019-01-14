'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _apolloServerExpress = require('apollo-server-express');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './typeDefs')));
const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './resolvers')));

const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs,
  resolvers
});

exports.default = new _apolloServerExpress.ApolloServer({
  schema,
  cors: false,
  debug: true,
  playground: process.env.NODE_ENV === 'production' ? false : {
    settings: {
      'editor.theme': 'dark'
    }
  },
  // eslint-disable-next-line consistent-return
  context: async ({ req, connection }) => {
    let token = '';

    if (connection) {
      token = connection.context.authorization || '';
      [, token] = token.split(' ');
      const id = await (0, _auth2.default)(token);
      return id;
    }

    if (req) {
      token = req.headers.authorization || '';
      [, token] = token.split(' ');

      req.id = await (0, _auth2.default)(token);
      return req;
    }
  }
});