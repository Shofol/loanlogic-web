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
import { UserContext } from "../../utility/context/User";
import { getConvertDateWithTimeZone } from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";

const CommonReport = ({ title }) => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const [previousMonth, setPreviousMonth] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    setMonth();
  }, []);

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
            <th>Cierre {previousMonth}</th>
            <th>{picker}</th>
            <th>Diferencia %</th>
            <th>Diferencia Monto</th>
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
          </tr>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
          </tr>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <td>1000</td>
            <td>1000</td>
            <td>1000</td>

            <td>1000</td>
          </tr>
        </tfoot>
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
