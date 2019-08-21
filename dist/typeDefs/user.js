"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require("apollo-server-express");

exports.default = _apolloServerExpress.gql`
  scalar JSON

  type Query {
    me: User!
    user(id: ID!): User
    allUsers: [User!]!
    allProfilePic: [String!]!
  }

  type Mutation {
    signUp(
      email: String!
      username: String!
      password: String!
      phoneNo: String!
      profilePic: String
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
    profilePic: String!
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