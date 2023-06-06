import { lazy } from "react";

const CarteraPorAsesor = lazy(() =>
  import("../../views/Reportería/CarteraPorAsesor")
);

const CarteraConsolidada = lazy(() =>
  import("../../views/Reportería/CarteraConsolidada")
);

const Amortization = lazy(() => import("../../views/Reportería/Amortization"));

const ReporteríaRoutes = [
  {
    path: "/reportería/cartera-asesor",
    element: <CarteraPorAsesor />
  },
  {
    path: "/reportería/amortization",
    element: <Amortization />
  },
  {
    path: "/reportería/carteraConsolidada",
    element: <CarteraConsolidada />
  }
];

export default ReporteríaRoutes;
