'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apolloServerExpress = require('apollo-server-express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line consistent-return
const getUser = token => {
  try {
    if (token) {
      const { id } = _jsonwebtoken2.default.decode(token);
      _mongoose2.default.Types.ObjectId.isValid(id);
      return id;
    }
  } catch (e) {
    throw new _apolloServerExpress.AuthenticationError('you must be logged in');
  }
};

exports.default = getUser;