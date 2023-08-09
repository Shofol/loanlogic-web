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

const ResumenAsesor = () => {
  const [picker, setPicker] = useState(new Date().toLocaleDateString());
  const { user } = useContext(UserContext);

  return (
    <Card className="p-2">
      <CardTitle>Resumen diario asesor</CardTitle>
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
            onChange={(selectedDates, dateStr, instance) => setPicker(dateStr)}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "d/m/Y"
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4" responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>Asesor</th>
            <th>Clientes activos</th>
            <th>Clientes colocados</th>
            <th>Colocación</th>
            <th>Cartera</th>
            <th>Mora</th>
            <th>%</th>
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
            <td>Q 950</td>
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
            <td>Q 950</td>
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
            <td>Q 950</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
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

export default ResumenAsesor;
