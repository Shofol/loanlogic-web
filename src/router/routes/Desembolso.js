import { lazy } from "react";

const Desembolso = lazy(() => import("../../views/Desembolso"));

const DesembolsoRoutes = [
  {
    path: "/desembolso/:id",
    element: <Desembolso />
  }
];

export default DesembolsoRoutes;
