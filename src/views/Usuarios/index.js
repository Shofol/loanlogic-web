import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardTitle, Col, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { agenciasValues } from "../../configs/data";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "../Reportería/Reportería.scss";
import { Download, Edit, User } from "react-feather";
import SidebarNewUsers from "./SidebarNewUsers";
import EditUser from "./EditUser";
import API from "../../@core/api/api";
import ReactPaginate from "react-paginate";
import { UserContext } from "../../utility/context/User";
import { getConvertDateWithTimeZone } from "../../utility/Utils";

const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [picker, setPicker] = useState(getConvertDateWithTimeZone(new Date()));
  // const [previousMonth, setPreviousMonth] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [agent, setAgent] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const currentUser = useContext(UserContext).user;

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // useEffect(() => {
  //   setMonth();
  // }, []);

  // const handleMonthChange = (date) => {
  //   setMonth(date);
  // };

  // const setMonth = (date = null) => {
  //   const current = date ? new Date(date) : new Date();
  //   current.setMonth(current.getMonth() - 1);
  //   const previousMonth = current.toLocaleString("default", { month: "long" });
  //   setPreviousMonth(previousMonth);
  // };

  const handleEdit = (user) => {
    setUser(user);
    setEdit(true);
  };

  useEffect(() => {
    if (agent && agent.length > 0) {
      fetchData();
    }
  }, [agent]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const response = await API.get(
      agent && agent.length > 0
        ? `user?agency=${agent.join(
            ","
          )}&page=${currentPage}&pageSize=12&sortOrder=ASC&sortField=createdAt`
        : `user?page=${currentPage}&pageSize=12&sortOrder=ASC&sortField=createdAt`
    );
    setUsers([...response.data.data]);
    setTotalPages(response.data.pagination.totalPages);
  };

  return (
    <Card className="p-2">
      <CardTitle>Usuarios</CardTitle>
      <Row>
        <Col md="6">
          <Label className="form-label">Oficina</Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            isMulti
            name="colors"
            options={currentUser.agency}
            className="react-select"
            classNamePrefix="select"
            onChange={(options) => {
              setAgent(options.map((option) => option.value));
            }}
          />
        </Col>

        <Col md="6" className="d-flex mt-2 justify-content-end">
          <Button.Ripple color="primary" type="reset" onClick={toggleSidebar}>
            <User size={16} />
            <span className="align-middle mx-25">Crear nuevo usuario</span>
          </Button.Ripple>
          {/* <Label className="form-label" for="hf-picker">
            Fecha
          </Label>
          <Flatpickr
            value={picker}
            id="hf-picker"
            className="form-control"
            onChange={(selectedDates, dateStr, instance) => {
              handleMonthChange(selectedDates[0]);
              setPicker(dateStr);
            }}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "d/m/Y"
            }}
          /> */}
        </Col>
      </Row>
      <Table className="mt-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Agencia</th>
            <th>Email</th>
            <th>Num. Celular</th>
            <th>Fecha aniversario</th>
            <th>Fecha creación usuario</th>
            {/* <th>Estado</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="nowrap">{user.name}</td>
                    <td className="nowrap">{user.role}</td>
                    <td>{user?.agency?.join(", ")}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user
                        ? getConvertDateWithTimeZone(user.date_of_birth)
                        : null}
                    </td>
                    <td>
                      {user ? getConvertDateWithTimeZone(user.createdAt) : null}
                    </td>
                    {/* <td>Q 950</td> */}
                    <td>
                      <Button.Ripple
                        className="btn-icon"
                        outline
                        color="primary"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit size={16} />
                      </Button.Ripple>
                    </td>
                  </tr>
                );
              })
            : null}
          {/* <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>1</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>Q 950</td>
            <td>
              <Button.Ripple
                className="btn-icon"
                outline
                color="primary"
                onClick={(user) => handleEdit(user)}
              >
                <Edit size={16} />
              </Button.Ripple>
            </td>
          </tr> */}
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
          pageCount={Math.ceil(totalPages)}
          onPageChange={(page) => handlePagination(page)}
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        />
      </div>

      <div className="d-flex justify-content-center mt-2">
        <Button.Ripple color="primary" type="reset">
          <Download size={16} />
          <span className="align-middle mx-25">DESCARGAR</span>
        </Button.Ripple>
      </div>
      <SidebarNewUsers
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onClose={() => {
          fetchData();
        }}
      />
      <EditUser
        showModal={edit}
        user={user}
        onClose={() => {
          fetchData();
          setEdit(false);
        }}
      />
    </Card>
  );
};

export default Usuarios;
