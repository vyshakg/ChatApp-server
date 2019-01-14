'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _language = require('graphql/language');

const myCustomScalarType = new _graphql.GraphQLScalarType({
  name: 'MyCustomScalar',
  description: 'Description of my custom scalar type',
  serialize(value) {
    const result = value.toISOString();

    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseValue(value) {
    const result = new Date(value);

    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseLiteral(ast) {
    return ast.kind === _language.Kind.STRING ? parseInt(ast.value, 10) : null;
  }
});

const resolverFunctions = {
  MyCustomScalar: myCustomScalarType
};
exports.default = resolverFunctions;