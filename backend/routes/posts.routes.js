import express from "express"
import { addPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/post.js"
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router()

// Configuracion para que multer guarde los archivos en un directorio
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./../frontend/public/img")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//verifica que sean iamgenes antes de guardar
function fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error("Tipo de archivo no admitido"), false); // Rechazar el archivo
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter // Agregar el filtro de archivos
});

router.get("/", getAllPost)
router.get("/:id", getPost)
router.post("/", upload.single('cover'), addPost)
router.delete("/:id", deletePost)
router.put("/:id", upload.single('cover'),updatePost)

export default router