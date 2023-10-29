import React, { useEffect, useState, useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";

const Colocacion = ({ height, fontSize, smallTitle = false }) => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  const [completedResult, setCompletedResult] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/colocacion`);
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      setCompletedResult(
        +data.dailyGoal > 0
          ? Math.round((+data.totalRequestedAmount / +data.dailyGoal) * 100)
          : 0
      );
    }
  }, [data]);

  return (
    <>
      <OverviewCircle
        data={{ completed: completedResult }}
        title="Colocación"
        text={
          data ? `${Math.round(data.totalRequestedAmount)} Q / ${Math.round(data.dailyGoal)} Q` : null
        }
        height={height}
        fontSize={fontSize}
        smallTitle={smallTitle}
        color={colors.info.main}
      />
    </>
  );
};

export default Colocacion;
