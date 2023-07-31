import { MoreVertical, Edit, Trash, Check, X } from "react-feather";
import { Table, Row, Col, Button } from "reactstrap";
import { Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CréditosPendienteDesembolso = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

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
            <th>Num. Solicitud</th>
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
          <tr
            className="clickable-row"
            onClick={() => {
              navigate("/clientes/5");
            }}
          >
            <td>1</td>
            <td>S1034</td>
            <td>John</td>
            <td>Doe</td>
            <td>Calle de monte toro, 30</td>
            <td>Samayac</td>
            <td>Suchitepéquez</td>
            <td>Pendiente pre-validación</td>

            <td>
              <Button.Ripple
                className="btn-icon"
                outline
                color="primary"
                onClick={(e) => {
                  // navigate(`/créditos/garantía/${guarantee.id}`);
                  navigate(`/desembolso/${data?.id}`);
                  e.stopPropagation();
                }}
              >
                <Edit size={16} />
              </Button.Ripple>
            </td>

            {/* <td
              className="d-flex gap-1"
              width={"150px"}
              style={{ width: "150px" }}
            >
              <Button.Ripple className="btn-icon" outline color="danger">
                <Check size={16} />
              </Button.Ripple>
              <Button.Ripple className="btn-icon" outline color="danger">
                <X size={16} />
              </Button.Ripple>
            </td> */}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CréditosPendienteDesembolso;
