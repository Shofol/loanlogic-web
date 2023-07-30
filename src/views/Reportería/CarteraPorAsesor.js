import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { agenciasValues, portfolioData } from "../../configs/data";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./Reportería.scss";
import { Download } from "react-feather";
import api from "../../@core/api/api";

const CarteraPorAsesor = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [agency, setAgency] = useState(null);
  const [gestors, setGestors] = useState([]);
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`credit/portfolio/agent`);
    const data = response.data.data;
    const modData = data.map((item) => {
      let updatedData = {
        cliente: `${item.client.name} ${item.client.surname}`,
        telefono: item.client.phone_number,
        monto: item.credit.requested_amount,
        fechaInicial: item.credit.disbursement_date,
        fechaFinal: item.credit.lastPayment,
        plazo: item.credit.duration,
        plan: item.credit.payment_frequency,
        cuota: item.credit.installment_amount,
        interés: item.credit.interest,
        "k+i": item.credit.ki,
        saldo: item.credit.total_remaining_amount,
        pagos: item.credit.total_paid_amount
      };

      data.map((item) => {
        item.debt_collections.map((debt) => {
          updatedData[`${debt.payment_date}`] = debt.payment_made;
        });
      });
      console.log(updatedData);
      return updatedData;
    });

    let newColumns = [];
    data.map((item) => {
      item.debt_collections.map((debt) => {
        newColumns = [
          ...newColumns,
          {
            headerName: `${weekDays[new Date(debt.payment_date).getDay()]}`,
            children: [{ field: debt.payment_date, width: 120 }]
          }
        ];
      });
    });

    setColumnDefs([...portfolioData.columns, ...newColumns]);
    // [...response.data.data]
    console.log(modData);
    setRowData(modData);
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    if (agency) {
      fetchGestorData();
    }
  }, [agency]);

  const fetchGestorData = async () => {
    const response = await api.get(`/user?agency=${agency}&role=agent`);
    setGestors(
      response.data.data.map((gestor) => ({
        label: gestor.name,
        value: gestor.name
      }))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Cartera</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Agencias</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              // isMulti
              name="colors"
              options={agenciasValues}
              className="react-select"
              classNamePrefix="select"
              onChange={
                (option) => setAgency(option.value)
                // setAgencies(option.map((option) => option.value))
              }
            />
          </Col>

          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Gestor</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name="colors"
              options={gestors}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>
        </Row>

        <h4>Cartera actual</h4>

        <div style={{ width: "75vw", height: "50vh" }}>
          {/* Example using Grid's API */}
          {/* <button onClick={buttonListener}>Push Me</button> */}

          {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowSelection="multiple"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              onCellClicked={cellClickedListener}
              lockPinned={true}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button.Ripple color="primary" type="reset">
            <Download size={16} />
            <span className="align-middle mx-25">Descargar CSV</span>
          </Button.Ripple>
        </div>
      </CardBody>
    </Card>
  );
};

export default CarteraPorAsesor;
