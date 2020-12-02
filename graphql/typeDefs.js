const gql = require('graphql-tag');

const typeDef = gql`
type Post{
    id:ID!
    body:String!
    createdAt:String!
    username:String!
    user:ID!
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
    # posts
    getPosts: [Post]!
    getPost(postId:ID!):Post!
}
type Mutation{
    # users
    registerUser(registerUserInput:RegisterUserInput!):User!
    loginUser(username: String!,password: String!):User!

    # posts
    createPost(body:String!):Post!
    deletePost(postId:ID!):Boolean!
}
`
module.exports = typeDef;