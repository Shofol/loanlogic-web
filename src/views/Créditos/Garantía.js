import React, { useState } from "react";
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
import { Save, RefreshCw, Plus } from "react-feather";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { tipoDeGarantiaOptions } from "../../configs/data";

const GuaranteeForm = ({ index, setFieldValue, removeGuarantee }) => (
  <div>
    <Row>
      <Col sm="12" md="6" className="mb-1">
        <Label className="form-label">
          Tipo garantía<span className="text-danger">*</span>
        </Label>
        <Field name={`guarantees[${index}].guarantee_item`}>
          {({ field, form }) => (
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={tipoDeGarantiaOptions}
              isClearable={false}
              value={tipoDeGarantiaOptions.find(option => option.value === field.value) || ''}
              onChange={(option) => form.setFieldValue(field.name, option.value)}
            />
          )}
        </Field>
        <ErrorMessage
          component="div"
          name={`guarantees[${index}].guarantee_item`}
          className="text-danger"
        />
      </Col>
      <Col sm="6">
        <Label className="form-label">
          Descripción<span className="text-danger">*</span>
        </Label>
        <Field
          maxLength="255"
          type="textarea"
          name={`guarantees[${index}].description`}
          placeholder="Descripción"
          as={Input}
        />
        <ErrorMessage
          component="div"
          name={`guarantees[${index}].description`}
          className="text-danger"
        />
      </Col>
    </Row>

    <Row className="mt-1">
      <Col sm="6">
        <Label className="form-label">Marca<span className="text-danger">*</span></Label>
        <Field
          type="text"
          name={`guarantees[${index}].model`}
          placeholder="Marca"
          as={Input}
        />
        <ErrorMessage
          component="div"
          name={`guarantees[${index}].model`}
          className="text-danger"
        />
      </Col>

      <Col sm="6">
        <Label className="form-label">Número de serie<span className="text-danger">*</span></Label>
        <Field
          type="text"
          name={`guarantees[${index}].serial_number`}
          placeholder="Número de serie"
          as={Input}
        />
        <ErrorMessage
          component="div"
          name={`guarantees[${index}].serial_number`}
          className="text-danger"
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
          fieldName={`guarantees[${index}].photo`}
        />
        <ErrorMessage
          component="div"
          name={`guarantees[${index}].photo`}
          className="text-danger"
        />
      </Col>
    </Row>

    <Row className="mt-2">
      <Col sm="12">
        <Button.Ripple color="danger" onClick={() => removeGuarantee(index)}>
          Eliminar garantía
        </Button.Ripple>
      </Col>
    </Row>
  </div>
);

const Garantía = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guaranteeForms, setGuaranteeForms] = useState([{}]);

  const addGuaranteeForm = () => {
    setGuaranteeForms([...guaranteeForms, {}]);
  };

  const removeGuaranteeForm = (index) => {
    const updatedForms = guaranteeForms.filter((_, i) => i !== index);
    setGuaranteeForms(updatedForms);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Garantía</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            guarantees: [{ guarantee_item: "", description: "", model: "", serial_number: "", photo: [] }]
          }}
          validate={(values) => {
            const errors = { guarantees: [] };
            const requiredMsg = "Esto es requerido";

            values.guarantees.forEach((guarantee, index) => {
              const guaranteeErrors = {};
              if (!guarantee.guarantee_item) {
                guaranteeErrors.guarantee_item = requiredMsg;
              }
              if (!guarantee.description) {
                guaranteeErrors.description = requiredMsg;
              }
              if (!guarantee.model) {
                guaranteeErrors.model = requiredMsg;
              }
              if (!guarantee.serial_number) {
                guaranteeErrors.serial_number = requiredMsg;
              }
              if (guarantee.photo.length === 0) {
                guaranteeErrors.photo = requiredMsg;
              }
              if (Object.keys(guaranteeErrors).length) {
                errors.guarantees[index] = guaranteeErrors;
              }
            });

            return errors.guarantees.length ? errors : {};
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const form = new FormData();

            values.guarantees.forEach((guarantee, index) => {
              Object.keys(guarantee).forEach((key) => {
                if (key === "photo") {
                  console.log("key === photo");
                  guarantee[key].forEach((file) => {
                    console.log("file", file);
                    console.log("file.name", file.name);
                    form.append(`guarantees[${index}][${key}]`, file, file.name);
                  });
                } else {
                  form.append(`guarantees[${index}][${key}]`, guarantee[key]);
                }
              });
            });

            form.append("application_id", id);

            try {
              const response = await API.post("guarantee", form);
              toast.success(response.data.message);
              navigate(-1);
            } catch (error) {
              console.log(error);
              toast.error("Error submitting form");
            } finally {
              setSubmitting(false);
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <FieldArray
                name="guarantees"
                render={arrayHelpers => (
                  <div>
                    {values.guarantees.map((_, index) => (
                      <div key={index}>
                        <GuaranteeForm
                          index={index}
                          setFieldValue={setFieldValue}
                          removeGuarantee={() => arrayHelpers.remove(index)}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    ))}
                    <Row>
                      <Col sm="12">
                        <Button.Ripple color="primary" onClick={() => arrayHelpers.push({ guarantee_item: "", description: "", model: "", serial_number: "", photo: [] })}>
                          <Plus size={16} />
                          <span className="align-middle mx-25">Añadir garantía</span>
                        </Button.Ripple>
                      </Col>
                    </Row>
                  </div>
                )}
              />

              <Row>
                <Col sm="12">
                  <div className="d-flex justify-content-end mt-3">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      disabled={values.guarantees.length === 0 || isSubmitting} // Disable the button if no forms or submitting
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                    <Button.Ripple outline color="secondary" type="reset" onClick={resetForm}>
                      <RefreshCw size={16} />
                      <span className="align-middle mx-25">Descartar</span>
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
