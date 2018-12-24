import mongoose from 'mongoose';
import { Conversation, Message } from '../models';

export default {
  Query: {
    conversation: async (root, { conversationId }, { id }) => {
      const message = await Message.find({ conversationId })
        .populate('sender')
        .exec();

      const { participants } = await Conversation.findById(conversationId)
        .populate({
          path: 'participants',
        })
        .exec();
      return {
        id,
        message,
        participants,
      };
    },
  },

  Mutation: {
    createConversation: async (root, { userid }, { id }) => {
      try {
        const conversation = new Conversation({
          participants: [mongoose.Types.ObjectId(userid), mongoose.Types.ObjectId(id)],
        });

        await conversation.save();
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
