import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import connectToDatabase from '../db/db.js'
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
        if(!name || !email || !password){
            return res.status(400).json({error: "Complete todos los campos"})
        }
        //valida el formato del correo
        if(!isValidEmail(email)){
            return res.status(400).json({error: 'Formato de correo eléctronico invalido'})
        }
        // Verifica si la contraseña tiene al menos 6 caracteres
        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        //conexion a la base de datos
        const db = await connectToDatabase();

        //verifica si ya existe el correo o el nombre
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ? OR name = ?", [email, name])
        if(existingUser.length > 0){
            return res.status(409).json({error: "El Correo o el Nombre del usuario ya esta registrado"})
        }

        //hashed que encripta la contraseña
        const hash = hashPassword(password)

        //insersion de los datos
        await db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hash])

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar el usuario', error);
        res.status(500).json('error al registar en el servidor al registrar el usuario')
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
        if (!email || !password) {
            return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
        }

        loginLimiter(req, res, async () => {
            const db = await connectToDatabase();
            //verifica que el correo este rgistrado
            const [sql] = await db.query("SELECT * FROM users WHERE email = ?", [email])
            if(sql.length === 0){
                return res.status(404).json({ error: 'Correo o contraseña incorrecto'})
            }
            //verifica si las contraseñas coinciden
            const user = sql[0];
            const passCompare = await bcrypt.compare(password, user.password)
            if(!passCompare){
                return res.status(404).json({error: 'Correo o contraseña incorrecto'})
            }

            //genera la cookie al iniciar sesion
            const token = jwt.sign({userId: user.id}, process.env.JWT_TOKEN,{expiresIn: '1d'})
            //establece la cookie antes de enviar la respuesta JSON
            res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'})//Se establece una cookie httpOnly y secure, lo que ayuda a protegerla de ataques XSS y CSRF. Se especifica sameSite: 'none' para evitar que la cookie se envíe en solicitudes entre sitios.
            //res.cookie('token', token)
            //console.log(token)
            res.status(201).json({ token, message: 'Sesión iniciada correctamente' });
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

export const getUser = async(req, res)=>{
    try {
        // Obtener el token de la cookie o del encabezado de autorización
        let token;
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: "No estás autenticado" });
        }
        // Verificar y decodificar el token para obtener el ID de usuario
        jwt.verify(token, process.env.JWT_TOKEN, async(err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido" });
            }

            const userId = decodedToken.userId;
        
            // Conectar a la base de datos
            const db = await connectToDatabase();
            // Consultar el usuario por su ID
            const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
            
            // Verificar si se encontró al usuario
            if (userRows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Extraer los datos del usuario y enviar la respuesta
            const user = userRows[0];
            res.status(200).json({ user });
        })
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ error: 'Error al obtener usuario', message: error.message });
    }
}

export const logOut = async (req, res)=>{
    try {
        // Limpiar la cookie de token
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        res.status(500).json({ error: 'Error al cerrar sesión', message: error.message });
    }
}