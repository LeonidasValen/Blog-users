import connectToDatabase from "../db/db.js";

export const getPostsMenu = async (req, res) => {
    try {
        const postId = req.query.exclude; // Obtener el ID del post de los parámetros de la ruta
        const limit = 4;
        const category = req.query.cat;

        console.log(postId, category)
        
        // Construir la consulta SQL según si se proporciona el parámetro 'cat'
        let sql = "SELECT * FROM posts";
        let params = [];

        if (category) {
            sql += " WHERE cat=? AND id != ? LIMIT ?";
            params.push(category, postId, limit);
        }else{
            return res.status(204).json({ message: "No hay contenido para mostrar" });
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