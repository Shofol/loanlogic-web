import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label
} from "reactstrap";
import AsesoresForm from "../Reporteria/AsesoresForm";
import api from "../../@core/api/api";
import { Save } from "react-feather";
import { toast } from "react-hot-toast";
import { formatMessage } from "../../utility/functions/formatMessage";

const GoalConfiguration = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const response = await api.get("/goal");
    setData(response.data.data);
  };

  const submitData = async () => {
    try {
      const response = await api.post("/goal", data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Configurar metas</CardTitle>
      </CardHeader>
      <CardBody>
        <h4 className="ps-2">Promotores</h4>
        {data &&
          data
            .filter((item) => item.role === "AGENT")
            .map((agencyGoals, index) => {
              return (
                <AsesoresForm
                  key={index}
                  agency={agencyGoals}
                  handleChange={(value, goalIndex, type) => {
                    data.filter(
                      (item) =>
                        item.agency === agencyGoals.agency &&
                        item.role === agencyGoals.role
                    )[0].goals[goalIndex][type] = value;
                  }}
                />
              );
            })}

        <h4 className="py-2 ps-2">Agentes cobro</h4>
        {data &&
          data
            .filter((item) => item.role === "COLLECTION-MANAGER")
            .map((agencyGoals, index) => {
              return (
                <AsesoresForm
                  key={index}
                  agency={agencyGoals}
                  handleChange={(value, goalIndex, type) => {
                    data.filter(
                      (item) =>
                        item.agency === agencyGoals.agency &&
                        item.role === agencyGoals.role
                    )[0].goals[goalIndex][type] = value;
                  }}
                />
              );
            })}

        <div className="d-flex justify-content-end me-1">
          <Button.Ripple
            className="me-1"
            color="primary"
            type="submit"
            onClick={() => {
              submitData();
            }}
          >
            <Save size={16} />
            <span className="align-middle mx-25">Guardar</span>
          </Button.Ripple>
        </div>
      </CardBody>
    </Card>
  );
};

export default GoalConfiguration;
