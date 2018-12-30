export default `
  type Message {
    id: ID!
    text: String!
    sender: User!
    createdAt: MyCustomScalar!
    
  }
  type Query {
    messages(conversationId : ID!): [Message!]!
  }
  type Mutation {
    createMessage(conversationId : ID! , text : String! ): Boolean!
  }
`;