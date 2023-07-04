import React, { useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { ListGroup, ListGroupItem } from "reactstrap";
import ValidaciónDatos from "./validaciónDatos";
import ValidaciónCrédito from "./validaciónCrédito";
import CréditosPendienteDesembolso from "./créditosPendienteDesembolso";
import "./asistenteAdministrativo.scss";
import MoraPorAgente from "./MoraPorAgente";
import Desembolso from "../Stats/Desembolso";
import Recuperación from "../Stats/Recuperación";

const AsistenteAdministrativo = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div>
      <Row>
        <Col lg="2" md="6" xs="12" className="statColumn">
          <OverviewCircle
            data={{ completed: 80, inProgress: 20 }}
            title="MORA"
            text="24.000 Q / 200.000 Q"
            height="150"
            fontSize="2rem"
            smallTitle={true}
            color={colors.primary.main}
          />
        </Col>

        <Col lg="2" md="6" xs="12" className="statColumn">
          <OverviewCircle
            data={{ completed: 80, inProgress: 20 }}
            title="COLOCACIÓN"
            text="24.000 Q / 200.000 Q"
            height="150"
            fontSize="2rem"
            smallTitle={true}
            color={colors.info.main}
          />
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
        <ValidaciónDatos />
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

export default AsistenteAdministrativo;
