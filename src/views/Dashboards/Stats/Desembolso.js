import React, { useEffect, useState, useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";

const Desembolso = () => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  const [completedResult, setCompletedResult] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/disbursement`);
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      setCompletedResult(
        +data.total > 0
          ? Math.round((+data.total_collected / +data.total) * 100)
          : 0
      );
    }
  }, [data]);

  return (
    <>
      <OverviewCircle
        data={{ completed: completedResult }}
        title="DESEMBOLSO"
        text={data ? `${data.total_disbursement} Q / ${data.total} Q` : null}
        height="150"
        fontSize="2rem"
        smallTitle={true}
        color={colors.danger.main}
      />
    </>
  );
};

export default Desembolso;
