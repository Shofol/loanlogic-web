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
import Select from "react-select";
import { selectThemeColors } from "@utils";
import image from "../../assets/images/portrait/small/avatar-s-11.jpg";

const Asalariado = ({ stepper }) => {
  const onSubmit = () => {
    stepper.next();
  };

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Asalariado</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Nombre de la empresa*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Nombre de la empresa"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Fecha de ingreo*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Fecha de ingreo"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Puesto*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Puesto"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Ingresos mensuales
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Ingresos mensuales"
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Gastos mensuales*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Gastos mensuales"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Fecha y número de ingresos
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Fecha y número de ingresos"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Nombre del jefe inmediato*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Nombre del jefe inmediato"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Dirección del trabajo*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Dirección del trabajo"
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Municipio del trabajo*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Municipio del trabajo"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Teléfono del trabajo
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Teléfono del trabajo"
            />
          </Col>
        </Row>
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
            <span className="align-middle d-sm-inline-block d-none">Next</span>
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

export default Asalariado;
