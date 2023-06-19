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

const DashboardRoutes = [
  {
    path: "/dashboard/gestorComercial",
    element: <GestorComercial />,
  },
  {
    path: "/dashboard/gestorDeCobros",
    element: <GestorDeCobros />,
  },
  {
    path: "/dashboard/supervisorOficina",
    element: <SupervisorOficina />,
  },
  {
    path: "/dashboard/asistenteAdministrativo",
    element: <AsistenteAdministrativo />,
  },
];

export default DashboardRoutes;
