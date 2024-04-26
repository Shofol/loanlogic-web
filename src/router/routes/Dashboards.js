import { lazy } from "react";

const Promotor = lazy(() =>
  import("../../views/Dashboards/Promotor")
);

const GestorDeCobros = lazy(() =>
  import("../../views/Dashboards/GestorDeCobros")
);

const SupervisorSucursal = lazy(() =>
  import("../../views/Dashboards/SupervisorSucursal")
);

const AuxiliarComercial = lazy(() =>
  import("../../views/Dashboards/AuxiliarComercial")
);

const JefeComercial = lazy(() =>
  import("../../views/Dashboards/JefeComercial")
);

const SupervisorCobros = lazy(() =>
  import("../../views/Dashboards/SupervisorCobros")
);
const AuxiliarOperativo = lazy(() =>
  import("../../views/Dashboards/AuxiliarOperativo")
);
const GerenteComercial = lazy(() =>
  import("../../views/Dashboards/GerenteComercial")
);
const GerenteFinanciero = lazy(() =>
  import("../../views/Dashboards/GerenteFinanciero")
);
const JefeSoporte = lazy(() =>
  import("../../views/Dashboards/JefeSoporte")
);

const Administrador = lazy(() =>
  import("../../views/Dashboards/Administrador")
);

const DashboardRoutes = [
  {
    path: "/dashboard/promotor",
    element: <Promotor />
  },
  {
    path: "/dashboard/gestorDeCobros",
    element: <GestorDeCobros />
  },
  {
    path: "/dashboard/supervisorSucursal",
    element: <SupervisorSucursal />
  },
  {
    path: "/dashboard/auxiliarComercial",
    element: <AuxiliarComercial />
  },
  {
    path: "/dashboard/supervisorRegional",
    element: <JefeComercial />
  },
  {
    path: "/dashboard/supervisorCobros",
    element: <SupervisorCobros />
  },
  {
    path: "/dashboard/auxiliarOperativo",
    element: <AuxiliarOperativo />
  },
  {
    path: "/dashboard/gerenteComercial",
    element: <GerenteComercial />
  },
  {
    path: "/dashboard/gerenteFinanciero",
    element: <GerenteFinanciero />
  },
  {
    path: "/dashboard/jefeSoporte",
    element: <JefeSoporte />
  },
  {
    path: "/dashboard/administrador",
    element: <Administrador />
  }
];

export default DashboardRoutes;
