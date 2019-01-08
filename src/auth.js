import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { AuthenticationError } from 'apollo-server-express';
// eslint-disable-next-line consistent-return
const getUser = (token) => {
  try {
    if (token) {
      const { id } = jwt.decode(token);
      mongoose.Types.ObjectId.isValid(id);
      return id;
    }
  } catch (e) {
    throw new AuthenticationError('you must be logged in');
  }
};

export default getUser;
