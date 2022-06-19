const
    postModel = require("../database/models/post.model");

class Post {
    static addPost = async (req, res) => {
        try {
            const post = postModel(req.body)
            await post.save()
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "Post Added Successfully"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in Register"
            })
        }
    }
    static getAll = async (req, res) => {
        try {
            const allPosts = await postModel.find()
            res.status(200).send({
                apiStatus: true,
                data: allPosts,
                message: "data fetched"
            })
        } catch (error) {
            res.send({
                apiStatus: false,
                data: error,
                message: error.message
            })
        }
    }
    static getSingle = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id)
            if (!post) {
                res.status(404).send({
                    apiStatus: false,
                    data: null,
                    message: "invalid user id"
                })
            }
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "data fetched"
            })
        } catch (error) {
            res.send({
                apiStatus: false,
                data: error,
                message: error.message
            })
        }
    }
    static edit = async (req, res) => {
        try {
            const post = await postModel.findByIdAndUpdate(req.params.id,
                req.body,
                {
                    runValidators: true,
                })
            if (!post) {
                res.status(404).send({
                    apiStatus: false,
                    data: null,
                    message: "invalid user id"
                })
            }
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "data fetched"
            })
        } catch (error) {
            res.send({
                apiStatus: false,
                data: error,
                message: error.message
            })
        }
    }
    static delete = async (req, res) => {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id)
            if (!post) {
                res.status(404).send({
                    apiStatus: false,
                    data: null,
                    message: "invalid user id"
                })
            }
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "data fetched"
            })
        } catch (error) {
            res.send({
                apiStatus: false,
                data: error,
                message: error.message
            })
        }
    }
}

module.exports = Post
