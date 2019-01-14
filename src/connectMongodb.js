import mongoose from 'mongoose';

const MONGOURL = 'mongodb://mongo:27017/ChatApp';
export default async () => {
  try {
    await mongoose.connect(
      MONGOURL,
      {
        useNewUrlParser: true,
      },
    );
  } catch (e) {
    console.log("Couldn't connect with Database");
  }
};
