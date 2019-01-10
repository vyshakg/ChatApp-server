import mongoose from 'mongoose';
import { Conversation } from '../models';
import allConversationFucntion from '../utils/resolverFunctions';
import pubsub from '../pubSub';

const { withFilter } = require('apollo-server-express');

const NEW_CONVERSATION_MESSAGE = 'NEW_CONVERSATION_MESSAGE';
export default {
  Subscription: {
    newConversation: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CONVERSATION_MESSAGE),
        (payload, args) => payload.newConversation.participants[0].id == args.userid, // eslint-disable-line
      ),
    },
  },
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
        pubsub.publish(NEW_CONVERSATION_MESSAGE, {
          newConversation,
        });
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
