import { lazy } from "react";

const AsignarAgente= lazy(() => import("../../views/AsignarAgente"));

const AsignarAgenteRoutes = [
  {
    path: "/asignar-agente/:id",
    element: <AsignarAgente/>
  }
];

export default AsignarAgenteRoutes;
