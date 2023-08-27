import React, { useContext, useState, useEffect } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./Reportería.scss";
import { Download } from "react-feather";
import { UserContext } from "../../utility/context/User";
import {
  getConvertDateWithTimeZone,
  formatDateForQuery,
  calculateTotal
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";

const Colocación = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [picker, product]);

  useEffect(() => {
    fetchProducts();
    fetchData();
  }, [agency]);

  const fetchProducts = async () => {
    const response = await api.get(
      `product/list?sortField=id&sortOrder=ASC` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setProducts(
      response.data.data.map((product) => ({
        label: product.product_name,
        value: product.id
      }))
    );
  };

  const fetchData = async () => {
    const response = await api.get(
      `reporting/colocacion` +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${product ? `&product=${product}` : ""}` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

  return (
    <Card className="p-2">
      <CardTitle>Colocación</CardTitle>
      <Row>
        <Col md="4">
          <Label className="form-label">Oficina</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            isMulti
            name="colors"
            options={user.agency}
            className="react-select"
            classNamePrefix="select"
            onChange={(option) =>
              setAgency(option.map((option) => option.value))
            }
          />
        </Col>

        <Col md="4">
          <Label className="form-label" for="hf-picker">
            Fecha
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control"
            onChange={(selectedDates, dateStr, instance) => setPicker(dateStr)}
            options={{
              locale: Spanish,
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "d/m/Y"
            }}
          />
        </Col>

        <Col md="4">
          <Label className="form-label">Producto</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            name="colors"
            options={products}
            className="react-select"
            classNamePrefix="select"
            onChange={(option) => {
              setProduct(option.value);
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4" responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>#Solicitudes</th>
            <th>{picker}</th>
            <th style={{ whiteSpace: "nowrap" }}>Colocación al {picker}</th>
            <th>Meta Diciembre</th>
            <th>#Total Diciembre</th>
            <th>% Cumplido</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        {data && data.length > 0 && (
          <>
            <tbody>
              {data.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{res?.no}</td>
                    <td>{res?.agency}</td>
                    <td>{res?.todayCreditApplications}</td>
                    <td>{res?.todayCreditAmount}</td>
                    <td>{res?.currentMonthCreditAmount}</td>
                    <td>{res?.currentMonthGoal}</td>
                    <td>{res?.currentMonthCreditApplications}</td>
                    <td>{parseFloat(res?.currentMonthPercentage).toFixed(2)} %</td>
                    <td>{res?.currentMonthDifference}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <td>{calculateTotal(data, "todayCreditApplications")}</td>
                <td>{calculateTotal(data, "todayCreditAmount")}</td>
                <td>{calculateTotal(data, "currentMonthCreditAmount")}</td>
                <td>{calculateTotal(data, "currentMonthGoal")}</td>
                <td>
                  {calculateTotal(data, "currentMonthCreditApplications")}
                </td>
                <td>{parseFloat(calculateTotal(data, "currentMonthPercentage")).toFixed(2)} %</td>
                <td>{calculateTotal(data, "currentMonthDifference")}</td>
              </tr>
            </tfoot>
          </>
        )}
      </Table>
      <div className="d-flex justify-content-center mt-2">
        <Button.Ripple color="primary" type="reset">
          <Download size={16} />
          <span className="align-middle mx-25">DESCARGAR</span>
        </Button.Ripple>{" "}
      </div>
    </Card>
  );
};

export default Colocación;
