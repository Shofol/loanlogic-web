import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import {
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

const CarteraPorAsesor = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Details",
      children: [{ field: "make" }, { field: "model" }, { field: "price" }]
    }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  useEffect(() => {
    // fetch("https://www.ag-grid.com/example-assets/row-data.json")
    //   .then((result) => result.json())
    //   .then((rowData) => setRowData(rowData));
    // console.log(rowData);
    const data = portfolioData;
    setColumnDefs(portfolioData.columns);
    setRowData(portfolioData.rows);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

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
              isMulti
              name="colors"
              options={agenciasValues}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>

          <Col className="mb-1" md="3" sm="12">
            <Label className="form-label">Gestor</Label>
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

        <h4>Cartera actual</h4>

        <div>
          {/* Example using Grid's API */}
          <button onClick={buttonListener}>Push Me</button>

          {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
          <div className="ag-theme-alpine" style={{ width: 1000, height: 500 }}>
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
      </CardBody>
    </Card>
  );
};

export default CarteraPorAsesor;
