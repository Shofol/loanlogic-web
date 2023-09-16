import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Input, Label, Button, CardSubtitle } from "reactstrap";
import "./nit.scss";
import { Save } from "react-feather";
import API from "../../@core/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";
import Cleave from "cleave.js/react";


const Cobranza = () => {
  const { id } = useParams();
  const [nit, setNIT] = useState();
  const options = { numeral: true };
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await API.get(`/client/${id}`);
    setData(response.data.data);
  };

  const submit = async () => {
    const values = {
      nit: nit
    };
    console.log(data);
    try {
      const response = await API.put(`/client/nit/${id}`, values);
      setData(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="section-to-print">
      <Card className="p-2">
        <div className="contentWidth mx-auto">
          <h4> Asignar NIT</h4>
          <CardSubtitle
                tag="h5"
                className="cursor-pointer link text-primary link-underline-primary"
                onClick={() => {
                  navigate(`/clientes/${id}`);
                }}
              >
                {`${data?.name.toUpperCase()} ` + `${data?.second_name.toUpperCase()} `+
                  `${data?.surname.toUpperCase()} ` + `${data?.second_surname.toUpperCase()}`
                  }
                {/* : Q1000 - 28D */}
              </CardSubtitle>
          <p className="mb-0">
            <strong>DPI:</strong> {data?.dpi_number}
          </p>
          <hr />
        </div>

        <div className="contentWidth mx-auto">
          <Row className="d-flex fw-bold mb-sm-2">
            <Col md="4" className="pe-0">
              <p>NIT</p>
            </Col>
            <Col className="px-0" md="7">
              <Cleave
                className="form-control"
                placeholder="NIT Cliente"
                options={options}
                id="nit"
                name="nit"
                value={data?.nit}
                onChange={(e) => setNIT(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6" id="section-to-hide">
              <Row className="my-1">
                <Col sm="12">
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={submit}
                    >
                      <Save size={16} />
                      <span className="align-middle mx-25">Guardar</span>
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Cobranza;
