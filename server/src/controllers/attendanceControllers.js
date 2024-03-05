const XlsxPopulate = require("xlsx-populate");
const connection = require("./db");

exports.getAttendanceData = async (req, res) => {
  try {
    const workbook = await XlsxPopulate.fromFileAsync("./asistencia.xlsx");
    const values = workbook.sheet("Lista de Asistencia").usedRange().value();

    res.json(values);
  } catch (error) {
    console.error("Error al leer el archivo de Excel:", error);
    res.status(500).json({ error: "Error al leer el archivo de Excel" });
  }
};

exports.insertAttendanceData = async (req, res) => {
  try {
    const workbook = await XlsxPopulate.fromFileAsync("./asistencia.xlsx");
    const values = workbook.sheet("Lista de Asistencia").usedRange().value();

    console.log("Insertando datos de asistencia en la base de datos...");

    for (const row of values) {
      const [noAsistente, apellido, nombre, ...dias] = row;

      const query =
        "INSERT INTO asistencias (id, apellido, nombre, dia_1, dia_2, dia_3, dia_4, dia_5, dia_6, dia_7, dia_8, dia_9, dia_10, dia_11, dia_12, dia_13, dia_14, dia_15, dia_16, dia_17, dia_18, dia_19, dia_20, dia_21, dia_22, dia_23, dia_24, dia_25, dia_26, dia_27, dia_28, dia_29, dia_30, dia_31) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      await connection.query(query, [
        noAsistente,
        apellido,
        nombre,
        ...dias.slice(0, 31), // Tomamos solo los primeros 31 días
      ]);
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
    const conn = await connection;
    const [rows] = await conn.query("SELECT * FROM asistencias");

    res.json(rows);
  } catch (error) {
    console.error("Error al recuperar los datos de asistencia:", error);
    res
      .status(500)
      .json({ error: "Error al recuperar los datos de asistencia" });
  }
};
exports.updateAttendance = async (req, res) => {
  const { asistencia } = req.body;

  try {
    console.log("Actualizando asistencia...");

    for (const item of asistencia) {
      const id = item.id;
      // delete item.id; // Elimina el campo "id" del objeto
      const query = `UPDATE asistencias SET ${Object.keys(item)
        .map((key) => `${key} = '${item[key]}'`)
        .join(", ")} WHERE id = ?`;
      await connection.query(query, [id]);
    }

    console.log("Asistencia actualizada correctamente");
    res.status(200).json({ message: "Asistencia actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
    res.status(500).json({ error: "Error al actualizar la asistencia" });
  }
};
