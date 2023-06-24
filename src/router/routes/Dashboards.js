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

const AsistenteAdministrativo = lazy(() =>
  import("../../views/Dashboards/AsistenteAdministrativo")
);

const Administrador = lazy(() =>
  import("../../views/Dashboards/Administrador")
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
  },
  {
    path: "/dashboard/asistenteAdministrativo",
    element: <AsistenteAdministrativo />
  },
  {
    path: "/dashboard/administrador",
    element: <Administrador />
  }
];

export default DashboardRoutes;
