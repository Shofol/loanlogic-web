import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Input, Label, Button } from "reactstrap";
import "./cobranza.scss";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Printer, Save } from "react-feather";
import API from "../../@core/api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import Cleave from "cleave.js/react";

const Cobranza = () => {
  const { colors } = useContext(ThemeColors);
  const { id } = useParams();
  const [payment_made, setPayment_made] = useState("");
  const options = { numeral: true };
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/debt/collection/${id}`);
    setData(response.data.data);
  };

  const submit = () => {
    const values = {
      payment_made: payment_made,
      application_id: id
    };
    const response = API.put("/debt/collection", values);

    toast.promise(
      response,
      {
        loading: "Loading",
        success: (data) => {
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
  };

  return (
    <div id="section-to-print">
      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <h4>
            {data?.client.name} {data?.client.surname}{" "}
            {data?.client.second_surname}
          </h4>
          <p className="mb-0">
            <strong>DPI:</strong> {data?.client.dpi_number}
          </p>
          <p className="mb-0">
            <strong>Crédito núm:</strong> {data?.credit.id}
          </p>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                Fecha crédito: {data?.credit.disbursement_date}
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Monto solicitado: {data?.credit.requested_amount}Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Crédito: {data?.credit.product_name}</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Capital crédito: {data?.credit.disbursement_amount}Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                Cuota crédito: {data?.debt_collection.credit_fee}Q
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Total adeudado: {data?.credit.total_amount}Q
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
                <p className="mb-0 ms-1">{data?.debt_collection.credit_fee}Q</p>
              </div>
              <div className="mb-0 d-flex">
                <p className="acc-title">Mora</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.default_amount}q
                </p>
              </div>
              <div className="mb-0 d-flex">
                <p className="acc-title">Interés mora</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.default_interest}Q
                </p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-title">Monto total</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.amount_to_pay}Q
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
                    options={options}
                    id="pagoRealizado"
                    name="pagoRealizado"
                    value={payment_made}
                    onChange={(e) => setPayment_made(e.target.value)}
                  />
                  {/* <Input
                    type="text"
                    name="pagoRealizado"
                    id="productoNombre"
                    placeholder="Pago realizado"
                    value={payment_made}
                    onChange={(e) => setPayment_made(e.target.value)}
                  /> */}
                </Col>
              </Row>
            </Col>
          </Row>
          <hr className="mb-0"></hr>

          <Row>
            <Col md="6">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Capital e intereses amortizado:{" "}
                {data?.debt_collection.total_paid_amount}Q
              </h5>
              <h5 className="fw-bold mb-0 ps-0">
                Capital e interés pendiente:{" "}
                {data?.debt_collection.total_pending_amount}Q
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
                      onClick={submit}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                    <Button.Ripple
                      outline
                      color="secondary"
                      type="reset"
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
