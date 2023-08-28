import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues, spanishMonths } from "../../configs/data";
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

const CommonReport = ({ title }) => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const [previousMonth, setPreviousMonth] = useState("");
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);

  let baseUrl = "";
  if (title === "Mora") {
    baseUrl = `reporting/mora`;
  } else if (title === "Asistencias") {
    baseUrl = `reporting/assistance`;
  } else if (title === "Papelerías") {
    baseUrl = `reporting/stationery`;
  } else if (title === "Cancelaciones anticipadas") {
    baseUrl = `reporting/advance_payment`;
  }

  useEffect(() => {
    setMonth();
  }, []);

  useEffect(() => {
    fetchData();
  }, [agency, picker]);

  const fetchData = async () => {
    const response = await api.get(
      baseUrl +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

  const handleMonthChange = (date) => {
    setMonth(date);
  };

  const setMonth = (date = null) => {
    const current = date ? new Date(date) : new Date();
    current.setMonth(current.getMonth() - 1);
    const previousMonth = current.toLocaleString("default", { month: "long" });
    setPreviousMonth(previousMonth);
  };

  return (
    <Card className="p-2">
      <CardTitle>{title}</CardTitle>
      <Row>
        <Col md="6">
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

        <Col md="6">
          <Label className="form-label" for="hf-picker">
            Fecha
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control"
            onChange={(selectedDates, dateStr, instance) => {
              handleMonthChange(selectedDates[0]);
              setPicker(dateStr);
            }}
            options={{
              locale: Spanish,
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "d/m/Y"
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Agencia</th>
            <th>Cierre {spanishMonths[`${previousMonth}`]}</th>
            <th>{picker}</th>
            <th>Diferencia %</th>
            <th>Diferencia Monto</th>
          </tr>
        </thead>
        {data && data.length > 0 && (
          <>
            <tbody>
              {data.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{res?.agency}</td>
                    <td>{res?.lastMonth}</td>
                    <td>{res?.currentMonth}</td>
                    <td>{parseFloat(res?.differenceInPercent || 0).toFixed(2)} %</td>
                    <td>{res?.differenceInAmount}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <td>{calculateTotal(data, "lastMonth")}</td>
                <td>{calculateTotal(data, "currentMonth")}</td>
                <td>{parseFloat(calculateTotal(data, "differenceInPercent") || 0).toFixed(2)} %</td>
                <td>{calculateTotal(data, "differenceInAmount")}</td>
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

export default CommonReport;
