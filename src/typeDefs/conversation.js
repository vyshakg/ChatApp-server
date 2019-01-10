export default `
type Query{
    allConversation : [Conversation!]

}

type Mutation {
    createConversation(userid : ID!) : createConversationResponse!
}

type Conversation {
    id :ID!
    participants : [User]!
    createdAt : MyCustomScalar!

}
type Subscription {
    newConversation(userid: ID!): Conversation!
  }
type createConversationResponse{
    ok : Boolean!
    conversation : Conversation!
}

`;
