import connectToDatabase from "../db/db.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import fs from "fs";
dotenv.config()


export const getAllPost = async (req, res) => {
    try {
        // Verificar si se proporciona un parámetro de consulta 'cat'
        const category = req.query.cat;
        
        // Construir la consulta SQL según si se proporciona el parámetro 'cat'
        let sql = "SELECT * FROM posts";
        let params = [];

        if (category) {
            sql += " WHERE cat=?";
            params.push(category);
        }

        // Establecer la conexión a la base de datos
        const db = await connectToDatabase();

        // Ejecutar la consulta SQL
        const [results] = await db.query(sql, params);

        if (results.length === 0) {
            return res.status(204).json({ message: "No hay contenido para mostrar" });
        }

        // Enviar los resultados como una respuesta JSON
        return res.status(200).json(results);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPost = async (req,res)=>{
    try {
        const postId = req.params.id;
        const sql = "SELECT po.id, name, title, descrip, uid, po.img, us.profile AS userImg, date, cat FROM users us JOIN posts po ON us.id=po.uid WHERE po.id = ?";
        
        const db = await connectToDatabase();
        const [results] = await db.query(sql, postId);
        if (results.length === 0) {
            return res.status(404).json({ message: "No se encontro el post" });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const addPost = async (req,res)=>{
    try {

        const db = await connectToDatabase();
        //console.log(userInfo)
        const { title, descrip, cat, date } = req.body;
        let cover = null;
        if (req.file) {
            cover = req.file.filename;
        }else{
            return res.status(400).json({ message: "la imagen es invalida" });
        }
        if (!title || !descrip || !cat || !cover || !date) {
            return res.status(400).json({ message: "Se requieren todos los campos" });
        }
        
        const sql = await db.query("INSERT INTO posts(title, `descrip`, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)", [title, descrip, cover, cat, date, userInfo.userId]);
        return res.status(200).json({ message: "Publicación creada exitosamente" });

    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deletePost =  async (req,res)=>{
    try {
            const postId = req.params.id
            const db = await connectToDatabase();
            //console.log(userInfo)

            //verifica que exista el post
            const [existingPost] = await db.query("SELECT id FROM posts WHERE id = ?", [postId]);
            if (existingPost.length === 0) return res.status(404).json("El post no existe");
            
            //borra el post
            const [result] = await db.query("DELETE FROM posts WHERE id = ? AND uid = ?", [postId, userInfo.userId]);
            if (result.affectedRows === 0) return res.status(500).json("Error interno al borrar");
            
            return res.status(200).json({message: "borrado exitosamente"});
    } catch (error) {
        console.error("Error al borrar el post:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updatePost = async(req,res)=>{
    try {

        const { title, descrip, cat, date } = req.body;
        // Verificar si se adjuntó una nueva imagen
        let cover = null;
        if (req.file) {
            cover = req.file.filename;
        }
        if (!title || !descrip || !cat || !date) {
            return res.status(400).json({ message: "Se requieren todos los campos" });
        }

        const postId = req.params.id
        const db = await connectToDatabase();

        if (cover) {
            const sql = await db.query("UPDATE posts SET title = ?, descrip = ?, img = ?, cat = ?, date = ? WHERE id = ? AND uid = ?", [title, descrip, cover, cat, date, postId, userInfo.userId]);
        } else {
            const sql = await db.query("UPDATE posts SET title = ?, descrip = ?, cat = ?, date = ? WHERE id = ? AND uid = ?", [title, descrip, cat, date, postId, userInfo.userId]);
        }
        // console.log(postId)
        // console.log(title, descrip, cat, date, cover)
        return res.status(200).json({ message: "Publicación actualizada exitosamente" });
        
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}