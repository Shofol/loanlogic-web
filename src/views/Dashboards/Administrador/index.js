import React, { useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { ListGroup, ListGroupItem } from "reactstrap";
import ValidaciónCréditosMontosElevados from "./validaciónCréditosMontosElevados";
import "./asistenteAdministrativo.scss";
import MoraPorAgente from "../Stats/MoraPorAgente";
import Desembolso from "../Stats/Desembolso";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";
import DesgloseRecuperación from "../Stats/DesgloseRecuperación";
import PreValidacionEdad from "./validacionEdad";

const AsistenteAdministrativo = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div>
      <Row>
        <Col lg="2" md="6" xs="12" className="statColumn">
          <MoraStat height={"150"} fontSize={"2rem"} smallTitle={true} />
        </Col>

        <Col lg="2" md="6" xs="12" className="statColumn">
          <Colocacion height={"150"} fontSize={"2rem"} smallTitle={true} />
        </Col>

        <Col lg="2" md="6" xs="12" className="statColumn">
          <Desembolso />
        </Col>

        <Col lg="2" md="6" xs="12" className="statColumn">
          <Recuperación height={"150"} fontSize={"2rem"} smallTitle={true} />
        </Col>

        <Col className="statColumn">
          <DesgloseRecuperación/>
        </Col>
      </Row>
      
      <Card className="my-2 p-2">
        <ValidaciónCréditosMontosElevados />
      </Card>
  
      <Card className="my-2 p-2">
        <PreValidacionEdad />
      </Card>


      <Card className="my-2 p-2">
        <MoraPorAgente />
      </Card>
    </div>
  );
};

export default AsistenteAdministrativo;
