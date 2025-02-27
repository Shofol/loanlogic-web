import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Input, Label, Button, CardSubtitle } from "reactstrap";
import "../Cobranza/cobranza.scss";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Printer, Save } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../@core/api/api";
import { toast } from "react-hot-toast";
import moment from "moment";

const Desembolso = () => {
  const { colors } = useContext(ThemeColors);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('en-US');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/debt/collection/${id}`);
    setData(response.data.data);
  };

  const submit = async () => {
    try {
      const response = await API.put(`/credit/disbursement/${id}`);
      setData(response.data.data);

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };


  const cancel = async () => {
    try {
      const response = await API.put(`/credit/cancel/${data?.credit.id}`);

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
            <strong>Núm. Crédito:</strong> {` ${data?.credit.id}`}
          </CardSubtitle>
          {data?.credit && data?.credit.application && data?.credit.application?.pdf && (
            <Button
              color="success"
              className="btn-sm position-absolute"
              style={{ top: "20px", right: "20px" }}
            >
              <a
                className="text-white"
                target="_blank"
                href={data.credit.application.pdf}
                download={`${data?.client.name}_${data?.id}`}
              >
                Descargar PAGARÉ
              </a>
            </Button>
          )}
          <hr />
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                {" "}
                Fecha crédito: {moment(data?.credit.disbursement_date).format("DD/MM/YYYY")}
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                {" "}
                Monto solicitado: {formatter.format(data?.credit.requested_amount)} Q
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
                Capital crédito: {formatter.format(data?.credit.total_credit_amount)} Q
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                {" "}
                Cuota crédito: {formatter.format(parseFloat(data?.credit.installment_amount).toFixed(2))} Q
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Total adeudado: {formatter.format(data?.credit.total_amount)} Q
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
                    text={`${formatter.format(data?.debt_collection.total_paid_amount)} Q / ${formatter.format(data?.credit.total_amount)} Q`}
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
                  {moment(data?.debt_collection.payment_date).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Monto solicitado</p>
                <span>:</span>
                <p className="mb-0 ms-1">{formatter.format(data?.credit.requested_amount)} Q</p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Gastos administrativos</p>
                <span>:</span>
                <p className="mb-0 ms-1">
                  {formatter.format(data?.credit.administrative_expenses)} Q
                </p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Asistencias</p>
                <span>:</span>
                <p className="mb-0 ms-1">{formatter.format(data?.credit.assistance_expenses)} Q</p>
              </div>

              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">
                  Descuento días adelantado
                </p>
                <span>:</span>
                <p className="mb-0 ms-1"> {formatter.format(data?.credit.holidays_discount)} Q</p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Total desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">{formatter.format(data?.credit.disbursement_amount)} Q</p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Estado desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">{data?.debt_collection.status == "PAID" ? "DESEMBOLSADO" : "PENDIENTE"}</p>
              </div>

            </Col>
          </Row>
          <hr className="mb-0"></hr>

          <Row>
            <Col md="5">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Capital e intereses amortizado:{" "}
                {formatter.format(parseFloat(data?.debt_collection.total_paid_amount).toFixed(2))} Q
              </h5>
              <h5 className="fw-bold mb-0 ps-0">
                Capital e interés pendiente:{" "}
                {formatter.format(parseFloat(data?.debt_collection.total_pending_amount).toFixed(2))} Q
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
                      disabled={data?.debt_collection.status != "PENDING"}
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

                    <Button.Ripple
                      className="timeline"
                      color="danger"
                      type="submit"
                      disabled={data?.debt_collection.status != "PENDING"}
                      onClick={cancel}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">
                        Cancelar Desembolso
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
