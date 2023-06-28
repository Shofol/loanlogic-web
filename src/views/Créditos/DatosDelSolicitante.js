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
import {
  departments,
  maritialStatus,
  municipalitiesValues,
  nationalities,
  sexValues
} from "../../configs/data";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DatosDelSolicitante = ({ stepper, onSubmit }) => {
  const [municipalities, setMunicipalities] = useState([]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Datos del solicitante</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            photos_of_bills: [],
            surname: "",
            second_surname: "",
            name: "",
            second_name: "",
            phone_number: "",
            landline_phone_number: "",
            email: "",
            residence_address: "",
            residence_municipality: "",
            department_of_residence: "",
            birth_date: "",
            profession: "",
            civil_status: "",
            sex: "",
            nationality: ""
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";
            if (!values.surname) {
              errors.surname = requiredMsg;
            }
            if (!values.second_name) {
              errors.second_name = requiredMsg;
            }
            if (!values.second_surname) {
              errors.second_surname = requiredMsg;
            }
            if (!values.name) {
              errors.name = requiredMsg;
            }
            if (!values.phone_number) {
              errors.phone_number = requiredMsg;
            }
            if (!values.landline_phone_number) {
              errors.landline_phone_number = requiredMsg;
            }
            if (!values.email) {
              errors.email = requiredMsg;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.residence_address) {
              errors.residence_address = requiredMsg;
            }
            if (!values.department_of_residence) {
              errors.department_of_residence = requiredMsg;
            }
            if (!values.residence_municipality) {
              errors.residence_municipality = requiredMsg;
            }
            if (!values.birth_date) {
              errors.birth_date = requiredMsg;
            }
            if (!values.sex) {
              errors.birth_date = requiredMsg;
            }
            if (!values.civil_status) {
              errors.civil_status = requiredMsg;
            }
            if (!values.nationality) {
              errors.nationality = requiredMsg;
            }
            if (
              !values.photos_of_bills ||
              values.photos_of_bills.length === 0
            ) {
              errors.photos_of_bills = requiredMsg;
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
              <Row className="mt-2 d-flex align-items-end">
                <Col sm="3">
                  <Label className="form-label" for="surname">
                    Primer apellido<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder="Primer apellido"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="surname"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="second_surname">
                    Segundo apellido<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="second_surname"
                    id="second_surname"
                    placeholder="Segundo apellido"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="second_surname"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="name">
                    Nombre<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="second_name">
                    Si la respuesta es sí, indicar las instituciones y mont
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="second_name"
                    id="second_name"
                    placeholder="Segundo nombre"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="second_name"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="phone_number">
                    Número de celular <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Número de celular"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="phone_number"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="landline_phone_number">
                    Número de teléfono fijo{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="landline_phone_number"
                    id="landline_phone_number"
                    placeholder="Número de teléfono fijo"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="landline_phone_number"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="email">
                    Correo electrónico <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="residence_address">
                    Dirección de residencia
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="residence_address"
                    id="residence_address"
                    placeholder="Dirección de residencia"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="residence_address"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="department_of_residence">
                    Departamento de residencia
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={departments}
                    isClearable={false}
                    name="department_of_residence"
                    id="department_of_residence"
                    onChange={(option) => {
                      setMunicipalities(
                        municipalitiesValues.filter(
                          (muni) => muni.department === option.value
                        )[0].municipalities
                      );
                      setFieldValue("department_of_residence", option.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="department_of_residence"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="residence_municipality">
                    Municipio de residencia
                    <span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    name="residence_municipality"
                    onChange={(option) =>
                      setFieldValue("residence_municipality", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="residence_municipality"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="birth_date">
                    Fecha de nacimiento<span className="text-danger">*</span>
                  </Label>
                  <Flatpickr
                    id="hf-picker"
                    className="form-control"
                    defaultValue={new Date().toDateString()}
                    onChange={(selectedDates, dateStr, instance) => {
                      setFieldValue("birth_date", dateStr);
                    }}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d"
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="birth_date"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="profession">
                    Profesión<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="profession"
                    id="profession"
                    placeholder="Profesión"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="profession"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="civil_status">
                    Estado civil<span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={maritialStatus}
                    isClearable={false}
                    name="civil_status"
                    onChange={(option) =>
                      setFieldValue("civil_status", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="civil_status"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="sex">
                    Sexo<span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={sexValues}
                    isClearable={false}
                    name="sex"
                    onChange={(option) => setFieldValue("sex", option.value)}
                  />
                  <ErrorMessage
                    component="div"
                    name="sex"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="nationality">
                    Nacionalidad<span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={nationalities}
                    isClearable={false}
                    name="nationality"
                    onChange={(option) =>
                      setFieldValue("nationality", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="nationality"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md="12">
                  <p className="mt-2">
                    Foto del recibo de la luz (u otro recibo)
                    <span className="text-danger">*</span>
                  </p>
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="photos_of_bills"
                  />
                </Col>
                <ErrorMessage
                  component="div"
                  name="photos_of_bills"
                  className="text-danger"
                />
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

export default DatosDelSolicitante;
