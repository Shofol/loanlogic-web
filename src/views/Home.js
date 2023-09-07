import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import navigation from "@src/navigation/vertical";
import { useRoledRoute } from "../utility/hooks/useRoledRoute";

const Home = () => {
  const navigate = useNavigate();
  const dashboardRoute = useRoledRoute();

  useEffect(() => {
    if (dashboardRoute) {
      navigate(dashboardRoute);
    }
  }, [dashboardRoute]);
  return null;
};

export default Home;
