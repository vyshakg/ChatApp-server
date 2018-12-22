import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import User from '../models';
import formatError from '../formatError';

export default {
  Query: {
    me: (root, args, { id }) => {
      User.findById(id);
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
    allUsers: () => User.find({}),
  },
  Mutation: {
    signUp: async (root, args) => {
      // TODO : validation
      try {
        const user = await User.create(args);
        return {
          ok: true,
          id: user.id, // eslint-disable-line no-underscore-dangle
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatError(e.errors),
        };
      }
    },
    signIn: async (root, { email, password }) => {
      // TODO : validation
      const message = 'Incorrect email or password. Please try again.';
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchesPassword(password))) {
          throw new AuthenticationError(message);
        }
        return {
          ok: true,
          username: user.username,
          token: user.createToken(),
        };
      } catch (e) {
        return {
          ok: false,
          errors: e,
        };
      }
    },
  },
};
