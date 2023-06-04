import { lazy } from "react";

const GestorComercial = lazy(() =>
  import("../../views/Dashboards/GestorComercial")
);

const GestorDeCobros = lazy(() =>
  import("../../views/Dashboards/GestorDeCobros")
);

const SupervisorOficina = lazy(() =>
  import("../../views/Dashboards/SupervisorOficina")
);

const DashboardRoutes = [
  {
    path: "/dashboard/gestorComercial",
    element: <GestorComercial />
  },
  {
    path: "/dashboard/gestorDeCobros",
    element: <GestorDeCobros />
  },
  {
    path: "/dashboard/supervisorOficina",
    element: <SupervisorOficina />
  }
];

export default DashboardRoutes;
