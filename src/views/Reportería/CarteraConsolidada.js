import React, { useContext, useEffect, useState } from "react";
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
import { Spanish } from "flatpickr/dist/l10n/es";
import {
  getConvertDateWithTimeZone,
  formatDateForQuery
} from "../../utility/Utils";
import api from "../../@core/api/api";

const CarteraConsolidada = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [agency, setAgency] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [agency, picker]);

  const fetchData = async () => {
    const response = await api.get(
      `reporting/consolidated-portfolio` +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${agency ? `&agency=${agency}` : ""}`
    );
    setData(response.data.data);
  };

  return (
    <Card className="p-2">
      <Row>
        <Col md="6">
          <Label className="form-label">Agencias</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            name="colors"
            options={user.agency}
            className="react-select"
            classNamePrefix="select"
            onChange={(option) => setAgency(option.value)}
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

      <Table className="mt-4 consolidadoTable">
        {data && (
          <>
            <thead>
              <tr>
                <th
                  colSpan="3"
                  className="bg-secondary-subtle text-center fs-5"
                >
                  Consolidado {picker}
                </th>
              </tr>
              <tr>
                <th>No.</th>
                <th>Agente</th>
                <th>Cuota</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>Q {user.totalCollected}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <th colSpan="2">TOTAL PAGOS DEL DÍA</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.totalCollected}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Devolución de desembolsos</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.disbursementReturns}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Colocación del día</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.totalRequestedAmount}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Clientes colocados</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.totalApplications}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Papelerías</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.administartiveFee}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Asistencias</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.assistanceFee}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Descuentos/Asueto</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.discountHoliday}
                </td>
              </tr>
              <tr>
                <th colSpan="2">Cancelaciones anticipadas</th>
                <td className="bg-body-secondary fw-bold">
                  Q {data?.advancedInstallment}
                </td>
              </tr>
              <tr>
                <th colSpan="2">TOTAL</th>
                <td className="bg-body-secondary fw-bold">Q {data?.total}</td>
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

export default CarteraConsolidada;
