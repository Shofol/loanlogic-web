import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import FileListViewer from "../../@core/components/fileListViewer";
import { Info } from "react-feather";
import moment from "moment";

const CreditValidation = ({ validation }) => {
  return (
    <Card className="p-2">
      <CardTitle className="text-center">Validación de crédito</CardTitle>
      <div className="text-center">{validation ? moment(validation?.createdAt).format("HH:mm:ss DD/MM/YYYY"): ''}</div>
      <CardBody>
        <Form>
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
                  defaultValue={validation?.business_type}
                  disabled
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
                <div className="d-flex">
                  <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                    <Input
                      type="radio"
                      id="dirección-aceptar"
                      name="address_approved"
                      checked={validation?.address_approved === true}
                      disabled
                    />
                    <Label className="form-check-label" for="dirección-aceptar">
                      Aceptar
                    </Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="radio"
                      name="address_approved"
                      id="direcciónRechazar"
                      checked={validation?.address_approved !== true}
                      disabled
                    />
                    <Label className="form-check-label" for="direcciónRechazar">
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
                  defaultValue={validation?.inventory}
                  disabled
                />
              </Col>
            </Row>
          </dl>
          <dl>
            <Row>
              <Col sm="2">
                <dt>
                  Modalidad de pago<span className="text-danger">*</span>
                </dt>
              </Col>
              <Col sm="4">
                <Input
                  maxLength="255"
                  type="textarea"
                  name="payment_day"
                  id="payment_day"
                  placeholder="Modalidad de pago"
                  defaultValue={validation?.payment_day}
                  disabled
                />
              </Col>
            </Row>
          </dl>

          <dl>
            <Row>
              <Col sm="2" className="my-1">
                <dt>
                  Garantía<span className="text-danger">*</span>
                </dt>
              </Col>
              <Col sm="9">
                <div className="d-flex my-1">
                  <div className="form-check mb-sm-2 mb-md-0 me-md-3">
                    <Input
                      type="radio"
                      id="garantía-aceptar"
                      name="guarantee_approved"
                      checked={validation?.guarantee_approved === true}
                      disabled
                    />
                    <Label className="form-check-label" for="garantía-aceptar">
                      Aceptar
                    </Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="radio"
                      name="guarantee_approved"
                      id="garantíaRechazar"
                      checked={validation?.guarantee_approved !== true}
                      disabled
                    />
                    <Label className="form-check-label" for="garantíaRechazar">
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
                <dt>Observaciones</dt>
              </Col>
              <Col sm="9">
                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    id="vidriosRotos"
                    name="observations"
                    checked={validation?.observations.includes("vidriosRotos")}
                    disabled
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
                    Verifica si hay cristales rotos en la propiedad y anótalo en
                    los comentarios
                  </UncontrolledTooltip>
                </div>

                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    id="postes"
                    name="observations"
                    checked={validation?.observations.includes("postes")}
                    disabled
                  />
                  <Label
                    for="postes"
                    className="form-check-label"
                    style={{ marginRight: ".25rem" }}
                  >
                    Postes
                  </Label>
                  <Info size={16} id="postesTooltip" />
                  <UncontrolledTooltip placement="top" target="postesTooltip">
                    Verifica si hay postes de impago en la vivienda y anótalo en
                    los comentarios
                  </UncontrolledTooltip>
                </div>

                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    id="malasReferencias"
                    name="observations"
                    checked={validation?.observations.includes(
                      "malasReferencias"
                    )}
                    disabled
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
                    Habla con los vecinos para pedir referencias y anótalo en
                    los comentarios
                  </UncontrolledTooltip>
                </div>
              </Col>
            </Row>
          </dl>

          <dl>
            <Row>
              <Col sm="2">
                <dt>Comentarios observaciones</dt>
              </Col>
              <Col sm="4">
                <Input
                  type="text"
                  name="comment_observations"
                  id="comment_observations"
                  placeholder="Comentarios observaciones"
                  defaultValue={validation?.comment_observations}
                  disabled
                />
              </Col>
            </Row>
          </dl>

          <Row>
            <Col sm="2">
              <p className="fw-bold">Fotos de la casa</p>
            </Col>
            <Col sm="4">
              {validation &&
                validation.evidences &&
                validation.evidences.length > 0 && (
                  <div className="d-flex">
                    <FileListViewer file={validation.evidences} />
                  </div>
                )}
            </Col>
          </Row>

          <Row>
            <Col sm="2">
              <p className="fw-bold">Fotos del negocio</p>
            </Col>
            <Col sm="4">
              {validation &&
                validation.work_documents &&
                validation.work_documents.length > 0 && (
                  <div className="d-flex">
                    <FileListViewer file={validation.work_documents} />
                  </div>
                )}
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
                  maxLength="255"
                  name="comment"
                  type="textarea"
                  id="comment"
                  placeholder="Comentario"
                  defaultValue={validation?.comment}
                  disabled
                />
              </div>
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
                  checked={validation?.credit_approval === true}
                  disabled
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
                  checked={validation?.credit_approval !== true}
                  disabled
                />
                <Label className="form-check-label" for="rechazar">
                  Rechazar
                </Label>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
                <Col md="6" className="d-flex align-items-center gap-2">
                  <p>
                    Coordenadas GPS: Dirección formulario validación del crédito
                  </p>
                </Col>
                <Col md="4" className="d-flex align-items-center gap-2">
                  {validation?.validation_latitude ? (
                    <a
                      className="text-green"
                      target="_blank"
                      href={`https://www.google.com/maps/place/${validation?.validation_latitude},${validation?.validation_longitude}`}
                    >
                      Latitud: {validation?.validation_latitude} <br />
                      Longitud: {validation?.validation_longitude}
                    </a>
                  ) : (
                    "Sin coordenadas GPS"
                  )}

                </Col>
              </Row>

        </Form>

        {/* <Row>
          <Col sm="4" className="mb-1">
            <Label className="form-label" for="id">
              ID
            </Label>
            <Input type="text" id="id" disabled defaultValue={validation?.id} />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="business_type">
              Business type
            </Label>
            <Input
              type="text"
              id="business_type"
              disabled
              defaultValue={validation?.business_type}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="address_approved">
              Address approved
            </Label>
            <Input
              type="text"
              id="address_approved"
              disabled
              defaultValue={validation?.address_approved}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="inventory">
              Inventory
            </Label>
            <Input
              type="text"
              id="inventory"
              disabled
              defaultValue={validation?.inventory}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="observations">
              Observations
            </Label>
            <Input
              type="text"
              id="observations"
              disabled
              defaultValue={validation?.observations.join(", ")}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="payment_day">
              Payment day
            </Label>
            <Input
              type="text"
              id="payment_day"
              disabled
              defaultValue={validation?.payment_day}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="guarantee_approved">
              Guarantee approved
            </Label>
            <Input
              type="text"
              id="guarantee_approved"
              disabled
              defaultValue={validation?.guarantee_approved}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="comment">
              Comment
            </Label>
            <Input
              type="text"
              id="comment"
              disabled
              defaultValue={validation?.comment}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="credit_approval">
              Credit approval
            </Label>
            <Input
              type="text"
              id="credit_approval"
              disabled
              defaultValue={validation?.credit_approval}
            />
          </Col>

          <Col sm="4" className="mb-1">
            <Label className="form-label" for="application_id">
              Application id
            </Label>
            <Input
              type="text"
              id="application_id"
              disabled
              defaultValue={validation?.application_id}
            />
          </Col>

          {validation?.evidences && validation?.evidences.length > 0 && (
            <Col sm="12">
              <Label className="form-label">Evidences</Label>
              <br />
              {
                <div className="d-flex">
                  <FileListViewer file={validation.evidences} />
                </div>
              }
            </Col>
          )}

          {validation?.work_documents &&
            validation?.work_documents.length > 0 && (
              <Col sm="12">
                <Label className="form-label">Work documents</Label>
                <br />
                {
                  <div className="d-flex">
                    <FileListViewer file={validation.work_documents} />
                  </div>
                }
              </Col>
            )}
        </Row> */}
      </CardBody>
    </Card>
  );
};

export default CreditValidation;
