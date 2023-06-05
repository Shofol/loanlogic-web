import { lazy } from "react";

const CarteraPorAsesor = lazy(() =>
  import("../../views/Reportería/CarteraPorAsesor")
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
  }
];

export default ReporteríaRoutes;
