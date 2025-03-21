import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Like = mongoose.model("Like", likeSchema)