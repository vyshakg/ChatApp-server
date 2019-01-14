import mongoose from 'mongoose';

const MONGOURL = process.env.NODE_ENV === 'production'
  ? `mongodb:${process.env.MONGODB_USER}:${encodeURIComponent(
    process.env.MONGODB_PASSWORD,
  )}@ds257054.mlab.com:57054/chat-app`
  : 'mongodb://localhost:27017/ChatApp';
export default async () => {
  try {
    await mongoose.connect(
      MONGOURL,
      {
        useNewUrlParser: true,
      },
    );
  } catch (e) {
    console.log("Couldn't connect with Database", e);
  }
};
