// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import logo from "@src/assets/images/logo/logo.png";
import { ErrorMessage, Field, Formik } from "formik";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { toast } from "react-hot-toast";
import { formatMessage } from "../utility/functions/formatMessage";
import unApi from "../@core/api/unApi";

const Login = () => {
  const { skin } = useSkin();
  const navigate = useNavigate();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const initialValues = {
    email: "",
    password: ""
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link
          className="brand-logo d-flex align-items-center"
          to="/"
          onClick={(e) => e.preventDefault()}
        >
          <img src={logo} width="50px" />
          <h2 className="brand-text text-primary ms-1">Gestiona</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              ¡Bienvenido a Gestiona! 👋
            </CardTitle>
            <CardText className="mb-2">
              Por favor, utilice su email y contraseña para conectarse
            </CardText>

            <Formik
              initialValues={initialValues}
              // enableReinitialize={true}
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
                if (!values.password) {
                  errors.password = requiredMsg;
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const response = unApi.post("/user/login", values);
                toast.promise(
                  response,
                  {
                    loading: "Loading",
                    success: (data) => {
                      localStorage.setItem("gesToken", data.data.token);
                      localStorage.setItem(
                        "user",
                        JSON.stringify(data.data.data)
                      );

                      resetForm();
                      navigate("/");
                      return `Succesfully Logged In`;
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
                <Form onSubmit={handleSubmit} className="auth-login-form mt-2">
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      name="email"
                      placeholder="john@example.com"
                      autoFocus
                      tag={Field}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-1">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        Contraseña
                      </Label>
                      <Link to="/forgot-password">
                        <small>¿Ha olvidado su contraseña?</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="login-password"
                      onChange={(value) => {
                        setFieldValue("password", value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-check mb-1">
                    <Input type="checkbox" id="remember-me" />
                    <Label className="form-check-label" for="remember-me">
                      Recuérdame
                    </Label>
                  </div>
                  <Button type="submit" to="/" color="primary" block>
                    Conectarse
                  </Button>
                </Form>
              )}
            </Formik>

            {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
