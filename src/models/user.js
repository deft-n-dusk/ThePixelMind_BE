const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20,
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is not valid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("The password is not strong enough");
                }
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({firstName: 1, lastName: 1});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;


