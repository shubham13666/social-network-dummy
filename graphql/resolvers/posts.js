const Post = require("../../models/post")

module.exports = {
    getPosts: {
        async getPosts() {
            try {
                return Post.find()
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}