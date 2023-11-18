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
  calculateTotal,
} from "../../utility/Utils";
import { Spanish } from "flatpickr/dist/l10n/es";
import api from "../../@core/api/api";
import { CSVLink } from "react-csv";

const FormatoAsistencias = () => {
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [agency, setAgency] = useState(null);
  const [dataToDownload, setDataToDownload] = useState(null);

  useEffect(() => {
    fetchData();
  }, [picker, agency]);

  const fetchData = async () => {
    const response = await api.get(
      "reporting/format-assistance" +
        `${picker ? `?date=${formatDateForQuery(picker)}` : ""}` +
        `${agency && agency.length > 0 ? `&agency=${agency.join(",")}` : ""}`
    );
    setData(response.data.data);
  };

  // mapping the header of the table and also the csv
  const headers = [
    { label: "ID", key: "id" },
    { label: "PAIS", key: "country" },
    { label: "CÓDIGO DE PAIS", key: "countrycode" },
    { label: "TELEFONO SIN ESPACIOS NI GUIONES", key: "phone" },
    { label: "NOMBRE COMPLETO DE CLIENTE", key: "client" },
    { label: "GENERO", key: "sex" },
    { label: "CORREO", key: "email" },
    { label: "FECHA DE NACIMIENTO DD/MM/AÑO", key: "birthdate" },
    { label: "EDAD", key: "age" },
    { label: "DPI O PASAPORTE", key: "dpi" },
    { label: "FECHA DE DESEMBOLSO DD/MM/AÑO", key: "disbursement" },
    { label: "FECHA DE INICIO", key: "firstpayment" },
    { label: "FECHA FIN", key: "lastpayment" },
  ];

  // mapping the data for downloading csv file
  useEffect(() => {
    if (data) {
      let modifiedData = [];
      data.map((element) => {
        modifiedData = [
          ...modifiedData,
          {
            id: element?.id,
            country: element?.country,
            countrycode: element?.countrycode,
            phone: element?.phone,
            client: element?.client,
            sex: element?.sex,
            email: element?.email,
            birthdate: element?.birthdate,
            age: element?.age,
            dpi: element?.dpi,
            disbursement: element?.disbursement,
            firstpayment: element?.firstpayment,
            lastpayment: element?.lastpayment,

          },
        ];
      });
     
      setDataToDownload(modifiedData);
    }
  }, [data]);

  return (
    <Card className="p-2">
      <CardTitle>Formato Asistencias</CardTitle>
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
              altFormat: "j F Y",
              dateFormat: "d/m/Y",
            }}
          />
        </Col>
      </Row>

      <Table className="mt-4" responsive>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header.label}>{header.label}</th>;
            })}
          </tr>
        </thead>
        {data && data.length > 0 && (
          <>
            <tbody>
              {data.map((res, index) => {
                return (
                  <tr key={index}>
                    <td>{res?.id}</td>
                    <td>{res?.country}</td>
                    <td>{res?.countrycode}</td>
                    <td>{res?.phone}</td>
                    <td>{res?.client}</td>
                    <td>{res?.sex}</td>
                    <td>{res?.email}</td>
                    <td>{res?.birthdate}</td>
                    <td>{res?.age}</td>
                    <td>{res?.dpi}</td>
                    <td>{res?.disbursement}</td>
                    <td>{res?.firstpayment}</td>
                    <td>{res?.lastpayment}</td>

             
                 


                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </Table>
      <div className="d-flex justify-content-center mt-2">
        {dataToDownload && (
          <CSVLink
            data={dataToDownload}
            headers={headers}
            filename={`formato-asistencias-${picker}.csv`}
          >
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

export default FormatoAsistencias;
