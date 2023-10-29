// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Form,
  FormText
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { User, Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { agenciasValues, categoríaValues, roles } from "../../configs/data";
import { RefreshCw, Save } from "react-feather";
import { ErrorMessage, Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { convertDateWithTimeZone } from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import { formatMessage } from "../../utility/functions/formatMessage";

const estadoValues = [
  { label: "ACTIVO", value: "active" },
  { label: "DESHABILITADO", value: "disabled" }
];

const EditUser = ({ showModal, user, onClose }) => {
  // ** States
  const [show, setShow] = useState(false);
  const date = convertDateWithTimeZone(new Date());

  const initialValues = {
    name: user ? user.name : "",
    family_name: user ? user.family_name : "",
    role: user ? user.role : "",
    agency: user ? user.agency : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    category: user ? user.category : "",
    date_of_birth: user ? user.date_of_birth : new Date(date),
    start_date: user ? user.start_date : new Date(date),
    is_active: user ? user.is_active : ""
  };

  const getAgencyValue = (agency) => {
    let values = [];
    agency.map((item) => {
      values = [
        ...values,
        agenciasValues.filter((agen) => agen.value === item)[0]
      ];
    });
    return values;
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => {
          setShow(false);
          onClose();
        }}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => {
            setShow(false);
            onClose();
          }}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Editar información de usuario</h1>
            {/* <p>Updating user details will receive a privacy audit.</p> */}
          </div>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const requiredMsg = "Esto es requerido";
              const invalidNumber = "Numero de telefono invalido";

              const errors = {};
              if (!values.email) {
                errors.email = requiredMsg;
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.name) {
                errors.name = requiredMsg;
              }
              if (!values.family_name) {
                errors.family_name = requiredMsg;
              }
              if (!values.role) {
                errors.role = requiredMsg;
              }
              if (!values.agency) {
                errors.agency = requiredMsg;
              }
              if (!values.phone) {
                errors.phone = requiredMsg;
              }
              if (values.phone && values.phone.toString().length > 8) {
                errors.phone = invalidNumber;
              }
              if (values.is_active === "") {
                errors.is_active = requiredMsg;
              }
              if (
                values.role === "Agente de cobranza" ||
                (values.role === "Promotor" && !values.category)
              ) {
                errors.category = requiredMsg;
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await API.put(`user/${user.id}`, values);

                resetForm();
                setTimeout(() => {
                  setShow(false);
                  onClose();
                }, 100);

                toast.success(`Successfully saved`);
              } catch (error) {
                console.log(error);
              }
            }}
          >
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
                <Row>
                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="nombre">
                        Nombre <span className="text-danger">*</span>
                      </Label>

                      <Input
                        id="nombre"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        invalid={errors.fullName && true}
                        tag={Field}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="apellido">
                        Apellido <span className="text-danger">*</span>
                      </Label>

                      <Input
                        id="apellido"
                        name="family_name"
                        type="text"
                        placeholder="Doe"
                        tag={Field}
                      />
                      <ErrorMessage
                        component="div"
                        name="family_name"
                        className="text-danger"
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="role">
                        Rol <span className="text-danger">*</span>
                      </Label>
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={roles}
                        theme={selectThemeColors}
                        defaultValue={
                          user
                            ? roles.filter(
                                (role) => role.value === user.role
                              )[0]
                            : null
                        }
                        name="role"
                        id="role"
                        onChange={(option) =>
                          setFieldValue("role", option.value)
                        }
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="role"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="country">
                        Categoría
                      </Label>
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={categoríaValues}
                        defaultValue={
                          user
                            ? categoríaValues.filter(
                                (category) => category.value === user.category
                              )[0]
                            : null
                        }
                        theme={selectThemeColors}
                        name="category"
                        onChange={(option) =>
                          setFieldValue("category", option.value)
                        }
                      />
                      <ErrorMessage
                        component="div"
                        name="category"
                        className="text-danger"
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="country">
                        Oficina <span className="text-danger">*</span>
                      </Label>
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={agenciasValues}
                        theme={selectThemeColors}
                        name="agency"
                        isMulti
                        defaultValue={
                          user && user.agency
                            ? getAgencyValue(user.agency)
                            : null
                        }
                        onChange={(option) =>
                          // setFieldValue("agency", option.value)
                          setFieldValue(
                            "agency",
                            option.map((option) => option.value)
                          )
                        }
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="agency"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="userEmail">
                        Email <span className="text-danger">*</span>
                      </Label>

                      <Input
                        type="email"
                        id="userEmail"
                        placeholder="john.doe@example.com"
                        invalid={errors.email && true}
                        name="email"
                        tag={Field}
                      />

                      <FormText color="muted">
                        You can use letters, numbers & periods
                      </FormText>
                    </div>
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="phone">
                        Num. Celular <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        id="phone"
                        placeholder="502-222-222"
                        invalid={errors.phone && true}
                        name="phone"
                        tag={Field}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="hf-picker">
                        Fecha nacimiento
                      </Label>
                      <Flatpickr
                        id="hf-picker"
                        className="form-control bg-white"
                        onChange={(dateStr, instance) => {
                          setFieldValue(
                            "date_of_birth",
                            new Date(dateStr[0]).toLocaleDateString("en-CA")
                          );
                        }}
                        options={{
                          locale: Spanish,
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "d/m/Y",
                          defaultDate: new Date(
                            user?.date_of_birth.split("T")[0]
                          )
                        }}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="date_of_birth"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="hf-picker">
                        Fecha de ingreso
                      </Label>
                      <Flatpickr
                        id="hf-picker"
                        className="form-control bg-white"
                        onChange={(dateStr, instance) => {
                          setFieldValue(
                            "start_date",
                            new Date(dateStr[0]).toLocaleDateString("en-CA")
                          );
                        }}
                        options={{
                          locale: Spanish,
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "d/m/Y",
                          defaultDate: new Date(user?.start_date.split("T")[0])
                        }}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="start_date"
                      className="text-danger"
                    />
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="country">
                        Estado <span className="text-danger">*</span>
                      </Label>
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={estadoValues}
                        theme={selectThemeColors}
                        name="is_active"
                        defaultValue={
                          user
                            ? user.is_active
                              ? estadoValues[0]
                              : estadoValues[1]
                            : null
                        }
                        onChange={(option) =>
                          setFieldValue(
                            "is_active",
                            option.value === estadoValues[0].value
                              ? true
                              : false
                          )
                        }
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="is_active"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button.Ripple color="primary" type="submit">
                    {/* className="me-1" */}
                    <Save size={16} />
                    <span className="align-middle mx-25">Guardar</span>
                  </Button.Ripple>
                  {/* <Button.Ripple
                    outline
                    color="secondary"
                    type="reset"
                    onClick={() => {
                      resetForm();
                      setUser();
                    }}
                  >
                    <RefreshCw size={16} />
                    <span className="align-middle mx-25">Descartar</span>
                  </Button.Ripple> */}
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default EditUser;
