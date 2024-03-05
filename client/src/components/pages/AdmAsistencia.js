import React, { useEffect, useState } from "react";
import axios from "axios"; // Importar axios para hacer la solicitud HTTP
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table,
} from "reactstrap";
import BotonExcelDefault from "../Asistencia/BotonExcelDefault";
import BotonExcelEstilizado from "../Asistencia/BotonExcelEstilizado";

const AdmAsistencia = () => {
  const [asistencia, setAsistencia] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/asistencias/get-asistencias") // Hacer la solicitud HTTP usando axios
      .then((response) => {
        console.log("si obtuvo respuesta de la peticion");
        setAsistencia(response.data); // Establecer los datos de asistencia en el estado
      })
      .catch((error) => {
        alert(error);
        console.error("Error al obtener los datos de asistencia:", error);
      });
  }, []);

  return (
    <Container className="pt-5">
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between">
            <CardTitle>Lista de Asistencia</CardTitle>
            <div>
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
                <th>Dia 1</th>
                <th>Dia 2</th>
                <th>Dia 3</th>
                <th>Dia 4</th>
                <th>Dia 5</th>
                <th>Dia 6</th>
                <th>Dia 7</th>
                <th>Dia 8</th>
                <th>Dia 9</th>
                <th>Dia 10</th>
              </tr>
            </thead>
            <tbody>
              {asistencia.map((asistencia) => {
                return (
                  <tr key={asistencia.id}>
                    <td>{asistencia.id}</td>
                    <td>
                      {asistencia.apellido} {asistencia.nombre}
                    </td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
                    <td contentEditable={true}></td>
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
