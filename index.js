import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connectDB } from './src/DB/db.js'
import { postLike } from './src/Likes/PostLike.js'
import { deleteLike } from './src/Likes/DeleteLike.js'
import { likesCount } from './src/Likes/LikesCount.js'
import { postComment } from './src/Comments/PostComment.js'
import { editComment } from './src/Comments/EditComment.js'
import { countComments } from './src/Comments/CountComments.js'
import { deleteComment } from './src/Comments/DeleteComment.js'

const app = express()
const PORT = 8083

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB()

/* LIKE ROUTES START */
app.post("/post-like", postLike)
app.post("/delete-like", deleteLike)
app.get("/likes-count", likesCount)
/* LIKE ROUTES START */

/* COMMENT ROUTES START */
app.post("/post-comment", postComment)
app.post("/edit-comment", editComment)
app.get("/count-comments", countComments)
app.post("/delete-comment", deleteComment)

app.listen(PORT, () => {
    console.log("--------------------------------------------")
    console.log(`Like/Comment service active on PORT: ${PORT}`)
})