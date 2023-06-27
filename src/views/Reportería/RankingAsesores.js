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
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";

const RankingAsesores = ({ title }) => {
  const [picker, setPicker] = useState(new Date());
  // const [previousMonth, setPreviousMonth] = useState("");

  useEffect(() => {
    // setMonth();
  }, []);

  // const handleMonthChange = (date) => {
  //   setMonth(date);
  // };

  // const setMonth = (date = null) => {
  //   const current = date ? new Date(date) : new Date();
  //   current.setMonth(current.getMonth() - 1);
  //   const previousMonth = current.toLocaleString("default", { month: "long" });
  //   setPreviousMonth(previousMonth);
  // };

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
            options={agenciasValues}
            className="react-select"
            classNamePrefix="select"
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
              console.log(dateStr);
              // handleMonthChange(selectedDates[0]);
              setPicker(dateStr);
            }}
            options={{
              static: true,
              altInput: true,
              // altFormat: "F, Y",
              // dateFormat: "m/Y",
              plugins: [
                new monthSelectPlugin({
                  shorthand: false,
                  dateFormat: "m/d/Y",
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
            <th>{picker.toLocaleDateString()}</th>
            <th>Meta</th>
            <th>% Efectividad</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>Q 950</td>
          </tr>
        </tbody>
        {/* <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <td>1000</td>
            <td>1000</td>
            <td>1000</td>

            <td>1000</td>
          </tr>
        </tfoot> */}
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
