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
  InputGroup,
  InputGroupText
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import RangeList from "../../@core/components/rangeList";
import { Save, RefreshCw } from "react-feather";
import { agenciasValues } from "../../configs/data";
import { Field, Formik } from "formik";

const ConfigForm = () => {
  const periodicidadValues = [
    { value: "diario", label: "Diario" },
    { value: "semanal", label: "Semanal" },
    { value: "quincenal", label: "Quincenal" },
    { value: "mensual", label: "Mensual" }
  ];

  const duraciónOptions = [
    { value: "días", label: "Días" },
    { value: "semanas", label: "Semanas" },
    { value: "meses", label: "Meses" }
  ];

  const tipoDeGarantiaOptions = [
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

  const paísOptions = [
    { value: "quetzal", label: "Guatemala - Quetzal" },
    { value: "dollar", label: "US - Dollar" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Crear nuevo tipo de producto</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            productoNombre: "",
            productoCódigo: "",
            periodicidad: "",
            duración: "",
            duraciónPeriodicidad: "",
            tipoDeGarantia: "",
            montoMínimo: "",
            montoMáximo: "",
            rangoMáximoSupervisores: "",
            país: "",
            interésCrédito: "",
            iva: "",
            interésMoratorio: "",
            gastosGestión: "",
            gastosDeAsistencia: "",
            agenciasPermitidas: [],
            gastoAdministrativo: [
              {
                rangoMinimo: "",
                rangoMáximo: "",
                gastoadministrativo: ""
              }
            ],
            bono: [
              {
                rangoMinimo: "",
                rangoMáximo: "",
                bono: ""
              }
            ]
          }}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label" for="productoNombre">
                    Nombre del producto
                  </Label>
                  <Input
                    type="text"
                    name="productoNombre"
                    id="productoNombre"
                    placeholder="Nombre del producto"
                    tag={Field}
                  />
                </Col>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label" for="productoCódigo">
                    Código del producto
                  </Label>
                  <Input
                    type="text"
                    name="productoCódigo"
                    id="productoCódigo"
                    placeholder="Código del producto"
                    tag={Field}
                  />
                </Col>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label">Periodicidad</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={periodicidadValues[0]}
                    options={periodicidadValues}
                    isClearable={false}
                    name="periodicidad"
                    onChange={(option) =>
                      setFieldValue("periodicidad", option.value)
                    }
                  />
                </Col>
                <Col sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="duración">
                    Duración
                  </Label>
                  <Input
                    type="text"
                    name="duración"
                    id="duración"
                    placeholder="Duración"
                    tag={Field}
                  />
                </Col>
                <Col sm="6" md="3" className="mb-1">
                  <Label className="form-label">Duración Periodicidad</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={duraciónOptions[0]}
                    options={duraciónOptions}
                    isClearable={false}
                    name="duraciónPeriodicidad"
                    onChange={(option) =>
                      setFieldValue("duraciónPeriodicidad", option.value)
                    }
                  />
                </Col>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label">Tipo de garantia</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={tipoDeGarantiaOptions[0]}
                    options={tipoDeGarantiaOptions}
                    isClearable={false}
                    onChange={(option) =>
                      setFieldValue("tipoDeGarantia", option.value)
                    }
                    name="tipoDeGarantia"
                  />
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="montoMínimo">
                    Monto mínimo
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="montoMínimo"
                      id="montoMínimo"
                      placeholder="Monto mínimo"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="montoMáximo">
                    Monto máximo
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="montoMáximo"
                      id="montoMáximo"
                      placeholder="Monto máximo"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="rangoMáximoSupervisores">
                    Rango máximo supervisores
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="rangoMáximoSupervisores"
                      id="rangoMáximoSupervisores"
                      placeholder="Rango máximo supervisores"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label">País</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={paísOptions[0]}
                    options={paísOptions}
                    isClearable={false}
                    onChange={(option) => setFieldValue("país", option.value)}
                    name="país"
                  />
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="interésCrédito">
                    Interés crédito (IVA includo)
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="interésCrédito"
                      id="interésCrédito"
                      placeholder="Interés crédito (IVA includo)"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="iva">
                    IVA
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="iva"
                      id="iva"
                      placeholder="IVA"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="interésMoratorio">
                    Interés moratorio:
                  </Label>

                  <InputGroup>
                    <Input
                      type="number"
                      name="interésMoratorio"
                      id="interésMoratorio"
                      placeholder="Interés moratorio"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="GastosGestión">
                    Gastos por gestión de cobranza
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="gastosGestión"
                      id="gastosGestión"
                      placeholder="Gastos por gestión de cobranza"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="gastosDeAsistencia">
                    Gastos de asistencia
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="gastosDeAsistencia"
                      id="gastosDeAsistencia"
                      placeholder="Gastos de asistencia"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col className="mb-1" md="3" sm="12">
                  <Label className="form-label">Agencias permitidas</Label>
                  <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    isMulti
                    options={agenciasValues}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(option) =>
                      setFieldValue(
                        "agenciasPermitidas",
                        option.map((option) => option.value)
                      )
                    }
                    name="agenciasPermitidas"
                  />
                </Col>

                <RangeList
                  fieldName="gastoAdministrativo"
                  label="Gasto administrativo"
                  assosLabel="Gasto administrativo"
                  values={values}
                />

                <RangeList
                  label="Bono (colocación asesores)"
                  assosLabel="Bono"
                  fieldName="bono"
                  values={values}
                />

                <Col sm="12">
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      // onClick={(e) => e.preventDefault()}
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
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export default ConfigForm;
