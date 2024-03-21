import { lazy } from "react";

const CuotaAdelantada = lazy(() => import("../../views/CuotaAdelantada"));

const CuotaAdelantadaRoutes = [
  {
    path: "/cuota-adelantada/:id",
    element: <CuotaAdelantada />
  }
];

export default CuotaAdelantadaRoutes;
