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

const NegocioPropio = ({ stepper }) => {
  const onSubmit = () => {
    stepper.next();
  };

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Negocio propio</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Nombre del negocio*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Nombre del negocio"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Fecha de inicio*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Fecha de inicio"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              NIT*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="NIT"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Ventas mensuales
            </Label>
            <InputGroup>
              <Input
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Ventas mensuales"
              />
              <InputGroupText>Q</InputGroupText>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Gastos mensuales*
            </Label>
            <InputGroup>
              <Input
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Gastos mensuales"
              />
              <InputGroupText>Q</InputGroupText>
            </InputGroup>
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Dirección del negocio*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Dirección del negocio"
            />
          </Col>

          <Col sm="3" className="mt-1">
            <Label className="form-label" for="assistance_expenses">
              Teléfono del negocio*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Teléfono del negocio"
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

export default NegocioPropio;
