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
import DesgloseRecuperación from "../Stats/DesgloseRecuperación";

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
        <DesgloseRecuperación />

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
