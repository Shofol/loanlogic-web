import { Table, Row, Col, Button } from "reactstrap";
import { Globe, Edit } from "react-feather";
import { useNavigate } from "react-router-dom";
import api from "../../../@core/api/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import StatusTag from "../../../@core/components/statusTag";

const FotoGarantía = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
   const response = await api.get(
      `/tasks/pending-nit?page=${currentPage}&pageSize=10`
    );
    setData(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  return (
    <>
      <Row className="mb-1">
        <Col md="6">
          <h4 className="mb-1">Asignar NIT</h4>
        </Col>
        <Col md="6" className="d-flex justify-content-end">
          <Button
            color="flat-primary"
            size="sm"
            onClick={() => {
              navigate("/route");
            }}
          >
            {/*Ver ruta <Globe size={12} />*/}
            </Button>
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Num. Solicitud</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Departamento</th>
            <th>Promotor</th>
            <th>Estado</th>
            <th>Validar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((guarantee, index) => {
              return (
                <tr
                  key={guarantee.id}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/creditos/visualizar-solicitud/${guarantee.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{guarantee.id}</td>
                  <td>{guarantee?.client.name}</td>
                  <td>{guarantee?.client.surname}</td>
                  <td>{guarantee?.client.residence_address}</td>
                  <td>{guarantee?.client.residence_municipality}</td>
                  <td>{guarantee?.client.department_of_residence}</td>
                  <td>{guarantee?.user.name} {guarantee?.user.family_name}</td>
                  <td>
                    <StatusTag status={guarantee.status} />
                  </td>
                  <td>
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="primary"
                      onClick={(e) => {
                        navigate(`/nit/${guarantee?.client.id}`);
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
    </>
  );
};

export default FotoGarantía;
