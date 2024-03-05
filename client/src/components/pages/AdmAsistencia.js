import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between">
            <CardTitle>Lista de Asistencia</CardTitle>
            <div className="me-1">
              <Button color="success" onClick={guardarCambios} className="me-2">
                Guardar Cambios
              </Button>
              <BotonExcelDefault asistencia={asistencia} />
              <BotonExcelEstilizado asistencia={asistencia} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="scrolling">
          <Table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>No. Asistencia</th>
                <th>Nombre y Apellido</th>
                {/* Renderizar las columnas de los días de asistencia */}
                {[...Array(31).keys()].map((index) => (
                  <th key={`dia${index + 1}`}>{`Dia ${index + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asistencia.map((asistenciaItem) => {
                return (
                  <tr key={asistenciaItem.id}>
                    <td>{asistenciaItem.id}</td>
                    <td>
                      {asistenciaItem.apellido} {asistenciaItem.nombre}
                    </td>
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
