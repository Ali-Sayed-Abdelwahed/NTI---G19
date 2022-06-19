const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.model("Users", {
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        lowerCase: true,
        match: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    gender: {
        type: String,
        trim: true,
        required: true,
        enum: ["male", "female"],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email");
        },
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value))
                throw new Error("Invalid Phone Number");
        },
    },

    createdAt: { type: Date, default: Date.now() },
    //   image: {},
});
module.exports = User
