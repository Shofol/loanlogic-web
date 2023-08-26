import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import Flatpickr from "react-flatpickr";
import {
  convertDateWithTimeZone,
  formatDateForQuery,
  getConvertDateWithTimeZone
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import { Download } from "react-feather";
import api from "../../@core/api/api";
import Chart from "react-apexcharts";
import { ArrowDown } from "react-feather";
import { ThemeColors } from "@src/utility/context/ThemeColors";

const TransaccionesMensuales = () => {
  const date = convertDateWithTimeZone(new Date());
  const [picker, setPicker] = useState(new Date(date));
  const splitedDate = formatDateForQuery(
    getConvertDateWithTimeZone(picker)
  ).split("-");
  const initialMonth = `${splitedDate[0]}-${splitedDate[1]}`;
  const [selectedDate, setSelectedDate] = useState(initialMonth);
  const [data, setData] = useState(null);
  const { colors } = useContext(ThemeColors);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

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
      let updatedCategories = [];
      Object.keys(data.agencyTransactions).map((key, index) => {
        if (index === 0) {
          updatedCategories = Object.keys(data.agencyTransactions[`${key}`]);
        }
      });
      console.log(
        updatedCategories.sort((prev, next) => {
          const prevDateParts = prev.split("-");
          const nextDateParts = next.split("-");

          return (
            new Date(
              +prevDateParts[2],
              +prevDateParts[1] - 1,
              +prevDateParts[0]
            ) -
            new Date(
              +nextDateParts[2],
              +nextDateParts[1] - 1,
              +nextDateParts[0]
            )
          );
        })
      );

      const updateOptions = {
        chart: {
          zoom: {
            enabled: false
          },
          parentHeightOffset: 0,
          toolbar: {
            show: false
          }
        },

        markers: {
          strokeWidth: 7,
          strokeOpacity: 1,
          strokeColors: ["#fff"],
          colors: [colors.warning.main]
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        colors: [colors.warning.main],
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        tooltip: {
          custom(data) {
            return `<div class='px-1 py-50'>
                  <span>${
                    data.series[data.seriesIndex][data.dataPointIndex]
                  }%</span>
                </div>`;
          }
        },
        xaxis: {
          categories: updatedCategories
        }
      };

      setOptions(updateOptions);

      const updatedSeries = Object.keys(data.agencyTransactions).map((key) => ({
        type: "line",
        data: Object.values(data.agencyTransactions[`${key}`])
      }));

      setSeries(updatedSeries);
    }
  }, [data]);

  // ** Chart Options

  // ** Chart Series

  //   [
  //     {
  //       type: "line",
  //       data: [
  //         280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50
  //       ]
  //     },
  //     {
  //       type: "line",
  //       data: [28, 20, 22, 18, 27, 25, 70, 900, 20, 15, 16, 10, 15, 10, 50]
  //     }
  //   ];

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
                  altFormat: "F, Y"
                })
              ]
            }}
          />
        </Col>
      </Row>

      {data && (
        <Chart options={options} series={series} type="line" height={400} />
      )}

      <div className="d-flex justify-content-center mt-2">
        <Button.Ripple color="primary" type="reset">
          <Download size={16} />
          <span className="align-middle mx-25">DESCARGAR</span>
        </Button.Ripple>{" "}
      </div>
    </Card>
  );
};

export default TransaccionesMensuales;
