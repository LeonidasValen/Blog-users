import mysql from "mysql2/promise"

async function connectToDatabase() {
    try {
        // Se conecta a la base de datos
        const db = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DATABASE,
            connectionLimit: parseInt(process.env.DB_LIMIT)
        });
        console.log('Conexión establecida correctamente');
        return db;
    } catch (error) {
        console.error('Error al conectarse a la base de datos:', error);
        throw error;
    }
}

export default connectToDatabase;