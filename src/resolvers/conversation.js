import mongoose, { model } from 'mongoose';
import { Conversation, Message, User } from '../models';

export default {
  Query: {
    allConversation: async (root, args, { id }) => {
      try {
        const allConversation = await User.findOne({ _id: id })
          .populate({ path: 'conversations', populate: { path: 'participant', model: 'User' } })
          .exec();
        console.log(allConversation, allConversation.conversations[0].participant);
        return allConversation;
      } catch (e) {
        return e;
      }
    },
  },

  Mutation: {
    createConversation: async (root, { userid }, { id }) => {
      try {
        const conversation = new Conversation({
          participant: mongoose.Types.ObjectId(userid),
        });
        const cid = await conversation.save();
        const newConversation = await Conversation.findOne({ _id: cid.id })
          .populate('participant')
          .exec();

        await User.updateOne({ _id: id }, { $push: { conversations: cid.id } });

        return {
          ok: true,
          conversation: newConversation,
        };
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
