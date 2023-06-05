import { lazy } from "react";

const Cobranza = lazy(() => import("../../views/Cobranza"));

const CobranzaRoutes = [
  {
    path: "/cobranza",
    element: <Cobranza />
  }
];

export default CobranzaRoutes;
