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
import { ErrorMessage, Field, Formik } from "formik";

const DatosCrédito = ({ stepper, onSubmit }) => {
  const [rangeValue, setRangeValue] = useState(500);

  const loanPaymentMethods = [
    { label: "Producto diario", value: "PRODUCTO DIARIO" },
    {
      label: "Producto semanal",
      value: "PRODUCTO SEMANAL"
    },

    {
      label: "Quincenal",
      value: "QUINCENAL"
    },
    { label: "Fin de mes", value: "FIN DE MES" }
  ];

  const guaranteeTypes = [
    {
      title: "Garantía fiduciaria",
      value: "FIDUCIARYGUARANTEE",
      tip: "Firma contrato"
    },
    {
      title: "Prenda",
      value: "GARMENT",
      tip: "El cliente la puede seguir utilizando"
    },
    {
      title: "Cheque",
      value: "CHEQUE",
      tip: "Entrega como garantia en la agencia"
    },
    {
      title: "Mobiliaria",
      value: "FURNITURE",
      tip: "Registro formal ante el registro mercantil, pero el cliente puede seguir utilizando"
    },
    {
      title: "Hipotecaria",
      value: "MORTGAGE",
      tip: "Se crea un gravamen sobre la propiedad"
    },
    {
      title: "Compra - venta;",
      value: "BUYANDSELL",
      tip: "Si no me pagas, me quedo con la casa para venderla"
    },
    {
      title: "Empeño",
      value: "ENDEAVOR",
      tip: "Igual que la prendaria pero se queda en posesión por Al Chilazo"
    }
  ];

  const paymentMethods = [
    { value: "DAILY", label: "Diario" },
    { value: "WEEKLY", label: "Semanal" },
    { value: "BIWEEKLY", label: "Quincenal" },
    { value: "FORTNIGHTLY", label: "Catorcenal" },
    // { value: "MONTHLY", label: "Mensual" },
    { value: "END_MONTH", label: "Mensual (fin de mes)" }
  ];

  const professions = [
    { title: "Asalariado (trabaja para una empresa)", value: "SALARIED" },
    { title: "Tiene negocio propio", value: "BUSINESS" },
    {
      title: "Ambas, es asalariado y también tiene negocio propio",
      value: "SALARIEDANDBUSINESS"
    },
    { title: "Sin ingresos", value: "NOINCOME" }
  ];

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
        <Formik
          initialValues={{
            loan_payment_method: "",
            loan_payment_time: "",
            credit_amount: "500",
            credit_destination: "",
            reason_for_credit_request: "",
            gurrentee_items: "",
            occupation: ""
          }}
          validate={(values) => {
            const errors = {};
            if (!values.loan_payment_method) {
              errors.loan_payment_method =
                "Se requiere el método de pago del préstamo";
            }

            if (!values.loan_payment_time) {
              errors.loan_payment_time =
                "Se requiere tiempo de pago del préstamo";
            }
            if (!values.credit_destination) {
              errors.credit_destination = "Se requiere el destino del crédito";
            }
            if (!values.reason_for_credit_request) {
              errors.reason_for_credit_request =
                "Se requiere el motivo solicitud del crédito";
            }
            if (
              !values.gurrentee_items ||
              values.gurrentee_items.length === 0
            ) {
              errors.gurrentee_items = "Se requiere garantia";
            }
            if (!values.occupation || values.occupation.length === 0) {
              errors.occupation = "Se requiere ocupación";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              onSubmit(values);
              setSubmitting(false);
              stepper.next();
            }, 400);
          }}
        >
          {({ handleSubmit, setFieldValue, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <p htmlFor="loan_payment_method">
                Método de pago del préstamo
                <span className="text-danger">*</span>
              </p>
              <div className="d-flex">
                {loanPaymentMethods.map((method) => {
                  return (
                    <div
                      key={method.value}
                      className="form-check mb-sm-2 mb-md-1 me-md-2"
                    >
                      <Input
                        type="radio"
                        id="loan_payment_method"
                        name="loan_payment_method"
                        tag={Field}
                        value={method.value}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor={method.value}
                      >
                        {method.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <ErrorMessage
                component="div"
                name="loan_payment_method"
                className="text-danger"
              />

              <p htmlFor="loan_payment_time" className="mt-2">
                ¿Cómo quieres pagar tu préstamo?
                <span className="text-danger">*</span>
              </p>
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
                        name="loan_payment_time"
                        tag={Field}
                        value={method.value}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor={method.value}
                      >
                        {method.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <ErrorMessage
                component="div"
                name="loan_payment_time"
                className="text-danger"
              />

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
                      min={500}
                      max={20000}
                      step={500}
                      tag={Field}
                      name="credit_amount"
                      onChange={(value) => {
                        setRangeValue(value);
                        setFieldValue("credit_amount", value);
                      }}
                      renderThumb={(props, state) => (
                        <div {...props}>{rangeValue}</div>
                      )}
                    />
                  </div>
                </Col>

                <Col md="2" className="mt-3">
                  <p className="mb-0">
                    Destino del crédito<span className="text-danger">*</span>
                  </p>
                </Col>
                <Col md="4" className="mt-3">
                  <Input
                    type="textarea"
                    name="credit_destination"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="credit_destination"
                    className="text-danger"
                  />
                </Col>

                <Col md="2" className="mt-3">
                  <p className="mb-0">
                    Motivo solicitud del crédito
                    <span className="text-danger">*</span>
                  </p>
                </Col>
                <Col md="4" className="mt-3">
                  <Input
                    type="textarea"
                    name="reason_for_credit_request"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="reason_for_credit_request"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <p className="mt-4">
                ¿De qué tipo de garantía dispone? (seleccione todas las opciones
                pertinentes)<span className="text-danger">*</span>
              </p>

              {guaranteeTypes.map((gurrentee_items) => {
                return (
                  <div
                    key={gurrentee_items.value}
                    className="form-check form-check-inline me-2"
                  >
                    <Input
                      type="checkbox"
                      id={gurrentee_items.value}
                      name="gurrentee_items"
                      value={gurrentee_items.value}
                      tag={Field}
                      // checked={true}
                    />
                    <Label
                      htmlFor={gurrentee_items.value}
                      className="form-check-label"
                      style={{ marginRight: ".25rem" }}
                    >
                      {gurrentee_items.title}
                    </Label>
                    <Info size={16} id={`tip-${gurrentee_items.value}`} />
                    <UncontrolledTooltip
                      placement="top"
                      target={`tip-${gurrentee_items.value}`}
                    >
                      {gurrentee_items.tip}
                    </UncontrolledTooltip>
                  </div>
                );
              })}
              <ErrorMessage
                component="div"
                name="gurrentee_items"
                className="text-danger"
              />
              <p htmlFor="occupation" className="mt-4">
                Usted es (seleccione una única opción)
                <span className="text-danger">*</span>
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
                        name="occupation"
                        value={prof.value}
                        tag={Field}
                      />
                      <Label className="form-check-label" htmlFor={prof.value}>
                        {prof.title}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <ErrorMessage
                component="div"
                name="occupation"
                className="text-danger"
              />
              <div className="d-flex justify-content-end mt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="btn-next"
                  // onClick={onSubmit}
                >
                  <span className="align-middle d-sm-inline-block d-none">
                    Next
                  </span>
                  <ArrowRight
                    size={14}
                    className="align-middle ms-sm-25 ms-0"
                  ></ArrowRight>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </div>
  );
};

export default DatosCrédito;
