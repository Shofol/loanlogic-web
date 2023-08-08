import React, { useEffect, useState } from "react";
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
import { Formik, Field, ErrorMessage } from "formik";
import API from "../../@core/api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ImageModal from "../../@core/components/imageModal/imageModal";

const ValidationForm = () => {
  const [dirección, setDirección] = useState("");
  const [garantía, setGarantía] = useState([]);
  const [zoomed, setZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, []);

  const { id } = useParams();

  const fetchApplication = async () => {
    const response = await API.get(`credit-application/${id}`);
    const application = response.data.data;
    setDirección(
      application.client.residence_address +
        ", " +
        application.client.residence_municipality
    );

    if (application.guarantee && application.guarantee.photo) {
      setGarantía(application.guarantee.photo);
    } else {
      setGarantía(application.gurrentee_items.photo);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Validar crédito</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            business_type: null,
            address_approved: null,
            inventory: null,
            observations: [],
            payment_day: null,
            guarantee_approved: null,
            comment: null,
            evidences: [],
            work_documents: [],
            credit_approval: null
          }}
          validate={(values) => {
            const errors = {};
            const requiredMsg = "Esto es requerido";

            if (!values.business_type) {
              errors.business_type = requiredMsg;
            }
            if (values.address_approved === null) {
              errors.address_approved = requiredMsg;
            }
            if (!values.inventory) {
              errors.inventory = requiredMsg;
            }
            if (values.observations.length === 0) {
              errors.observations = requiredMsg;
            }
            if (!values.payment_day) {
              errors.payment_day = requiredMsg;
            }
            if (values.guarantee_approved === null) {
              errors.guarantee_approved = requiredMsg;
            }
            if (values.comment === null) {
              errors.comment = requiredMsg;
            }
            if (values.credit_approval === null) {
              errors.credit_approval = requiredMsg;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const form = new FormData();

            Object.entries(values).map((pair) => {
              if (pair[0] === "evidences" || pair[0] === "work_documents") {
                values[`${pair[0]}`].map((file) => {
                  form.append(`${pair[0]}`, file);
                });
              } else if (pair[0] === "observations") {
                form.append(`${pair[0]}`, JSON.stringify(pair[1]));
              } else {
                form.append(pair[0], pair[1]);
              }
            });

            const response = API.post(`credit/validation/${id}`, form);
            toast.promise(
              response,
              {
                loading: "Loading",
                success: (data) => {
                  resetForm();
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
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Tipo de negocio <span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="business_type"
                      id="business_type"
                      placeholder="Tipo de negocio"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="business_type"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Dirección<span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="9">
                    <dd>{dirección}</dd>
                    <div className="d-flex">
                      <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                        <Input
                          type="radio"
                          id="dirección-aceptar"
                          name="address_approved"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("address_approved", true);
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
                          name="address_approved"
                          id="direcciónRechazar"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("address_approved", false);
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
                    <ErrorMessage
                      component="div"
                      name="address_approved"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Inventario<span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="inventory"
                      id="inventory"
                      placeholder="Inventario"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="inventory"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </dl>
              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Día de pago<span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="4">
                    <Input
                      type="text"
                      name="payment_day"
                      id="payment_day"
                      placeholder="Día de pago"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="payment_day"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </dl>

              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Garantía<span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="9">
                    <dd>
                      {garantía &&
                        garantía.length > 0 &&
                        garantía.map((photo) => {
                          return (
                            <img
                              key={photo}
                              className="img-fluid cursor-pointer"
                              src={photo}
                              alt={"Garantía photo"}
                              width="300px"
                              // height="100px"
                              onClick={(e) => {
                                setZoomed(true);
                                setZoomedImage(photo);
                              }}
                            />
                          );
                        })}
                      <ImageModal
                        image={zoomedImage}
                        isOpen={zoomed}
                        closeZoom={(e) => {
                          setZoomed(false);
                        }}
                      />
                    </dd>
                    <div className="d-flex my-1">
                      <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                        <Input
                          type="radio"
                          id="garantía-aceptar"
                          name="guarantee_approved"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("guarantee_approved", true);
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
                          name="guarantee_approved"
                          id="garantíaRechazar"
                          onChange={(e) => {
                            if (e.currentTarget.value === "on") {
                              setFieldValue("guarantee_approved", false);
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
                    <ErrorMessage
                      component="div"
                      name="guarantee_approved"
                      className="text-danger"
                    />
                  </Col>
                </Row>
              </dl>

              <dl>
                <Row>
                  <Col sm="2">
                    <dt>
                      Observaste<span className="text-danger">*</span>
                    </dt>
                  </Col>
                  <Col sm="9">
                    <div className="form-check form-check-inline">
                      <Input
                        type="checkbox"
                        id="vidriosRotos"
                        name="observations"
                        value="vidriosRotos"
                        // tag={Field}
                        onChange={(e) => {
                          setFieldValue(
                            "observations",
                            e.target.checked === true
                              ? [...values.observations, e.target.value]
                              : [
                                  ...values.observations.filter(
                                    (ob) => ob !== e.target.value
                                  )
                                ]
                          );
                        }}
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
                        name="observations"
                        value="postes"
                        // tag={Field}
                        onChange={(e) => {
                          setFieldValue(
                            "observations",
                            e.target.checked === true
                              ? [...values.observations, e.target.value]
                              : [
                                  ...values.observations.filter(
                                    (ob) => ob !== e.target.value
                                  )
                                ]
                          );
                        }}
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
                        name="observations"
                        value="malasReferencias"
                        // tag={Field}
                        onChange={(e) => {
                          setFieldValue(
                            "observations",
                            e.target.checked === true
                              ? [...values.observations, e.target.value]
                              : [
                                  ...values.observations.filter(
                                    (ob) => ob !== e.target.value
                                  )
                                ]
                          );
                        }}
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
                    <ErrorMessage
                      component="div"
                      name="observations"
                      className="text-danger"
                    />
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
                    fieldName="evidences"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="2">
                  <p className="fw-bold">
                    Documentos que acrediten donde trabaja
                  </p>
                </Col>
                <Col sm="4">
                  <FileUploaderMultiple
                    setFieldValue={setFieldValue}
                    fieldName="work_documents"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="2">
                  <p className="fw-bold">
                    Analizar riesgo<span className="text-danger">*</span>
                  </p>
                </Col>
                <Col sm="4">
                  <div>
                    <Label className="form-label" for="textarea-counter">
                      Comentario
                    </Label>
                    <Input
                      name="comment"
                      // value={value}
                      type="textarea"
                      id="comment"
                      placeholder="Comentario"
                      // style={{ minHeight: "100px" }}
                      // tag={Field}
                      onBlur={(e) => {
                        setFieldValue("comment", e.target.value);
                      }}
                      // className={classnames({ "text-danger": value.length > 20 })}
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="comment"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col sm="2">
                  <p className="fw-bold">
                    Aceptar crédito<span className="text-danger">*</span>
                  </p>
                </Col>
                <Col sm="4 d-flex gap-3">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="aceptar-active"
                      name="credit_approval"
                      onChange={(e) => {
                        if (e.currentTarget.value === "on") {
                          setFieldValue("credit_approval", true);
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
                      name="credit_approval"
                      onChange={(e) => {
                        if (e.currentTarget.value === "on") {
                          setFieldValue("credit_approval", false);
                        }
                      }}
                    />
                    <Label className="form-check-label" for="rechazar">
                      Rechazar
                    </Label>
                  </div>
                </Col>
                <ErrorMessage
                  component="div"
                  name="credit_approval"
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
                    <Button.Ripple
                      outline
                      color="secondary"
                      type="reset"
                      onClick={resetForm}
                    >
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
export default ValidationForm;
