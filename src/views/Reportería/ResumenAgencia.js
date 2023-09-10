import React, { useState, useEffect } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./Reportería.scss";
import { Download } from "react-feather";
import {
  getConvertDateWithTimeZone,
  formatDateForQuery,
  calculateTotal,
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const ResumenAgencia = () => {
  // const date = convertDateWithTimeZone(new Date());
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const [data, setData] = useState(null);
  const [dataToDownload, setDataToDownload] = useState(null);

  useEffect(() => {
    fetchData();
  }, [picker]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/resumen-agency" +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}`
    );
    setData(response.data.data);
  };

  // mapping the header of the table and also the csv
  const headers = [
    { label: "No.", key: "no" },
    { label: "Oficina", key: "agency" },
    { label: "Clientes activos", key: "currentClients" },
    { label: "Clientes colocados", key: "newCreditApplications" },
    { label: "Colocación", key: "totalCreditAmount" },
    { label: "Cartera", key: "totalRemainingAmount" },
    { label: "Mora", key: "defaultAmount" },
    { label: "%", key: "defaultPercentage" },
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
            currentClients: element?.currentClients,
            newCreditApplications: element?.newCreditApplications,
            totalCreditAmount: element?.totalCreditAmount,
            totalRemainingAmount: element?.totalRemainingAmount,
            defaultAmount: parseFloat(element?.defaultAmount || 0).toFixed(2),
            defaultPercentage: parseFloat(
              element?.defaultPercentage || 0
            ).toFixed(2),
          },
        ];
      });

      const totalRow = {
        no: "Total",
        agency: null,
        currentClients: null,
        newCreditApplications: calculateTotal(data, "newCreditApplications"),
        totalCreditAmount: calculateTotal(data, "totalCreditAmount"),
        totalRemainingAmount: calculateTotal(data, "totalRemainingAmount"),
        defaultAmount: parseFloat(
          calculateTotal(data, "defaultAmount") || 0
        ).toFixed(2),
        defaultPercentage: parseFloat(
          calculateTotal(data, "defaultPercentage") || 0
        ).toFixed(2),
      };

      modifiedData.push(totalRow);

      setDataToDownload(modifiedData);
    }
  }, [data]);

  return (
    <Card className="p-2">
      <CardTitle>Resumen diario agencia</CardTitle>
      <Row>
        <Col md="6">
          <Label className="form-label" for="hf-picker">
            Fecha
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control bg-white"
            onChange={(selectedDates, dateStr, instance) => {
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
                    <td>{res?.currentClients}</td>
                    <td>{res?.newCreditApplications}</td>
                    <td>{res?.totalCreditAmount}</td>
                    <td>{res?.totalRemainingAmount}</td>
                    <td>{parseFloat(res?.defaultAmount || 0).toFixed(2)}</td>
                    <td>
                      {parseFloat(res?.defaultPercentage || 0).toFixed(2)} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Total</th>
                <td>{calculateTotal(data, "newCreditApplications")}</td>
                <td>{calculateTotal(data, "totalCreditAmount")}</td>
                <td>{calculateTotal(data, "totalRemainingAmount")}</td>
                <td>
                  {parseFloat(
                    calculateTotal(data, "defaultAmount") || 0
                  ).toFixed(2)}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {parseFloat(
                    calculateTotal(data, "defaultPercentage") || 0
                  ).toFixed(2)}{" "}
                  %
                </td>
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
            filename={`resumen-agencia.csv`}
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

export default ResumenAgencia;
