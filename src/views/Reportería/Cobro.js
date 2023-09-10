import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues, chartColors } from "../../configs/data";
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
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const Cobro = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [agency, setAgency] = useState(null);
  const [data, setData] = useState(null);
  const [dataToDownload, setDataToDownload] = useState(null);

  useEffect(() => {
    fetchData();
  }, [agency, picker]);

  const fetchData = async () => {
    const response = await api.get(
      `reporting/cobro` +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${agency ? `&agency=${agency}` : ""}`
    );
    setData(response.data.data);
  };

  const calculateDateTotal = () => {
    const totalEntry = data.filter(
      (element) => element.date.agency === "TOTAL"
    )[0];
    return (
      +totalEntry.date.payment_made +
      +totalEntry.date.credit_fee +
      +totalEntry.date.advanced_installment +
      +totalEntry.date.administrative_fee +
      +totalEntry.date.assistance_fee
    );
  };

  const calculatTotal = () => {
    const totalEntry = data.filter(
      (element) => element.total.agency === "TOTAL"
    )[0];
    return (
      +totalEntry.total.payment_made +
      +totalEntry.total.credit_fee +
      +totalEntry.total.advanced_installment +
      +totalEntry.total.administrative_fee +
      +totalEntry.total.assistance_fee
    );
  };

  // mapping the header of the table and also the csv
  const headers = [
    { label: "COBRANZA", key: "agency" },
    { label: picker, key: "date_payment_made" },
    { label: "TOTAL DICIEMBRE", key: "total_payment_made" },
  ];

  // mapping the data for downloading csv file
  useEffect(() => {
    if (data) {
      let modifiedData = [];
      data.map((element) => {
        modifiedData = [
          ...modifiedData,
          {
            agency: `Cobro ${element?.date.agency}`,
            date_payment_made: element?.date.payment_made,
            total_payment_made: element?.total.payment_made,
          },
          {
            agency: `Cobro diario ${element?.date.agency}`,
            date_payment_made: element?.date.credit_fee,
            total_payment_made: element?.total.credit_fee,
          },
          {
            agency: `Cobro cancelaciones ${element?.date.agency}`,
            date_payment_made: element?.date.advanced_installment,
            total_payment_made: element?.total.advanced_installment,
          },
          {
            agency: `Cobros papelerías ${element?.date.agency}`,
            date_payment_made: element?.date.administrative_fee,
            total_payment_made: element?.total.administrative_fee,
          },
          {
            agency: `Cobros asistencias ${element?.date.agency}`,
            date_payment_made: element?.date.assistance_fee,
            total_payment_made: element?.total.assistance_fee,
          },
        ];
      });

      modifiedData = [
        ...modifiedData,
        {
          agency: "Cobros total",
          date_payment_made: calculateDateTotal(),
          total_payment_made: calculatTotal(),
        },
      ];
      setDataToDownload(modifiedData);
    }
  }, [data]);

  return (
    <Card className="p-2">
      <Row>
        <Col md="6">
          <Label className="form-label">Agencias</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            name="colors"
            options={user.agency}
            className="react-select"
            classNamePrefix="select"
            onChange={(option) => setAgency(option.value)}
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
              altFormat: "F j, Y",
              dateFormat: "d/m/Y",
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4 consolidadoTable" responsive>
        {data && (
          <>
            <thead>
              {/*<tr>
                <th>COBRANZA</th>
                <th>{picker}</th>
                <th>TOTAL DICIEMBRE</th>
        </tr>*/}
              <tr>
                {headers.map((header) => {
                  return <th key={header.label}>{header.label}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => {
                return (
                  <>
                    <tr>
                      <th className="custom-header">
                        <span
                          className="bg"
                          style={{ backgroundColor: chartColors[index] }}
                        ></span>
                        <span>Cobro {element.date.agency}</span>
                      </th>
                      <td>Q {element.date.payment_made}</td>
                      <td>Q {element.total.payment_made}</td>
                    </tr>

                    <tr>
                      <th className="custom-header">
                        <span
                          className="bg"
                          style={{ backgroundColor: chartColors[index] }}
                        ></span>
                        <span>Cobro diario {element.date.agency}</span>
                      </th>
                      <td>Q {element.date.credit_fee}</td>
                      <td>Q {element.total.credit_fee}</td>
                    </tr>
                    <tr>
                      <th className="custom-header">
                        <span
                          className="bg"
                          style={{ backgroundColor: chartColors[index] }}
                        ></span>
                        <span>Cobro cancelaciones {element.date.agency}</span>
                      </th>
                      <td>Q {element.date.advanced_installment}</td>
                      <td>Q {element.total.advanced_installment}</td>
                    </tr>
                    <tr>
                      <th className="custom-header">
                        <span
                          className="bg"
                          style={{ backgroundColor: chartColors[index] }}
                        ></span>
                        <span>Cobros papelerías {element.date.agency}</span>
                      </th>
                      <td>Q {element.date.administrative_fee}</td>
                      <td>Q {element.total.administrative_fee}</td>
                    </tr>
                    <tr>
                      <th className="custom-header">
                        <span
                          className="bg"
                          style={{ backgroundColor: chartColors[index] }}
                        ></span>
                        <span>Cobros asistencias {element.date.agency}</span>
                      </th>
                      <td>Q {element.date.assistance_fee}</td>
                      <td>Q {element.total.assistance_fee}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Cobros total</th>
                <td>Q {calculateDateTotal()}</td>
                <td>Q {calculatTotal()}</td>
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
            filename={`cobro-${picker}.csv`}
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

export default Cobro;
