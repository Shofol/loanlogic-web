import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Table
} from "reactstrap";
import image from "../../../assets/images/portrait/small/avatar-s-11.jpg";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";

const ClientesPerfil = () => {
  let { id } = useParams();
  const { colors } = useContext(ThemeColors);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">CLIENTE</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="2">
            <p className="fw-bold fs-5">John Doe Hernández</p>
            <p className="mb-0">DPI: 123</p>
            <p>NIT: 123</p>
            <img src={image} width="200px" height="100px" className="mb-2" />
            <img src={image} width="200px" height="100px" />
          </Col>
          <Col md="6" className="px-4">
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Celular">
                  Celular
                </Label>
                <Input
                  type="text"
                  name="Celular"
                  id="Celular"
                  placeholder="Celular"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Email">
                  Email
                </Label>
                <Input
                  type="text"
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Dirección de residencia*">
                  Dirección de residencia*
                </Label>
                <Input
                  type="text"
                  name="Dirección de residencia*"
                  id="Dirección de residencia*"
                  placeholder="Dirección de residencia*"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Municipio de residencia*">
                  Municipio de residencia*
                </Label>
                <Input
                  type="text"
                  name="Municipio de residencia*"
                  id="Municipio de residencia*"
                  placeholder="Municipio de residencia*"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Departamento">
                  Departamento
                </Label>
                <Input
                  type="text"
                  name="Departamento"
                  id="Departamento"
                  placeholder="Departamento"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Fecha de nacimiento*">
                  Fecha de nacimiento*
                </Label>
                <Input
                  type="text"
                  name="Fecha de nacimiento*"
                  id="Fecha de nacimiento*"
                  placeholder="Fecha de nacimiento*"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Nacionalidad">
                  Nacionalidad
                </Label>
                <Input
                  type="text"
                  name="Nacionalidad"
                  id="Nacionalidad"
                  placeholder="Nacionalidad"
                  // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Sexo">
                  Sexo
                </Label>
                <Input
                  type="text"
                  name="Sexo"
                  id="Sexo"
                  placeholder="Sexo"
                  // tag={Field}
                />
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <div className="border rounded">
              <OverviewCircle
                data={{ completed: 80, inProgress: 20 }}
                title="Salud crediticia"
                text="Credit score"
                height="150"
                fontSize="2rem"
                fixedHeight={false}
                color={colors.success.main}
                bottom={20}
              />
            </div>
            <Row className="mt-2 px-md-1">
              <Col
                md="4"
                className="d-flex flex-column justify-content-end bg-primary-subtle"
              >
                <p className="fw-bold">Número de atrasos</p>
                <p className="fs-3 fw-bold">2</p>
              </Col>
              <Col
                md="4"
                className="d-flex flex-column justify-content-end bg-secondary-subtle pt-1"
              >
                <p className="fw-bold">Más de 3 días consecutivos sin pagar</p>
                <p className="fs-3 fw-bold">2</p>
              </Col>
              <Col
                md="4"
                className="d-flex flex-column justify-content-end border bg-info-subtle "
              >
                <p className="fw-bold">SEMÁFORO</p>
                <p className="fs-3 fw-bold">F</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Input
          type="textarea"
          className="my-2"
          placeholder="Personal Comments"
        ></Input>

        <h4>Historial</h4>
        <Table className="mt-2">
          <thead>
            <tr>
              <th>No.</th>
              <th>Cliente</th>
              <th>Fecha Solicitud</th>
              <th>Solicitud</th>
              <th>Estado Solicitud</th>
              <th>Crédito</th>
              <th>Estado Crédito</th>
              <th>Devolución %</th>
              <th>Núm Retrasos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Q 950</td>
              <td>1</td>
              <td>John Doe</td>
              <td>Q 950</td>
              <td>John Doe</td>
              <td>Q 950</td>
              <td>Q 950</td>
            </tr>
          </tbody>
          {/* <tfoot>
            <tr>
              <th colSpan={2}>Total</th>
              <td>1000</td>
              <td>1000</td>
              <td>1000</td>

              <td>1000</td>
            </tr>
          </tfoot> */}
        </Table>
      </CardBody>
    </Card>
  );
};

export default ClientesPerfil;
