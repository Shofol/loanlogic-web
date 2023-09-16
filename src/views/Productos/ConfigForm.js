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
import { agenciasValues, tipoDeGarantiaOptions } from "../../configs/data";
import { ErrorMessage, Field, Formik } from "formik";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import { useParams } from "react-router-dom";
import api from "../../@core/api/api";
import { useEffect } from "react";
import { useState } from "react";

const ConfigForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setProduct(initialValues);
    }
  }, [id]);

  const fetchProduct = async () => {
    const response = await api.get(`product/${id}`);
    setProduct(response.data.data);
  };

  const periodicidadValues = [
    { value: "DAILY", label: "Diario" },
    { value: "WEEKLY", label: "Semanal" },
    { value: "BIWEEKLY", label: "Quincenal" },
    { value: "FORTNIGHTLY", label: "Catorcenal" },
    { value: "MONTHLY", label: "Mensual (fin de mes)" }
  ];

  /*const duraciónOptions = [
    { value: "DAYS", label: "Días" },
    { value: "WEEKS", label: "Semanas" },
    { value: "FOURTEEN", label: "Catorcenas" },
    { value: "FORTNIGHT", label: "Quincenas" },
    { value: "MONTHS", label: "Meses" }
  ];*/

  const paísOptions = [{ value: "QUENTZAL", label: "Guatemala - Quetzal" }];

  const initialValues = {
    product_name: product ? product.product_name : "",
    product_code: product ? product.product_code : "",
    frequency: product ? product.frequency : "",
    duration: product ? product.duration : "",
    //duration_frequency: product ? product.duration_frequency : "",
    guarantee_type: product ? product.guarantee_type : [],
    minimum_amount: product ? product.minimum_amount : "",
    maximum_amount: product ? product.maximum_amount : "",
    maximum_supervisor_range: product ? product.maximum_supervisor_range : "",
    country: product ? product.country : "",
    credit_interest: product ? product.credit_interest : "",
    vat: product ? product.vat : "",
    late_interest: product ? product.late_interest : "",
    management_expenses: product ? product.management_expenses : "",
    management_days: product ? product.management_days : "",
    assistance_expenses: product ? product.assistance_expenses : "",
    agencies: product ? product.agencies : [],
    administrative_expenses: product ? product.administrative_expenses : [],
    bonuses: product ? product.bonuses : []
  };

  const mapAgecnyValue = () => {
    let filterdData = [];
    product.agencies.map((agency) => {
      filterdData = [
        ...filterdData,
        agenciasValues.filter((freq) => {
          return freq.value === agency;
        })[0]
      ];
    });
    return filterdData;
  };

  const returnGuaranteetypeValues = (product) => {
    let filterdData = [];
    product.guarantee_type.map((product) => {
      filterdData = [
        ...filterdData,
        tipoDeGarantiaOptions.filter((freq) => {
          return freq.value === product;
        })[0]
      ];
    });
    return filterdData;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Crear nuevo tipo de producto</CardTitle>
      </CardHeader>

      <CardBody>
        {product && (
          <Formik
            initialValues={initialValues}
            // enableReinitialize={true}
            validate={(values) => {
              const errors = {};
              const requiredMsg = "Esto es requerido";

              if (!values.product_name) {
                errors.product_name = requiredMsg;
              }
              if (!values.product_code) {
                errors.product_code = requiredMsg;
              }
              if (values.frequency.length === 0) {
                errors.frequency = requiredMsg;
              }
              if (!values.duration) {
                errors.duration = requiredMsg;
              }
              /*if (values.duration_frequency.length === 0) {
                errors.duration_frequency = requiredMsg;
              }*/
              if (!values.minimum_amount) {
                errors.minimum_amount = requiredMsg;
              }
              if (!values.maximum_amount) {
                errors.maximum_amount = requiredMsg;
              }
              if (!values.maximum_supervisor_range) {
                errors.maximum_supervisor_range = requiredMsg;
              }
              if (!values.country) {
                errors.country = requiredMsg;
              }
              if (!values.credit_interest) {
                errors.credit_interest = requiredMsg;
              }
              if (!values.vat) {
                errors.vat = requiredMsg;
              }
              if (!values.late_interest) {
                errors.late_interest = requiredMsg;
              }
              if (!values.management_expenses) {
                errors.management_expenses = requiredMsg;
              }
              if (!values.management_days) {
                errors.management_days = requiredMsg;
              }
              if (!values.assistance_expenses) {
                errors.assistance_expenses = requiredMsg;
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = id
                  ? await API.put(`product/${id}`, values)
                  : await API.post("product", values);
                // resetForm();
                toast.success(response.data.message);
              } catch (error) {
                console.log(error);
              }
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
                      Nombre del producto<span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="product_name"
                      id="product_name"
                      placeholder="Nombre del producto"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="product_name"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="6" className="mb-1">
                    <Label className="form-label" for="product_code">
                      Código del producto<span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="product_code"
                      id="product_code"
                      placeholder="Código del producto"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="product_code"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="6" className="mb-1">
                    <Label className="form-label">
                      Periodicidad de cobros
                      <span className="text-danger">*</span>
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      // defaultValue={periodicidadValues[0]}
                      options={periodicidadValues}
                      isClearable={false}
                      name="frequency"
                      defaultValue={
                        periodicidadValues.filter(
                          (freq) => freq.value === product.frequency
                        )[0]
                      }
                      onChange={(option) =>
                        setFieldValue("frequency", option.value)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="frequency"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="6" md="3" className="mb-1">
                    <Label className="form-label" for="duration">
                      Duración (valor)<span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="duration"
                      id="duration"
                      placeholder="Duración"
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="duration"
                      className="text-danger"
                    />
                  </Col>
                  {/*<Col sm="6" md="3" className="mb-1">
                    <Label className="form-label">
                      Duración (unidad)<span className="text-danger">*</span>
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={duraciónOptions}
                      isClearable={false}
                      name="duration_frequency"
                      defaultValue={
                        duraciónOptions.filter((freq) => {
                          return freq.value === product.duration_frequency;
                        })[0]
                      }
                      onChange={(option) =>
                        setFieldValue("duration_frequency", option.value)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="duration_frequency"
                      className="text-danger"
                    />
                    </Col>*/}
                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="management_days">
                      Días Gestión de Cobranza automática
                      <span className="text-danger">*</span>
                    </Label>
                    <InputGroup>
                      <Input
                        type="number"
                        name="management_days"
                        id="management_days"
                        placeholder="90 días"
                        tag={Field}
                      />
                      <InputGroupText>Días</InputGroupText>
                    </InputGroup>
                    <ErrorMessage
                      component="div"
                      name="management_days"
                      className="text-danger"
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
                      defaultValue={returnGuaranteetypeValues(product)}
                      onChange={(option) =>
                        setFieldValue(
                          "guarantee_type",
                          option.map((option) => option.value)
                        )
                      }
                      name="guarantee_type"
                    />
                  </Col>
                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="minimum_amount">
                      Monto mínimo<span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="minimum_amount"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="maximum_amount">
                      Monto máximo<span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="maximum_amount"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="3" className="mb-1">
                    <Label
                      className="form-label"
                      for="maximum_supervisor_range"
                    >
                      Rango máximo supervisores
                      <span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="maximum_supervisor_range"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label">
                      País<span className="text-danger">*</span>
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      // defaultValue={paísOptions[0]}
                      options={paísOptions}
                      isClearable={false}
                      defaultValue={
                        paísOptions.filter((freq) => {
                          return freq.value === product.country;
                        })[0]
                      }
                      onChange={(option) =>
                        setFieldValue("country", option.value)
                      }
                      name="country"
                    />
                    <ErrorMessage
                      component="div"
                      name="country"
                      className="text-danger"
                    />
                  </Col>
                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="credit_interest">
                      Interés crédito mensual (IVA includo)
                      <span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="credit_interest"
                      className="text-danger"
                    />
                  </Col>

                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="vat">
                      IVA<span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="vat"
                      className="text-danger"
                    />
                  </Col>

                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="late_interest">
                      Interés moratorio<span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="late_interest"
                      className="text-danger"
                    />
                  </Col>

                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="management_expenses">
                      Gastos por gestión de cobranza
                      <span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="management_expenses"
                      className="text-danger"
                    />
                  </Col>

                  <Col sm="12" md="3" className="mb-1">
                    <Label className="form-label" for="assistance_expenses">
                      Gastos de asistencia<span className="text-danger">*</span>
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
                    <ErrorMessage
                      component="div"
                      name="assistance_expenses"
                      className="text-danger"
                    />
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
                      defaultValue={mapAgecnyValue()}
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
        )}
      </CardBody>
    </Card>
  );
};
export default ConfigForm;
