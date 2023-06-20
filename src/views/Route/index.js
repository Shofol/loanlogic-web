import React from "react";
import { Check, X } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";

const Route = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Ruta geográfica</CardTitle>
      </CardHeader>

      <CardBody>
        <Table responsive>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Dirección</th>
              <th>Municipio</th>
              <th>Departamento</th>
              <th>Mora</th>
              <th>Pago</th>
              <th>Incluir en la ruta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>S1034</td>
              <td>John</td>
              <td>Doe</td>
              <td>Calle de monte toro, 30</td>
              <td>Samayac</td>
              <td>Suchitepéquez</td>
              <td>Pendiente pre-validación</td>
              <td className="d-flex gap-1">
                <Button.Ripple className="btn-icon" outline color="danger">
                  <Check size={16} />
                </Button.Ripple>
                <Button.Ripple className="btn-icon" outline color="danger">
                  <X size={16} />
                </Button.Ripple>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>S1034</td>
              <td>John</td>
              <td>Doe</td>
              <td>Calle de monte toro, 30</td>
              <td>Samayac</td>
              <td>Suchitepéquez</td>
              <td>Pendiente pre-validación</td>
              <td className="d-flex gap-1">
                <Button.Ripple className="btn-icon" outline color="danger">
                  <Check size={16} />
                </Button.Ripple>
                <Button.Ripple className="btn-icon" outline color="danger">
                  <X size={16} />
                </Button.Ripple>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Route;
