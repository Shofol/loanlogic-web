import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./Reportería.scss";
import { Download } from "react-feather";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { UserContext } from "../../utility/context/User";
import { Spanish } from "flatpickr/dist/l10n/es";
import {
  convertDateWithTimeZone,
  formatDateForQuery,
  getConvertDateWithTimeZone
} from "../../utility/Utils";
import api from "../../@core/api/api";

const RankingAsesores = ({ title }) => {
  const date = convertDateWithTimeZone(new Date());
  const [picker, setPicker] = useState(new Date(date));
  const splitedDate = formatDateForQuery(
    getConvertDateWithTimeZone(picker)
  ).split("-");
  const initialMonth = `${splitedDate[0]}-${splitedDate[1]}`;
  const [selectedDate, setSelectedDate] = useState(initialMonth);
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDate, agency]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/ranking-agents" +
        `${selectedDate ? `?month=${selectedDate}` : ""}` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

  const calculateDate = () => {
    // checking if the month is greater/equal to today's date
    if (new Date(selectedDate).getMonth() >= new Date(date).getMonth()) {
      return getConvertDateWithTimeZone(new Date(date));
    } else {
      // setting the date as the last day of the previous month
      let modifiedDate = new Date(selectedDate);
      modifiedDate = new Date(
        modifiedDate.getFullYear(),
        modifiedDate.getMonth() + 1,
        0
      );
      return getConvertDateWithTimeZone(modifiedDate);
    }
  };

  return (
    <Card className="p-2">
      <CardTitle>Ranking Asesores</CardTitle>
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

      <Table className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>Asesor</th>
            <th>{calculateDate()}</th>
            <th>Meta</th>
            <th>% Efectividad</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((res, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{res?.agency}</td>
                  <td>{res?.user}</td>
                  <td>{res?.totalRequestedAmount}</td>
                  <td>{res?.userGoal}</td>
                  <td>{res?.percentageEfficiency}</td>
                  <td>{res?.differenceInAmount}</td>
                </tr>
              );
            })}
        </tbody>
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

export default RankingAsesores;
