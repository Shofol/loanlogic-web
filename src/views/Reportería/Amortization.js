import React from "react";
import { Button, Card, Col, Row, Table } from "reactstrap";
import "./Reportería.scss";
import { Download } from "react-feather";

const Amortization = () => {
  return (
    <div>
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
              <p className="mb-0 fw-bold">
                Interés crédito (IVA incluido): 40.00%
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">Cuota crédito: 50Q</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">Capital crédito: 1400Q</p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">Gastos administrativos: Q 50</p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">Gastos asistencia: Q55</p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">Total adeudado: 1505Q</p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">Interés mora: 10.00%</p>
            </Col>
          </Row>
        </div>
      </Card>

      <Card className="p-2">
        <Table responsive>
          <thead>
            <tr>
              <th className="stickyFirstColumn">#Pago</th>
              <th className="stickySecondColumn">Fecha Pago</th>
              <th>Pago realizado</th>
              <th>Monto total</th>
              <th>Cuota crédito (capital + interés + IVA incluidos)</th>
              <th>Cuota (capital)</th>
              <th>Interés</th>
              <th>IVA interés</th>
              <th>Gastos administrativos</th>
              <th>IVA Gastos administrativos</th>
              <th>Otros gastos (asistencia)</th>
              <th>IVA Otros gastos</th>
              <th>Descuento días adelantado</th>
              <th>Capital días adelantados</th>
              <th>Interés días adelantados</th>
              <th>IVA días adelantados</th>
              <th>Cuota anticipada</th>
              <th>Gastos por gestión de cobranza</th>
              <th>IVA gestión cobranza</th>
              <th>Mora</th>
              <th>IVA MORA</th>
              <th>Interés mora</th>
              <th>IVA interés MORA</th>
              <th>Capital e intereses amortizado</th>
              <th>Capital e interés pendiente</th>
              <th>TOTAL IVA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="stickyFirstColumn">0</td>
              <td className="stickySecondColumn">día desembolso</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>22</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>12</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td className="stickyFirstColumn">0</td>
              <td className="stickySecondColumn">día desembolso</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>22</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>12</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td className="stickyFirstColumn">0</td>
              <td className="stickySecondColumn">día desembolso</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>22</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>12</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td className="stickyFirstColumn">0</td>
              <td className="stickySecondColumn">día desembolso</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>22</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>0</td>
              <td>12</td>
              <td>10</td>
              <td>0</td>
              <td>20</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>13</td>
              <td>14</td>
            </tr>
          </tbody>
          <tfoot className="fw-bold">
            <tr>
              <th id="total" colSpan="2" className="stickyFirstColumn">
                Total :
              </th>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>200</td>
              <td>200</td>
              <td>200</td>
            </tr>
          </tfoot>
        </Table>
        <div className="d-flex justify-content-end mt-2">
          <Button.Ripple color="primary" type="reset">
            <Download size={16} />
            <span className="align-middle mx-25">DESCARGAR</span>
          </Button.Ripple>{" "}
        </div>
      </Card>
    </div>
  );
};

export default Amortization;
