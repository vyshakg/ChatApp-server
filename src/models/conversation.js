import mongoose, { Schema } from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
