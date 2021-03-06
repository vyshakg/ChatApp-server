"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = `
type Query{
    allConversation : [Conversation!]

}

type Mutation {
    createConversation(userid : ID!) : createConversationResponse!
    deleteConversation(conversationId : ID!) : Boolean!
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