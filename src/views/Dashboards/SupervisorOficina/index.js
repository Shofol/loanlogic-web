import React, { useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { ListGroup, ListGroupItem } from "reactstrap";
import PreValidaciónDirección from "../GestorDeCobros/preValidaciónDirección";
import ValidaciónCrédito from "./validaciónCrédito";
import CréditosPendienteDesembolso from "./créditosPendienteDesembolso";
import "./supervisorOficina.scss";
import MoraPorAgente from "./MoraPorAgente";
import Desembolso from "../Stats/Desembolso";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";

const SupervisorOficina = () => {
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
        <PreValidaciónDirección />
      </Card>

      <Card className="my-2 p-2">
        <ValidaciónCrédito />
      </Card>

      <Card className="my-2 p-2">
        <CréditosPendienteDesembolso />
      </Card>

      <Card className="my-2 p-2">
        <MoraPorAgente />
      </Card>
    </div>
  );
};

export default SupervisorOficina;
