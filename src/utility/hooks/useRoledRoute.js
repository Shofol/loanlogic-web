import React, { useState, useEffect } from "react";
import navigation from "@src/navigation/vertical";

export const useRoledRoute = () => {
  const [user, setUser] = useState();
  const [roledRoute, setRoledRoute] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const newUser = JSON.parse(localStorage.getItem("user"));
    setUser(newUser);
  };

  useEffect(() => {
    if (user) {
      const dashboardRoute = navigation
        .filter((element) => element.id === "dashboard")[0]
        .children.filter((child) => child.role.includes(user.role))[0].navLink;

      setRoledRoute(dashboardRoute);
    }
  }, [user]);

  return roledRoute;
};
