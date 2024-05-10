import express from "express"
import { getPostsMenu } from "../controllers/menu.js"

const router = express.Router()

router.get("/", getPostsMenu)

export default router