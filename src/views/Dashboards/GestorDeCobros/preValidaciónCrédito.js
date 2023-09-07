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
import { Globe, Edit, Check, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import api from "../../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../../utility/functions/formatMessage";
import StatusTag from "../../../@core/components/statusTag";

const PreValidaciónCrédito = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState(null);

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(
      `tasks/credit-prevalidation?page=${currentPage}&pageSize=12`
    );
    setData(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  const handleAction = async (e, action, id) => {
    e.stopPropagation();
    try {
      const response = await api.put(`tasks/credit-prevalidation/${id}`, {
        status: action === "accept" ? true : false
      });
      fetchData();
      toast.success(`Succesfully updated status`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="mb-1">
        <Col md="6">
          <h4 className="mb-1">Pre Validación Crédito</h4>
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
            <th>Num. Solicitud</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Municipio</th>
            <th>Departamento</th>
            <th>Estado</th>
            <th>Validar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((credit, index) => {
              return (
                <tr
                  key={credit.id}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/créditos/visualizar-solicitud/${credit.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{credit.id}</td>
                  <td>{credit?.client.name}</td>
                  <td>{credit?.client.surname}</td>
                  <td>{credit?.client.residence_address}</td>
                  <td>{credit?.client.residence_municipality}</td>
                  <td>{credit?.client.department_of_residence}</td>
                  <td>
                    <StatusTag status={credit.status} />
                  </td>
                  <td
                    className="d-flex gap-1"
                    style={{ width: "150px" }}
                    width={"150px"}
                  >
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="danger"
                      onClick={(e) => handleAction(e, "accept", credit.id)}
                    >
                      <Check size={16} />
                    </Button.Ripple>
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="danger"
                      onClick={(e) => handleAction(e, "reject", credit.id)}
                    >
                      <X size={16} />
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

export default PreValidaciónCrédito;
