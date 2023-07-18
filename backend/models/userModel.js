const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto"); // we did'nt install crypto because it is build in module
const { reset } = require("nodemon");


const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },

    email: {

        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }



    },
    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
});

//JWT Token

userSchema.methods.getJWTToken = function () {
    //we are creating json web token
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
    //if someone gets your process.env.Jwt_secret, so they can create tons of admin fake account




}
//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Reset Token

userSchema.methods.getResetPasswordToken = function () {
    // firsty we generate token

    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //Date.now() when the token gets generated

    return resetToken;


}




module.exports = mongoose.model("User", userSchema)