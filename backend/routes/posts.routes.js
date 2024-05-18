import {Router} from "express"
import { addPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/post.js"
import { upload } from "../libs/multerValidate.js"
import { authRequiered } from "../libs/validateToken.js"

const router = Router()

router.get("/", getAllPost)
router.get("/:id", getPost)
router.post("/", authRequiered, upload.single('cover'), addPost)
router.delete("/:id", authRequiered, deletePost)
router.put("/:id", authRequiered, upload.single('cover'),updatePost)

export default router