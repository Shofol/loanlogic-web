import { lazy } from "react";
import RankingAsesores from "../../views/Reportería/RankingAsesores";

const CarteraPorAsesor = lazy(() =>
  import("../../views/Reportería/CarteraPorAsesor")
);

const CarteraConsolidada = lazy(() =>
  import("../../views/Reportería/CarteraConsolidada")
);

const Amortization = lazy(() => import("../../views/Reportería/Amortization"));

const ResumenAsesor = lazy(() =>
  import("../../views/Reportería/ResumenAsesor")
);

const Colocación = lazy(() => import("../../views/Reportería/Colocación"));

const Mora = lazy(() => import("../../views/Reportería/Mora"));
const CancelacionesAnticipadas = lazy(() =>
  import("../../views/Reportería/CancelacionesAnticipadas")
);
const Papelerías = lazy(() => import("../../views/Reportería/Papelerías"));
const Asistencias = lazy(() => import("../../views/Reportería/Asistencias"));
const Cobro = lazy(() => import("../../views/Reportería/Cobro"));
const ResumenAgencia = lazy(() =>
  import("../../views/Reportería/ResumenAgencia")
);
const KPI = lazy(() => import("../../views/Reportería/KPI"));

const ReporteríaRoutes = [
  {
    path: "/reportería/cartera-asesor",
    element: <CarteraPorAsesor />
  },
  {
    path: "/reportería/amortization/:id",
    element: <Amortization />
  },
  {
    path: "/reportería/carteraConsolidada",
    element: <CarteraConsolidada />
  },
  {
    path: "/reportería/resumenAsesor",
    element: <ResumenAsesor />
  },
  {
    path: "/reportería/resumenAgencia",
    element: <ResumenAgencia />
  },
  {
    path: "/reportería/colocación",
    element: <Colocación />
  },
  {
    path: "/reportería/mora",
    element: <Mora />
  },
  {
    path: "/reportería/cancelaciones-anticipadas",
    element: <CancelacionesAnticipadas />
  },
  {
    path: "/reportería/papelerías",
    element: <Papelerías />
  },
  {
    path: "/reportería/asistencias",
    element: <Asistencias />
  },
  {
    path: "/reportería/cobro",
    element: <Cobro />
  },
  {
    path: "/reportería/kpi",
    element: <KPI />
  },
  { path: "reportería/rankingAsesores", element: <RankingAsesores /> }
];

export default ReporteríaRoutes;
