import { MoreVertical, Edit, Trash, Check, X } from "react-feather";
import { Table, Row, Col, Button } from "reactstrap";
import { Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../@core/api/api";
import StatusTag from "../../../@core/components/statusTag";

const CréditosPendienteDesembolso = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState(null);

  // // ** Function to handle Pagination
  // const handlePagination = (page) => {
  //   setCurrentPage(page.selected + 1);
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`credit/disbursement/pending`);
    setData(response.data.data);
    // setTotalPages(response.data.pagination.totalPages);
  };

  return (
    <>
      <Row className="mb-1">
        <Col md="6">
          <h4 className="mb-1">Créditos Pendiente Desembolso</h4>
        </Col>
        <Col md="6" className="d-flex justify-content-end">
          <Button
            color="flat-primary"
            size="sm"
            onClick={() => {
              navigate("/route");
            }}
          >
            Ver ruta <Globe size={12} />
          </Button>
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Num. Crédito</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Monto desembolso</th>
            <th>Desembolso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr
                  key={item.client.id}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/clientes/${item.client.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item?.credit.id}</td>
                  <td>{item?.client.name}</td>
                  <td>{item?.client.surname}</td>
                  <td>{item?.client.residence_address}</td>
                  <td>{item?.client.residence_municipality}</td>
                  <td>{item?.credit.disbursement_amount}</td>
                  <td>
                    <StatusTag status={item?.debt_collections.status} />
                  </td>

                  <td>
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="primary"
                      onClick={(e) => {
                        // navigate(`/créditos/garantía/${guarantee.id}`);
                        navigate(`/desembolso/${item?.debt_collections.id}`);
                        e.stopPropagation();
                      }}
                    >
                      <Edit size={16} />
                    </Button.Ripple>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default CréditosPendienteDesembolso;
