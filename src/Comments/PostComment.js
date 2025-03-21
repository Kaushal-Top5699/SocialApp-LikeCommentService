import dotenv from "dotenv";
import { Comment } from "../../models/CommentSchema.js";
import axios from "axios";

dotenv.config();

export const postComment = async (req, res) => {
    
    const { token, email, commentTxt, postID, userID } = req.body

    try {
        const response = await axios.get("http://localhost:8081/gateway/check-token-validity", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: email }
        })
        if (response.data) {
            const currentTime = new Date()
            const options = {
                year: 'numeric',
                month: 'short',  // 'Mar'
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }
            const formattedDateTime = currentTime.toLocaleString('en-US', options).replace(',', '');
            const newComment = await Comment.create({
                time: formattedDateTime,
                comment: commentTxt,
                postID: postID,
                userID: userID
            })
            return res.status(201).json({ 
                Message: "Comment posted.", 
                postedAt: newComment.time,
                postedBy: newComment.userID,
                postedFor: newComment.postID,
                comment: newComment.comment
            })
        }
        return res.status(400).json({ ERROR: `Unauthroized access denied! Invalid token.` })
    } catch (error) {
        console.error(`Error occured while posting a comment. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while posting a comment. ERROR: ${error}` })
    }
}