const XlsxPopulate = require("xlsx-populate");
const connection = require("./db");
const exceljs = require("exceljs");

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
  const conn = await connection;

  try {
    console.log("Actualizando asistencia...");

    for (const item of asistencia) {
      const id = item.id;
      // delete item.id; // Elimina el campo "id" del objeto
      const query = `UPDATE asistencias SET ${Object.keys(item)
        .filter((key) => key !== "id") // Excluir el campo "id" de la actualización
        .map((key) => `${key} = '${item[key]}'`)
        .join(", ")} WHERE id = ?`;
      await conn.query(query, [id]);
    }

    console.log("Asistencia actualizada correctamente");
    res.status(200).json({ message: "Asistencia actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
    res.status(500).json({ error: "Error al actualizar la asistencia" });
  }
};

exports.exportToExcel = async (req, res) => {
  const { asistencia } = req.body;

  try {
    // Crear un nuevo libro de Excel
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Asistencia");

    // Definir las columnas en la hoja de cálculo
    const columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Apellido", key: "apellido", width: 20 },
      { header: "Nombre", key: "nombre", width: 20 },
    ];

    for (let i = 1; i <= 31; i++) {
      const dayColumn = { header: `Día ${i}`, key: `dia${i}`, width: 10 };
      columns.push(dayColumn);
    }

    worksheet.columns = columns;

    // Agregar los datos de asistencia a la hoja de cálculo
    asistencia.forEach((asistenciaItem) => {
      const rowData = {
        id: asistenciaItem.id,
        apellido: asistenciaItem.apellido,
        nombre: asistenciaItem.nombre,
        ...asistenciaItem, // Esto añade los datos de los días directamente al objeto de fila (asumiendo que asistenciaItem ya tiene las claves "dia1", "dia2", ..., "dia31")
      };
      worksheet.addRow(rowData);
    });

    // Configurar el tipo de contenido de la respuesta HTTP como un archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=asistencia.xlsx"
    );

    // Escribir el libro de Excel en la respuesta HTTP
    await workbook.xlsx.write(res);

    console.log("Exportación a Excel completada");
  } catch (error) {
    console.error("Error al exportar a Excel:", error);
    res.status(500).json({ error: "Error al exportar a Excel" });
  }
};
