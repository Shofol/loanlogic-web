import { lazy } from "react";

const GestorComercial = lazy(() =>
  import("../../views/Dashboards/GestorComercial")
);

const DashboardRoutes = [
  {
    path: "/dashboard/gestorComercial",
    element: <GestorComercial />
  }
];

export default DashboardRoutes;
