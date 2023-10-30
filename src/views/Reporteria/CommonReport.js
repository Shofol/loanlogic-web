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
  calculateTotal,
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const CommonReport = ({ title }) => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const [previousMonth, setPreviousMonth] = useState("");
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);
  const [dataToDownload, setDataToDownload] = useState(null);

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

  // mapping the header of the table and also the csv
  const headers = [
    { label: "No.", key: "no" },
    { label: "Agencia", key: "agency" },
    { label: "Cierre " + spanishMonths[`${previousMonth}`], key: "lastMonth" },
    { label: picker, key: "currentMonth" },
    { label: "Diferencia %", key: "differenceInPercent" },
    { label: "Diferencia Monto", key: "differenceInAmount" },
  ];

  // mapping the data for downloading csv file
  useEffect(() => {
    if (data) {
      let modifiedData = [];
      data.map((element) => {
        modifiedData = [
          ...modifiedData,
          {
            no: element?.id,
            agency: element?.agency,
            lastMonth: parseFloat(element?.lastMonth|| 0
              ).toFixed(2),
            currentMonth: parseFloat(element?.currentMonth|| 0
              ).toFixed(2),
            differenceInPercent: parseFloat(
              element?.differenceInPercent || 0
            ).toFixed(2) + '%',
            differenceInAmount: parseFloat(
              element?.differenceInAmount || 0
            ).toFixed(2),
          },
        ];
      });

      const totalRow = {
        no: "Total",
        agency: null,
        lastMonth: parseFloat(calculateTotal(data, "lastMonth")|| 0
        ).toFixed(2),
        currentMonth: parseFloat(calculateTotal(data, "currentMonth")|| 0
        ).toFixed(2),
        differenceInPercent: parseFloat(
          calculateTotal(data, "differenceInPercent") || 0
        ).toFixed(2) + '%',
        differenceInAmount: parseFloat(calculateTotal(data, "differenceInAmount")|| 0
        ).toFixed(2),
      };

      modifiedData.push(totalRow);

      setDataToDownload(modifiedData);
    }
  }, [data]);

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
              dateFormat: "d/m/Y",
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4" responsive>
        <thead>
          {/*<tr>
            <th>No.</th>
            <th>Agencia</th>
            <th>Cierre {spanishMonths[`${previousMonth}`]}</th>
            <th>{picker}</th>
            <th>Diferencia %</th>
            <th>Diferencia Monto</th>
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
                    <td>{index + 1}</td>
                    <td>{res?.agency}</td>
                    <td>{parseFloat(res?.lastMonth || 0
                  ).toFixed(2)}</td>
                    <td>{parseFloat(res?.currentMonth || 0
                  ).toFixed(2)}</td>
                    <td>{parseFloat(res?.differenceInPercent || 0
                  ).toFixed(2)} %</td>
                    <td>{parseFloat(res?.differenceInAmount || 0
                  ).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <td>{parseFloat(calculateTotal(data, "lastMonth") || 0
                  ).toFixed(2)}{" "}</td>
                <td>{parseFloat(calculateTotal(data, "currentMonth") || 0
                  ).toFixed(2)}{" "}</td>
                <td>
                  {parseFloat(
                    calculateTotal(data, "differenceInPercent") || 0
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>{parseFloat(calculateTotal(data, "differenceInAmount")|| 0
                  ).toFixed(2)}{" "}</td>
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
            filename={`${title}-${picker}.csv`}
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

export default CommonReport;
