const gql = require('graphql-tag');

const typeDef = gql`
type Post{
    id:ID!
    body:String!
    createdAt:String!
    username:String!
    user:ID!
    comments:[Comment]!
    likes:[Like]!
}

type Comment{
    id:ID!
    body:String!
    username:String!
    user:ID!
    createdAt:String!
}

type Like{
    id:ID!
    username:String!
    userId:ID!
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
    deletePost(postId:ID!):String!
    deleteAllPosts:String!
    addComment(postId:ID!,body:String!):Post!
    deleteComment(postId:ID! commentId:ID!):Post!
    likePost(postId:ID!):Post!
}
`
module.exports = typeDef;