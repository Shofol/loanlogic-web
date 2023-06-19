import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label
} from "reactstrap";
import AsesoresForm from "../Reportería/AsesoresForm";
import { agenciasValues } from "../../configs/data";

const GoalConfiguration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Configurar metas</CardTitle>
      </CardHeader>
      <CardBody>
        <h4>Asesores</h4>
        {agenciasValues.map((agency) => {
          return <AsesoresForm key={agency.label} name={agency.label} />;
        })}

        <h4 className="py-2">Agentes cobro</h4>

        {agenciasValues.map((agency) => {
          return <AsesoresForm key={agency.label} name={agency.label} />;
        })}
      </CardBody>
    </Card>
  );
};

export default GoalConfiguration;
