import React, { useState } from "react";
import ReactSlider from "react-slider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import "./Créditos.scss";
import { ArrowLeft, ArrowRight, Info } from "react-feather";

const Referencias = ({ stepper }) => {
  const onSubmit = () => {
    stepper.next();
  };

  const [referenciasPersonales, setReferenciasPersonales] = useState([1, 2]);
  const [referenciasFamiliares, setReferenciasFamiliares] = useState([1, 2]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">
          Referencias familiares (que no vivan con usted)
        </CardTitle>
      </CardHeader>
      <CardBody>
        {referenciasFamiliares.map((ref) => {
          return (
            <Row key={ref}>
              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Nombre y apellidos*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Nombre y apellidos"
                />
              </Col>

              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Parentesco*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Parentesco"
                />
              </Col>

              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Teléfono trabajo*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Teléfono trabajo"
                />
              </Col>

              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Celular*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Celular"
                />
              </Col>
            </Row>
          );
        })}

        <CardTitle tag="h4" className="mt-2">
          Referencias personales (que no sean familiares)
        </CardTitle>
        {referenciasPersonales.map((ref) => {
          return (
            <Row key={ref}>
              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Nombre y apellidos*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Nombre y apellidos"
                />
              </Col>

              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Parentesco*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Parentesco"
                />
              </Col>

              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Teléfono trabajo*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Teléfono trabajo"
                />
              </Col>
              <Col sm="3" className="mt-1">
                <Label className="form-label" for="assistance_expenses">
                  Celular*
                </Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Celular"
                />
              </Col>
            </Row>
          );
        })}

        <div className="d-flex justify-content-end mt-2">
          <Button
            color="secondary"
            className="btn-prev me-1"
            outline
            onClick={() => {
              stepper.previous();
            }}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button
            type="submit"
            color="primary"
            className="btn-next"
            onClick={onSubmit}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Submit
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </CardBody>
    </div>
  );
};

export default Referencias;
