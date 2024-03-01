// db.js

const mysql = require("mysql2/promise");

const connection = async () => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "excel_react"
    });
    console.log("Conexión a la base de datos establecida");
    return conn;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
};

module.exports = connection();
