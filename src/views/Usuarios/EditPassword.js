import React, { Fragment, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { Save } from "react-feather";

const EditPassword = ({ showModal, user, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await API.put(`user/password/${user.id}`, { password: values.password });

        resetForm();
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 100);

        toast.success("Password updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update password");
      }
    }
  });

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => { setShow(false); onClose(); }} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => { setShow(false); onClose(); }}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Crear nueva contraseña de usuario</h1>
          </div>
          {user && (
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={user?.name}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="family_name">Apellido</Label>
                    <Input
                      id="family_name"
                      name="family_name"
                      type="text"
                      value={user?.family_name}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user?.email}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="password">Nueva Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      invalid={formik.touched.password && formik.errors.password ? true : false}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormFeedback>{formik.errors.password}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      invalid={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button.Ripple color="primary" type="submit">
                  <Save size={16} />
                  <span className="align-middle mx-25">Guardar</span>
                </Button.Ripple>
              </div>
            </Form>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default EditPassword;
