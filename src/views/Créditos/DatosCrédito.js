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
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import "./Créditos.scss";
import { ArrowRight, Info } from "react-feather";

const DatosCrédito = ({ stepper }) => {
  const [rangeValue, setRangeValue] = useState(50);

  const guaranteeTypes = [
    { title: "Garantía fiduciaria", value: "fiduciaryGuarantee" },
    { title: "Prenda", value: "garment" },
    { title: "Cheque", value: "cheque" },
    { title: "Mobiliaria", value: "furniture" },
    { title: "Hipotecaria", value: "mortgage" },
    { title: "Compra - venta;", value: "buyAndSell" },
    { title: "Empeño", value: "endeavor" }
  ];

  const paymentMethods = [
    { title: "diario", value: "diario" },
    { title: "semanal", value: "semanal" },
    { title: "quincenal", value: "quincenal" },
    { title: "final de mes", value: "final" }
  ];

  const professions = [
    { title: "Asalariado (trabaja para una empresa)", value: "salaried" },
    { title: "Tiene negocio propio", value: "business" },
    {
      title: "Ambas, es asalariado y también tiene negocio propio",
      value: "salariedAndBusiness"
    },
    { title: "Sin ingresos", value: "noIcome" }
  ];

  const onSubmit = () => {
    stepper.next();
  };

  return (
    <div className="px-2">
      {/* <CardHeader className="d-flex flex-column">
        <CardTitle tag="h4" className="mb-1">
          Solicitud Núm. 1346
        </CardTitle>
        <CardSubtitle tag="h5">Ricardo Solsona: Q1000 - 28D</CardSubtitle>
        <CardSubtitle className="mt-1" tag="h4">
          Solicitud crédito
        </CardSubtitle>
      </CardHeader> */}
      <CardBody>
        <Form>
          <p htmlFor="assistance_expenses">¿Cómo quieres pagar tu préstamo?*</p>
          <div className="d-flex">
            {paymentMethods.map((method) => {
              return (
                <div
                  key={method.value}
                  className="form-check mb-sm-2 mb-md-1 me-md-2"
                >
                  <Input
                    type="radio"
                    id={method.value}
                    name="paymentMethod"
                    checked={true}
                  />
                  <Label className="form-check-label" htmlFor={method.value}>
                    {method.title}
                  </Label>
                </div>
              );
            })}
          </div>
          <Row className="mt-2">
            <Col md="4">
              <p className="mb-0">
                Monto deseado del crédito:* de 500 en n500Q
              </p>
            </Col>
            <Col md="8" className="align-items-center d-flex">
              <div className="w-100">
                <ReactSlider
                  value={rangeValue}
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  onChange={(value) => {
                    setRangeValue(value);
                  }}
                  renderThumb={(props, state) => (
                    <div {...props}>{rangeValue}</div>
                  )}
                />
              </div>
            </Col>

            <Col md="2" className="mt-3">
              <p className="mb-0">Destino del crédito*</p>
            </Col>
            <Col md="4" className="mt-3">
              <Input type="textarea" />
            </Col>

            <Col md="2" className="mt-3">
              <p className="mb-0">Motivo solicitud del crédito*</p>
            </Col>
            <Col md="4" className="mt-3">
              <Input type="textarea" />
            </Col>
          </Row>

          <p className="mt-4">
            ¿De qué tipo de garantía dispone? (seleccione todas las opciones
            pertinentes)*
          </p>

          {guaranteeTypes.map((guarntee) => {
            return (
              <div
                key={guarntee.value}
                className="form-check form-check-inline me-2"
              >
                <Input
                  type="checkbox"
                  id={guarntee.value}
                  name="guaranteeType"
                  value={guarntee.value}
                  checked={true}
                />
                <Label
                  htmlFor={guarntee.value}
                  className="form-check-label"
                  style={{ marginRight: ".25rem" }}
                >
                  {guarntee.title}
                </Label>
                <Info size={16} id={guarntee.value} />
                <UncontrolledTooltip placement="top" target={guarntee.value}>
                  {guarntee.title}
                </UncontrolledTooltip>
              </div>
            );
          })}

          <p htmlFor="assistance_expenses" className="mt-4">
            Usted es (seleccione una única opción)*
          </p>
          <div className="d-flex">
            {professions.map((prof) => {
              return (
                <div
                  key={prof.value}
                  className="form-check mb-sm-2 mb-md-1 me-md-2"
                >
                  <Input
                    type="radio"
                    id={prof.value}
                    name="paymentprof"
                    checked={true}
                  />
                  <Label className="form-check-label" htmlFor={prof.value}>
                    {prof.title}
                  </Label>
                </div>
              );
            })}
          </div>
        </Form>

        <div className="d-flex justify-content-end mt-2">
          {/* <Button color="secondary" className="btn-prev" outline >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button> */}
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

export default DatosCrédito;
