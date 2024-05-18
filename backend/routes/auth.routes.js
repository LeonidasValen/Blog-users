import {Router} from "express"
import { getUser, logOut, login, register } from "../controllers/auth.js"
import { authRequiered } from "../libs/validateToken.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/getUser", authRequiered, getUser)
router.get("/logout", logOut)

export default router