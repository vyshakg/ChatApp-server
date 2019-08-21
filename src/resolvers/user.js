import { AuthenticationError, UserInputError } from "apollo-server-express";
import GraphQLJSON from "graphql-type-json";
import Joi from "joi";
import mongoose from "mongoose";
import formatError from "../formatError";
import { User } from "../models";
import allConversationFucntion from "../utils/resolverFunctions";
import { signIn, signUp } from "../validation";

export default {
  JSON: GraphQLJSON,
  Query: {
    me: async (root, args, { id }) => {
      if (!id) {
        throw new AuthenticationError();
      }
      const user = await User.findOne({ _id: id });
      user.conversations = allConversationFucntion(id);
      return user;
    },
    allProfilePic: () => {
      return [
        "helen",
        "christian",
        "elliot",
        "joe",
        "jenny",
        "nan",
        "steve",
        "tony"
      ];
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
    allUsers: (root, args, { id }) => {
      if (!id) {
        throw new AuthenticationError();
      }
      return User.find({ _id: { $ne: id } });
    }
  },
  Mutation: {
    signUp: async (root, args) => {
      const { email, phoneNo, password, username, profilePic } = args;

      if (profilePic === null || profilePic === undefined)
        args.profilePic = "jenny";

      try {
        await Joi.validate(
          {
            email,
            phoneNo,
            password,
            username
          },
          signUp,
          { abortEarly: false }
        );
        const user = await User.create(args);
        return {
          ok: true,
          id: user.id
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatError(e)
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
          token: user.createToken()
        };
      } catch (e) {
        return {
          ok: false,
          errors: formatError(e)
        };
      }
    }
  }
};
