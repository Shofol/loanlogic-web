import React, { useState } from "react";
import ReactSlider from "react-slider";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import "./Créditos.scss";
import { Info } from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import image from "../../assets/images/portrait/small/avatar-s-11.jpg";

const VisualizarSolicitud = () => {
  const [rangeValue, setRangeValue] = useState(50);

  const guaranteeTypes = [
    { title: "Garantía fiduciaria", value: "fiduciaryGuarantee" },
    { title: "Prenda", value: "garment" },
    { title: "Cheque", value: "cheque" },
    { title: "Mobiliaria", value: "furniture" },
    { title: "Hipotecaria", value: "mortgage" },
    { title: "Compra - venta;", value: "buyAndSell" },
    { title: "Empeño", value: "endeavor" }
  ];

  const paymentMethods = [
    { value: "DAILY", label: "Diario" },
    { value: "WEEKLY", label: "Semanal" },
    { value: "BIWEEKLY", label: "Quincenal" },

    { value: "END_MONTH", label: "Fin de mes" }
  ];

  const professions = [
    { title: "Asalariado (trabaja para una empresa)", value: "salaried" },
    { title: "Tiene negocio propio", value: "business" },
    {
      title: "Ambas, es asalariado y también tiene negocio propio",
      value: "salariedAndBusiness"
    },
    { title: "Sin ingresos", value: "noIcome" }
  ];

  const maritialStatus = [
    { label: "Soltero/a", value: "single" },
    { label: "Casado/a", value: "married" },
    { label: "Divorciado/a", value: "divorced" },
    { label: "Viudo/a", value: "widow" }
  ];

  const sex = [
    { label: "Masculino", value: "male" },
    { label: "Femenino", value: "female" }
  ];

  const wantCredit = [
    { label: "Sí", value: "yes" },
    { label: "No", value: "no" }
  ];

  return (
    <>
      <Card>
        <CardHeader className="d-flex flex-column">
          <CardTitle tag="h4" className="mb-1">
            Solicitud Núm. 1346
          </CardTitle>
          <CardSubtitle tag="h5">Ricardo Solsona: Q1000 - 28D</CardSubtitle>
          <CardSubtitle className="mt-1" tag="h4">
            Solicitud crédito
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <Form>
            <p htmlFor="assistance_expenses">
              ¿Cómo quieres pagar tu préstamo?*
            </p>
            <div className="d-flex">
              {paymentMethods.map((method) => {
                return (
                  <div
                    key={method.value}
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id={method.value}
                      name="paymentMethod"
                      checked={true}
                    />
                    <Label className="form-check-label" htmlFor={method.value}>
                      {method.title}
                    </Label>
                  </div>
                );
              })}
            </div>
            <Row className="mt-2">
              <Col md="4">
                <p className="mb-0">
                  Monto deseado del crédito:* de 500 en n500Q
                </p>
              </Col>
              <Col md="8" className="align-items-center d-flex">
                <div className="w-100">
                  <ReactSlider
                    value={rangeValue}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(value) => {
                      setRangeValue(value);
                    }}
                    renderThumb={(props, state) => (
                      <div {...props}>{rangeValue}</div>
                    )}
                  />
                </div>
              </Col>

              <Col md="2" className="mt-3">
                <p className="mb-0">Destino del crédito*</p>
              </Col>
              <Col md="4" className="mt-3">
                <Input disabled type="textarea" />
              </Col>

              <Col md="2" className="mt-3">
                <p className="mb-0">Motivo solicitud del crédito*</p>
              </Col>
              <Col md="4" className="mt-3">
                <Input disabled type="textarea" />
              </Col>
            </Row>

            <p className="mt-2">
              ¿De qué tipo de garantía dispone? (seleccione todas las opciones
              pertinentes)*
            </p>

            {guaranteeTypes.map((guarntee) => {
              return (
                <div
                  key={guarntee.value}
                  className="form-check form-check-inline me-2"
                >
                  <Input
                    disabled
                    type="checkbox"
                    id={guarntee.value}
                    name="guaranteeType"
                    value={guarntee.value}
                    checked={true}
                  />
                  <Label
                    htmlFor={guarntee.value}
                    className="form-check-label"
                    style={{ marginRight: ".25rem" }}
                  >
                    {guarntee.title}
                  </Label>
                  <Info size={16} id={guarntee.value} />
                  <UncontrolledTooltip placement="top" target={guarntee.value}>
                    {guarntee.title}
                  </UncontrolledTooltip>
                </div>
              );
            })}

            <p htmlFor="assistance_expenses" className="mt-2">
              Usted es (seleccione una única opción)*
            </p>
            <div className="d-flex">
              {professions.map((prof) => {
                return (
                  <div
                    key={prof.value}
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id={prof.value}
                      name="paymentprof"
                      checked={true}
                    />
                    <Label className="form-check-label" htmlFor={prof.value}>
                      {prof.title}
                    </Label>
                  </div>
                );
              })}
            </div>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Datos del solicitante</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Primer apellido*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Primer apellido"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Segundo apellido*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Segundo apellido"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Si la respuesta es sí, indicar las instituciones y mont{" "}
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Segundo nombre"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Número de celular
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Número de celular"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Número de teléfono fijo
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Número de teléfono fijo"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Correo electrónico
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Correo electrónico"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Dirección de residencia*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Dirección de residencia"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Municipio de residencia*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Municipio de residencia"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Departamento de residencia*
              </Label>
              <Select
                isDisabled={true}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={professions}
                isClearable={false}
                name="frequency"
                // onChange={(option) => setFieldValue("frequency", option.value)}
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Fecha de nacimiento*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Fecha de nacimiento"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Profesión*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Profesión"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Estado civil*
              </Label>
              <Select
                isDisabled={true}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={maritialStatus}
                isClearable={false}
                name="frequency"
                // onChange={(option) => setFieldValue("frequency", option.value)}
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Sexo
              </Label>
              <Select
                isDisabled={true}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={sex}
                isClearable={false}
                name="frequency"
                // onChange={(option) => setFieldValue("frequency", option.value)}
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nacionalidad
              </Label>
              <Select
                isDisabled={true}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={professions}
                isClearable={false}
                name="frequency"
                // onChange={(option) => setFieldValue("frequency", option.value)}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="3">
              <p className="mt-2">
                Foto del recibo de la luz <br />
                (u otro recibo)*
              </p>
            </Col>
            <Col md="9" className="d-flex align-items-center gap-2">
              {professions.map((prof) => {
                return (
                  <img
                    key={prof.value}
                    className="img-fluid"
                    src={image}
                    alt={"item.name"}
                    width="80px"
                    height="80px"
                  />
                );
              })}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">DPI & NIT</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Número DPI*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Número DPI"
              />
            </Col>
            <Col sm="3" className="mt-2 d-flex justify-content-end">
              <p>
                Lugar de nacimiento <br />
                (departamento, municipio)*
              </p>
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Municipio
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Municipio"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Departamento
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Departamento"
              />
            </Col>
          </Row>

          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Fecha vencimiento*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Fecha vencimiento"
              />
            </Col>
            <Col sm="3" className="mt-2 d-flex justify-content-end">
              <p>Vecindad*</p>
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Municipio
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Municipio"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Departamento
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Departamento"
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md="3">
              <p className="mt-2">Foto ambos lados del DPI*</p>
            </Col>
            <Col md="9" className="d-flex align-items-center gap-2">
              {professions.map((prof) => {
                return (
                  <img
                    key={prof.value}
                    className="img-fluid"
                    src={image}
                    alt={"item.name"}
                    width="80px"
                    height="80px"
                  />
                );
              })}
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                NIT
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="NIT"
              />
            </Col>
            <Col sm="5">
              <Label className="form-label" for="assistance_expenses">
                Tiene crédito con alguna institución financiera o con personas
                individuales?
              </Label>
              <Select
                isDisabled={true}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={wantCredit}
                isClearable={false}
                name="frequency"
                // onChange={(option) => setFieldValue("frequency", option.value)}
              />
            </Col>
            <Col sm="4">
              <Label className="form-label" for="assistance_expenses">
                Si la respuesta es sí, indicar las instituciones y mon
              </Label>
              <Input
                disabled
                type="textarea"
                name="inventory"
                id="inventory"
                placeholder="Si la respuesta es sí, indicar las instituciones y monto"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Asalariado</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre de la empresa*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre de la empresa"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Fecha de ingreo*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Fecha de ingreo"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Puesto*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Puesto"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Ingresos mensuales
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Ingresos mensuales"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Gastos mensuales*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Gastos mensuales"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Fecha y número de ingresos
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Fecha y número de ingresos"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre del jefe inmediato*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre del jefe inmediato"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Dirección del trabajo*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Dirección del trabajo"
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Municipio del trabajo*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Municipio del trabajo"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Teléfono del trabajo
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Teléfono del trabajo"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">Negocio propio</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre del negocio*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre del negocio"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Fecha de inicio*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Fecha de inicio"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                NIT*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="NIT"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Ventas mensuales
              </Label>
              <InputGroup>
                <Input
                  disabled
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Ventas mensuales"
                />
                <InputGroupText>Q</InputGroupText>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Gastos mensuales*
              </Label>
              <InputGroup>
                <Input
                  disabled
                  type="text"
                  name="inventory"
                  id="inventory"
                  placeholder="Gastos mensuales"
                />
                <InputGroupText>Q</InputGroupText>
              </InputGroup>
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Dirección del negocio*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Dirección del negocio"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Teléfono del negocio*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Teléfono del negocio"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Referencias familiares (que no vivan con usted)
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre y apellidos*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre y apellidos"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Parentesco*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Parentesco"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Teléfono trabajo*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Teléfono trabajo"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Celular*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Celular"
              />
            </Col>
          </Row>

          <CardTitle tag="h4" className="mt-2">
            Referencias personales (que no sean familiares)
          </CardTitle>
          <Row className="mt-1">
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Nombre y apellidos*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Nombre y apellidos"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Parentesco*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Parentesco"
              />
            </Col>

            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Teléfono trabajo*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Teléfono trabajo"
              />
            </Col>
            <Col sm="3">
              <Label className="form-label" for="assistance_expenses">
                Celular*
              </Label>
              <Input
                disabled
                type="text"
                name="inventory"
                id="inventory"
                placeholder="Celular"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default VisualizarSolicitud;
