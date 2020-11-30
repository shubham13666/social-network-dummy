const post = require("../../models/post");
const postResolvers = require("./posts");
const userResolvers = require("./users");

module.exports = {
    Query: {
        ...postResolvers.getPosts
    },
    Mutation: {
        ...userResolvers.registerUser,
        ...userResolvers.loginUser
    }
}