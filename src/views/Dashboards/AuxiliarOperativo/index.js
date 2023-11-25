import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";
import DesgloseRecuperación from "../Stats/DesgloseRecuperación";

const AuxiliarOperativo = () => {
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

    </div>
  );
};

export default AuxiliarOperativo;
