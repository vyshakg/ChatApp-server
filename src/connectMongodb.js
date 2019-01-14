import mongoose from 'mongoose';

const MONGOURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ChatApp';
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
