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

const DatosDelSolicitante = ({ stepper }) => {
  const professions = [
    { title: "Asalariado (trabaja para una empresa)", value: "salaried" },
    { title: "Tiene negocio propio", value: "business" },
    {
      title: "Ambas, es asalariado y también tiene negocio propio",
      value: "salariedAndBusiness"
    },
    { title: "Sin ingresos", value: "noIcome" }
  ];

  const maritialStatus = [
    { label: "Soltero/a", value: "single" },
    { label: "Casado/a", value: "married" },
    { label: "Divorciado/a", value: "divorced" },
    { label: "Viudo/a", value: "widow" }
  ];

  const sex = [
    { label: "Masculino", value: "male" },
    { label: "Femenino", value: "female" }
  ];

  const onSubmit = () => {
    stepper.next();
  };

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Datos del solicitante</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Primer apellido*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Primer apellido"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Segundo apellido*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Segundo apellido"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Nombre*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Nombre"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Si la respuesta es sí, indicar las instituciones y mont{" "}
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Segundo nombre"
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Número de celular
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Número de celular"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Número de teléfono fijo
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Número de teléfono fijo"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Correo electrónico
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Correo electrónico"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Dirección de residencia*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Dirección de residencia"
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Municipio de residencia*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Municipio de residencia"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Departamento de residencia*
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={professions}
              isClearable={false}
              name="frequency"
              // onChange={(option) => setFieldValue("frequency", option.value)}
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Fecha de nacimiento*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Fecha de nacimiento"
            />
          </Col>
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Profesión*
            </Label>
            <Input
              type="text"
              name="inventory"
              id="inventory"
              placeholder="Profesión"
            />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Estado civil*
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={maritialStatus}
              isClearable={false}
              name="frequency"
              // onChange={(option) => setFieldValue("frequency", option.value)}
            />
          </Col>

          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Sexo
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={sex}
              isClearable={false}
              name="frequency"
              // onChange={(option) => setFieldValue("frequency", option.value)}
            />
          </Col>

          <Col sm="3">
            <Label className="form-label" for="assistance_expenses">
              Nacionalidad
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={professions}
              isClearable={false}
              name="frequency"
              // onChange={(option) => setFieldValue("frequency", option.value)}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md="3">
            <p className="mt-2">
              Foto del recibo de la luz <br />
              (u otro recibo)*
            </p>
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

export default DatosDelSolicitante;
