const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a Email"],
    },

    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        unique: [true, "Email Alredy Exist"],
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"],
        select: false,
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
});
userSchema.methods.matchPassword  = async function (password){
    return await bcrypt.compare(password,this.password)
}
 userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},"gfhdhjtfhft")
 }
module.exports = mongoose.model("User", userSchema);
