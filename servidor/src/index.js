/* Importamos bibliotecas */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

/* Rutas */
import addRouter from "./routes/add.routes.js";
import registroRouter from "./routes/registros.routes.js";
import entregadoRouter from "./routes/entregado.routes.js";
import obtenerRouter from "./routes/obtener.routes.js";
import busquedaRouter from "./routes/busqueda.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express(); // Inicializamos Express
const port = 5300; // Puerto

const corsOptions = {
  origin: (origin, callback) => {
    // ✅ Permitir cualquier origen o solicitudes sin origen (como Postman)
    if (!origin || origin.includes('https')) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true, // Permitir cookies y credenciales
};

/* Hacemos que sea JSON la respuesta y que pueda acceder el frontend al backend */
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

/* Rutas */
app.use("/api/add", addRouter);
app.use("/api/get", obtenerRouter);
app.use("/api/registros", registroRouter);
app.use("/api/entregados", entregadoRouter);
app.use("/api/busqueda", busquedaRouter);
app.use("/api/auth", authRouter);

/* Otras rutas que no sean las antes dichas */
app.use("*", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on: " + port);
});
