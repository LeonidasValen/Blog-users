import multer from "multer";
import path from "path";

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

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter // Agregar el filtro de archivos
});