import dotenv from "dotenv";
import { Like } from "../../models/LikeSchema.js"
import mongoose from "mongoose";

dotenv.config();

export const likesCount = async (req, res) => {
    const postID = req.headers["postid"]
    console.log(postID)
    try {
        if (postID !== "") {
            const allLikes = await Like.find({ postID: new mongoose.Types.ObjectId(postID) })
            console.log(allLikes)
            if (allLikes.length > 0) {
                const totalLikes = allLikes.length
                const message = `Total likes for postID: ${postID} found.`
                console.log("Total likes: ", totalLikes)
                console.log(message)
                return res.status(200).json({ 
                    message: message,
                    totalLikes: totalLikes,
                    everyLike: allLikes
                })
            }
            return res.status(200).json({
                message: `Total likes for postID: ${postID} are 0.`,
                totalLikes: 0,
                everyLike: null
            })
        }
        return res.status(400).json({ Message: "Bad Request! Post ID null or empty." })

    } catch (error) {
        console.error(`Error occured while counting a likes. ERROR: ${error}`)
        return res.status(500).json({ ERROR: `Error occured while counting a likes. ERROR: ${error}` })
    }
}