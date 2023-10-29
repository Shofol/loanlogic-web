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
import { agenciasValues, categoríaValues, roles } from "../../configs/data";
import { RefreshCw, Save } from "react-feather";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import { convertDateWithTimeZone } from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null
};

const estadoValues = [
  { label: "ACTIVO", value: "active" },
  { label: "DESHABILITADO", value: "disabled" }
];

const SidebarNewUsers = ({ open, toggleSidebar, onClose }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [picker, setPicker] = useState(null);
  const [startDatepicker, setStartDatePicker] = useState(null);
  const date = convertDateWithTimeZone(new Date());
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
      title="Nuevo Usuario"
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
          date_of_birth: new Date(date),
          is_active: "",
          password: "",
          category: "",
          start_date: new Date(date)
        }}
        validate={(values) => {
          const requiredMsg = "Esto es requerido";
          const invalidNumber = "Numero de telefono invalido";

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
          if (values.phone && values.phone.toString().length > 8) {
            errors.phone = invalidNumber;
          }
          if (values.is_active === "") {
            errors.is_active = requiredMsg;
          }
          if (!values.password) {
            errors.password = requiredMsg;
          }
          if (
            values.role === "Agente de cobranza" ||
            (values.role === "Promotor" && !values.category)
          ) {
            errors.category = requiredMsg;
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await API.post("/user/register", values);
            resetForm();
            toggleSidebar();
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
                isMulti
                name="agency"
                onChange={(option) =>
                  setFieldValue(
                    "agency",
                    option.map((option) => option.value)
                  )
                }
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
                type="number"
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
                  setFieldValue(
                    "date_of_birth",
                    new Date(dateStr[0]).toLocaleDateString("en-CA")
                  );
                }}
                options={{
                  locale: Spanish,
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y",
                  defaultDate: new Date(convertDateWithTimeZone(new Date()))
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
                  setFieldValue(
                    "start_date",
                    new Date(dateStr[0]).toLocaleDateString("en-CA")
                  );
                }}
                options={{
                  locale: Spanish,
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y",
                  defaultDate: new Date(convertDateWithTimeZone(new Date()))
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
