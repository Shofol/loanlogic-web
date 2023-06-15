import React, { useState } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";
// ** Icons Imports
import { Plus, Minus, Trash } from "react-feather";
import { FieldArray, Field } from "formik";

const RangeList = ({
  label,
  assosLabel = "",
  fieldName,
  values,
  assosPH = "",
}) => {
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
                        <Label className="form-label" for="minimum_range">
                          Rango mínimo
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].minimum_range`}
                            id="minimum_range"
                            placeholder="Rango mínimo"
                            tag={Field}
                          />
                          <InputGroupText>Q</InputGroupText>
                        </InputGroup>
                      </Col>

                      <Col sm="12" md="3" className="mb-1">
                        <Label className="form-label" for="maximum_range">
                          Rango máximo
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].maximum_range`}
                            id="maximum_range"
                            placeholder="Rango máximo"
                            tag={Field}
                          />
                          <InputGroupText>Q</InputGroupText>
                        </InputGroup>
                      </Col>

                      <Col sm="12" md="3" className="mb-1">
                        <Label className="form-label" for={assosLabel}>
                          {assosPH}
                        </Label>
                        <InputGroup>
                          <Input
                            type="number"
                            name={`${fieldName}[${index}].${assosLabel}`}
                            id={assosLabel}
                            placeholder={assosPH}
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
