import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import navigation from "@src/navigation/vertical";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
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
        .children.filter((child) => child.role === user.role)[0].navLink;
      navigate(dashboardRoute);
    }
  }, [user]);
  return null;
};

export default Home;
