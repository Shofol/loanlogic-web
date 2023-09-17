import { lazy } from "react";

const AsignarGestorCobranza = lazy(() => import("../../views/AsignarGestorCobranza"));

const AsignarGestorCobranzaRoutes = [
  {
    path: "/asignar-gestor-cobranza/:id",
    element: <AsignarGestorCobranza />
  }
];

export default AsignarGestorCobranzaRoutes;
