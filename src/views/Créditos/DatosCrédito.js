import { selectThemeColors } from "@utils";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ArrowRight, Info } from "react-feather";
import Select from "react-select";
import ReactSlider from "react-slider";
import {
  Button,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import API from "../../@core/api/api";
import {
  guaranteeTypes,
  professions
} from "../../configs/data";
import "./Créditos.scss";



const DatosCrédito = ({ stepper, onSubmit, onOccupationSelect }) => {
  const [rangeValue, setRangeValue] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [minValue, setMinValue] = useState([]);
  const [maxValue, setMaxValue] = useState([]);

  useEffect(() => {
    setMinValue(parseInt(500));
    setMaxValue(parseInt(20000));
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await API.get(
      `product/label`
    );
    setProducts([...response.data.data]);
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
        <Formik
          initialValues={{
            // loan_payment_method: "",
            //loan_payment_time: "",
            product_id : null,
            credit_amount: "500",
            credit_destination: "",
            reason_for_credit_request: "",
            gurrentee_items: "",
            occupation: "",
          }}
          validate={(values) => {
            const errors = {};
            // if (!values.loan_payment_method) {
            //   errors.loan_payment_method =
            //     "Se requiere el método de pago del préstamo";
            // }

            /*if (!values.loan_payment_time) {
              errors.loan_payment_time =
                "Se requiere tiempo de pago del préstamo";
            }*/
            if (!values.product_id) {
              errors.product_id =
                "Se requiere seleccionar el producto del préstamo";
            }
            if (!values.credit_destination) {
              errors.credit_destination = "Se requiere el destino del crédito";
            }
            if (
              values.credit_destination &&
              values.credit_destination.length < 5
            ) {
              errors.credit_destination = "Se requiere mínimo 5 caracteres";
            }
            if (
              values.reason_for_credit_request &&
              values.reason_for_credit_request.length < 5
            ) {
              errors.reason_for_credit_request =
                "Se requiere mínimo 5 caracteres";
            }

            // if (!values.reason_for_credit_request) {
            //   errors.reason_for_credit_request =
            //     "Se requiere el motivo solicitud del crédito";
            // }
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
            onSubmit(values);
            setSubmitting(false);
            stepper.next();
          }}
        >
          {({ handleSubmit, setFieldValue, resetForm, values }) => (
            <Form onSubmit={handleSubmit}>
              {/* <p htmlFor="loan_payment_method">
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
              /> */}

              <p htmlFor="product_id" className="mt-2">
                ¿Qué producto desea?
                <span className="text-danger">*</span>
              </p>

              <div className="d-flex flex-column flex-sb-row">
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={products}
                  isClearable={false}
                  value={products.filter((product) => product.value === values.product_id)}
                  name="product_id"
                  onChange={(option) => {
                    console.log("OPTION",option)
                    setMinValue(parseInt(option.min));
                    setMaxValue(parseInt(option.max));
                    setRangeValue(parseFloat(option.min));
                    setFieldValue("product_id", option.value)
                  }
                  }
                />
                {/*}
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
                */}
              </div>
              <ErrorMessage
                component="div"
                name="product_id"
                className="text-danger"
              />

              <Row className="mt-2">
                <Col md="4">
                  <p className="mb-0">
                    Monto deseado del crédito:* de 500 en 500Q
                  </p>
                </Col>
                <Col md="8" className="align-items-center d-flex pt-1 pt-sm-0">
                  <div className="w-100">
                    <ReactSlider
                      value={rangeValue}
                      className="horizontal-slider"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      min={minValue }
                      max={maxValue }
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
                    maxLength="255"
                    type="textarea"
                    name="credit_destination"
                    tag={Field}
                    placeholder="mínimo 5 caracteres"
                  />
                  <ErrorMessage
                    component="div"
                    name="credit_destination"
                    className="text-danger"
                  />
                </Col>
                {/* 
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
                    placeholder="mínimo 5 caracteres"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="reason_for_credit_request"
                    className="text-danger"
                  />
                </Col> */}
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
                      disabled={gurrentee_items.disabled}
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
              <div className="d-flex flex-column flex-sm-row">
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
                        // tag={Field}
                        onChange={(e) => {
                          setFieldValue("occupation", prof.value);
                          onOccupationSelect(prof.value);
                        }}
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
                    Siguiente
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
