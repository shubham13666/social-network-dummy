const postResolvers = require("./posts");
const userResolvers = require("./users");

module.exports = {
    Query: {
        ...postResolvers.query,
    },
    Mutation: {
        ...userResolvers.mutation,
        ...postResolvers.mutation
    }
}