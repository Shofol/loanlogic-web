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

const Cobranza = () => {
  const { colors } = useContext(ThemeColors);
  const { id } = useParams();
  const [payment_made, setPayment_made] = useState("");
  const options = { numeral: true };
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/debt/collection/${id}`);
    setData(response.data.data);
  };

  const submit = async () => {
    const values = {
      payment_made: payment_made
    };
    try {
      const response = await API.put(`/debt/collection/${id}`, values);
      setData(response.data.data);
      toast.success(response.data.message);
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
            <strong>Núm. Crédito:</strong> {` ${data?.credit.id}`}
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
                Cuota crédito: {data?.debt_collection.credit_fee} Q
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
            <Col sm="6" className="mb-sm-2 mb-md-0 pe-md-4">
              <div className="border rounded">
                {data && (
                  <OverviewCircle
                    data={{
                      completed: Math.round(
                        (data?.debt_collection.total_paid_amount /
                          data?.credit.total_amount) *
                        100
                      )
                    }}
                    title="Crédito pendiente"
                    text={`${data?.debt_collection.total_paid_amount} Q / ${data?.credit.total_amount} Q`}
                    height="150"
                    fontSize="2rem"
                    fixedHeight={false}
                    color={colors.success.main}
                    bottom={20}
                  />
                )}
              </div>
            </Col>
            <Col sm="12" md="6">
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-title">Fecha Pago</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.payment_date}
                </p>
              </div>
              <div className="mb-0 d-flex">
                <p className="acc-title">Cuota crédito</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.credit_fee} Q
                </p>
              </div>
              <div className="mb-0 d-flex">
                <p className="acc-title">Mora</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.default_amount} Q
                </p>
              </div>
              <div className="mb-0 d-flex">
                <p className="acc-title">Interés mora</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.default_interest} Q
                </p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-title">Monto total</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.amount_to_pay} Q
                </p>
              </div>
              <hr></hr>

              <Row className="d-flex fw-bold mb-sm-2">
                <Col md="4" className="pe-0">
                  <p>Pago realizado</p>
                </Col>
                <Col className="px-0" md="7">
                  <Cleave
                    className="form-control"
                    placeholder="Pago realizado"
                    disabled={data?.debt_collection.status != "PENDING"}
                    options={options}
                    id="pagoRealizado"
                    name="pagoRealizado"
                    value={data?.debt_collection.payment_made > 0 ? data?.debt_collection.payment_made : null}
                    onChange={(e) => setPayment_made(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="d-flex fw-bold mb-sm-2">
                <div className="mb-0 d-flex">
                  <p className="acc-title">Estado</p>
                  <p className="mb-0 ms-1">{data?.debt_collection.status == "PAID" ? "PAGADO" : (data?.debt_collection.status == "PARTIALLY_PAID" ? "PAGO PARCIAL" : (data?.debt_collection.status == "PENDING" ? "PENDIENTE" : "IMPAGO"))}</p>
                </div>
              </Row>

              <Row className="d-flex fw-bold mb-sm-2">
                <div className="mb-0 d-flex">
                  <p className="acc-title"># Pago</p>
                  <p className="mb-0 ms-1">{data?.debt_collection.no_of_installment}</p>
                </div>
              </Row>

            </Col>
          </Row>
          <hr className="mb-0"></hr>

          <Row>
            <Col md="6">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Capital e intereses amortizado:{" "}
                {parseFloat(data?.debt_collection.total_paid_amount).toFixed(2)} Q
              </h5>
              <h5 className="fw-bold mb-0 ps-0">
                Capital e interés pendiente:{" "}
                {parseFloat(data?.debt_collection.total_pending_amount).toFixed(2)} Q
              </h5>
            </Col>

            <Col md="6" id="section-to-hide">
              <Row className="my-1">
                <Col sm="12">
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      disabled={data?.debt_collection.status != "PENDING"}
                      onClick={submit}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Pagar</span>
                    </Button.Ripple>
                    <Button.Ripple
                      outline
                      color="secondary"
                      type="reset"
                      disabled={data?.debt_collection.status === "PENDING"}
                      onClick={() => {
                        window.print();
                      }}
                    >
                      <Printer size={16} />
                      <span className="align-middle mx-25">
                        Imprimir ticket
                      </span>
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

export default Cobranza;
