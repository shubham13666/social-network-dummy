const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose')
const mongodbUrl = require('./config').MONGODB

const typeDefs = require('./schema');
const Post = require('./models/post');
const resolvers = {
    Query: {
        async getPosts() {
            try {
                return await Post.find();
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(mongodbUrl, { useNewUrlParser: true }).then(res => {
    console.log("Connected to MongoDB...")
    return server.listen({ port: 5000 });
}).then(res => {
    console.log("Server is running on ", res.url);
})