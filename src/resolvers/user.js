import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import Joi from 'joi';
import { User } from '../models';
import formatError from '../formatError';
import { signUp, signIn } from '../validation';
import allConversationFucntion from '../utils/resolverFunctions';

export default {
  Query: {
    me: async (root, args, { id }) => {
      const user = await User.findOne({ _id: id });
      user.conversations = allConversationFucntion(id);
      return user;
    },

    user: (root, { id }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new UserInputError("it's not a valid user ID.");
        }
        return User.findById(id);
      } catch (e) {
        return e;
      }
    },
    allUsers: (root, args, { id }) => User.find({ _id: { $ne: id } }),
  },
  Mutation: {
    signUp: async (root, args) => {
      try {
        await Joi.validate(args, signUp, { abortEarly: false });
        const user = await User.create(args);
        return {
          ok: true,
          id: user.id,
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatError(e),
        };
      }
    },
    signIn: async (root, { email, password }) => {
      try {
        await Joi.validate({ email, password }, signIn, { abortEarly: false });

        const user = await User.findOne({ email });
        if (!user || !(await user.matchesPassword(password))) {
          throw new AuthenticationError();
        }

        return {
          ok: true,
          username: user.username,
          token: user.createToken(),
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatError(e),
        };
      }
    },
  },
};
