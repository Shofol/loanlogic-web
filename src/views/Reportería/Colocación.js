import React, { useContext, useState } from "react";
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

const Colocación = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);

  return (
    <Card className="p-2">
      <CardTitle>Colocación</CardTitle>
      <Row>
        <Col md="4">
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

        <Col md="4">
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
              dateFormat: "d/m/Y"
            }}
          />
        </Col>

        <Col md="4">
          <Label className="form-label">Producto</Label>
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
      </Row>

      <Table className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>{picker}</th>
            <th>Colocación al {picker}</th>
            <th>Meta Diciembre</th>
            <th>Total Diciembre</th>
            <th>% Cumplido</th>
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
            <td>1</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <td>1000</td>
            <td>1000</td>
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

export default Colocación;
