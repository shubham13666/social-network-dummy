const gql = require('graphql-tag');

const typeDef = gql`
type Post{
    id:ID!
    body:String!
    createdAt:String!
}
type Query{
    getPosts: [Post]!
}
`
module.exports = typeDef;