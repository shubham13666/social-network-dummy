const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require('mongoose')
const mongodbUrl = require('./config').MONGODB

const typeDefs = require('./graphql/typeDefs');
const resolvers = require("./graphql/resolvers");

const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubSub })
});

mongoose.connect(mongodbUrl, { useNewUrlParser: true }).then(res => {
    console.log("Connected to MongoDB...")
    return server.listen({ port: 5000 });
}).then(res => {
    console.log("Server is running at ", res.url);
})