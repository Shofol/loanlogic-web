import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Table
} from "reactstrap";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";
import StatusTag from "../../../@core/components/statusTag";
import { getConvertDateWithTimeZone } from "../../../utility/Utils";
import FileListViewer from "../../../@core/components/fileListViewer";

const ClientesPerfil = () => {
  let { id } = useParams();
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [history, setHistory] = useState(null);

  // ** Function to handle Pagination
  // const handlePagination = (page) => {
  //   setCurrentPage(page.selected + 1);
  // };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const response = await api.get(`client/${id}`);
    const history = await api.get(`credit-application/client/${id}`);
    setData(response.data.data);
    setHistory(history.data.data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">CLIENTE</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="2">
            <p className="fw-bold fs-5">
              {data?.name} {data?.surname}
            </p>
            <p className="mb-0">DPI: {data?.dpi_number}</p>
            <p>NIT: {data?.nit}</p>
            {/*
            {data && data.photos_of_bills && (
              <FileListViewer file={data.photos_of_bills} />
            )}

            {data && data.photos_of_the_dpi && (
              <FileListViewer file={data.photos_of_the_dpi} />
            )}
            */}
          </Col>
          <Col md="6" className="px-4">
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Celular">
                  Celular
                </Label>
                <Input
                  type="text"
                  name="Celular"
                  id="Celular"
                  placeholder="Celular"
                  disabled
                  defaultValue={data?.phone_number}
                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Email">
                  Email
                </Label>
                <Input
                  type="text"
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  disabled
                  defaultValue={data?.email}

                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Dirección de residencia*">
                  Dirección de residencia*
                </Label>
                <Input
                  type="text"
                  name="Dirección de residencia*"
                  id="Dirección de residencia*"
                  placeholder="Dirección de residencia*"
                  disabled
                  defaultValue={data?.residence_address}
                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Municipio de residencia*">
                  Municipio de residencia*
                </Label>
                <Input
                  type="text"
                  name="Municipio de residencia*"
                  id="Municipio de residencia*"
                  placeholder="Municipio de residencia*"
                  disabled
                  defaultValue={data?.residence_municipality}

                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Departamento">
                  Departamento
                </Label>
                <Input
                  type="text"
                  name="Departamento"
                  id="Departamento"
                  placeholder="Departamento"
                  disabled
                  defaultValue={data?.department_of_residence}

                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Fecha de nacimiento*">
                  Fecha de nacimiento*
                </Label>
                <Input
                  type="text"
                  name="Fecha de nacimiento*"
                  id="Fecha de nacimiento*"
                  placeholder="Fecha de nacimiento*"
                  disabled
                  defaultValue={
                    data ? getConvertDateWithTimeZone(data?.birth_date) : null
                  }

                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Nacionalidad">
                  Nacionalidad
                </Label>
                <Input
                  type="text"
                  name="Nacionalidad"
                  id="Nacionalidad"
                  placeholder="Nacionalidad"
                  disabled
                  defaultValue={data?.nationality}

                // tag={Field}
                />
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="Sexo">
                  Género
                </Label>
                <Input
                  type="text"
                  name="Sexo"
                  id="Sexo"
                  placeholder="Género"
                  disabled
                  defaultValue={data?.sex}

                // tag={Field}
                />
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <div className="border rounded">
              <OverviewCircle
                data={{ completed: 80, inProgress: 20 }}
                title="Salud crediticia"
                text="Credit score"
                height="150"
                fontSize="2rem"
                fixedHeight={false}
                color={colors.success.main}
                bottom={20}
              />
            </div>
            {/* <Row className="mt-2 px-md-1">
              <Col
                md="4"
                className="d-flex flex-column justify-content-end bg-primary-subtle"
              >
                <p className="fw-bold">Número de atrasos</p>
                <p className="fs-3 fw-bold">2</p>
              </Col>
              <Col
                md="4"
                className="d-flex flex-column justify-content-end bg-secondary-subtle pt-1"
              >
                <p className="fw-bold">Más de 3 días consecutivos sin pagar</p>
                <p className="fs-3 fw-bold">2</p>
              </Col>
              <Col
                md="4"
                className="d-flex flex-column justify-content-end border bg-info-subtle "
              >
                <p className="fw-bold">SEMÁFORO</p>
                <p className="fs-3 fw-bold">F</p>
              </Col>
            </Row> */}
          </Col>
        </Row>
        <h4>Documentación</h4>
        <Table className="mt-2" responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Tipo documento</th>
              <th>URL document</th>
              <th>Documento</th>

            </tr>
          </thead>
          <tbody>
            {data &&
              (data.photos_of_the_dpi).length > 0 &&
              data.photos_of_the_dpi.map((item, index) => {
                return (
                  <tr
                    key={index + 1}

                  >
                    <td>{index + 1}</td>
                    <td>DPI</td>
                    <td>{item}</td>
                    <td>
                      <FileListViewer file={[item]} />

                    </td>


                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Table className="mt-2" responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Tipo documento</th>
              <th>URL document</th>
              <th>Documento</th>

            </tr>
          </thead>
          <tbody>
            {data &&
              (data.photos_of_bills).length > 0 &&
              data.photos_of_bills.map((item, index) => {
                return (
                  <tr
                    key={index + 1}

                  >
                    <td>{index + 1}</td>
                    <td>FACTURA</td>
                    <td>{item}</td>
                    <td>
                      <FileListViewer file={[item]} />

                    </td>


                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Input
          type="textarea"
          className="my-2"
          placeholder="Personal Comments"
        ></Input>

        <h4>Historial</h4>
        <Table className="mt-2" responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Cliente</th>
              <th>Fecha Solicitud</th>
              <th>Solicitud</th>
              <th>Estado Solicitud</th>
              <th>Crédito</th>
              <th>Estado Crédito</th>
              <th>Devolución %</th>
              {/* <th>Núm Retrasos</th> */}
            </tr>
          </thead>
          <tbody>
            {history &&
              history.length > 0 &&
              history.map((item, index) => {
                return (
                  <tr
                    key={index + 1}
                    className="clickable-row"
                    onClick={(e) => {
                      (item.credit.id == undefined)
                        ? navigate(`/creditos/visualizar-solicitud/${item.id}`)
                        : navigate(`/reporteria/amortization/${item.credit.id}`);
                    }}
                  >
                    <td>{index + 1}</td>
                    <td
                      style={{ whiteSpace: "nowrap" }}
                    >{`${item.client.name} ${item.client.surname} ${item.client.second_surname}`}</td>
                    <td>{getConvertDateWithTimeZone(item.createdAt)}</td>
                    <td>{item.id}</td>
                    <td>
                      <StatusTag status={item.status} />
                    </td>
                    <td>{item.credit_amount}</td>
                    <td>
                      {" "}
                      <StatusTag status={item.credit.status} />
                    </td>
                    <td>
                      {item.credit.total_amount > 0
                        ? Math.round(
                          +item.credit.total_paid_amount /
                          +item.credit.total_amount /
                          100
                        )
                        : 0}
                    </td>
                    {/* <td>Q 950</td> */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ClientesPerfil;
