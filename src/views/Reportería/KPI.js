import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Progress
} from "reactstrap";
import OverviewCircle from "../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import Chart from "react-apexcharts";
import RangeList from "../../@core/components/rangeList";
import RangeListView from "./RangeListView";

const KPI = () => {
  const { colors } = useContext(ThemeColors);

  const options = {
    chart: {
      id: "basic-bar"
    }
    // xaxis: {
    //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    // }
  };
  const series = [
    {
      name: "series-1",
      data: [
        {
          x: "Jan",
          y: 90,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Feb",
          y: 58,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Mar",
          y: 13,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Apr",
          y: 23,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "May",
          y: 43,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Jun",
          y: 88,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Jul",
          y: 23,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Aug",
          y: 63,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Sep",
          y: 43,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Oct",
          y: 63,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Nov",
          y: 63,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        },
        {
          x: "Dec",
          y: 43,
          goals: [
            {
              name: "Expected",
              value: 52,
              strokeColor: "#775DD0"
            }
          ]
        }
      ]
    }
  ];

  const values = [
    { minimum_range: 2, maximum_range: 4, bono: 10 },
    { minimum_range: 2, maximum_range: 4, bono: 10 },
    { minimum_range: 2, maximum_range: 4, bono: 10 },
    { minimum_range: 2, maximum_range: 4, bono: 10 },
    { minimum_range: 2, maximum_range: 4, bono: 10 }
  ];

  return (
    <>
      {" "}
      <Card className="px-2">
        <CardHeader>
          <CardTitle>KPI: John Doe</CardTitle>
        </CardHeader>

        <CardBody>
          <div className="d-flex gap-2 align-items-end ">
            <p>Meta</p>
            <div>
              <p>Diario</p>
              <p>20</p>
            </div>
            <div>
              <p>Mensual</p>
              <p>50,000</p>
            </div>
          </div>

          <Row>
            <Col md="8">
              <div className="pe-md-2 border rounded">
                <Chart options={options} series={series} type="bar" />
                <p className="text-center">
                  Gráfico diario: meta vs colocación real
                </p>
              </div>
            </Col>
            <Col md="4" className="border rounded">
              <OverviewCircle
                data={{ completed: 80, inProgress: 20 }}
                title="META"
                subTitle="(sin incluir avances)"
                text="6.000 Q / 50.000 Q"
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

        <CardBody>
          <Row>
            <Col md="8">
              <RangeListView assosLabel="Bono" values={values} />
            </Col>
            <Col md="4" className="d-flex flex-column border">
              <OverviewCircle
                data={{ completed: 80, inProgress: 20 }}
                title="MORA"
                text="24.000 Q / 200.000 Q"
                height="170"
                fontSize="2rem"
                smallTitle={true}
                fixedHeight={false}
                color={colors.primary.main}
              />
              <div className="mb-2 d-flex flex-column">
                <span>8% MORA</span>
                <Progress value="8" className="mb-1" />
                <span>{`Penalización 50% bono por mora > 10%`}</span>
                <span className="fs-3 fw-bold">Q 800</span>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default KPI;
