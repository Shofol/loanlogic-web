import React, { useRef, useState, useEffect } from "react";
import ReactSlider from "react-slider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";
import "./Créditos.scss";
import { ArrowLeft, ArrowRight, Info } from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
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
import { Spanish } from "flatpickr/dist/l10n/es";
import { mapMuniValue } from "../../utility/Utils";

const DatosDelSolicitante = ({ stepper, onSubmit, data }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const munRef = useRef();

  const mapFormValues = () => {
    return {
      photos_of_bills: [],
      surname: data ? data.surname : "",
      second_surname: data ? data.second_surname : "",
      name: data ? data.name : "",
      second_name: data ? data.second_name : "",
      phone_number: data ? data.phone_number : "",
      landline_phone_number: data ? data.landline_phone_number : "",
      email: data ? data.email : "",
      residence_address: data ? data.residence_address : "",
      residence_municipality: data ? data.residence_municipality : "",
      department_of_residence: data ? data.department_of_residence : "",
      birth_date: data ? data.birth_date : null,
      profession: data ? data.profession : "",
      civil_status: data ? data.civil_status : "",
      sex: data ? data.sex : "",
      nationality: data ? data.nationality : ""
    };
  };

  const [formValues, setFormValues] = useState(mapFormValues());

  useEffect(() => {
    setFormValues(mapFormValues());
  }, [data]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">Datos del solicitante</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";
            const invalidNumber = "Numero de telefono invalido";

            if (!values.surname) {
              errors.surname = requiredMsg;
            }
            // if (!values.second_name) {
            //   errors.second_name = requiredMsg;
            // }
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
            if (
              values.phone_number &&
              values.phone_number.toString().length > 8
            ) {
              errors.phone_number = invalidNumber;
            }
            if (
              values.landline_phone_number &&
              values.landline_phone_number.toString().length > 8
            ) {
              errors.landline_phone_number = invalidNumber;
            }
            if (
              values.emai &&
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
            const occupation = localStorage.getItem("occupation");
            if (occupation === "BUSINESS") {
              stepper.to(5);
            } else if (occupation === "NOINCOME") {
              stepper.to(6);
            } else {
              stepper.next();
            }
          }}
        >
          {({ handleSubmit, setFieldValue, resetForm, values }) => (
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
                    Segundo nombre
                  </Label>
                  <Input
                    type="text"
                    name="second_name"
                    id="second_name"
                    placeholder="Segundo nombre"
                    tag={Field}
                  />
                  {/* <ErrorMessage
                    component="div"
                    name="second_name"
                    className="text-danger"
                  /> */}
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="phone_number">
                    Número de celular <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
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
                    type="number"
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
                    Correo electrónico
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
                    value={
                      departments.filter(
                        (department) =>
                          department.value === values.department_of_residence
                      )[0]
                    }
                    onChange={(option) => {
                      munRef.current.clearValue();
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
                    ref={munRef}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    name="residence_municipality"
                    value={mapMuniValue(
                      municipalitiesValues,
                      values,
                      "department_of_residence",
                      "residence_municipality"
                    )}
                    onChange={(option) =>
                      setFieldValue("residence_municipality", option?.value)
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
                    onChange={(selectedDates, dateStr, instance) => {
                      setFieldValue("birth_date", dateStr);
                    }}
                    key={values.birth_date}
                    options={{
                      locale: Spanish,
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: values.birth_date
                        ? new Date(values?.birth_date.split("T")[0])
                        : null
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
                    value={maritialStatus.filter(
                      (status) => status.value === values.civil_status
                    )}
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
                    value={sexValues.filter((sex) => sex.value === values.sex)}
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
                    value={nationalities.filter(
                      (nationality) => nationality.value === values.nationality
                    )}
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
                    Anterior
                  </span>
                </Button>
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

export default DatosDelSolicitante;
