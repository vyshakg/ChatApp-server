export default `
type  Conversation{ 
    id: ID!
    message: [Message!]!
    participants : [User!]!
}

type Query{
    conversation(conversationId : ID!) : Conversation!
}

type Mutation {
    createConversation(userid : ID!) : Boolean!
}
`;
