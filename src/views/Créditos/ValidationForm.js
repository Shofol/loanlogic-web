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
  CardHeader,
  UncontrolledTooltip
} from "reactstrap";
import { Save, RefreshCw, Info } from "react-feather";
import image from "../../assets/images/portrait/small/avatar-s-11.jpg";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { Formik, Field } from "formik";

const ConfigForm = () => {
  const periodicidadValues = [
    { value: "diario", label: "Diario" },
    { value: "semanal", label: "Semanal" },
    { value: "quincenal", label: "Quincenal" },
    { value: "mensual", label: "Mensual" }
  ];

  const duraciónOptions = [
    { value: "días", label: "Días" },
    { value: "semanas", label: "Semanas" },
    { value: "meses", label: "Meses" }
  ];

  const tipoDeGarantiaOptions = [
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

  const paísOptions = [
    { value: "quetzal", label: "Guatemala - Quetzal" },
    { value: "dollar", label: "US - Dollar" }
  ];

  const agenciasPermitidasValues = [
    { value: "quetzal", label: "Mazatenango" },
    { value: "quetzaltenango", label: "Quetzaltenango" },
    { value: "coatepeque", label: "Coatepeque" },
    { value: "coban", label: "Coban" },
    { value: "guatemala", label: "Guatemala" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Validar crédito</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            tipoDeNegocio: "",
            dirección: "",
            inventario: "",
            observaste: "",
            díaDePago: "",
            garantía: "",
            comentario: "",
            evidencias: [],
            documentosRrabajo: []
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
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Tipo de negocio</dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="tipoDeNegocio"
                      id="tipoDeNegocio"
                      placeholder="Tipo de negocio"
                      tag={Field}
                    />
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Dirección*</dt>
                  </Col>
                  <Col sm="9">
                    <dd>Calle Monte Toro 30, Samayac</dd>
                    <div className="d-flex">
                      <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                        <Input
                          type="radio"
                          id="dirección-aceptar"
                          name="dirección"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("dirección", "aceptado");
                            }
                          }}
                        />
                        <Label
                          className="form-check-label"
                          for="dirección-aceptar"
                        >
                          Aceptar
                        </Label>
                      </div>
                      <div className="form-check">
                        <Input
                          type="radio"
                          name="dirección"
                          id="direcciónRechazar"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("dirección", "rechazada");
                            }
                          }}
                        />
                        <Label
                          className="form-check-label"
                          for="direcciónRechazar"
                        >
                          Rechazar
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Inventario</dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="inventario"
                      id="inventario"
                      placeholder="Inventario"
                      tag={Field}
                    />
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Día de pago</dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="díaDePago"
                      id="díaDePago"
                      placeholder="Día de pago"
                      tag={Field}
                    />
                  </Col>
                </Row>
              </dl>

              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Garantía*</dt>
                  </Col>
                  <Col sm="9">
                    <dd>
                      <img
                        className="img-fluid"
                        src={image}
                        alt={"item.name"}
                        width="100px"
                        height="100px"
                      />
                    </dd>
                    <div className="d-flex my-1">
                      <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                        <Input
                          type="radio"
                          id="garantía-aceptar"
                          name="garantía"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("garantía", "aceptado");
                            }
                          }}
                        />
                        <Label
                          className="form-check-label"
                          for="garantía-aceptar"
                        >
                          Aceptar
                        </Label>
                      </div>
                      <div className="form-check">
                        <Input
                          type="radio"
                          name="garantía"
                          id="garantíaRechazar"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("garantía", "rechazada");
                            }
                          }}
                        />
                        <Label
                          className="form-check-label"
                          for="garantíaRechazar"
                        >
                          Rechazar
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
              </dl>

              <dl>
                <Row>
                  <Col sm="2">
                    <dt>Observaste*</dt>
                  </Col>
                  <Col sm="9">
                    <div className="form-check form-check-inline">
                      <Input
                        type="checkbox"
                        id="vidriosRotos"
                        name="observaste"
                        value="vidriosRotos"
                        tag={Field}
                      />
                      <Label
                        for="vidriosRotos"
                        className="form-check-label"
                        style={{ marginRight: ".25rem" }}
                      >
                        Vidrios rotos
                      </Label>
                      <Info size={16} id="vidriosRotosTooltip" />
                      <UncontrolledTooltip
                        placement="top"
                        target="vidriosRotosTooltip"
                      >
                        Verifica si hay cristales rotos en la propiedad y
                        anótalo en los comentarios
                      </UncontrolledTooltip>
                    </div>

                    <div className="form-check form-check-inline">
                      <Input
                        type="checkbox"
                        id="postes"
                        name="observaste"
                        value="postes"
                        tag={Field}
                      />
                      <Label
                        for="postes"
                        className="form-check-label"
                        style={{ marginRight: ".25rem" }}
                      >
                        Postes
                      </Label>
                      <Info size={16} id="postesTooltip" />
                      <UncontrolledTooltip
                        placement="top"
                        target="postesTooltip"
                      >
                        Verifica si hay postes de impago en la vivienda y
                        anótalo en los comentarios
                      </UncontrolledTooltip>
                    </div>

                    <div className="form-check form-check-inline">
                      <Input
                        type="checkbox"
                        id="malasReferencias"
                        name="observaste"
                        value="malasReferencias"
                        tag={Field}
                      />
                      <Label
                        for="malasReferencias"
                        className="form-check-label"
                        style={{ marginRight: ".25rem" }}
                      >
                        Malas referencias vecinos
                      </Label>
                      <Info size={16} id="malasReferenciasTooltip" />
                      <UncontrolledTooltip
                        placement="top"
                        target="malasReferenciasTooltip"
                      >
                        Habla con los vecinos para pedir referencias y anótalo
                        en los comentarios
                      </UncontrolledTooltip>
                    </div>
                  </Col>
                </Row>
              </dl>

              <Row>
                <Col sm="2">
                  <p className="fw-bold">
                    Evidencias <br />
                    (fotos de la casa, poste más cercano)
                  </p>
                </Col>
                <Col sm="4">
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="evidencias"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="2">
                  <p className="fw-bold">
                    Documentos que acrediten donde trabaja*
                  </p>
                </Col>
                <Col sm="4">
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="documentosRrabajo"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="2">
                  <p className="fw-bold">Analizar riesgo</p>
                </Col>
                <Col sm="4">
                  <div>
                    <Label className="form-label" for="textarea-counter">
                      Comentario
                    </Label>
                    <Input
                      name="comentario"
                      // value={value}
                      type="textarea"
                      id="comentario"
                      placeholder="Comentario"
                      // style={{ minHeight: "100px" }}
                      // tag={Field}
                      onBlur={(e) => {
                        setFieldValue("comentario", e.target.value);
                      }}
                      // className={classnames({ "text-danger": value.length > 20 })}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col sm="2">
                  <p className="fw-bold">Aceptar crédito*</p>
                </Col>
                <Col sm="4 d-flex gap-3">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="aceptar-active"
                      name="aceptarCrédito"
                      onChange={(e) => {
                        if (e.currentTarget.value === "on") {
                          setFieldValue("aceptarCrédito", "aceptado");
                        }
                      }}
                    />
                    <Label className="form-check-label" for="aceptar-active">
                      Aceptar
                    </Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="rechazar"
                      name="aceptarCrédito"
                      onChange={(e) => {
                        if (e.currentTarget.value === "on") {
                          setFieldValue("aceptarCrédito", "rechazada");
                        }
                      }}
                    />
                    <Label className="form-check-label" for="rechazar">
                      Rechazar
                    </Label>
                  </div>
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
export default ConfigForm;
