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
import { Save, RefreshCw, Edit, Check, X, Search } from "react-feather";
import { agenciasValues } from "../../configs/data";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import ReactPaginate from "react-paginate";
import API from "../../@core/api/api";
import { useNavigate } from "react-router-dom";
import "./Solicitudes.scss";

const Solicitudes = () => {
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

  const [picker, setPicker] = useState(null);
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [agency, setAgency] = useState([]);
  const [status, setStatus] = useState([]);
  const today = new Date();
  let prevDay = new Date();
  prevDay = new Date(prevDay.setDate(prevDay.getDate() - 7));
  const [desdePicker, setDesdePicker] = useState(prevDay);
  const [hastaPicker, setHastaPicker] = useState(today);
  const [queryParams, setQueryParams] = useState({});

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const fetchData = async () => {
    let params = ``;
    Object.entries(queryParams).map((pair) => {
      params = params + `&${pair[0]}=${pair[1]}`;
    });
    const response = await API.get(
      `credit-application?page=${currentPage}&pageSize=10&sortOrder=DESC` +
        params
    );
    setData([...response.data.data]);
    setTotalPages(response.data.pagination.totalPages);
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

  const renderAction = (id, status) => {
    if (
      status === "pending-pre-validation" ||
      status === "pending-address-validation"
    ) {
      return (
        <>
          <Button.Ripple
            className="btn-icon"
            outline
            color="success"
            onClick={() => {
              navigate(`/créditos/validation/${id}`);
            }}
          >
            <Check size={16} />
          </Button.Ripple>

          <Button.Ripple className="btn-icon" outline color="danger">
            <X size={16} />
          </Button.Ripple>
        </>
      );
    } else if (status === "pending-validation") {
      return (
        <Button.Ripple className="btn-icon" outline color="primary">
          <Edit size={16} />
        </Button.Ripple>
      );
    } else {
      return null;
    }
  };

  const handleRowClick = (id) => {
    navigate(`/créditos/visualizar-solicitud/${id}`);
  };

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle tag="h4">Solicitudes</CardTitle>
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
                name="colors"
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
                    <span>Monto</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>
                    <span>Tipo crédito</span>
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
                    <span>Fecha petición</span>
                    <Input
                      type="text"
                      name="fechaPetición"
                      id="fechaPetición"
                      placeholder="Fecha petición"
                      className="table-filter"
                    />
                  </th>

                  <th>
                    <span>Estado</span>
                    <Input
                      type="text"
                      name="productoNombre"
                      id="productoNombre"
                      placeholder="Nombre del producto"
                      className="table-filter"
                    />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((app, index) => {
                    return (
                      <tr
                        key={app.id}
                        onClick={() => handleRowClick(app.id)}
                        className="clickable-row"
                      >
                        <td>{index + 1}</td>
                        <td>{app.id}</td>
                        <td>{app.client.name}</td>
                        <td>{app.client.surname}</td>
                        <td>{app.credit_amount}</td>
                        <td></td>
                        <td>{app.client.residence_municipality}</td>
                        <td>{app.client.department_of_residence}</td>
                        <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td>{app.status}</td>
                        <td
                          className="d-flex gap-1"
                          style={{ maxWidth: "150px" }}
                        >
                          {renderAction(app.id, app.status)}
                        </td>
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
                forcePage={currentPage - 1}
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
                pageCount={totalPages}
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

export default Solicitudes;
