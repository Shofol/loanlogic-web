import React from "react";
import { Row, Col, Label, Input, InputGroup, InputGroupText } from "reactstrap";

const RangeListView = ({ assosLabel, values }) => {
  return (
    <>
      {values && values.length > 0 && (
        <>
          {values.map((range, index) => {
            return (
              <Row key={index}>
                <Col sm="12" md="4" className="mb-1">
                  <Label className="form-label" for="minimum_range">
                    Rango mínimo (incluído)
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name={`minimum_range`}
                      id="minimum_range"
                      placeholder="Rango mínimo"
                      disabled
                      value={range.minimum_range}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="4" className="mb-1">
                  <Label className="form-label" for="maximum_range">
                    Rango máximo (NO incluído)
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name={`maximum_range`}
                      id="maximum_range"
                      placeholder="Rango máximo"
                      disabled
                      value={range.maximum_range}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="4" className="mb-1">
                  <Label className="form-label" for={assosLabel}>
                    {assosLabel}
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name={`${assosLabel}`}
                      id={assosLabel}
                      disabled
                      placeholder={assosLabel}
                      value={range[`${assosLabel.toLowerCase()}`]}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            );
          })}
        </>
      )}
    </>
  );
};

export default RangeListView;
