import React from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader
} from "reactstrap";
import { Save, RefreshCw } from "react-feather";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { Formik, Field, ErrorMessage } from "formik";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import { useParams } from "react-router-dom";
import { tipoDeGarantiaOptions } from "../../configs/data";

const Garantía = () => {
  const { id } = useParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Garantía</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            guarantee_item: "",
            description: "",
            model: "",
            serial_number: "",
            photo: []
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";

            if (!values.guarantee_item) {
              errors.guarantee_item = requiredMsg;
            }
            if (!values.description) {
              errors.description = requiredMsg;
            }
            if (values.photo.length === 0) {
              errors.photo = requiredMsg;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const form = new FormData();

            Object.keys(values).map((key) => {
              if (key === "photo") {
                values[`${key}`].map((file) => {
                  form.append(key, file);
                });
              } else {
                form.append(key, values[`${key}`]);
              }
            });

            form.append("application_id", id);

            const response = API.post("guarantee", form);
            toast.promise(
              response,
              {
                loading: "Loading",
                success: (data) => {
                  resetForm();
                  return `${data.data.message}`;
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
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label">
                    Tipo garantía<span className="text-danger">*</span>
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    options={tipoDeGarantiaOptions}
                    isClearable={false}
                    name="guarantee_item"
                    onChange={(option) =>
                      setFieldValue("guarantee_item", option.value)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="guarantee_item"
                    className="text-danger"
                  />
                </Col>
                <Col sm="6">
                  <Label className="form-label">
                    Descripción<span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    onBlur={(e) => {
                      setFieldValue("description", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    component="div"
                    name="description"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="6">
                  <Label className="form-label">Modelo</Label>
                  <Input
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Modelo"
                    tag={Field}
                  />
                </Col>

                <Col sm="6">
                  <Label className="form-label">Número de série</Label>
                  <Input
                    type="text"
                    name="serial_number"
                    id="serial_number"
                    placeholder="Número de série"
                    tag={Field}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col sm="6">
                  <p className="fs-6">
                    Foto de la garantía<span className="text-danger">*</span>
                  </p>
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="photo"
                  />
                </Col>
                <ErrorMessage
                  component="div"
                  name="photo"
                  className="text-danger"
                />
              </Row>

              <Row>
                <Col sm="12">
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      // onClick={(e) => e.preventDefault()}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                    <Button.Ripple outline color="secondary" type="reset">
                      <RefreshCw size={16} />
                      <span className="align-middle mx-25" onClick={resetForm}>
                        Descartar
                      </span>
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default Garantía;
