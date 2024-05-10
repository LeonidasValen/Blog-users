import express from "express"
import { getUser, logOut, login, register } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/getUser", getUser)
router.get("/logout", logOut)

export default router