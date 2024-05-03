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

const ResumenAsesor = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);
  const [dataToDownload, setDataToDownload] = useState(null);

  const formatter = new Intl.NumberFormat('en-US');

  useEffect(() => {
    fetchData();
  }, [picker, agency]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/resumen-asesor" +
      `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
      `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

  // mapping the header of the table and also the csv
  const headers = [
    { label: "No.", key: "no" },
    { label: "Oficina", key: "agency" },
    { label: "Promotor", key: "user" },
    { label: "Clientes activos", key: "currentClients" },
    { label: "Clientes colocados", key: "newCreditApplications" },
    { label: "Colocación", key: "totalCreditAmount" },
    { label: "Cartera", key: "totalPortfolio" },
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
            user: element?.user,
            currentClients: element?.currentClients,
            newCreditApplications: element?.newCreditApplications,
            totalCreditAmount: element?.totalCreditAmount,
            totalPortfolio: element?.totalPortfolio,
            defaultAmount: parseFloat(element?.defaultAmount || 0).toFixed(2),
            defaultPercentage: parseFloat(
              element?.defaultPercentage || 0
            ).toFixed(2) + '%',
          },
        ];
      });

      const totalRow = {
        no: "Total",
        agency: null,
        user: null,
        currentClients: calculateTotal(data, "currentClients"),
        newCreditApplications: calculateTotal(data, "newCreditApplications"),
        totalCreditAmount: calculateTotal(data, "totalCreditAmount"),
        totalPortfolio: calculateTotal(data, "totalPortfolio"),
        defaultAmount: parseFloat(calculateTotal(data, "defaultAmount") || 0
        ).toFixed(2),
        defaultPercentage: parseFloat(
          calculateTotal(data, "defaultPercentage") || 0
        ).toFixed(2) + '%',
      };

      modifiedData.push(totalRow);
      setDataToDownload(modifiedData);
    }
  }, [data]);

  return (
    <Card className="p-2">
      <CardTitle>Resumen diario promotor</CardTitle>
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
            onChange={(selectedDates, dateStr, instance) => setPicker(dateStr)}
            options={{
              locale: Spanish,
              altInput: true,
              altFormat: "j F Y",
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
                    <td>{res?.user}</td>
                    <td>{formatter.format(res?.currentClients)}</td>
                    <td>{formatter.format(res?.newCreditApplications)}</td>
                    <td>{formatter.format(res?.totalCreditAmount)}</td>
                    <td>{formatter.format(parseFloat(res?.totalPortfolio || 0).toFixed(2))}</td>

                    <td>{formatter.format(parseFloat(res?.defaultAmount || 0).toFixed(2))}</td>
                    <td>
                      {formatter.format(parseFloat(res?.defaultPercentage || 0).toFixed(2))} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Total</th>
                <td>{formatter.format(calculateTotal(data, "currentClients"))}</td>
                <td>{formatter.format(calculateTotal(data, "newCreditApplications"))}</td>
                <td>{formatter.format(calculateTotal(data, "totalCreditAmount"))}</td>
                <td>{formatter.format(parseFloat(calculateTotal(data, "totalPortfolio") || 0
                ).toFixed(2))}{" "}</td>
                <td>{formatter.format(parseFloat(calculateTotal(data, "defaultAmount") || 0
                ).toFixed(2))}{" "}</td>
                <td>
                  {formatter.format(parseFloat(
                    calculateTotal(data, "defaultPercentage") || 0
                  ).toFixed(2))}{" "}
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
            filename={`resumen-promotor-${picker}.csv`}
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

export default ResumenAsesor;
