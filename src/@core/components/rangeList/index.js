import React, { useState } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText
} from "reactstrap";
// ** Icons Imports
import { Plus, Minus, Trash } from "react-feather";
import { FieldArray, Field } from "formik";

const RangeList = ({ label, assosLabel = "", fieldName, values }) => {
  // const [rangeList, setRangeList] = useState([
  //   { min: "", max: "", assosValue: "", id: `range-${Math.random()}` }
  // ]);

  // const addNewRange = () => {
  //   let tempRangelist = [...rangeList];
  //   const newEntry = {
  //     min: 0,
  //     max: 0,
  //     assoValue: 0,
  //     id: `range-${Math.random()}`
  //   };
  //   console.log(tempRangelist);
  //   tempRangelist = [...tempRangelist, newEntry];
  //   setRangeList(tempRangelist);
  // };

  // const handleChange = (name, value, index) => {
  //   let tempRangelist = [...rangeList];
  //   tempRangelist[index][name] = value;
  //   setRangeList(tempRangelist);
  // };

  return (
    <div className="mt-2">
      <FieldArray
        name={fieldName}
        render={(arrayHelpers) => (
          <>
            <p className="mb-0">{label}</p>

            {values[`${fieldName}`] && values[`${fieldName}`].length > 0 && (
              <>
                {values[`${fieldName}`].map((range, index) => {
                  return (
                    <Row key={index}>
                      <Col sm="12" md="3" className="mb-1">
                        <Label className="form-label" for="nameVertical">
                          Rango mínimo
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].rangoMinimo`}
                            id="rangoMinimo"
                            placeholder="Rango mínimo"
                            tag={Field}
                          />
                          <InputGroupText>Q</InputGroupText>
                        </InputGroup>
                      </Col>

                      <Col sm="12" md="3" className="mb-1">
                        <Label className="form-label" for="rangoMáximo">
                          Rango máximo
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].rangoMáximo`}
                            id="rangoMáximo"
                            placeholder="Rango máximo"
                            tag={Field}
                          />
                          <InputGroupText>Q</InputGroupText>
                        </InputGroup>
                      </Col>

                      <Col sm="12" md="3" className="mb-1">
                        <Label
                          className="form-label"
                          for={assosLabel.toLowerCase().split(" ").join("")}
                        >
                          {assosLabel}
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].${assosLabel
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                            id={assosLabel.toLowerCase().split(" ").join("")}
                            placeholder={assosLabel}
                            tag={Field}
                          />
                          <InputGroupText>Q</InputGroupText>
                        </InputGroup>
                      </Col>

                      <Col
                        sm="12"
                        md="3"
                        className="mb-1 d-flex  align-items-center"
                      >
                        <Button.Ripple
                          outline
                          color="danger"
                          onClick={() => arrayHelpers.remove(index)}
                          size="sm"
                          className="mt-2"
                        >
                          <Trash size={14} />
                          <span className="align-middle ms-25">
                            Eliminar rango
                          </span>
                        </Button.Ripple>
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
              </>
            )}

            <Row className="mb-1">
              <Col sm="12" md="2">
                <Button.Ripple
                  outline
                  color="primary"
                  onClick={() => arrayHelpers.push("")}
                  size="sm"
                >
                  <Plus size={14} />
                  <span className="align-middle ms-25">Añadir rango</span>
                </Button.Ripple>
              </Col>
            </Row>
          </>
        )}
      />
    </div>
  );
};

export default RangeList;
