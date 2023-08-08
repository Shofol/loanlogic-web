import React from "react";
import { Card, CardBody, CardTitle, Col, Input, Label, Row } from "reactstrap";

const CreditValidation = ({ validation }) => {
  return (
    <Card className="p-2">
      <CardTitle className="text-center">Validación de crédito</CardTitle>
      <CardBody>
        <Row>
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
              {validation.evidences.map((evidence) => {
                return (
                  <img src={evidence} width="400px" className="mb-2 border" />
                );
              })}
            </Col>
          )}

          {validation?.work_documents &&
            validation?.work_documents.length > 0 && (
              <Col sm="12">
                <Label className="form-label">Work documents</Label>
                <br />
                {validation.work_documents.map((document) => {
                  return (
                    <img src={document} width="400px" className="mb-2 border" />
                  );
                })}
              </Col>
            )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default CreditValidation;
