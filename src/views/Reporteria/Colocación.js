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
  calculateTotal,
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const Colocación = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [dataToDownload, setDataToDownload] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [picker, product]);

  useEffect(() => {
    if (agency) {
      fetchProducts();
      fetchData();
    }
  }, [agency]);

  const fetchProducts = async () => {
    const response = await api.get(
      `product/list?sortField=id&sortOrder=ASC` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setProducts(
      response.data.data.map((product) => ({
        label: product.product_name,
        value: product.id,
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

  // mapping the header of the table and also the csv
  const headers = [
    { label: "No.", key: "no" },
    { label: "Oficina", key: "agency" },
    { label: "#Solicitudes", key: "todayCreditApplications" },
    { label: picker, key: "todayCreditAmount" },
    { label: "Colocación al " + picker, key: "currentMonthCreditAmount" },
    { label: "Meta mes en curso", key: "currentMonthGoal" },
    { label: "#Total mes en curso", key: "currentMonthCreditApplications" },
    { label: "% Cumplido", key: "currentMonthPercentage" },
    { label: "Diferencia", key: "currentMonthDifference" },
  ];

  // mapping the data for downloading csv file
  useEffect(() => {
    if (data) {
      let modifiedData = [];
      data.map((element) => {
        modifiedData = [
          ...modifiedData,
          {
            no: element?.no,
            agency: element?.agency,
            todayCreditApplications: element?.todayCreditApplications,
            todayCreditAmount: element?.todayCreditAmount,
            currentMonthCreditAmount: element?.currentMonthCreditAmount,
            currentMonthGoal: element?.currentMonthGoal,
            currentMonthCreditApplications:
              element?.currentMonthCreditApplications,
            currentMonthPercentage: parseFloat(
              element?.currentMonthPercentage
            ).toFixed(2),
            currentMonthDifference: element?.currentMonthDifference,
          },
        ];
      });

      const totalRow = {
        no: "Total",
        agency: null,
        todayCreditApplications: calculateTotal(
          data,
          "todayCreditApplications"
        ),
        todayCreditAmount: calculateTotal(data, "todayCreditAmount"),
        currentMonthCreditAmount: calculateTotal(
          data,
          "currentMonthCreditAmount"
        ),
        currentMonthGoal: calculateTotal(data, "currentMonthGoal"),
        currentMonthCreditApplications: calculateTotal(
          data,
          "currentMonthCreditApplications"
        ),
        currentMonthPercentage: parseFloat(
          calculateTotal(data, "currentMonthPercentage")
        ).toFixed(2),
        currentMonthDifference: calculateTotal(data, "currentMonthDifference"),
      };

      modifiedData.push(totalRow);

      setDataToDownload(modifiedData);
    }
  }, [data]);

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
              altFormat: "j F Y",
              dateFormat: "d/m/Y",
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
          {/*<tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>#Solicitudes</th>
            <th>{picker}</th>
            <th style={{ whiteSpace: "nowrap" }}>Colocación al {picker}</th>
            <th>Meta Diciembre</th>
            <th>#Total Diciembre</th>
            <th>% Cumplido</th>
            <th>Diferencia</th>
          </tr>*/}
          <tr>
            {headers.map((header) => {
              return <th key={header.label}>{header.label}</th>;
            })}
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
                    <td>
                      {parseFloat(res?.currentMonthPercentage).toFixed(2)} %
                    </td>
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
                <td>
                  {parseFloat(
                    calculateTotal(data, "currentMonthPercentage")
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>{calculateTotal(data, "currentMonthDifference")}</td>
              </tr>
            </tfoot>
          </>
        )}
      </Table>
      <div className="d-flex justify-content-center mt-2">
        {dataToDownload && (
          <CSVLink
            data={dataToDownload}
            headers={headers}
            filename={`colocacion-${picker}.csv`}
          >
            <Button.Ripple color="primary" type="reset">
              <Download size={16} />
              <span className="align-middle mx-25">DESCARGAR</span>
            </Button.Ripple>
          </CSVLink>
        )}
      </div>
    </Card>
  );
};

export default Colocación;
