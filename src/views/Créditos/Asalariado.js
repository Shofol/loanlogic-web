import React, { useState } from "react";
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

const Asalariado = ({ stepper, onSubmit }) => {
  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Asalariado</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            company_name: "",
            entry_date: "",
            position: "",
            monthly_income: "",
            monthly_expenses: "",
            date_and_number_of_income: "",
            immediate_boss_name: "",
            work_address: "",
            work_municipality: "",
            work_phone: ""
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";

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
            if (!values.work_municipality) {
              errors.work_municipality = requiredMsg;
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
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d"
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
                      type="text"
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
                      type="text"
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
                </Col>

                <Col sm="3" className="mt-1">
                  <Label className="form-label" for="work_phone">
                    Teléfono del trabajo<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
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
