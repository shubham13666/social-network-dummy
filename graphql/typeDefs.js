const gql = require('graphql-tag');

const typeDef = gql`
type Post{
    id:ID!
    body:String!
    createdAt:String!
}
type User{
    id:ID!
    username:String!
    email:String!
    password:String!
    createdAt:String!
    token:String!
}
input RegisterUserInput{
    username:String!
    email:String!
    password:String!
    confirmPassword:String!
}
type Query{
    getPosts: [Post]!
}
type Mutation{
    registerUser(registerUserInput:RegisterUserInput!):User!
    loginUser(username: String!,password: String!):User!
}
`
module.exports = typeDef;