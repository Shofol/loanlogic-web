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
import { agenciasValues, roles } from "../../configs/data";
import { RefreshCw, Save } from "react-feather";
import { Field, Formik } from "formik";
import Flatpickr from "react-flatpickr";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import API from "../../@core/api/api";
import { toast } from "react-hot-toast";

const estadoValues = [
  { label: "ACTIVO", value: "active" },
  { label: "DESHABILITADO", value: "disabled" }
];

const EditUser = ({ showModal, user, onClose }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [picker, setPicker] = useState(new Date());
  const [startDatepicker, setStartDatePicker] = useState(new Date());

  // const [user, setUser] = useState(selectedUser);

  useEffect(() => {
    if (user) {
      setPicker(new Date(user.date_of_birth));
      setStartDatePicker(new Date(user.start_date));
    }
  }, [user]);

  const initialValues = {
    name: user ? user.name : "",
    role: user ? user.role : "",
    agency: user ? user.agency : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    date_of_birth: user ? user.date_of_birth : "",
    start_date: user ? user.start_date : "",
    is_active: user ? user.is_active : ""
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
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const response = API.put(`user/${user.id}`, values);
              toast.promise(
                response,
                {
                  loading: "Loading",
                  success: (data) => {
                    resetForm();
                    setTimeout(() => {
                      setShow(false);
                      onClose();
                    }, 100);
                    return `Successfully saved ${data.name}`;
                  },
                  error: (err) => {
                    return `ERROR: ${formatMessage(err)}`;
                  }
                },
                {
                  style: { minWidth: "250px", fontWeight: "bold" }
                }
              );
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
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="country">
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
                        // className={classnames("react-select", {
                        //   "is-invalid": data !== null && data.country === null,
                        // })}
                        name="role"
                        onChange={(option) =>
                          setFieldValue("role", option.value)
                        }
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
                        defaultValue={
                          user
                            ? agenciasValues.filter(
                                (agency) => agency.value === user.agency
                              )[0]
                            : null
                        }
                        onChange={(option) =>
                          setFieldValue("agent", option.value)
                        }
                      />
                    </div>
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
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="phone">
                        Num. Celular <span className="text-danger">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="502-222-222"
                        invalid={errors.phone && true}
                        name="phone"
                        tag={Field}
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="hf-picker">
                        Fecha nacimiento
                      </Label>
                      <Flatpickr
                        value={picker}
                        id="hf-picker"
                        className="form-control bg-white"
                        onChange={(dateStr, instance) => {
                          setPicker(dateStr);
                          setFieldValue("date_of_birth", dateStr);
                        }}
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "d/m/Y"
                        }}
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="mb-1">
                      <Label className="form-label" for="hf-picker">
                        Fecha de ingreso
                      </Label>
                      <Flatpickr
                        value={startDatepicker}
                        id="hf-picker"
                        className="form-control bg-white"
                        onChange={(dateStr, instance) => {
                          setStartDatePicker(dateStr);
                          setFieldValue("start_date", dateStr[0]);
                        }}
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "d/m/Y"
                        }}
                      />
                    </div>
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
