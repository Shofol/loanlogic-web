import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import Flatpickr from "react-flatpickr";
import {
  convertDateWithTimeZone,
  formatDateForQuery,
  getConvertDateWithTimeZone,
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import { Download } from "react-feather";
import api from "../../@core/api/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "@styles/react/libs/charts/recharts.scss";
import { chartColors } from "../../configs/data";
import { CSVLink } from "react-csv";

const TransaccionesMensuales = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const splitedDate = formatDateForQuery(
    getConvertDateWithTimeZone(picker)
  ).split("-");
  const initialMonth = `${splitedDate[0]}-${splitedDate[1]}`;
  const [selectedDate, setSelectedDate] = useState(initialMonth);
  const [data, setData] = useState(null);
  const [series, setSeries] = useState([]);
  const [dates, setDates] = useState([]);
  const [agenciesData, setagenciesData] = useState([]);
  const [dataToDownload, setDataToDownload] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/daily_transactions" +
        `${selectedDate ? `?month=${selectedDate}` : ""}`
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      let updatedSeries = [];
      Object.keys(data.agencyTransactions).map((key) => {
        Object.entries(data.agencyTransactions[`${key}`]).map(
          ([date, value]) => {
            const filterdData = updatedSeries.filter(
              (data) => data.name === date
            )[0];
            if (filterdData) {
              filterdData[`${key}`] = value;
            } else {
              updatedSeries = [
                ...updatedSeries,
                {
                  name: date,
                  [key]: value,
                },
              ];
            }
          }
        );
      });
      updatedSeries.sort((prev, next) => {
        const prevDateParts = prev.name.split("-");
        const nextDateParts = next.name.split("-");
        return sortByDate(prevDateParts, nextDateParts);
      });
      setSeries(updatedSeries);
      setDates(updatedSeries.map((element) => element.name));
    }
  }, [data]);

  useEffect(() => {
    if (dates.length > 0) {
      mapTableData();
    }
  }, [dates]);

  const mapTableData = () => {
    const agencies = { ...data.agencyTransactions };
    Object.keys(agencies).map((key) => {
      dates.map((date) => {
        if (!Object.keys(agencies[`${key}`]).includes(date)) {
          agencies[`${key}`][`${date}`] = null;
        }
      });
    });
    setagenciesData(agencies);
  };

  // mapping data for the excel file
  useEffect(() => {
    if (agenciesData && data) {
      const headers = [
        { label: "Agencia", key: "agency" },
        ...dates.map((date) => ({ label: date, key: date })),
      ];
      setHeaders(headers);

      let modifiedData = [];

      Object.keys(agenciesData).map((agency, index) => {
        const newRow = {};
        newRow.agency = agency;

        Object.entries(agenciesData[`${agency}`])
          .sort((prev, next) => {
            const prevDateParts = prev[0].split("-");
            const nextDateParts = next[0].split("-");
            return sortByDate(prevDateParts, nextDateParts);
          })
          .map(([key, value], idx) => {
            newRow[`${key}`] = value;
          });

        modifiedData = [...modifiedData, newRow];
      });

      const totalRow = {};
      totalRow.agency = "Total";

      Object.keys(data.total)
        .sort((prev, next) => {
          const prevDateParts = prev.split("-");
          const nextDateParts = next.split("-");
          return sortByDate(prevDateParts, nextDateParts);
        })
        .map((key, idx) => {
          totalRow[`${key}`] = data.total[`${key}`];
        });

      modifiedData = [...modifiedData, totalRow];

      setDataToDownload(modifiedData);
    }
  }, [agenciesData, data]);

  const getSortedTotal = () => {
    return Object.keys(data.total)
      .sort((prev, next) => {
        const prevDateParts = prev.split("-");
        const nextDateParts = next.split("-");
        return sortByDate(prevDateParts, nextDateParts);
      })
      .map((key, idx) => {
        return <td key={idx}>{data.total[`${key}`]}</td>;
      });
  };

  const sortByDate = (prevDateParts, nextDateParts) => {
    return (
      new Date(+prevDateParts[2], +prevDateParts[1] - 1, +prevDateParts[0]) -
      new Date(+nextDateParts[2], +nextDateParts[1] - 1, +nextDateParts[0])
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload) {
      return (
        <div className="recharts-custom-tooltip">
          <span>{`${payload[0].value} | ${payload[0].payload.name}`}</span>
        </div>
      );
    }
    return null;
  };

  const renderRows = (agency) => {
    return Object.entries(agenciesData[`${agency}`])
      .sort((prev, next) => {
        const prevDateParts = prev[0].split("-");
        const nextDateParts = next[0].split("-");
        return sortByDate(prevDateParts, nextDateParts);
      })
      .map(([key, value], idx) => {
        return <td key={idx}>{value}</td>;
      });
  };

  return (
    <Card className="p-2">
      <CardTitle>Transacciones Mensuales</CardTitle>
      <Row>
        <Col md="6" className="d-flex flex-column">
          <Label className="form-label" for="hf-picker">
            Mes
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control bg-white"
            onChange={(selectedDates, dateStr, instance) => {
              setPicker(dateStr);
              setSelectedDate(dateStr);
            }}
            options={{
              locale: Spanish,
              static: true,
              altInput: true,
              plugins: [
                new monthSelectPlugin({
                  shorthand: false,
                  dateFormat: "Y-m",
                  altFormat: "F, Y",
                }),
              ],
            }}
          />
        </Col>
      </Row>

      {data && (
        <div className="recharts-wrapper pt-2 mb-2">
          {data?.totalTransactions && (
            <CardTitle className="text-center">
              {data?.totalTransactions} Transacciones
            </CardTitle>
          )}
          <ResponsiveContainer>
            <LineChart height={300} data={series}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Tooltip content={CustomTooltip} />
              {Object.keys(data.agencyTransactions).map((agency, index) => {
                return (
                  <Line
                    key={agency}
                    dataKey={agency}
                    connectNulls
                    stroke={chartColors[index]}
                    strokeWidth={3}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <Table className="mt-5" responsive>
        <thead>
          <tr>
            <th>Agencia.</th>
            {dates &&
              dates.length > 0 &&
              dates.map((date) => {
                return (
                  <th key={date} style={{ whiteSpace: "nowrap" }}>
                    {date}
                  </th>
                );
              })}
          </tr>
        </thead>
        {data && (
          <>
            <tbody>
              {Object.keys(agenciesData).map((agency, index) => {
                return (
                  <tr key={agency}>
                    <td>{agency}</td>
                    {renderRows(agency)}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                {getSortedTotal()}
              </tr>
            </tfoot>
          </>
        )}
      </Table>

      <div className="d-flex justify-content-center mt-2">
        {headers.length > 0 && dataToDownload && (
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

export default TransaccionesMensuales;
