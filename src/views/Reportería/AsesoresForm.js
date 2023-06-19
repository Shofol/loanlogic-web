import React from "react";
import { Input, Label, Row, Col } from "reactstrap";
const AsesoresForm = ({ name }) => {
  return (
    <Row className="border m-2">
      <Col className="offset-4" md="4">
        <p>Diario</p>
      </Col>
      <Col md="4">
        <p>Mensual</p>
      </Col>

      <Col md="2" className="offset-2">
        <Label className="fs-5">Novato</Label>
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>

      <Col md="2" className="fs-5">
        {name}
      </Col>
      <Col md="2">
        <Label className="fs-5">Intermedio</Label>
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>

      <Col md="2" className="offset-2">
        <Label className="fs-5">Experto</Label>
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>
      <Col className="mb-1" md="4">
        <Input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Nombre del producto"
          //   tag={Field}
        />
      </Col>
    </Row>
  );
};

// <Label>Intermedio</Label>
// <Label>Experto</Label>

export default AsesoresForm;
