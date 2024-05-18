import rateLimit from 'express-rate-limit'
import bcrypt from 'bcrypt';
import connectToDatabase from '../db/db.js'
import { createJWT } from '../libs/Createjwt.js';
import dotenv from 'dotenv';
dotenv.config()

//validacion del correo
function isValidEmail(email){
    //expresion del correo electronico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //comprueba el formato del correo
    return emailRegex.test(email);
}

//encriptacion de la contraseña
function hashPassword(password){
    try {
        const salt = bcrypt.genSaltSync(12)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    } catch (error) {
        throw error
    }
}

export const register = async (req, res)=>{
    //obtiene los datos del usario que se registra
    const {name, email, password} = req.body

    try {
        //valida que esten todos los datos no esten null
        if(!name || !email || !password) return res.status(400).json({message: "Complete todos los campos"})
        //valida el formato del correo
        if(!isValidEmail(email)) return res.status(400).json({message: 'Formato de correo eléctronico invalido'})
        
        // Verifica si la contraseña tiene al menos 6 caracteres
        if (password.length < 6) return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });

        //conexion a la base de datos
        const db = await connectToDatabase();

        //verifica si ya existe el correo o el nombre
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ? OR name = ?", [email, name])
        if(existingUser.length > 0){
            return res.status(409).json({message: "El Correo o el Nombre del usuario ya esta registrado"})
        }

        //hashed que encripta la contraseña
        const hash = hashPassword(password)

        //insersion de los datos
        await db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hash])

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar el usuario', error);
        res.status(500).json({message: 'error al registar en el servidor al registrar el usuario'})
    }
}

//limite de inicios de sesion
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 12, // número máximo de intentos de inicio de sesión permitidos dentro del período de tiempo
    message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.'
});

export const login = async (req, res)=>{
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });

        loginLimiter(req, res, async () => {
            const db = await connectToDatabase();
            //verifica que el correo este rgistrado
            const [sql] = await db.query("SELECT * FROM users WHERE email = ?", [email])
            if(sql.length === 0) return res.status(404).json({ message: 'Correo o contraseña incorrecto'})
            //verifica si las contraseñas coinciden
            const user = sql[0];
            const passCompare = await bcrypt.compare(password, user.password)
            if(!passCompare) return res.status(404).json({message: 'Correo o contraseña incorrecto'})

            //llama la funcion para crear el token psando el parametro del usuario que inicio sesioc
            const token = await createJWT({userId: user.id})
            res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'})//Se establece una cookie httpOnly y secure, lo que ayuda a protegerla de ataques XSS y CSRF. Se especifica sameSite: 'none' para evitar que la cookie se envíe en solicitudes entre sitios.
            res.status(201).json({ token, message: 'Sesión iniciada correctamente' });
            
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
    }
}

export const getUser = async(req, res)=>{
    try {
        //trae el id del usuario del validateToken
        const userId = req.userId
        // Conectar a la base de datos
        const db = await connectToDatabase();
        // Consultar el usuario por su ID
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
        
        // Verificar si se encontró al usuario
        if (userRows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        // Extraer los datos del usuario y enviar la respuesta
        const user = userRows[0];
        res.status(200).json({ user });

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario',});
    }
}

export const logOut = async (req, res)=>{
    try {
        // Limpiar la cookie de token
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        res.status(500).json({ message: 'Error al cerrar sesión'});
    }
}