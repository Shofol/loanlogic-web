import { lazy } from "react";

const ValidationForm = lazy(() =>
  import("../../views/Créditos/ValidationForm")
);

const DashboardRoutes = [
  {
    path: "/créditos/validation",
    element: <ValidationForm />
  }
];

export default DashboardRoutes;
