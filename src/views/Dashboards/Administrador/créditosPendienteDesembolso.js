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

const CréditosPendienteDesembolso = () => {
  const navigate = useNavigate();
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
            <th>Estado</th>
            <th>Desembolso</th>
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
            <td className="d-flex gap-1" width={"150px"}>
              <Button.Ripple className="btn-icon" outline color="danger">
                <Check size={16} />
              </Button.Ripple>
              <Button.Ripple className="btn-icon" outline color="danger">
                <X size={16} />
              </Button.Ripple>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CréditosPendienteDesembolso;
