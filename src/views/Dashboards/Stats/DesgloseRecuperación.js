import React, { useEffect, useState, useContext } from "react";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";
import { Card, CardTitle, Col, Row, ListGroup, ListGroupItem } from "reactstrap";


const Recuperación = ({ height, fontSize, smallTitle = false }) => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  //const [completedResult, setCompletedResult] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/debt_collection_breakdown`);
    setData(response.data.data);
  };

  return (
    <>
      <Card className="h-100">
        <CardTitle className="mb-0 p-1 fs-5">
          DESGLOSE RECUPERACIÓN
        </CardTitle>
        <ListGroup className="fs-6 px-1">
          <ListGroupItem>Ingresos recuperación: {data?.collected} Q</ListGroupItem>
          <ListGroupItem>Ingresos por papelería: {data?.administrative} Q</ListGroupItem>
          <ListGroupItem>Ingresos por asistencias: {data?.assistance} Q</ListGroupItem>
          <ListGroupItem>
            Ingresos por adelantos: (voluntario) {data?.advanced} Q
          </ListGroupItem>
          <ListGroupItem>
            Ingresos por anticipios: (días corridos) {data?.holidays} Q
          </ListGroupItem>
          <ListGroupItem><strong>
            Ingresos recuperación TOTAL: {data?.total_collected} Q
            </strong>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
};

export default Recuperación;
