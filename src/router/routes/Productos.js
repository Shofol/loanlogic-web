import { lazy } from "react";

const ConfigForm = lazy(() => import("../../views/Productos/ConfigForm"));

const DashboardRoutes = [
  {
    path: "/productos/config",
    element: <ConfigForm />
  }
];

export default DashboardRoutes;
