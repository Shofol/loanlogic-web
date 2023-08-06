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

const Referencias = ({ stepper, onSubmit, onPrevious }) => {
  const [referenciasPersonales, setReferenciasPersonales] = useState(["", "2"]);
  const [referenciasFamiliares, setReferenciasFamiliares] = useState(["", "2"]);

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
            p_references_cell_phone: "",
            f_references_name_and_surname2: "",
            f_references_relationship2: "",
            f_references_work_phone2: "",
            f_references_cell_phone2: "",
            p_references_name_and_surname2: "",
            p_references_relationship2: "",
            p_references_work_phone2: "",
            p_references_cell_phone2: ""
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

            if (!values.f_references_name_and_surname2) {
              errors.f_references_name_and_surname2 = requiredMsg;
            }
            if (!values.f_references_relationship2) {
              errors.f_references_relationship2 = requiredMsg;
            }
            if (!values.f_references_cell_phone2) {
              errors.f_references_cell_phone2 = requiredMsg;
            }
            if (!values.p_references_name_and_surname2) {
              errors.p_references_name_and_surname2 = requiredMsg;
            }
            if (!values.p_references_relationship2) {
              errors.p_references_relationship2 = requiredMsg;
            }
            if (!values.p_references_cell_phone2) {
              errors.p_references_cell_phone2 = requiredMsg;
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onSubmit(values);
            setSubmitting(false);
            stepper.next();
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
                        for={`f_references_name_and_surname${ref}`}
                      >
                        Nombre y apellidos<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`f_references_name_and_surname${ref}`}
                        id={`f_references_name_and_surname${ref}`}
                        placeholder="Nombre y apellidos"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`f_references_name_and_surname${ref}`}
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`f_references_relationship${ref}`}
                      >
                        Parentesco<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`f_references_relationship${ref}`}
                        id={`f_references_relationship${ref}`}
                        placeholder="Parentesco"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`f_references_relationship${ref}`}
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`f_references_work_phone${ref}`}
                      >
                        Teléfono trabajo<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`f_references_work_phone${ref}`}
                        id={`f_references_work_phone${ref}`}
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`f_references_cell_phone${ref}`}
                      >
                        Celular<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`f_references_cell_phone${ref}`}
                        id={`f_references_cell_phone${ref}`}
                        placeholder="Celular"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`f_references_cell_phone${ref}`}
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
                        for={`p_references_name_and_surname${ref}`}
                      >
                        Nombre y apellidos<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`p_references_name_and_surname${ref}`}
                        id={`p_references_name_and_surname${ref}`}
                        placeholder="Nombre y apellidos"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`p_references_name_and_surname${ref}`}
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`p_references_relationship${ref}`}
                      >
                        Parentesco<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`p_references_relationship${ref}`}
                        id={`p_references_relationship${ref}`}
                        placeholder="Parentesco"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`p_references_relationship${ref}`}
                        className="text-danger"
                      />
                    </Col>

                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`p_references_work_phone${ref}`}
                      >
                        Teléfono trabajo<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`p_references_work_phone${ref}`}
                        id={`p_references_work_phone${ref}`}
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                    </Col>
                    <Col sm="3" className="mt-1">
                      <Label
                        className="form-label"
                        for={`p_references_cell_phone${ref}`}
                      >
                        Celular<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name={`p_references_cell_phone${ref}`}
                        id={`p_references_cell_phone${ref}`}
                        placeholder="Celular"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`p_references_cell_phone${ref}`}
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
                    onPrevious();
                    const occupation = localStorage.getItem("occupation");
                    if (occupation === "SALARIED") {
                      stepper.to(4);
                    } else if (occupation === "NOINCOME") {
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
