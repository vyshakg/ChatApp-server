import { AuthenticationError } from "apollo-server-express";
import mongoose from "mongoose";
import { Conversation, Message } from "../models";
import pubsub from "../pubSub";

const { withFilter } = require("apollo-server-express");

const NEW_MESSAGE = "NEW_MESSAGE";

export default {
  Subscription: {
    newConversationMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, args) =>
          payload.newConversationMessage.conversationId == args.conversationId // eslint-disable-line
      )
    }
  },
  Query: {
    messages: async (root, { conversationId }, { id }) => {
      try {
        if (!id) {
          throw new AuthenticationError();
        }
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
          return [];
        }
        const message = await Message.find({ conversationId })
          .populate({
            path: "from"
          })
          .exec();

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
          throw new AuthenticationError();
        }
        const conversation = await Conversation.findOne({
          _id: conversationId
        });
        if (!conversation) {
          return false;
        }
        const message = new Message({
          conversationId,
          from: id,
          text
        });

        let newMessage = await message.save();
        // eslint-disable-next-line
        newMessage = await Message.findOne({ _id: newMessage._id })
          .populate({
            path: "from"
          })
          .exec();

        pubsub.publish(NEW_MESSAGE, {
          newConversationMessage: newMessage
        });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
