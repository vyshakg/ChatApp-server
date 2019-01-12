import { Conversation } from '../models';

export default async (id) => {
  const allConversation = await Conversation.find({ participants: id })
    .populate({
      path: 'participants',
      populate: {
        path: 'profilePic',
      },
    })
    .exec();
  // eslint-disable-next-line array-callback-return
  allConversation.map((conversation) => {
    const filterParticipants = conversation.participants.filter((participant) => {
      if (participant.id === id) return false;
      return true;
    });
    conversation.participants = filterParticipants; // eslint-disable-line no-param-reassign
  });

  return allConversation;
};
