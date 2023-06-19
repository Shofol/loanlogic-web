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
import { Field, Formik } from "formik";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { agenciasValues } from "../../configs/data";
import { RefreshCw, Save } from "react-feather";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const roles = [
  { label: "Gestor comercial", value: "agent" },
  { label: "Agente de cobranza", value: "collection-agent" },
  { label: "Supervisor oficina", value: "supervisor" },
  { label: "Asistente administrativo", value: "assistante" },
  { label: "Director ventas", value: "sales-director" },
  { label: "Director cobranza", value: "collection-director" },
  { label: "Cartera y contabilidad", value: "accounting" },
  { label: "Administrador", value: "administrator" },
];

const estadoValues = [
  { label: "ACTIVO", value: "active" },
  { label: "DESHABILITADO", value: "disabled" },
];

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [picker, setPicker] = useState(new Date());

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
      // onClosed={handleSidebarClosed}
    >
      <Formik
        initialValues={{
          name: "",
          role: "",
          agent: "",
          email: "",
          contact: "",
          birthDate: "",
          status: "",
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
              },
            },
            {
              style: { minWidth: "250px", fontWeight: "bold" },
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
          resetForm,
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
                placeholder="John Doe"
                invalid={errors.fullName && true}
                tag={Field}
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
                // className={classnames("react-select", {
                //   "is-invalid": data !== null && data.country === null,
                // })}
                name="role"
                onChange={(option) => setFieldValue("role", option.value)}
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
                name="agent"
                onChange={(option) => setFieldValue("agent", option.value)}
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
                invalid={errors.email && true}
                name="email"
                tag={Field}
              />

              <FormText color="muted">
                You can use letters, numbers & periods
              </FormText>
            </div>

            <div className="mb-1">
              <Label className="form-label" for="contact">
                Num. Celular <span className="text-danger">*</span>
              </Label>
              <Input
                id="contact"
                placeholder="502-222-222"
                invalid={errors.contact && true}
                name="contact"
                tag={Field}
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
                  setFieldValue("birthDate", dateStr);
                }}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y",
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
                name="status"
                onChange={(option) => setFieldValue("status", option.value)}
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
