import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container, Table } from "reactstrap";
import BotonExcelDefault from "./Asistencia/BotonExcelDefault";
import BotonExcelEstilizado from "./Asistencia/BotonExcelEstilizado";

const AdmAsistencia = () => {
  const [asistencia, setAsistencia] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/asistencias/datos-asistencias")
      .then((res) => res.json())
      .then((json) => {
        let listaAsistencia = json.products.map((data) => {
          return {
            no_asistencia: data.asistencia,
            nombre: data.nombre,
            uno: data.uno,
            dos: data.dos,
            tres: data.tres,
            cuatro: data.cuatro,
            cinco: data.cinco,
            seis: data.seis,
            siete: data.siete,
            ocho: data.ocho,
            nueve: data.nueve,
            diez: data.diez,
            once: data.once,
            doce: data.doce,
            trece: data.trece,
            catorce: data.catorce,
            quince: data.quince,
          };
        });
        setAsistencia(listaAsistencia);
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
              <BotonExcelEstilizado qsistencia={asistencia} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="scrolling">
          <Table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>No. Asistencia</th>
                <th>Nombre</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
              </tr>
            </thead>
            <tbody>
              {asistencia.map((asistencia) => {
                return (
                  <tr key={asistencia.id}>
                    <td>{asistencia.id}</td>
                    <td>{asistencia.nombre}</td>
                    <td>{asistencia.uno}</td>
                    <td>{asistencia.dos}</td>
                    <td>{asistencia.tres}</td>
                    <td>{asistencia.cuatro}</td>
                    <td>{asistencia.cinco}</td>
                    <td>{asistencia.seis}</td>
                    <td>{asistencia.siete}</td>
                    <td>{asistencia.ocho}</td>
                    <td>{asistencia.nueve}</td>
                    <td>{asistencia.diez}</td>
                    <td>{asistencia.once}</td>
                    <td>{asistencia.doce}</td>
                    <td>{asistencia.trece}</td>
                    <td>{asistencia.catorce}</td>
                    <td>{asistencia.quince}</td>
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
