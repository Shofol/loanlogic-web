import React, { useContext } from "react";
import { Card, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import PreValidaciónDirección from "../Secciones/preValidaciónDirección";
import ValidaciónCrédito from "../Secciones/validaciónCrédito";
import CréditosPendienteDesembolso from "../Secciones/créditosPendienteDesembolso";
import AsignarAgente from "../Secciones/asignarAgente";
import "./supervisorSucursal.scss";
import MoraPorAgente from "../Stats/MoraPorAgente";
import Desembolso from "../Stats/Desembolso";
import Recuperación from "../Stats/Recuperación";
import MoraStat from "../Stats/Mora";
import Colocacion from "../Stats/Colocacion";
import DesgloseRecuperación from "../Stats/DesgloseRecuperación";
import RecuperaciónDiaria from "../Secciones/recuperaciónDiaria";

const SupervisorSucursal = () => {
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
          <DesgloseRecuperación />
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
        <RecuperaciónDiaria />
      </Card>

      <Card className="my-2 p-2">
        <AsignarAgente />
      </Card>

      <Card className="my-2 p-2">
        <MoraPorAgente />
      </Card>

    </div>
  );
};

export default SupervisorSucursal;
