const { UserInputError } = require("apollo-server");
const Post = require("../../models/post");
const Authentication = require("../../utils/authentication");
const Helper = require("../../utils/helpers");

module.exports = {
    mutation: {
        async addComment(_, { postId, body }, context) {
            const token = Helper.getTokenFromContext(context);
            const currentUser = Authentication.checkAuthorization(token);

            if (body.trim() === '') {
                throw new UserInputError("Body can't be empty", {
                    error: {
                        body: "Body can't be empty."
                    }
                })
            }

            const post = await Post.findById(postId);
            if (!post) {
                throw new UserInputError("Post doesn't exist for the given post id.");
            }

            post.comments.unshift(
                {

                    body,
                    username: currentUser.username,
                    user: currentUser.id,
                    createdAt: new Date().toISOString()
                }
            );
            await post.save();
            return post;
        }
    }

}