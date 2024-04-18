import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import {
  Button,
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
import { useNavigate, useParams } from "react-router-dom";
import api from "../../@core/api/api";
import {
  guaranteeTypes,
  loanPaymentMethods,
  paymentMethods,
  professions,
  sexValues,
  maritialStatus
} from "../../configs/data";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Guarantee from "./Guarantee";
import CreditValidation from "./CreditValidation";
import StatusTag from "../../@core/components/statusTag";
import { getConvertDateWithTimeZone } from "../../utility/Utils";
import FileListViewer from "../../@core/components/fileListViewer";
import moment from "moment";


const VisualizarSolicitud = () => {
  const [active, setActive] = useState("1");
  const [guarantee, setGuarantee] = useState(null);
  const [validationData, setValidationData] = useState(null);

  function transCivilStatus(string) {
    let translation = string;

    var result = maritialStatus.filter(obj => {
      return obj.value === string
    })

    if (result && result[0]) { translation = result[0].label }
    return translation;
  }
  function transSex(string) {
    let translation = string;

    var result = sexValues.filter(obj => {
      return obj.value === string
    })

    if (result && result[0]) { translation = result[0].label }
    return translation;
  }

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const navigate = useNavigate();
  const [rangeValue, setRangeValue] = useState(50);
  let { id } = useParams();
  const wantCredit = [
    { label: "Sí", value: "yes" },
    { label: "No", value: "no" }
  ];

  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    const response = await api.get(`credit-application/${id}`);
    setData(response.data.data);
  };

  const fetchGuaranteeData = async () => {
    if (!guarantee) {
      const response = await api.get(`guarantee/credit-application/${id}`);
      setGuarantee(response.data.data);
    }
  };

  const fetchValidationData = async () => {
    if (!validationData) {
      const response = await api.get(
        `credit/validation/credit-application/${id}`
      );
      setValidationData(response.data.data);
    }
  };

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Solicitud de crédito
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              fetchGuaranteeData();
              toggle("2");
            }}
          >
            Garantía
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              fetchValidationData();
              toggle("3");
            }}
          >
            Validación de crédito
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Card>
            <CardHeader className="d-flex flex-column relative">
              {data && data.pdf && (
                <Button
                  color="success"
                  className="btn-sm position-absolute"
                  style={{ top: "20px", right: "20px" }}
                >
                  <a
                    className="text-white"
                    target="_blank"
                    href={data.pdf}
                    download={`${data?.client.name}_${data?.id}`}
                  >
                    Descargar PAGARÉ
                  </a>
                </Button>
              )}
              <CardTitle tag="h4" className="mb-1">
                Solicitud Núm. {data?.id}
              </CardTitle>
              <CardSubtitle
                tag="h5"
                className="cursor-pointer link text-primary link-underline-primary"
                onClick={() => {
                  navigate(`/clientes/${data.client_id}`);
                }}
              >
                {`${data?.client.name.toUpperCase()} ` +
                  `${data?.client.surname.toUpperCase()}`}
                {/* : Q1000 - 28D */}
                {data && data.is_new_client == false ? " (RENOVACIÓN)" : " (NUEVO)"}
              </CardSubtitle>
              <CardSubtitle className="mt-1" tag="h4">
                Solicitud crédito: {moment(data?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
              </CardSubtitle>
              <div className="mt-1">
                <StatusTag status={data?.status} />
              </div>
            </CardHeader>
            {data && (
              <CardBody>
                {/* <p htmlFor="loan_payment_method">
              Método de pago del préstamo
              <span className="text-danger"></span>
            </p>
            <div className="d-flex">
              {loanPaymentMethods.map((method) => {
                return (
                  <div
                    key={method.value}
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      type="radio"
                      id="loan_payment_method"
                      name="loan_payment_method"
                      disabled
                      checked={data.loan_payment_method === method.value}
                    />
                    <Label className="form-check-label" htmlFor={method.value}>
                      {method.label}
                    </Label>
                  </div>
                );
              })}
            </div> */}

                <p htmlFor="loan_payment_time">
                  ¿Qué producto desea?
                </p>
                <div className="d-flex">
                  <div
                    key='Diario'
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id="daily_frequency"
                      name="daily_frequency"
                      checked={data?.product?.frequency === 'DAILY'}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor='Diario'
                    >
                      Diario
                    </Label>
                  </div>
                  <div
                    key='Semanal'
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id="weekly_frequency"
                      name="weekly_frequency"
                      checked={data?.product?.frequency === 'WEEKLY'}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor='Semanal'
                    >
                      Semanal
                    </Label>
                  </div>
                  <div
                    key='Quincenal'
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id="biweekly_frequency"
                      name="biweekly_frequency"
                      checked={data?.product?.frequency === 'BIWEEKLY'}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor='Quincenal'
                    >
                      Quincenal
                    </Label>
                  </div>
                  <div
                    key='Catorcenal'
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id="fortnightly_frequency"
                      name="fortnightly_frequency"
                      checked={data?.product?.frequency === 'FORTNIGHTLY'}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor='Catorcenal'
                    >
                      Catorcenal
                    </Label>
                  </div>
                  <div
                    key='Mensual'
                    className="form-check mb-sm-2 mb-md-1 me-md-2"
                  >
                    <Input
                      disabled
                      type="radio"
                      id="monthly_frequency"
                      name="monthly_frequency"
                      checked={data?.product?.frequency === 'MONTHLY'}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor='Mensual'
                    >
                      Mensual (fin de mes)
                    </Label>
                  </div>
                </div>
                <Row className="mt-2">
                  <Col md="4">
                    <p className="mb-0">
                      Monto deseado del crédito: de 500 en 500Q
                    </p>
                  </Col>
                  <Col md="8" className="align-items-center d-flex">
                    <div className="w-100">
                      <ReactSlider
                        value={+data.credit_amount}
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        min={500}
                        max={20000}
                        disabled
                        renderThumb={(props, state) => (
                          <div {...props}>{+data.credit_amount}</div>
                        )}
                      />
                    </div>
                  </Col>

                  <Col md="2" className="mt-3">
                    <p className="mb-0">Destino del crédito</p>
                  </Col>
                  <Col md="4" className="mt-3">
                    <Input
                      disabled
                      type="textarea"
                      defaultValue={data.credit_destination}
                    />
                  </Col>

                  {/* <Col md="2" className="mt-3">
                    <p className="mb-0">Motivo solicitud del crédito</p>
                  </Col>
                  <Col md="4" className="mt-3">
                    <Input
                      disabled
                      type="textarea"
                      defaultValue={data.reason_for_credit_request}
                    />
                  </Col> */}
                </Row>

                <p className="mt-2">
                  ¿De qué tipo de garantía dispone? (seleccione todas las
                  opciones pertinentes)
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
                        name="gurrentee_items"
                        // value={guarntee.value}
                        checked={
                          data.gurrentee_items.filter(
                            (item) => item === guarntee.value
                          ).length > 0
                        }
                      />
                      <Label
                        htmlFor={guarntee.value}
                        className="form-check-label"
                        style={{ marginRight: ".25rem" }}
                      >
                        {guarntee.title}
                      </Label>
                      <Info size={16} id={`tip-${guarntee.value}`} />
                      <UncontrolledTooltip
                        placement="top"
                        target={`tip-${guarntee.value}`}
                      >
                        {guarntee.tip}
                      </UncontrolledTooltip>
                    </div>
                  );
                })}

                <p htmlFor="occupation" className="mt-2">
                  Usted es (seleccione una única opción)
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
                          name="occupation"
                          checked={data.client.occupation === prof.value}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor={prof.value}
                        >
                          {prof.title}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                <Row className="mt-3">
                  <Col md="4" className="d-flex align-items-center gap-2">
                    <p>
                      Coordenadas GPS: Direción de la solicitud
                    </p>
                  </Col>
                  <Col md="6" className="d-flex align-items-center gap-2">
                    {data?.application_latitude ? (
                      <a
                        className="text-green"
                        target="_blank"
                        href={`https://www.google.com/maps/place/${data?.application_latitude},${data?.application_longitude}`}
                      >
                        Latitud: {data?.application_latitude} <br />
                        Longitud: {data?.application_longitude}
                      </a>
                    ) : (
                      "Sin coordenadas GPS"
                    )}

                  </Col>
                </Row>
              </CardBody>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle tag="h4">Datos del solicitante</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="3">
                  <Label className="form-label" for="surname">
                    Primer apellido
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="surname"
                    id="surname"
                    defaultValue={data?.client.surname}
                    placeholder="Primer apellido"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="second_surname">
                    Segundo apellido
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="second_surname"
                    id="second_surname"
                    defaultValue={data?.client.second_surname}
                    placeholder="Segundo apellido"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="name">
                    Nombre
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    defaultValue={data?.client.name}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="second_name">
                    Segundo Nombre
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="second_name"
                    id="second_name"
                    placeholder="Segundo nombre"
                    defaultValue={data?.client.second_name}
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="phone_number">
                    Número de celular
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Número de celular"
                    defaultValue={data?.client.phone_number}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="landline_phone_number">
                    Número de teléfono fijo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="landline_phone_number"
                    id="landline_phone_number"
                    placeholder="Número de teléfono fijo"
                    defaultValue={data?.client.landline_phone_number}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="email">
                    Correo electrónico
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                    defaultValue={data?.client.email}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="residence_address">
                    Dirección de residencia
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="residence_address"
                    id="residence_address"
                    placeholder="Dirección de residencia"
                    defaultValue={data?.client.residence_address}
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="residence_municipality">
                    Municipio de residencia
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="residence_municipality"
                    id="residence_municipality"
                    placeholder="Municipio de residencia"
                    defaultValue={data?.client.residence_municipality}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="department_of_residence">
                    Departamento de residencia
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="department_of_residence"
                    id="department_of_residence"
                    placeholder="Departamento de residencia"
                    defaultValue={data?.client.department_of_residence}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="birth_date">
                    Fecha de nacimiento
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="birth_date"
                    id="birth_date"
                    placeholder="Fecha de nacimiento"
                    defaultValue={
                      data
                        ? getConvertDateWithTimeZone(data?.client.birth_date)
                        : null
                    }
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="profession">
                    Profesión
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="profession"
                    id="profession"
                    placeholder="Profesión"
                    defaultValue={data?.client.profession}
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="civil_status">
                    Estado civil
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="civil_status"
                    id="civil_status"
                    placeholder="Estado civil"
                    defaultValue={data ? transCivilStatus(data.client.civil_status) : ''}
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="sex">
                    Sexo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="sex"
                    id="sex"
                    placeholder="Sexo"
                    defaultValue={data ? transSex(data.client.sex) : ''}
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="assistance_expenses">
                    Nacionalidad
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Nacionalidad"
                    defaultValue={data?.client.nationality}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md="3">
                  <p className="mt-2">
                    Foto del recibo de la luz <br />
                    (u otro recibo)
                  </p>
                </Col>
                <Col md="9" className="d-flex align-items-center gap-2">
                  {data && (
                    <FileListViewer file={data?.client.photos_of_bills} />
                  )}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="4" className="d-flex align-items-center gap-2">
                  <p>
                    Coordenadas GPS: Direción de residencia
                  </p>
                </Col>
                <Col md="6" className="d-flex align-items-center gap-2">
                  {data?.client.residence_latitude ? (
                    <a
                      className="text-green"
                      target="_blank"
                      href={`https://www.google.com/maps/place/${data?.client.residence_latitude},${data?.client.residence_longitude}`}
                    >
                      Latitud: {data?.client.residence_latitude} <br />
                      Longitud: {data?.client.residence_longitude}
                    </a>
                  ) : (
                    "Sin coordenadas GPS"
                  )}

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
                  <Label className="form-label" for="dpi_number">
                    Número DPI
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="dpi_number"
                    id="dpi_number"
                    placeholder="Número DPI"
                    defaultValue={data?.client.dpi_number}
                  />
                </Col>
                <Col sm="3" className="mt-2 d-flex justify-content-end">
                  <p>
                    Lugar de nacimiento <br />
                    (departamento, municipio)
                  </p>
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="place_of_birth_region">
                    Municipio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="place_of_birth_region"
                    id="place_of_birth_region"
                    placeholder="Municipio"
                    defaultValue={data?.client.place_of_birth_region}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="place_of_birth_city">
                    Departamento
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="place_of_birth_city"
                    id="place_of_birth_city"
                    placeholder="Departamento"
                    defaultValue={data?.client.place_of_birth_city}
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="3">
                  <Label className="form-label" for="expiration_date">
                    Fecha vencimiento
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="expiration_date"
                    id="expiration_date"
                    placeholder="Fecha vencimiento"
                    defaultValue={
                      data
                        ? getConvertDateWithTimeZone(
                          data?.client.expiration_date
                        )
                        : null
                    }
                  />
                </Col>
                <Col sm="3" className="mt-2 d-flex justify-content-end">
                  <p>Vecindad</p>
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="neighborhood_region">
                    Municipio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="neighborhood_region"
                    id="neighborhood_region"
                    placeholder="Municipio"
                    defaultValue={data?.client.neighborhood_region}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="neighborhood_city">
                    Departamento
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="neighborhood_city"
                    id="neighborhood_city"
                    placeholder="Departamento"
                    defaultValue={data?.client.neighborhood_city}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md="3">
                  <p className="mt-2">Foto ambos lados del DPI</p>
                </Col>
                <Col md="9" className="d-flex align-items-center gap-2">
                  {data && (
                    <FileListViewer file={data?.client.photos_of_the_dpi} />
                  )}
                </Col>
              </Row>

              <Row className="mt-2">
                <Col sm="3">
                  <Label className="form-label" for="nit">
                    NIT
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="nit"
                    id="nit"
                    placeholder="NIT"
                    defaultValue={data?.client.nit}
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="is_have_credit">
                    Tiene crédito con alguna institución financiera o con
                    personas individuales?
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="is_have_credit"
                    id="is_have_credit"
                    placeholder="Tiene crédito con alguna institución financiera o con personas
                individuales?"
                    defaultValue={data?.is_have_credit}
                  />
                </Col>
                <Col sm="6">
                  <Label
                    className="form-label"
                    for="credit_institutions_and_amount"
                  >
                    Si la respuesta es sí, indicar las instituciones y monto
                  </Label>
                  <Input
                    disabled
                    type="textarea"
                    name="credit_institutions_and_amount"
                    id="credit_institutions_and_amount"
                    placeholder="Si la respuesta es sí, indicar las instituciones y monto"
                    defaultValue={data?.credit_institutions_and_amount}
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
                  <Label className="form-label" for="company_name">
                    Nombre de la empresa
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="Nombre de la empresa"
                    defaultValue={data?.client.company_name}
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="entry_date">
                    Fecha de ingreo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="entry_date"
                    id="entry_date"
                    defaultValue={
                      data?.client.entry_date
                        ? getConvertDateWithTimeZone(data?.client.entry_date)
                        : null
                    }
                    placeholder="Fecha de ingreo"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="position">
                    Puesto
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="position"
                    id="position"
                    defaultValue={data?.client.position}
                    placeholder="Puesto"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="monthly_income">
                    Ingresos mensuales
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="monthly_income"
                    id="monthly_income"
                    defaultValue={data?.client.monthly_income}
                    placeholder="Ingresos mensuales"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="monthly_expenses">
                    Gastos mensuales
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="monthly_expenses"
                    id="monthly_expenses"
                    defaultValue={data?.client.monthly_expenses}
                    placeholder="Gastos mensuales"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="date_and_number_of_income">
                    Fecha y número de ingresos
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="date_and_number_of_income"
                    id="date_and_number_of_income"
                    defaultValue={data?.client.date_and_number_of_income}
                    placeholder="Fecha y número de ingresos"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="immediate_boss_name">
                    Nombre del jefe inmediato
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="immediate_boss_name"
                    id="immediate_boss_name"
                    defaultValue={data?.client.immediate_boss_name}
                    placeholder="Nombre del jefe inmediato"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="work_address">
                    Dirección del trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="work_address"
                    id="work_address"
                    defaultValue={data?.client.work_address}
                    placeholder="Dirección del trabajo"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label className="form-label" for="work_municipality">
                    Municipio del trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="work_municipality"
                    id="work_municipality"
                    defaultValue={data?.client.work_municipality}
                    placeholder="Municipio del trabajo"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="work_phone">
                    Teléfono del trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="work_phone"
                    id="work_phone"
                    defaultValue={data?.client.work_phone}
                    placeholder="Teléfono del trabajo"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="4" className="d-flex align-items-center gap-2">
                  <p>
                    Coordenadas GPS: Direción del trabajo
                  </p>
                </Col>
                <Col md="6" className="d-flex align-items-center gap-2">
                  {data?.client.work_latitude ? (
                    <a
                      className="text-green"
                      target="_blank"
                      href={`https://www.google.com/maps/place/${data?.client.work_latitude},${data?.client.work_longitude}`}
                    >
                      Latitud: {data?.client.work_latitude} <br />
                      Longitud: {data?.client.work_longitude}
                    </a>
                  ) : (
                    "Sin coordenadas GPS"
                  )}

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
                  <Label className="form-label" for="business_name">
                    Nombre del negocio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="business_name"
                    id="business_name"
                    defaultValue={data?.client.business_name}
                    placeholder="Nombre del negocio"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="business_description">
                  Giro de negocio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="business_description"
                    id="business_description"
                    defaultValue={data?.client.business_description}
                    placeholder="Giro de negocio"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="start_date">
                    Fecha de inicio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="start_date"
                    id="start_date"
                    defaultValue={
                      data?.client.start_date
                        ? getConvertDateWithTimeZone(data?.client.start_date)
                        : null
                    }
                    placeholder="Fecha de inicio"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="nit5">
                    NIT
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="nit5"
                    id="nit5"
                    defaultValue={data?.client.nit5}
                    placeholder="NIT"
                  />
                </Col>

              </Row>

              <Row className="mt-1">

              <Col sm="3">
                  <Label className="form-label" for="monthly_sales">
                    Ventas mensuales
                  </Label>
                  <InputGroup>
                    <Input
                      disabled
                      type="text"
                      name="monthly_sales"
                      id="monthly_sales"
                      defaultValue={data?.client.monthly_sales}
                      placeholder="Ventas mensuales"
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                
                <Col sm="3">
                  <Label className="form-label" for="monthly_expenses5">
                    Gastos mensuales
                  </Label>
                  <InputGroup>
                    <Input
                      disabled
                      type="text"
                      name="monthly_expenses5"
                      id="monthly_expenses5"
                      defaultValue={data?.client.monthly_expenses5}
                      placeholder="Gastos mensuales"
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="business_phone">
                    Teléfono del negocio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="business_phone"
                    id="business_phone"
                    defaultValue={data?.client.business_phone}
                    placeholder="Teléfono del negocio"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="business_address">
                    Dirección del negocio
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="business_address"
                    id="business_address"
                    defaultValue={data?.client.business_address}
                    placeholder="Dirección del negocio"
                  />
                </Col>

                
              </Row>
              <Row className="mt-3">
                <Col md="4" className="d-flex align-items-center gap-2">
                  <p>
                    Coordenadas GPS: Direción del negocio propio
                  </p>
                </Col>
                <Col md="6" className="d-flex align-items-center gap-2">
                  {data?.client.business_latitude ? (
                    <a
                      className="text-green"
                      target="_blank"
                      href={`https://www.google.com/maps/place/${data?.client.business_latitude},${data?.client.business_longitude}`}
                    >
                      Latitud: {data?.client.business_latitude} <br />
                      Longitud: {data?.client.business_longitude}
                    </a>
                  ) : (
                    "Sin coordenadas GPS"
                  )}

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
                  <Label
                    className="form-label"
                    for="f_references_name_and_surname"
                  >
                    Nombre y apellidos
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_name_and_surname"
                    id="f_references_name_and_surname"
                    defaultValue={data?.client.f_references_name_and_surname}
                    placeholder="Nombre y apellidos"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="f_references_relationship">
                    Parentesco
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_relationship"
                    id="f_references_relationship"
                    defaultValue={data?.client.f_references_relationship}
                    placeholder="Parentesco"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="f_references_work_phone">
                    Teléfono trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_work_phone"
                    id="f_references_work_phone"
                    defaultValue={data?.client.f_references_work_phone}
                    placeholder="Teléfono trabajo"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="f_references_cell_phone">
                    Celular
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_cell_phone"
                    id="f_references_cell_phone"
                    defaultValue={data?.client.f_references_cell_phone}
                    placeholder="Celular"
                  />
                </Col>
              </Row>

              <Row className="mt-1">
                <Col sm="3">
                  <Label
                    className="form-label"
                    for="f_references_name_and_surname_2"
                  >
                    Nombre y apellidos
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_name_and_surname_2"
                    id="f_references_name_and_surname_2"
                    defaultValue={data?.client.f_references_name_and_surname_2}
                    placeholder="Nombre y apellidos"
                  />
                </Col>

                <Col sm="3">
                  <Label
                    className="form-label"
                    for="f_references_relationship_2"
                  >
                    Parentesco
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_relationship_2"
                    id="f_references_relationship_2"
                    defaultValue={data?.client.f_references_relationship_2}
                    placeholder="Parentesco"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="f_references_work_phone_2">
                    Teléfono trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_work_phone_2"
                    id="f_references_work_phone_2"
                    defaultValue={data?.client.f_references_work_phone_2}
                    placeholder="Teléfono trabajo"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="f_references_cell_phone_2">
                    Celular
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="f_references_cell_phone_2"
                    id="f_references_cell_phone_2"
                    defaultValue={data?.client.f_references_cell_phone_2}
                    placeholder="Celular"
                  />
                </Col>
              </Row>

              <CardTitle tag="h4" className="mt-2">
                Referencias personales (que no sean familiares)
              </CardTitle>
              <Row className="mt-1">
                <Col sm="3">
                  <Label
                    className="form-label"
                    for="p_references_name_and_surname"
                  >
                    Nombre y apellidos
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_name_and_surname"
                    id="p_references_name_and_surname"
                    defaultValue={data?.client.p_references_name_and_surname}
                    placeholder="Nombre y apellidos"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="p_references_relationship">
                    Parentesco
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_relationship"
                    id="p_references_relationship"
                    defaultValue={data?.client.p_references_relationship}
                    placeholder="Parentesco"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="p_references_work_phone">
                    Teléfono trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_work_phone"
                    id="p_references_work_phone"
                    defaultValue={data?.client.p_references_work_phone}
                    placeholder="Teléfono trabajo"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="p_references_cell_phone">
                    Celular
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_cell_phone"
                    id="p_references_cell_phone"
                    defaultValue={data?.client.p_references_cell_phone}
                    placeholder="Celular"
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col sm="3">
                  <Label
                    className="form-label"
                    for="p_references_name_and_surname_2"
                  >
                    Nombre y apellidos
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_name_and_surname_2"
                    id="p_references_name_and_surname_2"
                    defaultValue={data?.client.p_references_name_and_surname_2}
                    placeholder="Nombre y apellidos"
                  />
                </Col>

                <Col sm="3">
                  <Label
                    className="form-label"
                    for="p_references_relationship_2"
                  >
                    Parentesco
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_relationship_2"
                    id="p_references_relationship_2"
                    defaultValue={data?.client.p_references_relationship_2}
                    placeholder="Parentesco"
                  />
                </Col>

                <Col sm="3">
                  <Label className="form-label" for="p_references_work_phone_2">
                    Teléfono trabajo
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_work_phone_2"
                    id="p_references_work_phone_2"
                    defaultValue={data?.client.p_references_work_phone_2}
                    placeholder="Teléfono trabajo"
                  />
                </Col>
                <Col sm="3">
                  <Label className="form-label" for="p_references_cell_phone_2">
                    Celular
                  </Label>
                  <Input
                    disabled
                    type="text"
                    name="p_references_cell_phone_2"
                    id="p_references_cell_phone_2"
                    defaultValue={data?.client.p_references_cell_phone_2}
                    placeholder="Celular"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="2">
          <Guarantee guarantee={guarantee} />
        </TabPane>

        <TabPane tabId="3">
          <CreditValidation validation={validationData} />
        </TabPane>
      </TabContent>
    </>
  );
};

export default VisualizarSolicitud;
