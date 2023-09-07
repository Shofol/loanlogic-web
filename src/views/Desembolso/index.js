import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Input, Label, Button } from "reactstrap";
import "../Cobranza/cobranza.scss";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Printer, Save } from "react-feather";
import { useParams } from "react-router-dom";
import API from "../../@core/api/api";

const Desembolso = () => {
  const { colors } = useContext(ThemeColors);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/debt/collection/${id}`);
    setData(response.data.data);
  };

  const submit = () => {
    // const values = {
    //   payment_made: payment_made
    // };
    const response = API.put(`/credit/disbursement/${id}`);

    toast.promise(
      response,
      {
        loading: "Loading",
        success: (data) => {
          setData(data.data.data);
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
            {" "}
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
                {" "}
                Fecha crédito: {data?.credit.disbursement_date}
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                {" "}
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
                {" "}
                Capital crédito: {data?.credit.total_credit_amount}Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                {" "}
                Cuota crédito: {data?.credit.installment_amount}Q
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
              <div className="mb-0 d-flex">
                <p className="acc-desembolso-title">Fecha Desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.debt_collection.payment_date}
                </p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Total adeudado</p>
                <span>:</span>
                <p className="mb-0 ms-1">{data?.credit.total_amount}Q</p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Gastos administrativos</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {data?.credit.administrative_expenses}q
                </p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Asistencias</p>
                <span>:</span>
                <p className="mb-0 ms-1">{data?.credit.assistance_expenses}Q</p>
              </div>

              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">
                  Descuento días adelantado
                </p>
                <span>:</span>
                <p className="mb-0 ms-1"> {data?.credit.holidays_discount} Q</p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Total desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">{data?.credit.disbursement_amount}Q</p>
              </div>
            </Col>
          </Row>
          <hr className="mb-0"></hr>

          <Row>
            <Col md="5">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Capital e intereses amortizado:{" "}
                {data?.debt_collection.total_paid_amount}Q
              </h5>
              <h5 className="fw-bold mb-0 ps-0">
                Capital e interés pendiente:{" "}
                {data?.debt_collection.total_pending_amount}Q
              </h5>
            </Col>

            <Col md="7" id="section-to-hide">
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
                      <span className="align-middle mx-25">
                        Confirmar Desembolso
                      </span>
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

export default Desembolso;
