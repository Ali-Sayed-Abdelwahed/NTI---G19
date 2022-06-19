const userModel = require("../database/models/user.model");

class User {
    static register = async (req, res) => {
        try {
            const user = userModel(req.body)
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "User Added Successfully"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in Register"
            })
        }
    }
    static login = async (req, res) => {
        // try {
        //     const user = userModel(req.body)
        //     await user.save()
        //     res.status(200).send({
        //         apiStatus: true,
        //         data: user,
        //         message: "User Added Successfully"
        //     })
        // } catch (error) {
        //     res.send({
        //         apiStatus: false,
        //         data: error.message,
        //         message: "Error in Register"
        //     })
    }

    static edit = async (req, res) => {
        // try {
        //     const user = userModel(req.body)
        //     await user.save()
        //     res.status(200).send({
        //         apiStatus: true,
        //         data: user,
        //         message: "User Added Successfully"
        //     })
        // } catch (error) {
        //     res.send({
        //         apiStatus: false,
        //         data: error.message,
        //         message: "Error in Register"
        //     })
        // }
    }
    static delete = async (req, res) => {
        // try {
        //     const user = userModel(req.body)
        //     await user.save()
        //     res.status(200).send({
        //         apiStatus: true,
        //         data: user,
        //         message: "User Added Successfully"
        //     })
        // } catch (error) {
        //     res.send({
        //         apiStatus: false,
        //         data: error.message,
        //         message: "Error in Register"
        //     })
        // }
    }
}

module.exports = User