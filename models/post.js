const { model, Schema } = require('mongoose');


const postSchema = new Schema({
    body: String,
    username:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: String,
    comments: [
        {
            body: String,
            username:String,
            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    createdAt: String,
                    username:String
                }
            ],
            createdAt: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: "Users"
            }
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            createdAt: String,
            username:String
        }
    ]
})

module.exports = model("Post", postSchema);