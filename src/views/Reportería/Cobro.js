import React, { useContext, useState } from "react";
import { Button, Card, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./Reportería.scss";
import { Download } from "react-feather";
import { UserContext } from "../../utility/context/User";

const Cobro = () => {
  const [picker, setPicker] = useState(new Date().toLocaleDateString());
  const { user } = useContext(UserContext);

  return (
    <Card className="p-2">
      <Row>
        <Col md="6">
          <Label className="form-label">Agencias</Label>
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

      <Table className="mt-4 consolidadoTable">
        <thead>
          <tr>
            <th>COBRANZA</th>
            <th>{picker}</th>
            <th>TOTAL DICIEMBRE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="bg-info-subtle">Cobro Coatepeque</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>

          <tr>
            <th className="bg-info-subtle">Cobro diario Coatepeque</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-info-subtle">Cobro cancelaciones Coatepeque</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-info-subtle">Cobros papelerías Coatepeque</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-info-subtle">Cobros asistencias Coatepeque</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>

          <tr>
            <th className="bg-primary-subtle">Cobro Mazatenango</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-primary-subtle">Cobro diario Mazatenango</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-primary-subtle">
              Cobro cancelaciones Mazatenango
            </th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-primary-subtle">Cobros papelerías Mazatenango</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-primary-subtle">
              Cobros asistencias Mazatenango
            </th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>

          <tr>
            <th className="bg-warning-subtle">Cobro Xela</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-warning-subtle">Cobro diario Xela</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-warning-subtle">Cobro cancelaciones Xela</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-warning-subtle">Cobros papelerías Xela</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-warning-subtle">Cobros asistencias Xela</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-danger-subtle">Cobro Cobán</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-danger-subtle">Cobro diario Cobán</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-danger-subtle">Cobro cancelaciones Cobán</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-danger-subtle">Cobros papelerías Cobán</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-danger-subtle">Cobros asistencias Cobán</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-secondary-subtle">Cobro Guatemala</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-secondary-subtle">Cobro diario Guatemala</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-secondary-subtle">
              Cobro cancelaciones Guatemala
            </th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-secondary-subtle">Cobros papelerías Guatemala</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-secondary-subtle">
              Cobros asistencias Guatemala
            </th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>

          <tr>
            <th className="bg-light">Cobro Total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-light">Cobro diario Total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-light">Cobro cancelaciones Total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-light">Cobros papelerías Total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
          <tr>
            <th className="bg-light">Cobros asistencias Total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Cobros total</th>
            <td>Q 7,050</td>
            <td>Q 7,050</td>
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

export default Cobro;
