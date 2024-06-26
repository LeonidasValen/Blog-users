import app from "./app.js";
import menuRouter from "../routes/menu.routes.js";
import authRouter from "../routes/auth.routes.js";
import postRouter from "../routes/posts.routes.js";

//Midlewares
app.use("/api/user", authRouter)
app.use("/api/post", postRouter)
app.use("/api/menu", menuRouter)

//obiente el port donde se ejecuta
const PORT = process.env.PORT;
//imprime en la consola si funciona el puerto y donde se esta ejecutando
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: http://localhost:${PORT}`);
});

// si funciona el backend te da una bienvenida
app.get("/", (req, res) => {
    res.json("¡Bienvenido al backend!");
});