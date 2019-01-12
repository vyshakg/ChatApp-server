import { gql } from 'apollo-server-express';

export default gql`
  scalar JSON

  type Query {
    me: User!
    user(id: ID!): User
    allUsers: [User!]!
    allProfilePic: JSON
  }

  type Mutation {
    signUp(
      email: String!
      username: String!
      password: String!
      phoneNo: String!
      profilePic: ID!
    ): SignUpResponse!
    signIn(email: String!, password: String!): SignInResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    phoneNo: String!
    online: Boolean!
    conversations: [Conversation]!
    profilePic: JSON
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

  scalar MyCustomScalar
`;
