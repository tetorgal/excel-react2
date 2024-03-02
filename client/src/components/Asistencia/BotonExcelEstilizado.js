import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import * as XLSX from "xlsx";

const BotonExcelEstilizado = ({ asistencia }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Lista de Asistencia" }, {}];

  const longitudes = [5, 35, 25, 20, 10, 10, 10];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: "No.de asistentes",
        B: "Nombre y Apellido",
        C: "Dia 1",
        D: "Dia 2",
        E: "Dia 3",
        F: "Dia 4",
        G: "Dia 5",
        H: "Dia 6",
        I: "Dia 7",
        J: "Dia 8",
        K: "Dia 9",
        L: "Dia 10",
      },
    ];

    asistencia.forEach((asistencia) => {
      tabla.push({
        A: asistencia.id,
        B: asistencia.nombre,
        C: asistencia.uno,
        D: asistencia.dos,
        E: asistencia.tres,
        F: asistencia.cuatro,
        G: asistencia.cinco,
        H: asistencia.seis,
        I: asistencia.siete,
        J: asistencia.ocho,
        K: asistencia.nueve,
        L: asistencia.diez,
      });
    });

    const dataFinal = [...titulo, ...tabla];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book.new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:G1"),
      XLSX.utils.decode_range("A2:G2"),
      XLSX.utils.decode_range("A34:G34"),
    ];

    let propiedades = [];

    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "Asistencia");

    XLSX.writeFile(libro, "AsistenciaEstilizado.xlsx");
  };
  return (
    <>
      {!loading ? (
        <Button color="success" onClick={handleDownload}>
          Excel Estilizado
        </Button>
      ) : (
        <Button color="success" disabled>
          <Spinner size="sm">Cargando...</Spinner>
          <span>Generando...</span>
        </Button>
      )}
    </>
  );
};

export default BotonExcelEstilizado;
