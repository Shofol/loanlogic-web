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
import ImageModal from "../../@core/components/imageModal/imageModal";

const Guarantee = ({ guarantee }) => {
  const [zoomed, setZoomed] = useState(false);
  return (
    <Card className="p-2">
      <CardTitle className="text-center">Garantía</CardTitle>
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
              <Label className="form-label">Modelo</Label>
              <Input
                type="text"
                name="model"
                id="model"
                placeholder="Modelo"
                defaultValue={guarantee?.model}
                disabled
              />
            </Col>

            <Col sm="6">
              <Label className="form-label">Número de série</Label>
              <Input
                type="text"
                name="serial_number"
                id="serial_number"
                placeholder="Número de série"
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
              <img
                src={guarantee?.photo}
                width="200px"
                className="mb-2 border cursor-pointer"
                onClick={(e) => setZoomed(true)}
              />
              <ImageModal
                image={guarantee?.photo}
                isOpen={zoomed}
                closeZoom={(e) => {
                  setZoomed(false);
                }}
              />
              {/* </Col> */}
            </Col>
          </Row>
        </Form>
        {/* <Row>
          <Col sm="3">
            <img
              src={guarantee?.photo}
              width="200px"
              className="mb-2 border cursor-pointer"
              onClick={(e) => setZoomed(true)}
            />
            <ImageModal
              image={guarantee?.photo}
              isOpen={zoomed}
              closeZoom={(e) => {
                setZoomed(false);
              }}
            />
          </Col>
          <Col sm="8">
            <Row>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="id">
                  ID
                </Label>
                <Input
                  type="text"
                  id="id"
                  disabled
                  defaultValue={guarantee?.id}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="guarantee_item">
                  Item
                </Label>
                <Input
                  type="text"
                  id="guarantee_item"
                  disabled
                  defaultValue={guarantee?.guarantee_item}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="value">
                  Value
                </Label>
                <Input
                  type="text"
                  id="value"
                  disabled
                  defaultValue={guarantee?.value}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="type">
                  Type
                </Label>
                <Input
                  type="text"
                  id="type"
                  disabled
                  defaultValue={guarantee?.type}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="description">
                  Description
                </Label>
                <Input
                  type="text"
                  id="description"
                  disabled
                  defaultValue={guarantee?.description}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="model">
                  Model
                </Label>
                <Input
                  type="text"
                  id="model"
                  disabled
                  defaultValue={guarantee?.model}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="serial_number">
                  Serial number
                </Label>
                <Input
                  type="text"
                  id="serial_number"
                  disabled
                  defaultValue={guarantee?.serial_number}
                />
              </Col>

              <Col sm="4" className="mb-1">
                <Label className="form-label" for="application_id">
                  Application ID
                </Label>
                <Input
                  type="text"
                  id="application_id"
                  disabled
                  defaultValue={guarantee?.application_id}
                />
              </Col>
            </Row>
          </Col>
        </Row> */}
      </CardBody>
    </Card>
  );
};

export default Guarantee;
