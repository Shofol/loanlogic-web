import React, { useState, useEffect } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../Reportería/Reportería.scss";
import { Download, Edit, User } from "react-feather";

const Usuarios = () => {
  const [picker, setPicker] = useState(new Date().toLocaleDateString());
  const [previousMonth, setPreviousMonth] = useState("");

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
      <CardTitle>Usuarios</CardTitle>
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

        <Col md="6" className="d-flex mt-2 justify-content-end">
          <Button.Ripple color="primary" type="reset">
            <User size={16} />
            <span className="align-middle mx-25">Crear nuevo usuario</span>
          </Button.Ripple>
          {/* <Label className="form-label" for="hf-picker">
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
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "d/m/Y"
            }}
          /> */}
        </Col>
      </Row>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Agencia</th>
            <th>Email</th>
            <th>Num. Celular</th>
            <th>Fecha aniversario</th>
            <th>Fecha creación usuario</th>
            <th>Estado</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>
              <Button.Ripple className="btn-icon" outline color="primary">
                <Edit size={16} />
              </Button.Ripple>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-2">
        <Button.Ripple color="primary" type="reset">
          <Download size={16} />
          <span className="align-middle mx-25">DESCARGAR</span>
        </Button.Ripple>
      </div>
    </Card>
  );
};

export default Usuarios;
