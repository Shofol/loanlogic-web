import React, { useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { ListGroup, ListGroupItem } from "reactstrap";
import RecuperaciónDiaria from "./recuperaciónDiaria";
import FotoGarantía from "./fotoGarantía";

const GestorComercial = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div>
      <Row>
        <Col lg="3" md="6" xs="12">
          <OverviewCircle
            data={{ completed: 80, inProgress: 20 }}
            title="MORA"
            text="24.000 Q / 200.000 Q"
            height="200"
            color={colors.primary.main}
          />
        </Col>

        <Col lg="3" md="6" xs="12">
          <OverviewCircle
            data={{ completed: 80, inProgress: 20 }}
            title="COLOCACIÓN"
            text="24.000 Q / 200.000 Q"
            height="200"
            color={colors.info.main}
          />
        </Col>

        <Col lg="3" md="6" xs="12">
          <OverviewCircle
            data={{ completed: 80, inProgress: 20 }}
            title="RECUPERACIÓN"
            subTitle="(sin incluir avances)"
            text="24.000 Q / 200.000 Q"
            height="200"
            color={colors.warning.main}
          />
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
