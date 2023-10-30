import React from "react";
import { Input, Label, Row, Col, InputGroup, InputGroupText } from "reactstrap";

const AsesoresForm = ({ agency, handleChange }) => {
  const options = { numeral: true };

  return (
    <Row className="border m-2">
      <Col md="2" className="fs-5 mt-1 fw-bold d-flex align-items-center">
        {agency.agency}
      </Col>

      <Col md="10" className="mt-1">
        <Row>
          <Col md="4" className="offset-2">
            <p>Diario</p>
          </Col>
          <Col md="4">
            <p>Mensual</p>
          </Col>
        </Row>

        {agency.goals.map((goal, index) => {
          return (
            <Row key={index}>
              <Col md="2">
                <Label className="fs-5">{goal.category}</Label>
              </Col>
              <Col className="mb-1" md="4">
                <InputGroup>
                  <Input
                    type="number"
                    className="form-control dark-ph"
                    placeholder={goal.daily}
                    onChange={(e) =>
                      handleChange(e.target.value, index, "daily")
                    }
                  />
                  <InputGroupText>Q</InputGroupText>
                </InputGroup>
              </Col>
              <Col className="mb-1" md="4">
                <InputGroup>
                  <Input
                    className="form-control dark-ph"
                    placeholder={goal.monthly}
                    onChange={(e) =>
                      handleChange(e.target.value, index, "monthly")
                    }
                  />

                  <InputGroupText>Q</InputGroupText>
                </InputGroup>
              </Col>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
};

// <Label>Intermedio</Label>
// <Label>Experto</Label>

export default AsesoresForm;
