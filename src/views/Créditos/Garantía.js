import React from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip
} from "reactstrap";
import { Save, RefreshCw, Info } from "react-feather";
import image from "../../assets/images/portrait/small/avatar-s-11.jpg";
import FileUploaderMultiple from "../../@core/components/file-uploader/FileUploaderMultiple";
import { selectThemeColors } from "@utils";
import Select from "react-select";

const Garantía = () => {
  const tipoGarantíaValues = [
    { value: "fiduciaria", label: "Fiduciaria (firma contrato)" },
    {
      value: "prendaria",
      label: "Prendaria (el cliente la puede seguir utilizando)"
    },
    { value: "cheque", label: "Cheque (entrega como garantia en la agencia)" },
    {
      value: "mobiliaria",
      label:
        "Mobiliaria (registro formal ante el registro mercantil, pero el cliente puede seguir utilizando)"
    },
    {
      value: "hipotecaria",
      label: "Hipotecaria (se crea un gravamen sobre la propiedad)"
    },
    {
      value: "compraVenta",
      label: "Compra-venta (si no me pagas, me quedo con la casa para venderla)"
    },
    {
      value: "empeño",
      label:
        "Empeño (igual que la prendaria pero se queda en posesión por Al Chilazo)"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Garantía</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col sm="12" md="6" className="mb-1">
              <Label className="form-label">Tipo garantía*</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={tipoGarantíaValues[0]}
                options={tipoGarantíaValues}
                isClearable={false}
              />
            </Col>
            <Col sm="6">
              <Label className="form-label">Descripción*</Label>
              <Input
                type="textarea"
                name="descripción"
                id="descripción"
                placeholder="Descripción"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="6">
              <Label className="form-label">Modelo</Label>
              <Input
                type="text"
                name="modelo"
                id="modelo"
                placeholder="Modelo"
              />
            </Col>

            <Col sm="6">
              <Label className="form-label">Número de série</Label>
              <Input
                type="text"
                name="númeroDeSérie"
                id="númeroDeSérie"
                placeholder="Número de série"
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm="6">
              <p className="fs-6">Foto de la garantía*</p>
              <FileUploaderMultiple />
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <div className="d-flex justify-content-end">
                <Button.Ripple
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                >
                  <Save size={16} />
                  <span className="align-middle mx-25">Guardar</span>
                </Button.Ripple>
                <Button.Ripple outline color="secondary" type="reset">
                  <RefreshCw size={16} />
                  <span className="align-middle mx-25">Descartar</span>
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Garantía;
