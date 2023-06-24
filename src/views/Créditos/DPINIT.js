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

const DPINIT = ({ stepper }) => {
  const professions = [
    { title: "Asalariado (trabaja para una empresa)", value: "salaried" },
    { title: "Tiene negocio propio", value: "business" },
    {
      title: "Ambas, es asalariado y también tiene negocio propio",
      value: "salariedAndBusiness"
    },
    { title: "Sin ingresos", value: "noIcome" }
  ];

  const wantCredit = [
    { label: "Sí", value: "yes" },
    { label: "No", value: "no" }
  ];

  const onSubmit = () => {
    stepper.next();
  };

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">DPI & NIT</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Número DPI*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Número DPI"
            />
          </Col>
          <Col sm="3" className="mt-2 d-flex justify-content-end">
            <p>
              Lugar de nacimiento <br />
              (departamento, municipio)*
            </p>
          </Col>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Municipio
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Municipio"
            />
          </Col>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Departamento
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Departamento"
            />
          </Col>
        </Row>

        <Row>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Fecha vencimiento*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Fecha vencimiento"
            />
          </Col>
          <Col sm="3" className="mt-2 d-flex justify-content-end">
            <p>Vecindad*</p>
          </Col>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Municipio
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Municipio"
            />
          </Col>
          <Col sm="3" className="mt-2">
            <Label className="form-label" for="assistance_expenses">
              Departamento
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Departamento"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md="3">
            <p className="mt-2">Foto ambos lados del DPI*</p>
          </Col>
          <Col md="9" className="d-flex align-items-center gap-2">
            {professions.map((prof) => {
              return (
                <img
                  key={prof.value}
                  className="img-fluid"
                  src={image}
                  alt={"item.name"}
                  width="80px"
                  height="80px"
                />
              );
            })}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              NIT
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="NIT"
            />
          </Col>
          <Col sm="5">
            <Label className="form-label" for="assistance_expenses">
              Tiene crédito con alguna institución financiera o con personas
              individuales?
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={wantCredit}
              isClearable={false}
              name="frequency"
              // onChange={(option) => setFieldValue("frequency", option.value)}
            />
          </Col>
          <Col sm="4">
            <Label className="form-label" for="assistance_expenses">
              Si la respuesta es sí, indicar las instituciones y mon
            </Label>
            <Input
              type="textarea"
              name="inventory"
              id="inventory"
              placeholder="Si la respuesta es sí, indicar las instituciones y monto"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-2">
          <Button color="secondary" className="btn-prev me-1" outline>
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

export default DPINIT;
