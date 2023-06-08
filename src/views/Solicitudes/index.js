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
import { Save, RefreshCw, Edit, Check, X } from "react-feather";
import { agenciasValues } from "../../configs/data";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../Créditos/Créditos.scss";
import ReactPaginate from "react-paginate";

const Solicitudes = () => {
  const estadoOptions = [
    { value: "all", label: "TODOS" },
    { value: "prevalidation", label: "PENDIENTE PRE-VALIDACIÓN" },
    { value: "address", label: "PENDIENTE VALIDACIÓN DIRECCIÓN" },
    { value: "approval", label: "PENDIENTE APROBACIÓN" },
    { value: "accepted", label: "ACEPTADO" },
    { value: "cancelled", label: "CANCELADO" }
  ];
  const [picker, setPicker] = useState(null);
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const data = [1, 2, 3, 4, 5, 5, 6, 6, 6, 6, 6, 66, 6];

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
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
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="hf-picker">
                Desde el
              </Label>
              <Flatpickr
                value={picker}
                id="hf-picker"
                className="form-control"
                onChange={(selectedDates, dateStr, instance) =>
                  setPicker(dateStr)
                }
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y"
                }}
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="hf-picker">
                Hasta el
              </Label>
              <Flatpickr
                value={picker}
                id="hf-picker"
                className="form-control"
                onChange={(selectedDates, dateStr, instance) =>
                  setPicker(dateStr)
                }
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d/m/Y"
                }}
              />
            </Col>

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
                <tr>
                  <td>1</td>
                  <td>S1034</td>
                  <td>John</td>
                  <td>Doe</td>
                  <td>Calle de monte toro, 30</td>
                  <td>Samayac</td>
                  <td>Suchitepéquez</td>
                  <td>Suchitepéquez</td>
                  <td>Pendiente pre-validación</td>
                  <td className="d-flex gap-1">
                    <Button.Ripple className="btn-icon" outline color="danger">
                      <Check size={16} />
                    </Button.Ripple>
                    <Button.Ripple className="btn-icon" outline color="danger">
                      <X size={16} />
                    </Button.Ripple>
                    <Button.Ripple className="btn-icon" outline color="primary">
                      <Edit size={16} />
                    </Button.Ripple>
                  </td>
                </tr>
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

export default Solicitudes;
