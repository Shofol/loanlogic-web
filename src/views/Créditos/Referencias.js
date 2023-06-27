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
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const Referencias = ({ stepper, onSubmit }) => {
  const [referenciasPersonales, setReferenciasPersonales] = useState([1, 2]);
  const [referenciasFamiliares, setReferenciasFamiliares] = useState([1, 2]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">
          Referencias familiares (que no vivan con usted)
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            f_references_name_and_surname: "",
            f_references_relationship: "",
            f_references_work_phone: "",
            f_references_cell_phone: "",
            p_references_name_and_surname: "",
            p_references_relationship: "",
            p_references_work_phone: "",
            p_references_cell_phone: ""
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";

            if (!values.f_references_name_and_surname) {
              errors.f_references_name_and_surname = requiredMsg;
            }

            if (!values.f_references_relationship) {
              errors.f_references_relationship = requiredMsg;
            }
            if (!values.f_references_cell_phone) {
              errors.f_references_cell_phone = requiredMsg;
            }
            if (!values.p_references_name_and_surname) {
              errors.p_references_name_and_surname = requiredMsg;
            }
            if (!values.p_references_relationship) {
              errors.p_references_relationship = requiredMsg;
            }
            if (!values.p_references_cell_phone) {
              errors.p_references_cell_phone = requiredMsg;
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
              {referenciasFamiliares.map((ref) => {
                return (
                  <Row key={ref}>
                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="f_references_name_and_surname"
                      >
                        Nombre y apellidos*
                      </Label>
                      <Input
                        type="text"
                        name="f_references_name_and_surname"
                        id="f_references_name_and_surname"
                        placeholder="Nombre y apellidos"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="f_references_name_and_surname"
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="f_references_relationship"
                      >
                        Parentesco*
                      </Label>
                      <Input
                        type="text"
                        name="f_references_relationship"
                        id="f_references_relationship"
                        placeholder="Parentesco"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="f_references_relationship"
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="f_references_work_phone"
                      >
                        Teléfono trabajo*
                      </Label>
                      <Input
                        type="text"
                        name="f_references_work_phone"
                        id="f_references_work_phone"
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="f_references_cell_phone"
                      >
                        Celular*
                      </Label>
                      <Input
                        type="text"
                        name="f_references_cell_phone"
                        id="f_references_cell_phone"
                        placeholder="Celular"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="f_references_cell_phone"
                        className="text-danger"
                      />
                    </Col>
                  </Row>
                );
              })}

              <CardTitle tag="h4" className="mt-2">
                Referencias personales (que no sean familiares)
              </CardTitle>
              {referenciasPersonales.map((ref) => {
                return (
                  <Row key={ref}>
                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="p_references_name_and_surname"
                      >
                        Nombre y apellidos*
                      </Label>
                      <Input
                        type="text"
                        name="p_references_name_and_surname"
                        id="p_references_name_and_surname"
                        placeholder="Nombre y apellidos"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="p_references_name_and_surname"
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="p_references_relationship"
                      >
                        Parentesco*
                      </Label>
                      <Input
                        type="text"
                        name="p_references_relationship"
                        id="p_references_relationship"
                        placeholder="Parentesco"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="p_references_relationship"
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="p_references_work_phone"
                      >
                        Teléfono trabajo*
                      </Label>
                      <Input
                        type="text"
                        name="p_references_work_phone"
                        id="p_references_work_phone"
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                    </Col>
                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for="p_references_cell_phone"
                      >
                        Celular*
                      </Label>
                      <Input
                        type="text"
                        name="p_references_cell_phone"
                        id="p_references_cell_phone"
                        placeholder="Celular"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="p_references_cell_phone"
                        className="text-danger"
                      />
                    </Col>
                  </Row>
                );
              })}

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
                    Submit
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

export default Referencias;
