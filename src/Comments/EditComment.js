import dotenv from "dotenv";
import { Comment } from "../../models/CommentSchema.js";
import axios from "axios";

dotenv.config();

export const editComment = async (req, res) => {

    const { token, email, postID, userID, commentID, updatedComment } = req.body

    try {
        const response = await axios.get("http://localhost:8081/gateway/check-token-validity", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: email }
        })
        if (response.data) {
            const comment = await Comment.findOne({ _id: commentID, postID: postID, userID: userID })
            if (comment) {
                comment.comment = updatedComment
                await comment.save()
                return res.status(200).json({ 
                    Message: "Comment edited successfully.",
                    newComment: updatedComment
                })
            }
            return res.status(404).json({ ERROR: "Comment not found." })
        }
        return res.status(400).json({ ERROR: `Unauthroized access denied! Invalid token.` })
    } catch (error) {
        console.error(`Error occured while posting a comment. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while posting a comment. ERROR: ${error}` })
    }
}