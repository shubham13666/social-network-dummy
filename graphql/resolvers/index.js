const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
    Query: {
        ...postResolvers.query,
    },
    Mutation: {
        ...userResolvers.mutation,
        ...postResolvers.mutation,
        ...commentResolvers.mutation
    },
    Subscription: {
        ...postResolvers.subscription
    }
}