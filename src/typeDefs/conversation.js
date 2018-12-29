export default `

type Conversation {
    id :ID!
    participant : User!
    createdAt : MyCustomScalar!
}
type Query{
    allConversation : User!
}

type Mutation {
    createConversation(userid : ID!) : Boolean!
}
`;
