import React, { useState } from "react";
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
  municipalitiesValues,
  wantCredit
} from "../../configs/data";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DPINIT = ({ stepper, onSubmit }) => {
  const [municipalities, setMunicipalities] = useState([]);

  return (
    <div>
      <CardHeader>
        <CardTitle tag="h4">DPI & NIT</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            dpi_number: "",
            place_of_birth_city: "",
            place_of_birth_region: "",
            neighborhood_city: "",
            neighborhood_region: "",
            expiration_date: new Date(),
            photos_of_the_dpi: "",
            nit: "",
            is_have_credit: "",
            credit_institutions_and_amount: ""
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";

            if (!values.dpi_number) {
              errors.dpi_number = requiredMsg;
            }

            if (!values.place_of_birth_city) {
              errors.place_of_birth_city = requiredMsg;
            }
            if (!values.place_of_birth_region) {
              errors.place_of_birth_region = requiredMsg;
            }
            if (!values.neighborhood_city) {
              errors.neighborhood_city = requiredMsg;
            }
            if (!values.neighborhood_region) {
              errors.neighborhood_region = requiredMsg;
            }
            if (!values.expiration_date) {
              errors.expiration_date = requiredMsg;
            }
            if (!values.nit) {
              errors.nit = requiredMsg;
            }
            if (!values.is_have_credit) {
              errors.is_have_credit = requiredMsg;
            }
            if (
              values.is_have_credit === "yes" &&
              !values.credit_institutions_and_amount
            ) {
              errors.credit_institutions_and_amount = requiredMsg;
            }
            if (
              !values.photos_of_the_dpi ||
              values.photos_of_the_dpi.length === 0
            ) {
              errors.photos_of_the_dpi = requiredMsg;
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
          {({ handleSubmit, setFieldValue, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="dpi_number">
                    Número DPI<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="dpi_number"
                    id="dpi_number"
                    placeholder="Número DPI"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="dpi_number"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3" className="mt-2 d-flex justify-content-end">
                  <p>
                    Lugar de nacimiento <br />
                    (departamento, municipio)
                    <span className="text-danger">*</span>
                  </p>
                </Col>

                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="place_of_birth_city">
                    Departamento
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={departments}
                    isClearable={false}
                    name="place_of_birth_city"
                    id="place_of_birth_city"
                    onChange={(option) => {
                      setMunicipalities(
                        municipalitiesValues.filter(
                          (muni) => muni.department === option.value
                        )[0].municipalities
                      );
                      setFieldValue("place_of_birth_city", option.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="place_of_birth_city"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="place_of_birth_region">
                    Municipio
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    id="place_of_birth_region"
                    name="place_of_birth_region"
                    onChange={(option) =>
                      setFieldValue("place_of_birth_region", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="place_of_birth_region"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="expiration_date">
                    Fecha vencimiento<span className="text-danger">*</span>
                  </Label>
                  <Flatpickr
                    id="hf-picker"
                    className="form-control"
                    onChange={(selectedDates, dateStr, instance) => {
                      setFieldValue("expiration_date", dateStr);
                    }}
                    name="expiration_date"
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: new Date()
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="expiration_date"
                    className="text-danger"
                  />
                </Col>
                <Col sm="3" className="mt-2 d-flex justify-content-end">
                  <p>
                    Vecindad<span className="text-danger">*</span>
                  </p>
                </Col>
                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="neighborhood_city">
                    Departamento
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={departments}
                    isClearable={false}
                    name="neighborhood_city"
                    id="neighborhood_city"
                    onChange={(option) => {
                      setMunicipalities(
                        municipalitiesValues.filter(
                          (muni) => muni.department === option.value
                        )[0].municipalities
                      );
                      setFieldValue("neighborhood_city", option.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="neighborhood_city"
                    className="text-danger"
                  />
                </Col>

                <Col sm="3" className="mt-2">
                  <Label className="form-label" for="neighborhood_region">
                    Municipio
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={municipalities}
                    isClearable={false}
                    id="neighborhood_region"
                    name="neighborhood_region"
                    onChange={(option) =>
                      setFieldValue("neighborhood_region", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="neighborhood_region"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md="12">
                  <p className="mt-2">
                    Foto ambos lados del DPI
                    <span className="text-danger">*</span>
                  </p>
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="photos_of_the_dpi"
                  />
                  <ErrorMessage
                    component="div"
                    name="photos_of_the_dpi"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-4 d-flex align-items-end">
                <Col sm="3">
                  <Label className="form-label" for="nit">
                    NIT<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="nit"
                    id="nit"
                    placeholder="NIT"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="nit"
                    className="text-danger"
                  />
                </Col>
                <Col sm="5">
                  <Label className="form-label" for="assistance_expenses">
                    Tiene crédito con alguna institución financiera o con
                    personas individuales?<span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={wantCredit}
                    isClearable={false}
                    name="is_have_credit"
                    onChange={(option) =>
                      setFieldValue("is_have_credit", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="is_have_credit"
                    className="text-danger"
                  />
                </Col>
                <Col sm="4">
                  <Label
                    className="form-label"
                    for="credit_institutions_and_amount"
                  >
                    Si la respuesta es sí, indicar las instituciones y mon{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="textarea"
                    name="credit_institutions_and_amount"
                    id="credit_institutions_and_amount"
                    placeholder="Si la respuesta es sí, indicar las instituciones y monto"
                    tag={Field}
                  />
                  <ErrorMessage
                    component="div"
                    name="credit_institutions_and_amount"
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

export default DPINIT;
