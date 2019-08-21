"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require("../models");

var _pubSub = require("../pubSub");

var _pubSub2 = _interopRequireDefault(_pubSub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { withFilter } = require("apollo-server-express");

const NEW_MESSAGE = "NEW_MESSAGE";

exports.default = {
  Subscription: {
    newConversationMessage: {
      subscribe: withFilter(() => _pubSub2.default.asyncIterator(NEW_MESSAGE), (payload, args) => payload.newConversationMessage.conversationId == args.conversationId // eslint-disable-line
      )
    }
  },
  Query: {
    messages: async (root, { conversationId }, { id }) => {
      try {
        if (!id) {
          throw new _apolloServerExpress.AuthenticationError();
        }
        if (!_mongoose2.default.Types.ObjectId.isValid(conversationId)) {
          return [];
        }
        const message = await _models.Message.find({ conversationId }).populate({
          path: "from"
        }).exec();

        return message;
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    createMessage: async (root, { conversationId, text }, { id }) => {
      try {
        if (!id) {
          throw new _apolloServerExpress.AuthenticationError();
        }
        const conversation = await _models.Conversation.findOne({
          _id: conversationId
        });
        if (!conversation) {
          return false;
        }
        const message = new _models.Message({
          conversationId,
          from: id,
          text
        });

        let newMessage = await message.save();
        // eslint-disable-next-line
        newMessage = await _models.Message.findOne({ _id: newMessage._id }).populate({
          path: "from"
        }).exec();

        _pubSub2.default.publish(NEW_MESSAGE, {
          newConversationMessage: newMessage
        });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};