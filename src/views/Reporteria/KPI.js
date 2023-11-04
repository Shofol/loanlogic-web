import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Progress,
  InputGroup,
  Input,
  InputGroupText,
  Label
} from "reactstrap";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import Chart from "react-apexcharts";
import RangeList from "../../@core/components/rangeList";
import RangeListView from "./RangeListView";
import { useParams } from "react-router-dom";
import api from "../../@core/api/api";
import Select from "react-select";
import { selectThemeColors } from "@utils";

const KPI = () => {
  const { colors } = useContext(ThemeColors);
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [series, setSeries] = useState(null);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const newUser = JSON.parse(localStorage.getItem("user"));
    setUser(newUser);
  };

  useEffect(() => {
    if (user) {
      if (user.role !== "AGENT" || user.role !== "COLLECTION-MANAGER") {
        fetchUsersList();
      }
    }

    if (id) {
      setUserId(id);
    } else {
      if (user) {
        if (user.role === "AGENT" || user.role === "COLLECTION-MANAGER") {
          setUserId(user.id);
        }
      }
    }
  }, [id, user]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    const response = await api.get(`reporting/kpi/${userId}`);
    setData(response.data.data);
  };

  const fetchUsersList = async () => {
    const response = await api.get(`user/list`);
    setUsers(
      response.data.data.map((user) => ({ label: user.name, value: user.id }))
    );
  };

  useEffect(() => {
    if (data) {
      let chartData = [];
      Object.entries(data.daily_amount).map((pair) => {
        chartData = [
          ...chartData,
          {
            x: pair[0],
            y: pair[1],
            goals: [
              {
                name: "Expected",
                value: data.goal.daily,
                strokeColor: "#0f502c"
              }
            ]
          }
        ];
      });

      const series = [
        {
          name: "Daily Amount",
          data: chartData
        }
      ];

      setSeries(series);
    }
  }, [data]);

  const options = {
    chart: {
      id: "basic-bar"
    },
    colors: ["#25c76e"]
  };

  const mapBonusValues = (bonuses) => {
    let values = [];
    bonuses.map((bonus) => {
      values = [
        ...values,
        {
          minimum_range: bonus.bonus_minimum_range,
          maximum_range: bonus.bonus_maximum_range,
          bono: bonus.bonus_amount
        }
      ];
    });
    return values;
  };

  return (
    <>
      <Card className="px-2">
        <CardHeader>
          <CardTitle>KPI: {data?.user.name}</CardTitle>
          {user &&
            user.role !== "AGENT" &&
            user.role !== "COLLECTION-MANAGER" && (
              <Row>
                <Label className="form-label">Select User</Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  label="Select User"
                  options={users}
                  isClearable={false}
                  name="users"
                  onChange={(option) => setUserId(option.value)}
                />
              </Row>
            )}
        </CardHeader>

        <CardBody>
          <div className="d-flex gap-2 align-items-end mb-2">
            <p>Meta</p>
            <div>
              <p>Diario</p>
              <InputGroup>
                <Input
                  type="number"
                  name={`diario`}
                  id="diario"
                  placeholder="Diario"
                  disabled
                  value={data?.goal.daily}
                />
                <InputGroupText>Q</InputGroupText>
              </InputGroup>
            </div>
            <div>
              <p>Mensual</p>
              <InputGroup>
                <Input
                  type="number"
                  name={`mensual`}
                  id="mensual"
                  placeholder="Mensual"
                  disabled
                  value={data?.goal.monthly}
                />
                <InputGroupText>Q</InputGroupText>
              </InputGroup>
            </div>
          </div>

          <Row>
            <Col md="8">
              <div className="pe-md-2 border rounded">
                {series && (
                  <Chart options={options} series={series} type="bar" />
                )}{" "}
                <p className="text-center">
                  Gráfico diario: meta vs colocación real
                </p>
              </div>
            </Col>
            <Col md="4" className="border rounded">
              <OverviewCircle
                data={{ completed: data?.percentage_amount }}
                title="META"
                subTitle="(sin incluir avances)"
                text={`${data?.total_amount} Q / ${data?.goal.monthly} Q`}
                height="200"
                color={colors.warning.main}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bono por producto:</CardTitle>
        </CardHeader>

        {data &&
          data.products &&
          data.products.map((product) => {
            return (
              <CardBody className="border m-2 p-2" key={product.id}>
                <CardTitle>{product.product_name}</CardTitle>
                <Row>
                  <Col md="8">
                    <RangeListView
                      assosLabel="Bono"
                      values={mapBonusValues(product.bonuses)}
                    />
                  </Col>
                  <Col md="4" className="d-flex flex-column border">
                    <CardTitle className="text-center pt-2">
                      Bono: Q {product.current_product_bonus}
                    </CardTitle>
                    <OverviewCircle
                      data={{ completed: product.next_bonus_percentage.toFixed(2) }}
                      title="MORA"
                      text={`${product.total_requested} Q / ${product.next_bonus_max_range} Q`}
                      height="150"
                      fontSize="1.5rem"
                      smallTitle={true}
                      fixedHeight={false}
                      color={colors.primary.main}
                    />
                    <div className="mb-2 d-flex flex-column">
                      <span
                        className={
                          +product.current_product_bonus !==
                          +product.final_bonus
                            ? "text-danger"
                            : ""
                        }
                      >
                        {product.default_percentage.toFixed(2)}% MORA
                      </span>
                      <Progress
                        value={product.default_percentage}
                        className="mb-1"
                        color={
                          +product.current_product_bonus !==
                          +product.final_bonus
                            ? "danger"
                            : ""
                        }
                      />
                      <span>{`Penalización 50% bono por mora > 8%`}</span>
                      <span className="fs-3 fw-bold">
                        Q {product.final_bonus}
                      </span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            );
          })}
      </Card>
    </>
  );
};

export default KPI;
