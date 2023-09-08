import React, { useContext, useState, useEffect } from "react";
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
import {
  getConvertDateWithTimeZone,
  formatDateForQuery,
  calculateTotal
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const ResumenAsesor = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);

  useEffect(() => {
    fetchData();
  }, [picker, agency]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/resumen-asesor" +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

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
            onChange={(option) =>
              setAgency(option.map((option) => option.value))
            }
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
            <th>Asesor</th>
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
                    <td>{res?.user}</td>
                    <td>{res?.currentClients}</td>
                    <td>{res?.newCreditApplications}</td>
                    <td>{res?.totalCreditAmount}</td>
                    <td>{res?.totalRemainingAmount}</td>
                    <td>{res?.defaultAmount}</td>
                    <td>
                      {parseFloat(res?.defaultPercentage || 0).toFixed(2)} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Total</th>
                <td>{calculateTotal(data, "currentClients")}</td>
                <td>{calculateTotal(data, "newCreditApplications")}</td>
                <td>{calculateTotal(data, "totalCreditAmount")}</td>
                <td>{calculateTotal(data, "totalRemainingAmount")}</td>
                <td>{calculateTotal(data, "defaultAmount")}</td>
                <td>
                  {parseFloat(
                    calculateTotal(data, "defaultPercentage") || 0
                  ).toFixed(2)}{" "}
                  %
                </td>
              </tr>
            </tfoot>
          </>
        )}
      </Table>
      <div className="d-flex justify-content-center mt-2">
        {data && (
          <CSVLink data={data}>
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

export default ResumenAsesor;
