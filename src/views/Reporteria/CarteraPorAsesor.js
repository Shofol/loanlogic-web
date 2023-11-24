import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { portfolioData, paymentMethods, sexValues, maritialStatus } from "../../configs/data";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./Reportería.scss";
import { Download } from "react-feather";
import api from "../../@core/api/api";
import { UserContext } from "../../utility/context/User";
import { getConvertDateWithTimeZone } from "../../utility/Utils";
import moment from "moment";

const CarteraPorAsesor = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [agency, setAgency] = useState(null);
  const [gestors, setGestors] = useState([]);
  const [agent, setAgent] = useState(null);
  const { user } = useContext(UserContext);

  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [agency, agent]);

  function transFrequency (string){
    let translation = string;

    var result = paymentMethods.filter(obj => {
      return obj.value === string
    })

    if(result && result[0]){ translation = result[0].label}
    return translation;
  }

  function transCivilStatus (string){
    let translation = string;

    var result = maritialStatus.filter(obj => {
      return obj.value === string
    })

    if(result && result[0]){ translation = result[0].label}
    return translation;
  }
  function transSex (string){
    let translation = string;

    var result = sexValues.filter(obj => {
      return obj.value === string
    })

    if(result && result[0]){ translation = result[0].label}
    return translation;
  }
  const fetchData = async () => {
    const response = await api.get(
      `credit/portfolio/agent` +
      `${agency ? `?agency=${agency}` : ""}` +
      `${agent ? `&agent=${agent}` : ""}`
    );
    const data = response.data.data;
    const modData = data.map((item) => {
      let updatedData = {
       
        cliente: `${item.client.name} ${item.client.second_name || ''} ${item.client.surname} ${item.client.second_surname || ''}`,
        "número crédito": item.credit.id,
        sucursal: item.credit.agency,
        "DPI Cliente": item.client.dpi_number,
        "Género": transSex(item.client.sex),
        "fecha nacimiento": getConvertDateWithTimeZone(item.client.birth_date), 
        telefono: item.client.phone_number,
        dirección: item.client.residence_address,
        departamento: item.client.neighborhood_region,
        municipio: item.client.neighborhood_city,
        monto: item.credit.requested_amount,
        "nombre promotor": item.credit.user.name + ' ' + item.credit.user.family_name,
        "estado civil": transCivilStatus(item.client.civil_status),
        "profesión": item.client.profession,
        "lugar de trabajo": item.client.company_name,
        "dirección de trabajo": item.client.work_address,
        "departamento de trabajo": item.client.work_department,
        "municipio de trabajo": item.client.work_municipality,
        "nombre de negocio": item.client.business_name,
        "dirección de negocio": item.client.work_address,
        "departamento de negocio": item.client.business_department,
        "municipio de negocio": item.client.business_municipality,
        "tipo de garantía": item.credit.guaranty,
        "fecha de desembolso": moment(item.credit.disbursement_date).format("DD/MM/YYYY"),
        fechaInicial: getConvertDateWithTimeZone(item.credit.disbursement_date),
        fechaFinal: getConvertDateWithTimeZone(item.credit.lastPayment),
        plazo: item.credit.duration,
        plan: transFrequency(item.credit.payment_frequency),
        cuota: item.credit.installment_amount,
        interés: item.credit.interest,
        "k+i": item.credit.ki,
        saldo: item.credit.total_remaining_amount,
        pagos: item.credit.total_paid_amount,
        "días mora": item.credit.last_unpaid_date ? moment().diff(item.credit.last_unpaid_date, 'days'): 0,
        "monto de cuotas en mora": item.credit.nextPayment,
      };

      item.debt_collections.map((debt, index) => {
        updatedData[`${moment(debt.payment_date).format("DD/MM/YY")}`] = debt.payment_made;
      });
      // });
      return updatedData;
    });

    let newColumns = [];
    let dates = [];
    data.map((item) => {
      item.debt_collections.map((debt) => {
        if (!(dates.filter((date) => date === debt.payment_date).length > 0)) {
          dates = [...dates, debt.payment_date];
          newColumns = [
            ...newColumns,
            {
              headerName: `${weekDays[new Date(debt.payment_date).getDay() + 1]}`,
              children: [{ field: moment(debt.payment_date).format("DD/MM/YY"), width: 120 }],
              date: debt.payment_date,
            },
          ];
        }
      });
    });

    newColumns = newColumns.sort(
      (prev, next) => new Date(prev.date) - new Date(next.date)
    );

    setColumnDefs([...portfolioData.columns, ...newColumns]);
    // [...response.data.data]
    setRowData(modData);
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({ fileName: `cartera-por-promotor-${new Date().toLocaleDateString()}.csv` });
  }, []);

  useEffect(() => {
    if (agency) {
      fetchGestorData();
    }
  }, [agency]);

  const fetchGestorData = async () => {
    const response = await api.get(`/user?agency=${agency}&role=agent`);
    let agentArray = [{
      label: "TODOS",
      value: "ALL"
    }];

    response.data.data.map((gestor) => (
      agentArray.push({
        label: gestor.name + ' ' + gestor.family_name,
        value: gestor.id,
      })))
    setGestors(
      agentArray
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
              options={user.agency}
              className="react-select"
              classNamePrefix="select"
              onChange={
                (option) => setAgency(option.value)
                // setAgencies(option.map((option) => option.value))
              }
            />
          </Col>

          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Promotor</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              // isMulti
              name="colors"
              options={gestors}
              className="react-select"
              classNamePrefix="select"
              onChange={
                (option) => setAgent(option.value)
                // setAgencies(option.map((option) => option.value))
              }
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
          <Button.Ripple
            color="primary"
            type="reset"
            onClick={(e) => {
              onBtnExport();
            }}
          >
            <Download size={16} />
            <span className="align-middle mx-25">DESCARGAR</span>
          </Button.Ripple>
        </div>
      </CardBody>
    </Card>
  );
};

export default CarteraPorAsesor;
