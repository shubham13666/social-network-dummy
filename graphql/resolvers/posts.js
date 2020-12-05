const { AuthenticationError, forEachField, UserInputError } = require("apollo-server")


const Post = require("../../models/post")
const Authentication = require("../../utils/authentication");
const Helpers = require("../../utils/helpers");

module.exports = {
    query: {
        async getPosts() {
            try {
                return Post.find().sort({ createdAt: -1 });
            }
            catch (err) {
                console.log(err)
            }
        },
        async getPost(_, { postId }) {
            try {
                // TODO: Check if postId is valid and of correct ID type.
                let post = await Post.findById(postId);
                if (!post) {
                    throw new Error("Post with given id doesn't exist.");
                }
                return post;
            } catch (error) {
                throw new Error("Server error", error);
            }
        }
    },
    mutation: {
        async createPost(_, { body }, context) {
            const token = Helpers.getTokenFromContext(context);
            const user = Authentication.checkAuthorization(token);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const addedNewPost = await newPost.save();

            context.pubSub.publish('NEW_POSTS', {
                newPosts: addedNewPost
            })

            return addedNewPost;
        },
        async deletePost(_, { postId }, context) {
            const token = Helpers.getTokenFromContext(context);
            const currentUser = Authentication.checkAuthorization(token);

            try {
                // Check if the user trying to delete the post is the creator of the post.
                const postToBeDeleted = await Post.findById(postId);
                if (!postToBeDeleted) {
                    throw new Error("Post with given id doesn't exist.")
                }
                if (currentUser.username !== postToBeDeleted.username) {
                    throw new AuthenticationError("Action not allowed.")
                }

                // Delete the post
                const deletedPostStatus = await Post.deleteOne({ _id: postId });
                if (deletedPostStatus.ok != 1) {
                    throw new Error("Unable to delete.")
                }
                else if (deletedPostStatus.ok === 1) {
                    if (deletedPostStatus.deletedCount === 1) {
                        return "Post deleted successfully.";
                    }
                    else {
                        throw new Error("Post with given id doesn't exist.")
                    }
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async deleteAllPosts(_, args, context) {
            const token = Helpers.getTokenFromContext(context);
            const currentUser = Authentication.checkAuthorization(token);

            try {
                const deleteAllResponse = await Post.deleteMany({ username: currentUser.username })
                return `Deleted ${deleteAllResponse.deletedCount} ${deleteAllResponse.deletedCount == 1 ? "post" : "posts"}.`;
            } catch (error) {
                throw new Error(error);
            }
        },
        async likePost(_, { postId }, context) {
            const token = Helpers.getTokenFromContext(context);
            const currentUser = Authentication.checkAuthorization(token);

            const post = await Post.findById(postId);
            if (!post) {
                throw new UserInputError("Post doesn't exist for given post id.");
            }
            if (post.likes.find(like => like.username === currentUser.username)) {
                // Post already liked. So remove it.
                post.likes = post.likes.filter(like => like.username !== currentUser.username);
            } else {
                // Like the post.
                post.likes.push({
                    user: currentUser.id,
                    username: currentUser.username,
                    createdAt: new Date().toISOString()
                })
            }
            await post.save();
            return post;
        }
    },
    subscription: {
        newPosts: {
            subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('NEW_POSTS')
        }

    }
}
