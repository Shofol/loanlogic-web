import React, { useRef, useState, useEffect } from "react";
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
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { departments, municipalitiesValues } from "../../configs/data";
import { Spanish } from "flatpickr/dist/l10n/es";
import { mapMuniValue } from "../../utility/Utils";

const NegocioPropio = ({ stepper, onSubmit, data }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const munRef = useRef();

  const mapFormValues = () => {
    return {
      business_name: data ? data.business_name : "",
      start_date: data ? data.start_date : null,
      nit5: data ? data.nit5 : "",
      monthly_sales: data ? data.monthly_sales : "",
      monthly_expenses5: data ? data.monthly_expenses5 : "",
      business_address: data ? data.business_address : "",
      business_municipality: data ? data.business_municipality : "",
      business_department: data ? data.business_department : "",
      business_phone: data ? data.business_phone : ""
    };
  };

  const [formValues, setFormValues] = useState(mapFormValues());

  useEffect(() => {
    setFormValues(mapFormValues());
  }, [data]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Negocio propio</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";
            const invalidNumber = "Numero de telefono invalido";

            if (!values.business_name) {
              errors.business_name = requiredMsg;
            }
            if (!values.start_date) {
              errors.start_date = requiredMsg;
            }
            if (!values.business_address) {
              errors.business_address = requiredMsg;
            }
            if (!values.business_municipality) {
              errors.business_municipality = requiredMsg;
            }
            if (!values.business_department) {
              errors.business_department = requiredMsg;
            }
            if (!values.business_phone) {
              errors.business_phone = requiredMsg;
            }
            if (
              values.business_phone &&
              values.business_phone.toString().length > 8
            ) {
              errors.business_phone = invalidNumber;
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
              <Row>
                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="business_name">
                    Nombre del negocio<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="business_name"
                    id="business_name"
                    placeholder="Nombre del negocio"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="business_name"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="start_date">
                    Fecha de inicio<span className="text-danger">*</span>
                  </Label>
                  <Flatpickr
                    id="hf-picker"
                    className="form-control"
                    onChange={(selectedDates, dateStr, instance) => {
                      setFieldValue("start_date", dateStr);
                    }}
                    //key={values.start_date}
                    options={{
                      locale: Spanish,
                      altInput: true,
                      altFormat: "j F Y",
                      dateFormat: "Y-m-d",
                      defaultDate: values.start_date
                        ? new Date(values?.start_date.split("T")[0])
                        : new Date()
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="start_date"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="nit5">
                    NIT
                  </Label>
                  <Input
                    type="text"
                    name="nit5"
                    id="nit5"
                    placeholder="NIT"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="nit5"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="monthly_sales">
                    Ventas mensuales
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="monthly_sales"
                      id="monthly_sales"
                      placeholder="Ventas mensuales"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="monthly_expenses5">
                    Gastos mensuales
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="monthly_expenses5"
                      id="monthly_expenses5"
                      placeholder="Gastos mensuales"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="business_phone">
                    Teléfono del negocio<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="business_phone"
                    id="business_phone"
                    placeholder="Teléfono del negocio"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="business_phone"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="business_address">
                    Dirección del negocio<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="business_address"
                    id="business_address"
                    placeholder="Dirección del negocio"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="business_address"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="business_department">
                    Departamento del negocio
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={departments}
                    isClearable={false}
                    name="business_department"
                    id="business_department"
                    value={
                      departments.filter(
                        (department) =>
                          department.value === values.business_department
                      )[0]
                    }
                    onChange={(option) => {
                      munRef.current.clearValue();
                      setMunicipalities(
                        municipalitiesValues.filter(
                          (muni) => muni.department === option.value
                        )[0].municipalities
                      );
                      setFieldValue("business_department", option.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="business_department"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="business_municipality">
                    Municipio del negocio
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    ref={munRef}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    name="business_municipality"
                    value={mapMuniValue(
                      municipalitiesValues,
                      values,
                      "business_department",
                      "business_municipality"
                    )}
                    onChange={(option) =>
                      setFieldValue("business_municipality", option?.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="business_municipality"
                    className="text-danger"
                  />
                </Col>


              </Row>
              <div className="d-flex justify-content-end mt-2">
                <Button
                  color="secondary"
                  className="btn-prev me-1"
                  outline
                  onClick={() => {
                    const occupation = localStorage.getItem("occupation");
                    if (occupation === "BUSINESS") {
                      stepper.to(3);
                    } else {
                      stepper.previous();
                    }
                  }}
                >
                  <ArrowLeft
                    size={14}
                    className="align-middle me-sm-25 me-0"
                  ></ArrowLeft>
                  <span className="align-middle d-sm-inline-block d-none">
                    Anterior
                  </span>
                </Button>
                <Button type="submit" color="primary" className="btn-next">
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

export default NegocioPropio;
