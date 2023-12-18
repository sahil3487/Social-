const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const postSchema = new mongoose.Schema({
    caption: String,

    imageUrl: {
        public_id: String,
        url: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            Comment: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Post", postSchema);
