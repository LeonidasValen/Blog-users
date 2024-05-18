import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from 'cors'
import cookieParcer from 'cookie-parser'

dotenv.config()

const app = express()

//limita las autorizaciones  al servidor
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:4173'],// URL de las paginas que pueda hacer operaciones 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limita los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Limita los encabezados permitidos
    credentials: true, // Habilita el uso de credenciales (cookies, encabezados de autorización, etc.)
};
app.use(cors(corsOptions));
app.use(cookieParcer());//habilita el uso de cookies para su guardado
app.use(morgan('dev'));//hace un registro de todas las solicitudes del servidor
app.use(express.json());

export default app