import { lazy } from "react";

const DebtCollection = lazy(() =>
  import("../../views/Cobranza/DebtCollection")
);

const CobranzaRoutes = [
  {
    path: "/cobranza/debtCollection",
    element: <DebtCollection />
  }
];

export default CobranzaRoutes;
