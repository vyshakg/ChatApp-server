import { gql } from 'apollo-server-express';

export default gql`
  scalar MyCustomScalar

  type User {
    id: ID!
    username: String!
    email: String!
    phoneNo: String!
    createdAt: MyCustomScalar!
    online: Boolean!
    conversations: [Conversation]!
  }

  type SignInResponse {
    ok: Boolean!
    username: String
    token: String
    errors: [Error!]
  }

  type SignUpResponse {
    ok: Boolean!
    id: ID
    errors: [Error!]
  }

  type Query {
    me: User
    user(id: ID!): User
    allUsers: [User!]!
  }

  type Mutation {
    signUp(email: String!, username: String!, password: String!, phoneNo: String!): SignUpResponse!
    signIn(email: String!, password: String!): SignInResponse!
  }
`;
