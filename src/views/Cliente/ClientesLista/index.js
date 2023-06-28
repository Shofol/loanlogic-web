import React, { useState, useEffect } from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Table,
  Input
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { agenciasValues } from "../../../configs/data";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../../Créditos/Créditos.scss";
import ReactPaginate from "react-paginate";
import { Search } from "react-feather";
import API from "../../../@core/api/api";
import { useNavigate } from "react-router-dom";

const ClientesLista = () => {
  const navigate = useNavigate();

  const estadoOptions = [
    { value: "all", label: "TODOS" },
    { value: "pending-pre-validation", label: "PENDIENTE PRE-VALIDACIÓN" },
    {
      value: "pending-address-validation",
      label: "PENDIENTE VALIDACIÓN DIRECCIÓN"
    },
    { value: "pending-approval", label: "PENDIENTE APROBACIÓN" },
    { value: "accepted", label: "ACEPTADO" },
    { value: "cancelled", label: "CANCELADO" }
  ];

  // ** States
  const today = new Date();
  let prevDay = new Date();
  prevDay = new Date(prevDay.setDate(prevDay.getDate() - 7));
  const [desdePicker, setDesdePicker] = useState(prevDay);
  const [hastaPicker, setHastaPicker] = useState(today);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [agency, setAgency] = useState([]);
  const [status, setStatus] = useState([]);
  const [queryParams, setQueryParams] = useState({});

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const fetchData = async () => {
    let params = ``;
    Object.entries(queryParams).map((pair) => {
      params = params + `&${pair[0]}=${pair[1]}`;
    });
    const response = await API.get(
      `client?page=${currentPage}&pageSize=1` + params
    );
    setData([...response.data.data]);
    setQueryParams({});
  };

  const handleSearch = () => {
    setSearchParams();
    fetchData();
  };

  const setSearchParams = () => {
    if (agency.length > 0) {
      queryParams.agency = agency.join(",");
    }
    if (status.length > 0) {
      queryParams.status = status.join(",");
    }
    queryParams.startDate = new Date(desdePicker).toISOString().split("T")[0];
    queryParams.endDate = new Date(hastaPicker).toISOString().split("T")[0];
  };

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle tag="h4">Clientes</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Agencias</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                isMulti
                name="colors"
                options={agenciasValues}
                className="react-select"
                classNamePrefix="select"
                onChange={(option) =>
                  setAgency(option.map((option) => option.value))
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Estado</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                isMulti
                name="status"
                options={estadoOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(option) =>
                  setStatus(option.map((option) => option.value))
                }
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="hf-picker">
                Desde el
              </Label>
              <Flatpickr
                value={desdePicker}
                id="hf-picker"
                className="form-control"
                onChange={(selectedDates, dateStr, instance) => {
                  setDesdePicker(dateStr);
                }}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d"
                }}
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="hf-picker">
                Hasta el
              </Label>
              <Flatpickr
                value={hastaPicker}
                id="hf-picker"
                className="form-control"
                onChange={(selectedDates, dateStr, instance) =>
                  setHastaPicker(dateStr)
                }
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d"
                }}
              />
            </Col>

            <div className="d-flex justify-content-end">
              <Button.Ripple
                className="mt-2"
                color="primary"
                onClick={handleSearch}
              >
                <Search size={14} />
                <span className="align-middle ms-25">Search</span>
              </Button.Ripple>
            </div>

            <Table className="mt-4" responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>
                    <span style={{ whiteSpace: "nowrap" }}>Num. Solicitud</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Nombre</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Apellidos</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Dirección</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>DPI</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Municipio</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Departamento</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Num. Celular</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((client) => {
                    return (
                      <tr
                        key={client.id}
                        onClick={() => navigate(`/clientes/${client.id}`)}
                        className="clickable-row"
                      >
                        <td>1</td>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.surname}</td>
                        <td>{client.residence_address}</td>
                        <td>{client.dpi_number}</td>
                        <td>{client.residence_municipality}</td>
                        <td>{client.department_of_residence}</td>
                        <td>{client.phone_number}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center my-1">
              <ReactPaginate
                nextLabel=""
                breakLabel="..."
                previousLabel=""
                pageRangeDisplayed={2}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                activeClassName="active"
                pageClassName="page-item"
                breakClassName="page-item"
                nextLinkClassName="page-link"
                pageLinkClassName="page-link"
                breakLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextClassName="page-item next-item"
                previousClassName="page-item prev-item"
                pageCount={Math.ceil(data.length / 7) || 1}
                onPageChange={(page) => handlePagination(page)}
                containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
              />
            </div>

            {/* <Col sm="12">
              <div className="d-flex justify-content-end">
                <Button.Ripple
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                >
                  <Save size={16} />
                  <span className="align-middle mx-25">Guardar</span>
                </Button.Ripple>
                <Button.Ripple outline color="secondary" type="reset">
                  <RefreshCw size={16} />
                  <span className="align-middle mx-25">Descartar</span>
                </Button.Ripple>
              </div>
            </Col> */}
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ClientesLista;