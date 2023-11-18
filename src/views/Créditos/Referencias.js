import React, { useState, useEffect } from "react";
import {
  Button,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import "./Créditos.scss";
import {
  parentesco,
  relacion
} from "../../configs/data";
import { ArrowLeft, ArrowRight, Info } from "react-feather";
import { ErrorMessage, Field, Formik } from "formik";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const Referencias = ({ stepper, onSubmit, onPrevious, data }) => {
  const [referenciasPersonales, setReferenciasPersonales] = useState([
    "",
    "_2"
  ]);
  const [referenciasFamiliares, setReferenciasFamiliares] = useState([
    "",
    "_2"
  ]);

  const mapFormValues = () => {
    return {
      f_references_name_and_surname: data
        ? data.f_references_name_and_surname
        : "",
      f_references_relationship: data ? data.f_references_relationship : "",
      f_references_work_phone: data ? data.f_references_work_phone : "",
      f_references_cell_phone: data ? data.f_references_cell_phone : "",
      p_references_name_and_surname: data
        ? data.p_references_name_and_surname
        : "",
      p_references_relationship: data ? data.p_references_relationship : "",
      p_references_work_phone: data ? data.p_references_work_phone : "",
      p_references_cell_phone: data ? data.p_references_cell_phone : "",
      f_references_name_and_surname_2: data
        ? data.f_references_name_and_surname_2
        : "",
      f_references_relationship_2: data ? data.f_references_relationship_2 : "",
      f_references_work_phone_2: data ? data.f_references_work_phone_2 : "",
      f_references_cell_phone_2: data ? data.f_references_cell_phone_2 : "",
      p_references_name_and_surname_2: data
        ? data.p_references_name_and_surname_2
        : "",
      p_references_relationship_2: data ? data.p_references_relationship_2 : "",
      p_references_work_phone_2: data ? data.p_references_work_phone_2 : "",
      p_references_cell_phone_2: data ? data.p_references_cell_phone_2 : ""
    };
  };

  const [formValues, setFormValues] = useState(mapFormValues());

  useEffect(() => {
    setFormValues(mapFormValues());
  }, [data]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">
          Referencias familiares (que no vivan con usted)
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";
            const invalidNumber = "Numero de telefono invalido";

            if (!values.f_references_name_and_surname) {
              errors.f_references_name_and_surname = requiredMsg;
            }
            if (!values.f_references_relationship) {
              errors.f_references_relationship = requiredMsg;
            }
            if (!values.f_references_cell_phone) {
              errors.f_references_cell_phone = requiredMsg;
            }
            if (
              values.f_references_cell_phone &&
              values.f_references_cell_phone.toString().length > 8
            ) {
              errors.f_references_cell_phone = invalidNumber;
            }
            if (
              values.f_references_work_phone &&
              values.f_references_work_phone.toString().length > 8
            ) {
              errors.f_references_work_phone = invalidNumber;
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
            if (
              values.p_references_cell_phone &&
              values.p_references_cell_phone.toString().length > 8
            ) {
              errors.p_references_cell_phone = invalidNumber;
            }
            if (
              values.p_references_work_phone &&
              values.p_references_work_phone.toString().length > 8
            ) {
              errors.p_references_work_phone = invalidNumber;
            }
            if (!values.f_references_name_and_surname_2) {
              errors.f_references_name_and_surname_2 = requiredMsg;
            }
            if (!values.f_references_relationship_2) {
              errors.f_references_relationship_2 = requiredMsg;
            }
            if (!values.f_references_cell_phone_2) {
              errors.f_references_cell_phone_2 = requiredMsg;
            }
            if (
              values.f_references_cell_phone_2 &&
              values.f_references_cell_phone_2.toString().length > 8
            ) {
              errors.f_references_cell_phone_2 = invalidNumber;
            }
            if (
              values.f_references_work_phone_2 &&
              values.f_references_work_phone_2.toString().length > 8
            ) {
              errors.f_references_work_phone_2 = invalidNumber;
            }
            if (!values.p_references_name_and_surname_2) {
              errors.p_references_name_and_surname_2 = requiredMsg;
            }
            if (!values.p_references_relationship_2) {
              errors.p_references_relationship_2 = requiredMsg;
            }
            if (!values.p_references_cell_phone_2) {
              errors.p_references_cell_phone_2 = requiredMsg;
            }
            if (
              values.p_references_cell_phone_2 &&
              values.p_references_cell_phone_2.toString().length > 8
            ) {
              errors.p_references_cell_phone_2 = invalidNumber;
            }
            if (
              values.f_references_work_phone_2 &&
              values.f_references_work_phone_2.toString().length > 8
            ) {
              errors.f_references_work_phone_2 = invalidNumber;
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
                      {/*<Input
                        type="text"
                        name={`f_references_relationship${ref}`}
                        id={`f_references_relationship${ref}`}
                        placeholder="Parentesco"
                        tag={Field}
                      />*/}
                      <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        options={parentesco}
                        isClearable={false}
                        value={parentesco.filter(
                          (relacion) => relacion.value === values[`f_references_relationship${ref}`]
                        )}
                        name={`f_references_relationship${ref}`}
                        onChange={(option) =>{
                          console.log("OPTION", option)
                          setFieldValue(`f_references_relationship${ref}`, option.value)
                          }
                        }
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
                        type="number"
                        name={`f_references_work_phone${ref}`}
                        id={`f_references_work_phone${ref}`}
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`f_references_work_phone${ref}`}
                        className="text-danger"
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
                        type="number"
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
                      {/*<Input
                        type="text"
                        name={`p_references_relationship${ref}`}
                        id={`p_references_relationship${ref}`}
                        placeholder="Parentesco"
                        tag={Field}
                      />*/}
                     <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        options={relacion}
                        isClearable={false}
                        value={relacion.filter(
                          (rel) => rel.value === values[`p_references_relationship${ref}`]
                        )}
                        name={`p_references_relationship${ref}`}
                        onChange={(option) =>{
                          console.log("OPTION", option)
                          setFieldValue(`p_references_relationship${ref}`, option.value)
                          }
                        }
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
                        type="number"
                        name={`p_references_work_phone${ref}`}
                        id={`p_references_work_phone${ref}`}
                        placeholder="Teléfono trabajo"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name={`p_references_work_phone${ref}`}
                        className="text-danger"
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
                        type="number"
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
                    Anterior
                  </span>
                </Button>
                <Button type="submit" color="primary" className="btn-next">
                  <span className="align-middle d-sm-inline-block d-none">
                    Enviar
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
