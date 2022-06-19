const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
// const validator = require("validator");
// const Post = mongoose.model("Posts", {
const postSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});
postSchema.methods.toJSON = function () {
    const post = this.toObject()
    delete post.__v
    delete post.createdAt
    delete post.updatedAt
    return post
}
const Post = mongoose.model("Users",postSchema)
module.exports = Post
