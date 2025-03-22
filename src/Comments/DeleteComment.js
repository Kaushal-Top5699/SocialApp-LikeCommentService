import dotenv from "dotenv";
import { Comment } from "../../models/CommentSchema.js";
import axios from "axios";

dotenv.config();

export const deleteComment = async (req, res) => {
    
    const { token, email, commentID } = req.body
    
    try {
        const response = await axios.get(process.env.TOKEN_VALIDITY_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: email }
        })
        if (response.data) {
            const deletedComment = await Comment.findByIdAndDelete(commentID)
            if (!deleteComment) return res.status(404).json({ ERROR: "Comment not found!" });
            return res.status(200).json({ Message: "Comment removed successfully!" });
        }
        return res.status(400).json({ ERROR: `Unauthroized access denied! Invalid token.` })
    } catch (error) {
        console.error(`Error occured while deleting a like. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while deleting a like. ERROR: ${error}` })
    }
}