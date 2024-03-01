import React, {useState } from 'react';
import {Button, Spinner} from 'reactstrap';
import * as XLSX from 'xlsx';


const BotonExcelEstilizado = ({asistencia}) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Lista de Asistencia"}, {}];

  const longitudes = [5, 35, 25, 20, 10, 10, 10];
  
  const handleDownload = () => {
    setLoading(true);

    let tabla = [
        {
            A: "No.de asistentes",
            B: "Nombre y Apellido (s)",
            C: "1",
            D: "2",
            E: "3",
            F: "4",
            G: "5",
            H: "6",
            I: "7",
            J: "8",
            K: "9",
            L: "10",
            M: "11",
            N: "12",
            Ñ: "13",
            O: "14",
            P: "15",

        },
    ];

    asistencia.forEach((asistencia) =>{
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
           M: asistencia.once,
           N: asistencia.doce,
           Ñ: asistencia.trece,
           O: asistencia.catorce,
           P: asistencia.quince,
        });
    });

    const dataFinal = [...titulo, ...tabla];

    setTimeout(() => {
        creandoArchivo(dataFinal);
        setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book.new()

    const hoja = XLSX.utils.json_to_sheet(dataFinal, {skipHeader: true});

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


export default BotonExcelEstilizado