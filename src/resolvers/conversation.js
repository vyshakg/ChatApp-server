import mongoose from 'mongoose';
import { Conversation } from '../models';
import allConversationFucntion from '../utils/resolverFunctions';

export default {
  Query: {
    allConversation: (root, args, { id }) => allConversationFucntion(id),
  },

  Mutation: {
    createConversation: async (root, { userid }, { id }) => {
      try {
        const conversation = new Conversation({
          participants: [mongoose.Types.ObjectId(userid), mongoose.Types.ObjectId(id)],
        });
        const cid = await conversation.save();

        const newConversation = await Conversation.findOne({ _id: cid.id })
          .populate('participants')
          .exec();

        const filterParticipants = newConversation.participants.filter((participant) => {
          if (participant.id === id) return false;
          return true;
        });
        newConversation.participants = filterParticipants; // eslint-disable-line no-param-reassign

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
