import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(
      process.env.MONGOURL,
      {
        useNewUrlParser: true,
      },
    );
  } catch (e) {
    console.log("Couldn't connect with Database");
  }
};
