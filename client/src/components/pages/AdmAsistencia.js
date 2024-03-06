import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table,
  Button,
} from "reactstrap";
import BotonExcelDefault from "../Asistencia/BotonExcelDefault";
import BotonExcelEstilizado from "../Asistencia/BotonExcelEstilizado";
import { CSVLink, CSVDownload } from "react-csv";

const AdmAsistencia = () => {
  const [asistencia, setAsistencia] = useState([]);
  const [edits, setEdits] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/asistencias/get-asistencias")
      .then((response) => {
        setAsistencia(response.data);
        toast.success("Datos de asistencia cargados exitosamente");
      })
      .catch((error) => {
        console.error("Error al obtener los datos de asistencia:", error);
        toast.error("Error al obtener los datos de asistencia");
      });
  }, []);

  const handleInputChange = (id, columna, valor) => {
    setEdits((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [columna]: valor,
      },
    }));
  };

  const guardarCambios = () => {
    const cambiosAsistencia = Object.keys(edits).map((id) => ({
      id,
      ...edits[id],
    }));

    axios
      .put("http://127.0.0.1:5000/asistencias/update-asistencias", {
        asistencia: cambiosAsistencia,
      })
      .then((response) => {
        console.log("Cambios guardados exitosamente:", response.data);
        toast.success("Cambios guardados exitosamente");
        setEdits({});
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al guardar los cambios:", error);
        toast.error("Error al guardar los cambios");
      });
  };

  const mostrarIdFila = (id) => {
    toast.info(`ID de la fila: ${id}`);
  };

  return (
    <Container className="pt-5">
      <Card className="w-full">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <CardTitle>Lista de Asistencia</CardTitle>
            <div className="me-1">
              <Button
                color="secondary"
                onClick={guardarCambios}
                className="me-2"
              >
                <FaSave /> Guardar Cambios
              </Button>
              <Button color="success" className="me-2">
                <CSVLink
                  data={asistencia}
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  filename="Asistencia.csv"
                >
                  <RiFileExcel2Fill /> Exportar
                </CSVLink>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <Table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th className="w-16">No. Asistencia</th>
                <th className="w-48">Nombre y Apellido</th>
                {/* Renderizar las columnas de los días de asistencia */}
                {[...Array(31).keys()].map((index) => (
                  <th key={`dia${index + 1}`} className="w-16">{`Dia ${
                    index + 1
                  }`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asistencia.map((asistenciaItem) => {
                return (
                  <tr key={asistenciaItem.id}>
                    <td>{asistenciaItem.id}</td>
                    <td>{`${asistenciaItem.apellido} ${asistenciaItem.nombre}`}</td>
                    {/* Renderizar las celdas editables para los días de asistencia */}
                    {[...Array(31).keys()].map((index) => (
                      <td
                        key={`dia${index + 1}`}
                        contentEditable
                        onBlur={(e) =>
                          handleInputChange(
                            asistenciaItem.id,
                            `dia${index + 1}`,
                            e.target.innerText
                          )
                        }
                        onClick={() => mostrarIdFila(asistenciaItem.id)}
                        className="w-16"
                      >
                        {asistenciaItem[`dia${index + 1}`]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdmAsistencia;
