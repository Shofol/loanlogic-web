import React, { useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { ListGroup, ListGroupItem } from "reactstrap";
import RecuperaciónDiaria from "./recuperaciónDiaria";
import FotoGarantía from "./fotoGarantía";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";

const GestorComercial = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div>
      <Row>
        <Col lg="3" md="6" xs="12">
          <MoraStat height={"200"} />
        </Col>

        <Col lg="3" md="6" xs="12">
          <Colocacion height={"200"} />
        </Col>

        <Col lg="3" md="6" xs="12">
          <Recuperación height={"200"} />
        </Col>

        <Col>
          <Card className="h-100">
            <CardTitle className="mb-0 p-1 fs-5">
              DESGLOSE RECUPERACIÓN
            </CardTitle>
            <ListGroup className="fs-6 px-1">
              <ListGroupItem>Ingresos recuperación: 850Q</ListGroupItem>
              <ListGroupItem>Ingresos por papelería: 300 Q</ListGroupItem>
              <ListGroupItem>Ingresos por asistencias: 50Q</ListGroupItem>
              <ListGroupItem>
                Ingresos por adelantos: (voluntario) 300Q
              </ListGroupItem>
              <ListGroupItem>
                Ingresos por anticipios: (días corridos) 200Q
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Card className="my-2 p-2">
        <RecuperaciónDiaria />
      </Card>

      <Card className="my-2 p-2">
        <FotoGarantía />
      </Card>
    </div>
  );
};

export default GestorComercial;
