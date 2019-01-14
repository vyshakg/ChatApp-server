import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import getUser from './auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default new ApolloServer({
  schema,
  cors: false,
  debug: true,
  playground:
    // process.env.NODE_ENV === 'production'
    //   ? false
    //   :
    {
      settings: {
        'editor.theme': 'dark',
        'request.credentials': 'include',
      },
    },
  // eslint-disable-next-line consistent-return
  context: async ({ req, connection }) => {
    let token = '';

    if (connection) {
      token = connection.context.authorization || '';
      [, token] = token.split(' ');
      const id = await getUser(token);
      return id;
    }

    if (req) {
      token = req.headers.authorization || '';
      [, token] = token.split(' ');

      req.id = await getUser(token);
      return req;
    }
  },
});
