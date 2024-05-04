import { MoreVertical, Edit, Trash, Check, X } from "react-feather";
import {
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col,
  Button
} from "reactstrap";
import { Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import api from "../../../@core/api/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const RecuperaciónDiaria = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formatter = new Intl.NumberFormat('en-US');

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(
      `/tasks/asignar-gestor-cobranza?page=${currentPage}&pageSize=10`
    );
    setData(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  return (
    <>
      <Row className="mb-1">
        <Col md="6">
        <h4 className="mb-1">Asignar Gestor Cobranza</h4>
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
            <th>Núm. Crédito</th>
            {/* <th>Sl. No</th> */}
            {/* <th>Num. Solicitud</th> */}
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Monto adeudado</th>
            {/* <th>Estado</th> */}
            <th>ASIGNAR</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((pdData, index) => {
              return (
                <tr
                  key={pdData.client.dpi_number}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/reporteria/amortization/${pdData.id}`);
                  }}
                >
                  <td>{pdData?.id}</td>
                  {/* <td>S1034</td> */}
                  <td>{pdData?.client.name}</td>
                  <td>{pdData?.client.surname}</td>
                  <td>{pdData?.client.residence_address}</td>
                  <td>{pdData?.client.residence_municipality}</td>
                  <td>{formatter.format(pdData?.total_default_amount)}</td>
                  {/* <td> 
                    <StatusTag status={pdData?}/>
                  </td> */}
                  <td>
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="primary"
                      onClick={(e) => {
                        // navigate(`/creditos/garantia/${guarantee.id}`);
                        navigate(`/asignar-gestor-cobranza/${pdData.id}`);
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

export default RecuperaciónDiaria;
