import React, { useState } from "react";
import { Card, CardBody, CardTitle, Col, Input, Label, Row } from "reactstrap";
import ImageModal from "../../@core/components/imageModal/imageModal";

const Guarantee = ({ guarantee }) => {
  const [zoomed, setZoomed] = useState(false);
  return (
    <Card className="p-2">
      <CardTitle className="text-center">Garantía</CardTitle>
      <CardBody>
        <Row>
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
        </Row>
      </CardBody>
    </Card>
  );
};

export default Guarantee;
