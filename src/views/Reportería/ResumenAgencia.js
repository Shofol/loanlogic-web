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
import {
  getConvertDateWithTimeZone,
  formatDateForQuery,
  calculateTotal
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";

const ResumenAgencia = () => {
  // const date = convertDateWithTimeZone(new Date());
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [picker]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/resumen-agency" +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}`
    );
    setData(response.data.data);
  };

  return (
    <Card className="p-2">
      <CardTitle>Resumen diario agencia</CardTitle>
      <Row>
        <Col md="6">
          <Label className="form-label" for="hf-picker">
            Fecha
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control bg-white"
            onChange={(selectedDates, dateStr, instance) => {
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

      <Table className="mt-4" responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Oficina</th>
            <th>Clientes activos</th>
            <th>Clientes colocados</th>
            <th>Colocación</th>
            <th>Cartera</th>
            <th>Mora</th>
            <th>%</th>
          </tr>
        </thead>
        {data && data.length > 0 && (
          <>
            <tbody>
              {data.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{res?.no}</td>
                    <td>{res?.agency}</td>
                    <td>{res?.currentClients}</td>
                    <td>{res?.newCreditsApplications}</td>
                    <td>{res?.totalCreditAmount}</td>
                    <td>{res?.totalRemainingAmount}</td>
                    <td>{res?.defaultAmount}</td>
                    <td>{res?.defaultPercentage}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Total</th>
                <td>{calculateTotal(data, "newCreditsApplications")}</td>
                <td>{calculateTotal(data, "totalCreditAmount")}</td>
                <td>{calculateTotal(data, "totalRemainingAmount")}</td>
                <td>{calculateTotal(data, "defaultAmount")}</td>
                <td>{calculateTotal(data, "defaultPercentage")}</td>
              </tr>
            </tfoot>
          </>
        )}
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

export default ResumenAgencia;
