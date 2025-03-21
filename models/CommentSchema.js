import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    time: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
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

export const Comment = mongoose.model("Comment", commentSchema)