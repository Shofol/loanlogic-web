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
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import api from "../../../@core/api/api";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../../utility/functions/formatMessage";
import StatusTag from "../../../@core/components/statusTag";

const PreValidaciónDirección = () => {
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
      `tasks/address-validation?page=${currentPage}&pageSize=10`
    );
    setData(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  const handleAction = async (e, action, id) => {
    e.stopPropagation();

    try {
      const response = await api.put(`tasks/address-validation/${id}`, {
        status: action === "accept" ? true : false
      });
      fetchData();
      toast.success(`Successfully updated stats`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="mb-1">
        <Col md="6">
          <h4 className="mb-1">Validación Créditos Montos Elevados</h4>
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
            <th>Pre-validar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => {
              return (
                <tr
                  key={data.id}
                  className="clickable-row"
                  onClick={() => {
                    navigate(`/creditos/visualizar-solicitud/${data.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{data.id}</td>
                  <td>{data?.client.name}</td>
                  <td>{data?.client.surname}</td>
                  <td>{data?.client.residence_address}</td>
                  <td>{data?.client.residence_municipality}</td>
                  <td>{data?.client.department_of_residence}</td>
                  <td>{data?.user.name} {data?.user.family_name}</td>
                  <td>
                    <StatusTag status={data.status} />
                  </td>
                  <td
                    className="d-flex gap-1"
                    width={"150px"}
                    style={{ width: "150px" }}
                  >
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="danger"
                      onClick={(e) => handleAction(e, "accept", data.id)}
                    >
                      <Check size={16} />
                    </Button.Ripple>
                    <Button.Ripple
                      className="btn-icon"
                      outline
                      color="danger"
                      onClick={(e) => handleAction(e, "reject", data.id)}
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

export default PreValidaciónDirección;
