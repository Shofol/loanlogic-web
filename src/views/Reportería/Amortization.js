import React from "react";
import { Button, Card, Col, Row, Table } from "reactstrap";
import "./Reportería.scss";
import { Download } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import api from "../../@core/api/api";

const Amortization = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [collection, setCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalValue, setTotalValue] = useState(null);

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(
      `/credit/18`
      // page=${currentPage}&pageSize=10
    );
    setData(response.data.data);
    setCollection(response.data.data.debt_collections);
    setTotalPages(response.data.data.debt_collections.length);
  };

  useEffect(() => {
    if (collection && collection.length > 0) {
      mapTotal();
    }
  }, [collection]);

  const mapTotal = () => {
    setTotalValue(
      collection.reduce(
        (prev, next) => {
          return {
            payment_made: prev.payment_made + +next.payment_made,
            amount_to_pay: prev.amount_to_pay + +next.amount_to_pay,
            credit_fee: prev.credit_fee + +next.credit_fee,
            credit_capital: prev.credit_capital + +next.credit_capital,
            credit_interest: prev.credit_interest + +next.credit_interest,
            credit_interest_tax:
              prev.credit_interest_tax + +next.credit_interest_tax,
            administrative_fee:
              prev.administrative_fee + +next.administrative_fee,
            administrative_fee_tax:
              prev.administrative_fee_tax + +next.administrative_fee_tax,
            assistance_fee: prev.assistance_fee + +next.assistance_fee,
            assistance_fee_tax:
              prev.assistance_fee_tax + +next.assistance_fee_tax,
            discount_holidays_amount:
              prev.discount_holidays_amount + +next.discount_holidays_amount,
            discount_holidays_capital:
              prev.discount_holidays_capital + +next.discount_holidays_capital,
            discount_holidays_interest:
              prev.discount_holidays_interest +
              +next.discount_holidays_interest,
            discount_holidays_tax:
              prev.discount_holidays_tax + +next.discount_holidays_tax,
            total_paid_amount: prev.total_paid_amount + +next.total_paid_amount,
            total_pending_amount:
              prev.total_pending_amount + +next.total_pending_amount,
            total_tax: prev.total_tax + +next.total_tax
          };
        },
        {
          payment_made: 0,
          amount_to_pay: 0,
          credit_fee: 0,
          credit_capital: 0,
          credit_interest: 0,
          credit_interest_tax: 0,
          administrative_fee: 0,
          administrative_fee_tax: 0,
          assistance_fee: 0,
          assistance_fee_tax: 0,
          discount_holidays_amount: 0,
          discount_holidays_capital: 0,
          discount_holidays_interest: 0,
          discount_holidays_tax: 0,
          total_paid_amount: 0,
          total_pending_amount: 0,
          total_tax: 0
        }
      )
    );
  };

  const returnTotal = (name) => {
    return collection
      .reduce((total, next) => {
        return total + +next[`${name}`];
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <h4>
            {data?.client.name +
              " " +
              data?.client.surname +
              " " +
              data?.client.second_surname}
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
                Fecha crédito:{" "}
                {new Date(data?.credit.createdAt).toLocaleDateString()}
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
              <p className="mb-0">Crédito: 28D</p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Interés crédito (IVA incluido): {data?.credit.interest_rate}%
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6">
              <p className="mb-0">
                Cuota crédito: {data?.credit.installment_amount}Q
              </p>
            </Col>
            <Col sm="12" md="6">
              <p className="mb-0 fw-bold">
                Capital crédito: {data?.credit.disbursement_amount}Q
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">
                Gastos administrativos: Q {data?.credit.administrative_expenses}
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">
                Gastos asistencia: Q{data?.credit.assistance_expenses}
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">
                Total adeudado: {data?.credit.total_amount}Q
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="6" className="offset-md-6">
              <p className="mb-0 fw-bold">
                Interés mora: {data?.credit.late_interest}%
              </p>
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
              {/* <th>IVA MORA</th> */}
              <th>Interés mora</th>
              <th>IVA interés MORA</th>
              <th>Capital e intereses amortizado</th>
              <th>Capital e interés pendiente</th>
              <th>TOTAL IVA</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {collection &&
              collection.length > 0 &&
              collection.map((debt) => {
                return (
                  <tr key={debt.id}>
                    <td className="stickyFirstColumn bg-primary-subtle">
                      {debt.no_of_installment}
                    </td>
                    <td className="stickySecondColumn bg-primary-subtle">
                      {debt.payment_date}
                    </td>
                    <td>{debt.payment_made}</td>
                    <td>{debt.amount_to_pay}</td>
                    <td>{debt.credit_fee}</td>
                    <td>{debt.credit_capital}</td>
                    <td>{debt.credit_interest}</td>
                    <td>{debt.credit_interest_tax}</td>
                    <td>{debt.administrative_fee}</td>
                    <td>{debt.administrative_fee_tax}</td>
                    <td>{debt.assistance_fee}</td>
                    <td>{debt.assistance_fee_tax}</td>
                    <td>{debt.discount_holidays_amount}</td>
                    <td>{debt.discount_holidays_capital}</td>
                    <td>{debt.discount_holidays_interest}</td>
                    <td>{debt.discount_holidays_tax}</td>
                    <td>{debt.advanced_installment}</td>
                    <td>{debt.collection_management_fee}</td>
                    <td>{debt.collection_management_tax}</td>
                    <td>{debt.default_amount}</td>
                    <td>{debt.default_interest}</td>
                    <td>{debt.default_interest_tax}</td>
                    <td>{debt.total_paid_amount}</td>
                    <td>{debt.total_pending_amount}</td>
                    <td>{debt.total_tax}</td>
                    <td>{debt.status}</td>
                  </tr>
                );
              })}
          </tbody>
          {collection && collection.length > 0 && totalValue && (
            <tfoot className="fw-bold">
              <tr>
                <th id="total" colSpan="2" className="stickyFirstColumn">
                  Total :
                </th>
                <td>{totalValue.payment_made.toFixed(2)}</td>
                <td>{totalValue.amount_to_pay.toFixed(2)}</td>
                <td>{totalValue.credit_fee.toFixed(2)}</td>
                <td>{totalValue.credit_capital.toFixed(2)}</td>
                <td>{totalValue.credit_interest.toFixed(2)}</td>
                <td>{totalValue.credit_interest_tax.toFixed(2)}</td>
                <td>{totalValue.administrative_fee.toFixed(2)}</td>
                <td>{totalValue.administrative_fee_tax.toFixed(2)}</td>
                <td>{totalValue.assistance_fee.toFixed(2)}</td>
                <td>{totalValue.assistance_fee_tax.toFixed(2)}</td>
                <td>{totalValue.discount_holidays_amount.toFixed(2)}</td>
                <td>{totalValue.discount_holidays_capital.toFixed(2)}</td>
                <td>{totalValue.discount_holidays_interest.toFixed(2)}</td>
                <td>{totalValue.discount_holidays_tax.toFixed(2)}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>{totalValue.total_paid_amount.toFixed(2)}</td>
                <td>{totalValue.total_pending_amount.toFixed(2)}</td>
                <td>{totalValue.total_tax.toFixed(2)}</td>
                <td>-</td>
              </tr>
            </tfoot>
          )}
        </Table>

        {/* <div className="d-flex justify-content-center my-1">
          <ReactPaginate
            nextLabel=""
            breakLabel="..."
            previousLabel=""
            pageRangeDisplayed={2}
            forcePage={currentPage - 1}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextClassName="page-item next-item"
            previousClassName="page-item prev-item"
            pageCount={totalPages}
            onPageChange={(page) => handlePagination(page)}
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
          />
        </div> */}
        <div className="d-flex justify-content-end mt-2">
          <Button.Ripple color="primary" type="reset">
            <Download size={16} />
            <span className="align-middle mx-25">DESCARGAR</span>
          </Button.Ripple>
        </div>
      </Card>
    </div>
  );
};

export default Amortization;
