import React, { useContext } from "react";
import { Card, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";
import DesgloseRecuperación from "../Stats/DesgloseRecuperación";
import ValidaciónCréditosMontosElevados from "../Secciones/validaciónCréditosMontosElevados";
import MoraPorAgente from "../Stats/MoraPorAgente";

const JefeComercial = () => {
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
        <ValidaciónCréditosMontosElevados />
      </Card>

      <Card className="my-2 p-2">
        <MoraPorAgente />
      </Card>

    </div>
  );
};

export default JefeComercial;