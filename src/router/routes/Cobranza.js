import { lazy } from "react";

const Cobranza = lazy(() => import("../../views/Cobranza"));

const CobranzaRoutes = [
  {
    path: "/cobranza/:id",
    element: <Cobranza />
  }
];

export default CobranzaRoutes;
