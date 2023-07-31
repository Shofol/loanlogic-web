import React, { useEffect, useState, useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";

const MoraStat = ({ height, fontSize, smallTitle = false }) => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  const [completedResult, setCompletedResult] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/default_amount`);
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      setCompletedResult(data.total > 0 ? Math.round((76 / 7525) * 100) : 0);
    }
  }, [data]);

  return (
    <>
      <OverviewCircle
        data={{ completed: completedResult }}
        title="MORA"
        text={data ? `${data.totalDefault} Q / ${data.totalAmount} Q` : null}
        height={height}
        fontSize={fontSize}
        smallTitle={smallTitle}
        color={colors.primary.main}
      />
    </>
  );
};

export default MoraStat;
