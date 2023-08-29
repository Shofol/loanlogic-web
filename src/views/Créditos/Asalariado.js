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
  Row
} from "reactstrap";
import "./Créditos.scss";
import { ArrowLeft, ArrowRight } from "react-feather";
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { departments, municipalitiesValues } from "../../configs/data";
import { Spanish } from "flatpickr/dist/l10n/es";
import { mapMuniValue } from "../../utility/Utils";

const Asalariado = ({ stepper, onSubmit, data }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const munRef = useRef();

  const mapFormValues = () => {
    return {
      company_name: data ? data.company_name : "",
      entry_date: data ? data.entry_date : new Date(),
      position: data ? data.position : "",
      monthly_income: data ? data.monthly_income : "",
      monthly_expenses: data ? data.monthly_expenses : "",
      date_and_number_of_income: data ? data.date_and_number_of_income : "",
      immediate_boss_name: data ? data.immediate_boss_name : "",
      work_address: data ? data.work_address : "",
      work_department: data ? data.work_department : "",
      work_municipality: data ? data.work_municipality : "",
      work_phone: data ? data.work_phone : ""
    };
  };

  const [formValues, setFormValues] = useState(mapFormValues());

  useEffect(() => {
    setFormValues(mapFormValues());
  }, [data]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Asalariado</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";
            const invalidNumber = "Numero de telefono invalido";

            if (!values.company_name) {
              errors.company_name = requiredMsg;
            }
            if (!values.entry_date) {
              errors.entry_date = requiredMsg;
            }
            if (!values.position) {
              errors.position = requiredMsg;
            }
            if (!values.immediate_boss_name) {
              errors.immediate_boss_name = requiredMsg;
            }
            if (!values.monthly_income) {
              errors.monthly_income = requiredMsg;
            }
            if (!values.monthly_expenses) {
              errors.monthly_expenses = requiredMsg;
            }
            if (!values.work_address) {
              errors.work_address = requiredMsg;
            }
            if (!values.date_and_number_of_income) {
              errors.date_and_number_of_income = requiredMsg;
            }
            if (!values.work_phone) {
              errors.work_phone = requiredMsg;
            }
            if (values.work_phone && values.work_phone.toString().length > 8) {
              errors.work_phone = invalidNumber;
            }
            if (!values.work_department) {
              errors.work_department = requiredMsg;
            }
            if (!values.work_municipality) {
              errors.work_municipality = requiredMsg;
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onSubmit(values);
            setSubmitting(false);
            if (localStorage.getItem("occupation") === "SALARIED") {
              stepper.to(6);
            } else {
              stepper.next();
            }
          }}
        >
          {({ handleSubmit, setFieldValue, resetForm, values }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="company_name">
                    Nombre de la empresa<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="Nombre de la empresa"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="company_name"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="entry_date">
                    Fecha de ingreo<span className="text-danger">*</span>
                  </Label>

                  <Flatpickr
                    id="hf-picker"
                    className="form-control"
                    onChange={(selectedDates, dateStr, instance) => {
                      setFieldValue("entry_date", dateStr);
                    }}
                    options={{
                      locale: Spanish,
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: new Date()
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="entry_date"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="position">
                    Puesto<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="position"
                    id="position"
                    placeholder="Puesto"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="position"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="monthly_income">
                    Ingresos mensuales<span className="text-danger">*</span>
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="monthly_income"
                      id="monthly_income"
                      placeholder="Ingresos mensuales"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                  <ErrorMessage
                    component="div"
                    name="monthly_income"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="monthly_expenses">
                    Gastos mensuales<span className="text-danger">*</span>
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="monthly_expenses"
                      id="monthly_expenses"
                      placeholder="Gastos mensuales"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                  <ErrorMessage
                    component="div"
                    name="monthly_expenses"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="date_and_number_of_income">
                    Fecha y número de ingresos{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="date_and_number_of_income"
                    id="date_and_number_of_income"
                    placeholder="Fecha y número de ingresos"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="date_and_number_of_income"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="immediate_boss_name">
                    Nombre del jefe inmediato
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="immediate_boss_name"
                    id="immediate_boss_name"
                    placeholder="Nombre del jefe inmediato"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="immediate_boss_name"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_address">
                    Dirección del trabajo<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="work_address"
                    id="work_address"
                    placeholder="Dirección del trabajo"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="work_address"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_department">
                    Departamento del trabajo
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={departments}
                    isClearable={false}
                    name="work_department"
                    id="work_department"
                    value={
                      departments.filter(
                        (department) =>
                          department.value === values.work_department
                      )[0]
                    }
                    onChange={(option) => {
                      munRef.current.clearValue();
                      setMunicipalities(
                        municipalitiesValues.filter(
                          (muni) => muni.department === option.value
                        )[0].municipalities
                      );
                      setFieldValue("work_department", option.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="work_department"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_municipality">
                    Municipio del trabajo
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    ref={munRef}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    name="work_municipality"
                    value={mapMuniValue(
                      municipalitiesValues,
                      values,
                      "work_department",
                      "work_municipality"
                    )}
                    onChange={(option) =>
                      setFieldValue("work_municipality", option?.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="work_municipality"
                    className="text-danger"
                  />
                </Col>
                {/* <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_municipality">
                    Municipio del trabajo<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="work_municipality"
                    id="work_municipality"
                    placeholder="Municipio del trabajo"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="work_municipality"
                    className="text-danger"
                  />
                </Col> */}

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_phone">
                    Teléfono del trabajo<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="work_phone"
                    id="work_phone"
                    placeholder="Teléfono del trabajo"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="work_phone"
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
                <Button type="submit" color="primary" className="btn-next">
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

export default Asalariado;
