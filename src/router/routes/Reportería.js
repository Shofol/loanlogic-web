import { lazy } from "react";

const CarteraPorAsesor = lazy(() =>
  import("../../views/Reportería/CarteraPorAsesor")
);

const ReporteríaRoutes = [
  {
    path: "/reportería/cartera-asesor",
    element: <CarteraPorAsesor />
  }
];

export default ReporteríaRoutes;
