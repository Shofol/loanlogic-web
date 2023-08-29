import React, { useEffect, useState, useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";

const Recuperación = ({ height, fontSize, smallTitle = false }) => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  const [completedResult, setCompletedResult] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/debt_collections`);
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
        title="RECUPERACIÓN"
        subTitle="(sin incluir avances)"
        text={data ? `${Math.round(data.total_collected)} Q / ${Math.round(data.total)} Q` : null}
        height={height}
        fontSize={fontSize}
        smallTitle={smallTitle}
        color={colors.warning.main}
      />
    </>
  );
};

export default Recuperación;
