import dotenv from "dotenv";
import { Like } from "../../models/LikeSchema.js"
import axios from "axios";

dotenv.config();

export const postLike = async (req, res) => {

    const {token, email, postID, userID} = req.body

    try {
        const response = await axios.get(process.env.TOKEN_VALIDITY_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: email }
        })
        if (response.data) {
            const newLike = await Like.create({
                postID: postID,
                userID: userID
            })
            console.log("Like posted successfully!")
            return res.status(201).json({ Message: `Like posted.`, likeID: newLike._id, postID: postID, userID: userID })
        }
        return res.status(400).json({ ERROR: `Unauthroized access denied! Invalid token.` })
    } catch (error) {
        console.error(`Error occured while posting a like. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while posting a like. ERROR: ${error}` })
    }
}