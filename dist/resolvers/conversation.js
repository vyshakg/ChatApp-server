'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apolloServerExpress = require('apollo-server-express');

var _models = require('../models');

var _resolverFunctions = require('../utils/resolverFunctions');

var _resolverFunctions2 = _interopRequireDefault(_resolverFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allConversation: (root, args, { id }) => {
      if (!id) {
        throw new _apolloServerExpress.AuthenticationError();
      }
      return (0, _resolverFunctions2.default)(id);
    }
  },

  Mutation: {
    createConversation: async (root, { userid }, { id }) => {
      try {
        if (!id) {
          throw new _apolloServerExpress.AuthenticationError();
        }
        const conversation = new _models.Conversation({
          participants: [_mongoose2.default.Types.ObjectId(userid), _mongoose2.default.Types.ObjectId(id)]
        });
        const cid = await conversation.save();

        const newConversation = await _models.Conversation.findOne({ _id: cid.id }).populate({
          path: 'participants',
          populate: {
            path: 'profilePic'
          }
        }).exec();

        const filterParticipants = newConversation.participants.filter(participant => {
          if (participant.id === id) return false;
          return true;
        });
        newConversation.participants = filterParticipants; // eslint-disable-line no-param-reassign

        return {
          ok: true,
          conversation: newConversation
        };
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    deleteConversation: async (root, { conversationId }, { id }) => {
      try {
        if (!id) {
          throw new _apolloServerExpress.AuthenticationError();
        }
        const conversation = await _models.Conversation.findOne({ _id: conversationId });
        if (!conversation) {
          return false;
        }
        await _models.Message.deleteMany({ conversationId });
        await _models.Conversation.deleteOne({ _id: conversationId });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};