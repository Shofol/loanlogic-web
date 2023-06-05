import { lazy } from "react";

const Desembolso = lazy(() => import("../../views/Desembolso"));

const DesembolsoRoutes = [
  {
    path: "/desembolso",
    element: <Desembolso />
  }
];

export default DesembolsoRoutes;
