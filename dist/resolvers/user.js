'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apolloServerExpress = require('apollo-server-express');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _models = require('../models');

var _formatError = require('../formatError');

var _formatError2 = _interopRequireDefault(_formatError);

var _validation = require('../validation');

var _resolverFunctions = require('../utils/resolverFunctions');

var _resolverFunctions2 = _interopRequireDefault(_resolverFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  JSON: _graphqlTypeJson2.default,
  Query: {
    me: async (root, args, { id }) => {
      if (!id) {
        throw new _apolloServerExpress.AuthenticationError();
      }
      const user = await _models.User.findOne({ _id: id }).populate('profilePic');
      user.conversations = (0, _resolverFunctions2.default)(id);
      return user;
    },
    allProfilePic: () => _models.ProfilePic.find({}),
    user: (root, { id }) => {
      try {
        if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
          throw new _apolloServerExpress.UserInputError("it's not a valid user ID.");
        }
        return _models.User.findById(id).populate('profilePic');
      } catch (e) {
        return e;
      }
    },
    allUsers: (root, args, { id }) => {
      if (!id) {
        throw new _apolloServerExpress.AuthenticationError();
      }
      return _models.User.find({ _id: { $ne: id } }).populate('profilePic');
    }
  },
  Mutation: {
    signUp: async (root, args) => {
      const {
        email, phoneNo, password, username
      } = args;
      try {
        await _joi2.default.validate({
          email,
          phoneNo,
          password,
          username
        }, _validation.signUp, { abortEarly: false });
        const user = await _models.User.create(args);
        return {
          ok: true,
          id: user.id
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatError2.default)(e)
        };
      }
    },
    signIn: async (root, { email, password }) => {
      try {
        await _joi2.default.validate({ email, password }, _validation.signIn, { abortEarly: false });

        const user = await _models.User.findOne({ email });
        if (!user || !(await user.matchesPassword(password))) {
          throw new _apolloServerExpress.AuthenticationError();
        }

        return {
          ok: true,
          username: user.username,
          token: user.createToken()
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatError2.default)(e)
        };
      }
    }
  }
};