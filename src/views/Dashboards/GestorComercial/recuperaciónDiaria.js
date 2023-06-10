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

const RecuperaciónDiaria = () => {
  return (
    <>
      <Row className="mb-1">
        <Col md="6">
          <h4 className="mb-1">Recuperación diaria</h4>
        </Col>
        <Col md="6" className="d-flex justify-content-end">
          <Button color="flat-primary" size="sm">
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
            <th>Pre-validar</th>
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
            <td>Pendiente pre-validación</td>
            <td className="d-flex gap-1">
              <Button.Ripple className="btn-icon" outline color="danger">
                <Check size={16} />
              </Button.Ripple>
              <Button.Ripple className="btn-icon" outline color="danger">
                <X size={16} />
              </Button.Ripple>
            </td>
            {/* <td>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="icon-btn hide-arrow"
                  color="transparent"
                  size="sm"
                  caret
                >
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">Edit</span>
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Trash className="me-50" size={15} />{" "}
                    <span className="align-middle">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td> */}
          </tr>
          <tr>
            <td>1</td>
            <td>S1034</td>
            <td>John</td>
            <td>Doe</td>
            <td>Calle de monte toro, 30</td>
            <td>Samayac</td>
            <td>Suchitepéquez</td>
            <td>Pendiente pre-validación</td>
            <td className="d-flex gap-1">
              <Button.Ripple className="btn-icon" outline color="danger">
                <Check size={16} />
              </Button.Ripple>
              <Button.Ripple className="btn-icon" outline color="danger">
                <X size={16} />
              </Button.Ripple>
            </td>
            {/* <td>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="icon-btn hide-arrow"
                  color="transparent"
                  size="sm"
                  caret
                >
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">Edit</span>
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Trash className="me-50" size={15} />{" "}
                    <span className="align-middle">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td> */}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default RecuperaciónDiaria;
