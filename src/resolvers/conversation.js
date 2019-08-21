import { AuthenticationError } from "apollo-server-express";
import mongoose from "mongoose";
import { Conversation, Message } from "../models";
import allConversationFucntion from "../utils/resolverFunctions";

export default {
  Query: {
    allConversation: (root, args, { id }) => {
      if (!id) {
        throw new AuthenticationError();
      }
      return allConversationFucntion(id);
    }
  },

  Mutation: {
    createConversation: async (root, { userid }, { id }) => {
      try {
        if (!id) {
          throw new AuthenticationError();
        }
        const conversation = new Conversation({
          participants: [
            mongoose.Types.ObjectId(userid),
            mongoose.Types.ObjectId(id)
          ]
        });
        const cid = await conversation.save();

        const newConversation = await Conversation.findOne({ _id: cid.id })
          .populate({
            path: "participants"
          })
          .exec();

        const filterParticipants = newConversation.participants.filter(
          participant => {
            if (participant.id === id) return false;
            return true;
          }
        );
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
          throw new AuthenticationError();
        }
        const conversation = await Conversation.findOne({
          _id: conversationId
        });
        if (!conversation) {
          return false;
        }
        await Message.deleteMany({ conversationId });
        await Conversation.deleteOne({ _id: conversationId });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
