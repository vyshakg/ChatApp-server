import { gql } from 'apollo-server-express';

export default gql`

type User{
    id : ID!
    username : String!
    email : String!
    phoneNo : String!
    createdAt : String!
}

type SignInResponse {
    ok: Boolean!
    token: String
    errors: [Error!]
  }

  type SignUpResponse{
    ok: Boolean!
    user: User
    errors: [Error!]
  }

extents type Query{
    me : User
    user(id :ID!) User
    allUsers: [User!]!
}

extents type Mutation{
    sigUp(email : String!, username : String!, password : String!, phoneNo : String! ) : SignUpResponse!
    sigIn(email : String!, password : String!) : SignInResponse!
    signOut : Boolean
}



`;
