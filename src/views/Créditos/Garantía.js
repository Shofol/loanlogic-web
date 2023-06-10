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
import { Formik, Field } from "formik";

const Garantía = () => {
  const tipoGarantíaValues = [
    { value: "fiduciaria", label: "Fiduciaria (firma contrato)" },
    {
      value: "prendaria",
      label: "Prendaria (el cliente la puede seguir utilizando)"
    },
    { value: "cheque", label: "Cheque (entrega como garantia en la agencia)" },
    {
      value: "mobiliaria",
      label:
        "Mobiliaria (registro formal ante el registro mercantil, pero el cliente puede seguir utilizando)"
    },
    {
      value: "hipotecaria",
      label: "Hipotecaria (se crea un gravamen sobre la propiedad)"
    },
    {
      value: "compraVenta",
      label: "Compra-venta (si no me pagas, me quedo con la casa para venderla)"
    },
    {
      value: "empeño",
      label:
        "Empeño (igual que la prendaria pero se queda en posesión por Al Chilazo)"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Garantía</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            tipoGarantía: "",
            descripción: "",
            modelo: "",
            númeroDeSérie: "",
            fotoGarantía: []
          }}
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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
            setFieldValue
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label">Tipo garantía*</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={tipoGarantíaValues[0]}
                    options={tipoGarantíaValues}
                    isClearable={false}
                    name="tipoGarantía"
                    onChange={(option) =>
                      setFieldValue("tipoGarantía", option.value)
                    }
                  />
                </Col>
                <Col sm="6">
                  <Label className="form-label">Descripción*</Label>
                  <Input
                    type="textarea"
                    name="descripción"
                    id="descripción"
                    placeholder="Descripción"
                    onBlur={(e) => {
                      setFieldValue("descripción", e.target.value);
                    }}
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="6">
                  <Label className="form-label">Modelo</Label>
                  <Input
                    type="text"
                    name="modelo"
                    id="modelo"
                    placeholder="Modelo"
                    tag={Field}
                  />
                </Col>

                <Col sm="6">
                  <Label className="form-label">Número de série</Label>
                  <Input
                    type="text"
                    name="númeroDeSérie"
                    id="númeroDeSérie"
                    placeholder="Número de série"
                    tag={Field}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col sm="6">
                  <p className="fs-6">Foto de la garantía*</p>
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="fotoGarantía"
                  />
                </Col>
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
