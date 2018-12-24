import { Message } from '../models';

export default {
  Query: {
    messages: async (root, { conversationId }) => {
      try {
        const message = await Message.find({ conversationId })
          .populate('sender')
          .exec();
        return message;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    createMessage: async (root, { conversationId, text }, { id }) => {
      try {
        const message = new Message({
          conversationId,
          sender: id,
          text,
        });

        await message.save();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
