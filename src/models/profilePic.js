import mongoose from 'mongoose';

const ProfilePicSchema = new mongoose.Schema({
  img: {
    type: Buffer,
  },
});

const ProfilePic = mongoose.model('ProfilePic', ProfilePicSchema);

export default ProfilePic;
