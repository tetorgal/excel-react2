const express = require("express");
const app = express();
const attendanceRoutes = require("./routes/attendanceRoutes");

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
// Middleware para permitir CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir solicitudes desde cualquier origen
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS" // Métodos HTTP permitidos
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" // Encabezados permitidos en las solicitudes
  );
  next();
});

// Middleware para manejar las rutas relacionadas con las asistencias
app.use("/asistencias", attendanceRoutes);

// Puerto en el que escuchará el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
