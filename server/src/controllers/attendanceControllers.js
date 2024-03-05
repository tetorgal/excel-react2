const XlsxPopulate = require("xlsx-populate");
const connection = require("./db");

exports.getAttendanceData = async (req, res) => {
  try {
    const workbook = await XlsxPopulate.fromFileAsync(
      "./formato-de-lista-de-asistencia-excel.xlsx"
    );
    const values = workbook
      .sheet("Lista de Asistencia")
      .range("A6:C20")
      .value();

    res.json(values);
  } catch (error) {
    console.error("Error al leer el archivo de Excel :/:", error);
    res.status(500).json({ error: "Error al leer el archivo de Excel" });
  }
};

exports.insertAttendanceData = async (req, res) => {
  try {
    const workbook = await XlsxPopulate.fromFileAsync(
      "./formato-de-lista-de-asistencia-excel.xlsx"
    );
    const values = workbook
      .sheet("Lista de Asistencia")
      .range("A6:C20")
      .value();

    console.log("Insertando datos de asistencia en la base de datos...");

    for (const row of values) {
      const noAsistente = row[0];
      const apellido = row[1];
      const nombre = row[2];

      const query =
        "INSERT INTO asistencias (id, apellido, nombre) VALUES (?, ?, ?)";
      await connection.query(query, [noAsistente, apellido, nombre]);
    }

    console.log("Datos insertados correctamente en la base de datos");
    res.send("Datos insertados correctamente en la base de datos");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
    res.status(500).send("Error al insertar datos en la base de datos");
  }
};

exports.getAllAttendance = async (req, res) => {
    try {
      const conn = await connection; // Espera a que se establezca la conexión
      const [rows] = await conn.query("SELECT * FROM asistencias"); // Utiliza connection.query en lugar de connection.execute
  
      res.json(rows);
    } catch (error) {
      console.error("Error al recuperar los datos de asistencia:", error);
      res.status(500).json({ error: "Error al recuperar los datos de asistencia" });
    }
  };