export default `
 
  type Query {
    messages(conversationId : ID!): [Message!]!
  }
  type Mutation {
    createMessage(conversationId : ID! , text : String! ): Boolean!
  }

  type Subscription {
    newConversationMessage(conversationId: ID!): Message!
  }
  type Message {
    id: ID!
    text: String!
    from: User!
    createdAt: MyCustomScalar!
    
  }
`;
