const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose')
const mongodbUrl = require('./config').MONGODB

const typeDefs = require('./graphql/typeDefs');
const Post = require('./models/post');
const resolvers = require("./graphql/resolvers");


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(mongodbUrl, { useNewUrlParser: true }).then(res => {
    console.log("Connected to MongoDB...")
    return server.listen({ port: 5000 });
}).then(res => {
    console.log("Server is running at ", res.url);
})