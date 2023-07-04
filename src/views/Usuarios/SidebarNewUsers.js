// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { ErrorMessage, Field, Formik } from "formik";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { agenciasValues } from "../../configs/data";
import { RefreshCw, Save } from "react-feather";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null
};

const roles = [
  { label: "Gestor comercial", value: "AGENT" },
  { label: "Gestor de cobros", value: "COLLECTION-MANAGER" },
  { label: "Supervisor oficina", value: "SUPERVISOR" },
  { label: "Asistente administrativo", value: "ASSISTANT" },
  { label: "Director ventas", value: "SALES-DIRECTOR" },
  { label: "Director cobranza", value: "COLLECTION-DIRECTOR" },
  { label: "Cartera y contabilidad", value: "ACCOUNTING" },
  { label: "Administrador", value: "ADMIN" }
];
const estadoValues = [
  { label: "ACTIVO", value: "active" },
  { label: "DESHABILITADO", value: "disabled" }
];

const categoríaValues = [
  {
    label: "Novato",
    value: "NOVATO"
  },
  {
    label: "Intermedio",
    value: "INTERMEDIO"
  },
  {
    label: "Experto",
    value: "EXPERTO"
  }
];

const SidebarNewUsers = ({ open, toggleSidebar, onClose }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [picker, setPicker] = useState(new Date());
  const [startDatepicker, setStartDatePicker] = useState(new Date());

  // const handleSidebarClosed = () => {
  //   for (const key in defaultValues) {
  //     setValue(key, "");
  //   }
  //   setRole("subscriber");
  //   setPlan("basic");
  // };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={onClose}
    >
      <Formik
        initialValues={{
          name: "",
          family_name: "",
          role: "",
          agency: "",
          email: "",
          phone: "",
          date_of_birth: new Date(),
          is_active: "",
          password: "",
          category: "",
          start_date: new Date()
        }}
        validate={(values) => {
          const requiredMsg = "Esto es requerido";
          const errors = {};
          if (!values.email) {
            errors.email = requiredMsg;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.name) {
            errors.name = requiredMsg;
          }
          if (!values.family_name) {
            errors.family_name = requiredMsg;
          }
          if (!values.role) {
            errors.role = requiredMsg;
          }
          if (!values.agency) {
            errors.agency = requiredMsg;
          }
          if (!values.phone) {
            errors.phone = requiredMsg;
          }
          if (!values.is_active) {
            errors.is_active = requiredMsg;
          }
          if (!values.password) {
            errors.password = requiredMsg;
          }
          if (
            values.role === "Agente de cobranza" ||
            (values.role === "Gestor comercial" && !values.category)
          ) {
            errors.category = requiredMsg;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.family_name = "s";
          const response = API.post("/user/register", values);
          toast.promise(
            response,
            {
              loading: "Loading",
              success: (data) => {
                resetForm();
                console.log(data);
                return `${data.data.message}`;
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
            <div className="mb-1">
              <Label className="form-label" for="nombre">
                Nombre <span className="text-danger">*</span>
              </Label>

              <Input
                id="nombre"
                name="name"
                type="text"
                placeholder="John"
                // invalid={errors.fullName && true}
                tag={Field}
              />
              <ErrorMessage
                component="div"
                name="name"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="apellido">
                Apellido <span className="text-danger">*</span>
              </Label>

              <Input
                id="apellido"
                name="family_name"
                type="text"
                placeholder="Doe"
                // invalid={errors.fullName && true}
                tag={Field}
              />
              <ErrorMessage
                component="div"
                name="family_name"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="country">
                Rol <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={roles}
                theme={selectThemeColors}
                name="role"
                onChange={(option) => setFieldValue("role", option.value)}
              />
              <ErrorMessage
                component="div"
                name="role"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="country">
                Categoría
              </Label>
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={categoríaValues}
                theme={selectThemeColors}
                name="category"
                onChange={(option) => setFieldValue("category", option.value)}
              />
              <ErrorMessage
                component="div"
                name="category"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="country">
                Oficina <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={agenciasValues}
                theme={selectThemeColors}
                name="agency"
                onChange={(option) => setFieldValue("agency", option.value)}
              />
              <ErrorMessage
                component="div"
                name="agency"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="userEmail">
                Email <span className="text-danger">*</span>
              </Label>

              <Input
                type="email"
                id="userEmail"
                placeholder="john.doe@example.com"
                // invalid={errors.email && true}
                name="email"
                tag={Field}
              />

              <FormText color="muted">
                You can use letters, numbers & periods
              </FormText>

              <ErrorMessage
                component="div"
                name="email"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="userEmail">
                Password <span className="text-danger">*</span>
              </Label>

              <Input
                type="password"
                id="password"
                // invalid={errors.password && true}
                name="password"
                placeholder="*******"
                tag={Field}
              />

              <ErrorMessage
                component="div"
                name="password"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="phone">
                Num. Celular <span className="text-danger">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="502-222-222"
                // invalid={errors.phone && true}
                name="phone"
                tag={Field}
              />
              <ErrorMessage
                component="div"
                name="phone"
                className="text-danger"
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="hf-picker">
                Fecha nacimiento
              </Label>
              <Flatpickr
                value={picker}
                id="hf-picker"
                className="form-control"
                onChange={(dateStr, instance) => {
                  setPicker(dateStr);
                  setFieldValue("date_of_birth", dateStr[0]);
                }}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y",
                  defaultDate: new Date()
                }}
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="hf-picker">
                Fecha de ingreso
              </Label>
              <Flatpickr
                value={startDatepicker}
                id="hf-picker"
                className="form-control bg-white"
                onChange={(dateStr, instance) => {
                  setStartDatePicker(dateStr);
                  setFieldValue("start_date", dateStr[0]);
                }}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y",
                  defaultDate: new Date()
                }}
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="country">
                Estado <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={estadoValues}
                theme={selectThemeColors}
                name="is_active"
                onChange={(option) =>
                  setFieldValue(
                    "is_active",
                    option.value === estadoValues[0].value ? true : false
                  )
                }
              />
              <ErrorMessage
                component="div"
                name="is_active"
                className="text-danger"
              />
            </div>

            <Button.Ripple className="me-1" color="primary" type="submit">
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
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

export default SidebarNewUsers;
