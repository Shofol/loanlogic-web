import React, { useState } from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";
// ** Icons Imports
import { Plus, Minus } from "react-feather";

const RangeList = ({ label, assosLabel = "" }) => {
  const [rangeList, setRangeList] = useState([
    { min: "", max: "", assosValue: "", id: `range-${Math.random()}` }
  ]);

  const addNewRange = () => {
    let tempRangelist = [...rangeList];
    const newEntry = {
      min: 0,
      max: 0,
      assoValue: 0,
      id: `range-${Math.random()}`
    };
    console.log(tempRangelist);
    tempRangelist = [...tempRangelist, newEntry];
    setRangeList(tempRangelist);
  };

  const handleChange = (name, value, index) => {
    let tempRangelist = [...rangeList];
    tempRangelist[index][name] = value;
    setRangeList(tempRangelist);
  };

  return (
    <div className="mt-2">
      <p className="mb-0">{label}</p>
      {rangeList.map((range, index) => {
        return (
          <Row key={range.id}>
            <Col sm="12" md="4" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Rango mínimo
              </Label>
              <Input
                type="number"
                name="rangoMinimo"
                id="rangoMinimo"
                placeholder="Rango mínimo"
                value={rangeList[index].min}
                onChange={(e) => {
                  handleChange("min", e.target.value, index);
                }}
              />
            </Col>

            <Col sm="12" md="4" className="mb-1">
              <Label className="form-label" for="rangoMáximo">
                Rango máximo
              </Label>
              <Input
                type="number"
                name="rangoMáximo"
                id="rangoMáximo"
                placeholder="Rango máximo"
                value={rangeList[index].max}
                onChange={(e) => {
                  handleChange("max", e.target.value, index);
                }}
              />
            </Col>

            <Col sm="12" md="4" className="mb-1">
              <Label
                className="form-label"
                for={assosLabel.toLowerCase().split(" ").join("")}
              >
                {assosLabel}
              </Label>
              <Input
                type="number"
                name={assosLabel.toLowerCase().split(" ").join("")}
                id={assosLabel.toLowerCase().split(" ").join("")}
                placeholder={assosLabel}
                value={rangeList[index].assosValue}
                onChange={(e) => {
                  handleChange("assosValue", e.target.value, index);
                }}
              />
            </Col>

            {/* <Col
              sm="12"
              md="1"
              className="d-flex align-items-center justify-content-center"
            >
              <Button.Ripple
                className="btn-icon "
                size="md"
                outline
                color="primary"
              >
                <Minus size={16} />
              </Button.Ripple>
            </Col> */}
          </Row>
        );
      })}
      <Row className="mb-1">
        <Col sm="12" md="2">
          <Button.Ripple
            outline
            color="primary"
            onClick={addNewRange}
            size="sm"
          >
            <Plus size={14} />
            <span className="align-middle ms-25">Añadir rango</span>
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

export default RangeList;
