export default `

type Conversation {
    id :ID!
    participant : User!
    createdAt : MyCustomScalar!
}
type createConversationResponse{
    ok : Boolean!
    conversation : Conversation!
}

type Query{
    allConversation : User!
}

type Mutation {
    createConversation(userid : ID!) : createConversationResponse!
}
`;
