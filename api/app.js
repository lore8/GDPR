const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const openaiService = require("./services/openai");

dotenv.config();
const connectDB = require("./config/database");

// Conectar a la base de datos
connectDB();

app.use(
  cors({
    origin: "http://192.168.10.137", // Reemplaza con la URL de tu frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api", require("./routes/auditRoutes"));
app.use("/api", require("./routes/formRoutes"));
app.use("/api", require("./routes/questionsRoutes"));

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).send("Página no encontrada");
});

module.exports = app;
