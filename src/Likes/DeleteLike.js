import dotenv from "dotenv";
import { Like } from "../../models/LikeSchema.js"
import axios from "axios";

dotenv.config();

export const deleteLike = async (req, res) => {
    
    const {token, email, likeID} = req.body

    try {
        const response = await axios.get(process.env.TOKEN_VALIDITY_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: email }
        })
        if (response.data) {
            const deleteLike = await Like.findByIdAndDelete(likeID)
            if (!deleteLike) return res.status(404).json({ ERROR: "Like not found!" });
            return res.status(200).json({ Message: "Like removed successfully!" });
        }
        return res.status(400).json({ ERROR: `Unauthroized access denied! Invalid token.` })
    } catch (error) {
        console.error(`Error occured while deleting a like. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while deleting a like. ERROR: ${error}` })
    }
}