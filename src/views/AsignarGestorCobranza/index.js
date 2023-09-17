import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Input, Label, Button, CardSubtitle } from "reactstrap";
import "./cobranza.scss";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Printer, Save } from "react-feather";
import API from "../../@core/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import Cleave from "cleave.js/react";
import Select from "react-select";
import { selectThemeColors } from "@utils";


const AsignarGestorCobranza = () => {
  const { colors } = useContext(ThemeColors);
  const { id } = useParams();
  const [payment_made, setPayment_made] = useState("");
  const options = { numeral: true };
  const [data, setData] = useState(null);
  const [gestors, setGestors] = useState([]);
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/credit/${id}`);
    setData(response.data.data);

    const gestorData = await API.get(`/user/list?sortField=id&sortOrder=ASC&role=COLLECTION-MANAGER`);
    setGestors(
      gestorData.data.data.map((gestor) => ({
        label: gestor.name + ' ' + gestor.family_name + ' (' + gestor.role+ ')',
        value: gestor.id,
      }))
    );
  };

  const submit = async () => {
    const values = {
      agent: agent
    };
    try {
      const response = await API.put(`/credit/assign-collection-manager/${id}`, values);
      toast.success(response.data.message);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div id="section-to-print">
      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <CardSubtitle
            tag="h4"
            className="cursor-pointer link text-primary link-underline-primary"
            onClick={() => {
              navigate(`/clientes/${data?.client.id}`);
            }}
          >
            {`${data?.client.name.toUpperCase()} ` +
              `${data?.client.surname.toUpperCase()} ` + `${data?.client.second_surname.toUpperCase()}`
            }
          </CardSubtitle>
          <p className="mb-0">
            <strong>DPI:</strong> {data?.client.dpi_number}
          </p>

          <CardSubtitle
            tag="h5"
            className="cursor-pointer link text-primary link-underline-primary"
            style={{ 'marginTop': 'auto' }}
            onClick={() => {
              navigate(`/reporteria/amortization/${data?.credit.id}`);
            }}
          >
            <strong>Crédito núm:</strong> {` ${data?.credit.id}`}
          </CardSubtitle>

          <hr />
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                Fecha crédito: {data?.credit.disbursement_date}
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Monto solicitado: {data?.credit.requested_amount} Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Crédito: {data?.credit.product_name}</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Capital crédito: {data?.credit.total_credit_amount} Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                Cuota crédito: {data?.debt_collections[0].credit_fee} Q
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Total adeudado: {data?.credit.total_amount} Q
              </p>
            </Col>
          </Row>
        </div>
      </Card>

      <Card className="p-2">
        <div className="contentWidth mx-auto">


          <Row>
            <Col md="6">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Total adeudado:{" "}
                {data?.credit.total_default_amount} Q
              </h5>
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Pendiente de pago:{" "}
                {data?.credit.total_remaining_amount} Q
              </h5>
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Total pagado:{" "}
                {data?.credit.total_paid_amount} Q
              </h5>
            </Col>

            <Col md="6" id="section-to-hide">
              <Col className="mb-1" sm="12">
                <Label className="form-label">Asignar gestor de cobro:</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  // isMulti
                  name="colors"
                  options={gestors}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={
                    (option) => setAgent(option.value)
                    // setAgencies(option.map((option) => option.value))
                  }
                />
              </Col>
              <Row className="my-1">
                <Col sm="12">
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={submit}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default AsignarGestorCobranza;
