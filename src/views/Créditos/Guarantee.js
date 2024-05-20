import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";
import FileListViewer from "../../@core/components/fileListViewer";
import moment from "moment";

const Guarantee = ({ guarantee }) => {
  return (
    <Card className="p-2">
      <CardTitle className="text-center">Garantía</CardTitle>
      <div className="text-center">{guarantee ? moment(guarantee?.createdAt).format("HH:mm:ss DD/MM/YYYY"): ''}</div>
      <CardBody>
        <Form>
          <Row>
            <Col sm="12" md="6" className="mb-1">
              <Label className="form-label">
                Tipo garantía<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                name="guarantee_item"
                id="guarantee_item"
                placeholder="Tipo garantía"
                defaultValue={guarantee?.guarantee_item}
                disabled
              />
            </Col>
            <Col sm="6">
              <Label className="form-label">
                Descripción<span className="text-danger">*</span>
              </Label>
              <Input
                maxLength="255"
                type="textarea"
                name="description"
                id="description"
                placeholder="Descripción"
                defaultValue={guarantee?.description}
                disabled
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="6">
              <Label className="form-label">Marca</Label>
              <Input
                type="text"
                name="model"
                id="model"
                placeholder="Marca"
                defaultValue={guarantee?.model}
                disabled
              />
            </Col>

            <Col sm="6">
              <Label className="form-label">Número de serie</Label>
              <Input
                type="text"
                name="serial_number"
                id="serial_number"
                placeholder="Número de serie"
                defaultValue={guarantee?.serial_number}
                disabled
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm="6">
              <p className="fs-6">
                Foto de la garantía<span className="text-danger">*</span>
              </p>
              {/* <Col sm="3"> */}
              <div className="d-flex">
                {guarantee && guarantee.photo && guarantee.photo.length > 0 && (
                  <div className="d-flex">
                    <FileListViewer file={guarantee.photo} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
                <Col md="4" className="d-flex align-items-center gap-2">
                  <p>
                    Coordenadas GPS: Dirección formulario garantía
                  </p>
                </Col>
                <Col md="6" className="d-flex align-items-center gap-2">
                  {guarantee?.guaranty_latitude ? (
                    <a
                      className="text-green"
                      target="_blank"
                      href={`https://www.google.com/maps/place/${guarantee?.guaranty_latitude},${guarantee?.guaranty_longitude}`}
                    >
                      Latitud: {guarantee?.guaranty_latitude} <br />
                      Longitud: {guarantee?.guaranty_longitude}
                    </a>
                  ) : (
                    "Sin coordenadas GPS"
                  )}

                </Col>
              </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Guarantee;
