import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { agenciasValues } from "../../configs/data";

const CarteraPorAsesor = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Cartera</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Agencias</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name="colors"
              options={agenciasValues}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>

          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Gestor</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name="colors"
              options={agenciasValues}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>
        </Row>

        <h4>Cartera actual</h4>
      </CardBody>
    </Card>
  );
};

export default CarteraPorAsesor;
