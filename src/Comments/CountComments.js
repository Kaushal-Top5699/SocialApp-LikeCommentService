import dotenv from "dotenv";
import { Comment } from "../../models/CommentSchema.js";
import mongoose from "mongoose";

dotenv.config();

export const countComments = async (req, res) => {
    const postID = req.headers["postid"]
    console.log(postID)

    try {
        if (postID !== "") {
            const allComments = await Comment.find({ postID: new mongoose.Types.ObjectId(postID) })
            console.log(allComments)
            if (allComments.length > 0) {
                const totalComments = allComments.length
                return res.status(200).json({ 
                    message: `Total comment for postID: ${postID} found.`,
                    totalComments: totalComments,
                    everyComment: allComments
                 })
            }
            return res.status(200).json({
                message: `Total likes for postID: ${postID} are 0.`,
                totalComments: 0,
                everyComment: null
            })
        }
        return res.status(400).json({ message: "Bad Request! Post ID null or empty." })
    } catch (error) {
        console.error(`Error occured while counting a likes. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while counting a likes. ERROR: ${error}` })
    }
}