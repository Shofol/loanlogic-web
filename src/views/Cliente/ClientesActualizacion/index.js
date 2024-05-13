import React, { useRef, useState, useEffect } from "react";
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
import Select from "react-select";
import { selectThemeColors } from "@utils";
import {
  departments,
  maritialStatus,
  municipalitiesValues,
  nationalities,
  sexValues
} from "../../../configs/data";
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { Spanish } from "flatpickr/dist/l10n/es";
import { mapMuniValue } from "../../../utility/Utils";
import API from "../../../@core/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ClientesActualizacion = () => {
  let { id } = useParams();
  const [municipalities, setMunicipalities] = useState([]);
  const munRef = useRef();
  const [data, setData] = useState(null);
  const [dpi_number, setDpiNumber] = useState(null);

  const mapFormValues = () => {
    return {
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
      expiration_date: data ? data.expiration_date : null,
      profession: data ? data.profession : "",
      civil_status: data ? data.civil_status : "",
      sex: data ? data.sex : "",
      nationality: data ? data.nationality : ""
    };
  };

  const [formValues, setFormValues] = useState(mapFormValues());

  /*
  useEffect(() => {
    setFormValues(mapFormValues());
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [id]);*/

  useEffect(() => {
    //if (id) {
    fetchData();
    //} else {
    //console.log("SET FORM VALUES => USE EFFECT ", mapFormValues())
    //setFormValues(mapFormValues());
    //}
  }, [id]);

  const fetchData = async () => {
    console.log("FETCHING DATA")
    const response = await API.get(`client/${id}`);
    console.log("SET FORM VALUES => DATA ", response.data.data)
    setFormValues(response.data.data);
    if (response.data.data.dpi_number) {
      setDpiNumber(response.data.data.dpi_number);
    }
  };

  function customValues(data) {
    return {
      name: data.name,
      second_name: data.second_name,
      surname: data.surname,
      second_surname: data.second_surname,
      phone_number: data.phone_number,
      landline_phone_number: data.landline_phone_number,
      email: data.email,
      residence_address: data.residence_address,
      residence_municipality: data.residence_municipality,
      department_of_residence: data.department_of_residence,
      birth_date: data.birth_date,
      expiration_date: data.expiration_date,
      profession: data.profession,
      civil_status: data.civil_status,
      sex: data.sex,
      nationality: data.nationality,
    }
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Actualizar datos cliente:
            <div className="text-center">DPI: {dpi_number}</div>
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

              if (!values.surname) {
                errors.surname = requiredMsg;
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
                errors.sex = requiredMsg;
              }
              if (!values.expiration_date) {
                errors.expiration_date = requiredMsg;
              }
              if (!values.civil_status) {
                errors.civil_status = requiredMsg;
              }
              if (!values.nationality) {
                errors.nationality = requiredMsg;
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              //onSubmit(values);
              try {
                const response = await API.put(`/client/edit/${id}`, customValues(values));
                setData(response.data.data);
                console.log("SUCCESS TOAS", response.data.message)
                toast.success(response.data.message);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {/*{({ handleSubmit, setFieldValue, resetForm, values }) 
            */}
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              resetForm
              /* and other goodies */
            }) => (
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
                        altFormat: "j F Y",
                        dateFormat: "Y-m-d",
                        defaultDate: values?.birth_date
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
                    <Label className="form-label" for="expiration_date">
                      Fecha de vencimiento del DPI<span className="text-danger">*</span>
                    </Label>
                    <Flatpickr
                      id="hf-picker"
                      className="form-control"
                      onChange={(selectedDates, dateStr, instance) => {
                        setFieldValue("expiration_date", dateStr);
                      }}
                      key={values.expiration_date}
                      options={{
                        locale: Spanish,
                        altInput: true,
                        altFormat: "j F Y",
                        dateFormat: "Y-m-d",
                        defaultDate: values?.expiration_date
                          ? new Date(values?.expiration_date.split("T")[0])
                          : null
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="expiration_date"
                      className="text-danger"
                    />
                  </Col>

                </Row>
                <Row className="mt-1">
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


                <div className="d-flex justify-content-end mt-2">

                  <Button
                    type="submit"
                    color="primary"
                    className="btn-next"
                  //onClick={submit}
                  >
                    <span className="align-middle d-sm-inline-block d-none">
                      Guardar
                    </span>

                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClientesActualizacion;
