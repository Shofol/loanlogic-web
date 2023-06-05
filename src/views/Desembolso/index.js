import React, { useContext } from "react";
import { Card, Row, Col, Input, Label, Button } from "reactstrap";
import "../Cobranza/cobranza.scss";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Printer, Save } from "react-feather";

const Desembolso = () => {
  const { colors } = useContext(ThemeColors);

  return (
    <div id="section-to-print">
      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <h4>John Doe Hernández</h4>
          <p className="mb-0">
            <strong>DPI:</strong> 2330 5563 0103
          </p>
          <p className="mb-0">
            <strong>Crédito núm:</strong> D0020830000001
          </p>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Fecha crédito: 30-01-2023</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">Monto solicitado: 1000Q</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Crédito: 28D</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">Capital crédito: 1400Q</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Cuota crédito: 50Q</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">Total adeudado: 1505Q</p>
            </Col>
          </Row>
        </div>
      </Card>

      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <Row>
            <Col sm="6" className="mb-sm-2 mb-md-0 pe-md-4">
              <div className="border rounded">
                <OverviewCircle
                  data={{ completed: 80, inProgress: 20 }}
                  title="Crédito pendiente"
                  text="505 Q / 1505 Q"
                  height="150"
                  fontSize="2rem"
                  fixedHeight={false}
                  color={colors.success.main}
                  bottom={20}
                />
              </div>
            </Col>
            <Col sm="12" md="6">
              <div className="mb-0 d-flex">
                <p className="acc-desembolso-title">Fecha Desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">12-02-2023</p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Total adeudado</p>
                <span>:</span>
                <p className="mb-0 ms-1">50Q</p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Gastos administrativos</p>
                <span>:</span>
                <p className="mb-0 ms-1">50q</p>
              </div>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Asistencias</p>
                <span>:</span>
                <p className="mb-0 ms-1">5Q</p>
              </div>
              <hr></hr>
              <div className="mb-0 d-flex fw-bold">
                <p className="acc-desembolso-title">Total desembolso</p>
                <span>:</span>
                <p className="mb-0 ms-1">105Q</p>
              </div>
              <hr></hr>
            </Col>
          </Row>
          <hr className="mb-0"></hr>

          <Row>
            <Col md="6">
              <h5 className="fw-bold mb-0 mt-1 ps-0">
                Capital e intereses amortizado: 505Q
              </h5>
              <h5 className="fw-bold mb-0 ps-0">
                Capital e interés pendiente: 1000Q
              </h5>
            </Col>

            <Col md="6" id="section-to-hide">
              <Row className="my-1">
                <Col sm="12">
                  <div className="d-flex justify-content-center">
                    {/* <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple> */}
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

export default Desembolso;
