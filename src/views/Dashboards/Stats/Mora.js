import React, { useEffect, useState, useContext } from "react";
import OverviewCircle from "../../../@core/components/stats/OverviewCircle";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import api from "../../../@core/api/api";

const MoraStat = ({ height, fontSize, smallTitle = false }) => {
  const { colors } = useContext(ThemeColors);
  const [data, setData] = useState(null);
  const [completedResult, setCompletedResult] = useState(0);

  const formatter = new Intl.NumberFormat('en-US');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/default_amount`);
    setData(response.data.data);
  };

  useEffect(() => {
    if (data) {
      setCompletedResult(
        +data.totalAmount > 0
          ? formatter.format(Math.round((+data.totalDefault / +data.totalAmount) * 100))
          : 0
      );
    }
  }, [data]);

  return (
    <>
      <OverviewCircle
        data={{ completed: completedResult }}
        title="MORA"
        text={data ? `${formatter.format(Math.round(data.totalDefault))} Q / ${formatter.format(Math.round(data.totalAmount))} Q` : null}
        height={height}
        fontSize={fontSize}
        smallTitle={smallTitle}
        color={colors.primary.main}
      />
    </>
  );
};

export default MoraStat;
