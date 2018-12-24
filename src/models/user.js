import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken.`, // TODO: security
      },
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken.`, // TODO: security
      },
    },
    phoneNo: String,
    password: String,
    online: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line
userSchema.pre('save', async function() {
  this.password = await hash(this.password, 10);
});

userSchema.statics.doesntExist = async function doesntExist(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function matchesPassword(password) {
  return compare(password, this.password);
};
userSchema.methods.changeStatus = function changeStatus(status) {
  this.online = status;
};

userSchema.methods.createToken = function createToken() {
  return jwt.sign(
    {
      email: this.email,
      id: this._id, // eslint-disable-line no-underscore-dangle
    },
    process.env.SECRET,
  );
};

const User = mongoose.model('User', userSchema);

export default User;
