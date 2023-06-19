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
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";

const ConfigForm = () => {
  const periodicidadValues = [
    { value: "DIARIO", label: "Diario" },
    { value: "SEMANAL", label: "Semanal" },
    { value: "QUINCENAL", label: "Quincenal" },
    { value: "MENSUAL", label: "Mensual" }
  ];

  const duraciónOptions = [
    { value: "DÍAS", label: "Días" },
    { value: "SEMANAS", label: "Semanas" },
    { value: "MESES", label: "Meses" }
  ];

  const tipoDeGarantiaOptions = [
    { value: "FIDUCIARIA", label: "Fiduciaria (firma contrato)" },
    {
      value: "PRENDARIA",
      label: "Prendaria (el cliente la puede seguir utilizando)"
    },
    { value: "CHEQUE", label: "Cheque (entrega como garantia en la agencia)" },
    {
      value: "MOBILIARIA",
      label:
        "Mobiliaria (registro formal ante el registro mercantil, pero el cliente puede seguir utilizando)"
    },
    {
      value: "HIPOTECARIA",
      label: "Hipotecaria (se crea un gravamen sobre la propiedad)"
    },
    {
      value: "COMPRA_VENTA",
      label: "Compra-venta (si no me pagas, me quedo con la casa para venderla)"
    },
    {
      value: "EMPEÑO",
      label:
        "Empeño (igual que la prendaria pero se queda en posesión por Al Chilazo)"
    }
  ];

  const paísOptions = [
    { value: "QUENTZAL", label: "Guatemala - Quetzal" },
    { value: "DOLLAR", label: "US - Dollar" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Crear nuevo tipo de producto</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            product_name: "",
            product_code: "",
            frequency: "",
            duration: "",
            duration_frequency: "",
            guarantee_type: "",
            minimum_amount: "",
            maximum_amount: "",
            maximum_supervisor_range: "",
            country: "",
            credit_interest: "",
            vat: "",
            late_interest: "",
            management_expenses: "",
            assistance_expenses: "",
            agencies: [],
            administrative_expenses: [
              // {
              //   minimum_range: null,
              //   maximum_range: null,
              //   administrative_expense: null,
              // },
            ],
            bonuses: [
              // {
              //   minimum_range: null,
              //   maximum_range: null,
              //   bonus: null,
              // },
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // setTimeout(() => {
            //   console.log(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);

            const response = API.post("product", values);
            toast.promise(
              response,
              {
                loading: "Loading",
                success: (data) => {
                  resetForm();
                  return `Successfully saved ${data.name}`;
                },
                error: (err) => {
                  return `ERROR: ${formatMessage(err)}`;
                }
              },
              {
                style: { minWidth: "250px", fontWeight: "bold" }
              }
            );
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
            setFieldValue,
            resetForm
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label" for="product_name">
                    Nombre del producto
                  </Label>
                  <Input
                    type="text"
                    name="product_name"
                    id="product_name"
                    placeholder="Nombre del producto"
                    tag={Field}
                  />
                </Col>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label" for="product_code">
                    Código del producto
                  </Label>
                  <Input
                    type="text"
                    name="product_code"
                    id="product_code"
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
                    name="frequency"
                    onChange={(option) =>
                      setFieldValue("frequency", option.value)
                    }
                  />
                </Col>
                <Col sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="duration">
                    Duración
                  </Label>
                  <Input
                    type="text"
                    name="duration"
                    id="duration"
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
                    options={duraciónOptions}
                    isClearable={false}
                    name="duration_frequency"
                    onChange={(option) =>
                      setFieldValue("duration_frequency", option.value)
                    }
                  />
                </Col>
                <Col sm="12" md="6" className="mb-1">
                  <Label className="form-label">Tipo de garantia</Label>
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    isMulti={true}
                    // defaultValue={tipoDeGarantiaOptions[0]}
                    options={tipoDeGarantiaOptions}
                    isClearable={false}
                    onChange={(option) =>
                      setFieldValue("guarantee_type", option.value)
                    }
                    name="guarantee_type"
                  />
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="minimum_amount">
                    Monto mínimo
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="minimum_amount"
                      id="minimum_amount"
                      placeholder="Monto mínimo"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="maximum_amount">
                    Monto máximo
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="maximum_amount"
                      id="maximum_amount"
                      placeholder="Monto máximo"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="maximum_supervisor_range">
                    Rango máximo supervisores
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="maximum_supervisor_range"
                      id="maximum_supervisor_range"
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
                    onChange={(option) =>
                      setFieldValue("country", option.value)
                    }
                    name="country"
                  />
                </Col>
                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="credit_interest">
                    Interés crédito (IVA includo)
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="credit_interest"
                      id="credit_interest"
                      placeholder="Interés crédito (IVA includo)"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="vat">
                    IVA
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="vat"
                      id="vat"
                      placeholder="IVA"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="late_interest">
                    Interés moratorio:
                  </Label>

                  <InputGroup>
                    <Input
                      type="number"
                      name="late_interest"
                      id="late_interest"
                      placeholder="Interés moratorio"
                      tag={Field}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="management_expenses">
                    Gastos por gestión de cobranza
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="management_expenses"
                      id="management_expenses"
                      placeholder="Gastos por gestión de cobranza"
                      tag={Field}
                    />
                    <InputGroupText>Q</InputGroupText>
                  </InputGroup>
                </Col>

                <Col sm="12" md="3" className="mb-1">
                  <Label className="form-label" for="assistance_expenses">
                    Gastos de asistencia
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="assistance_expenses"
                      id="assistance_expenses"
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
                        "agencies",
                        option.map((option) => option.value)
                      )
                    }
                    name="agencies"
                  />
                </Col>

                <RangeList
                  fieldName="administrative_expenses"
                  label="Gasto administrativo"
                  assosLabel="administrative_expense"
                  values={values}
                  assosPH="Gasto administrativo"
                />

                <RangeList
                  label="Bono (colocación asesores)"
                  assosLabel="bonus"
                  fieldName="bonuses"
                  values={values}
                  assosPH="Bono"
                />

                <Col sm="12">
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                    <Button.Ripple
                      outline
                      color="secondary"
                      type="reset"
                      onClick={resetForm}
                    >
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
