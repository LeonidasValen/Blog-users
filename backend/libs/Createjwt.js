import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function createJWT(payload){
    //new promise es una promesa async que devuelve resolve(puede ir bien), reject(puede ir mal)
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            process.env.JWT_TOKEN,
            {
                expiresIn: "1d",
            },
            (err, token)=>{
                if(err)reject(err)
                    resolve(token)
            }
        )
    })
}