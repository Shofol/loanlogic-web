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
const TransaccionesMensuales = lazy(() =>
  import("../../views/Reportería/TransaccionesMensuales")
);

const ReporteríaRoutes = [
  {
    path: "/reporteria/cartera-asesor",
    element: <CarteraPorAsesor />
  },
  {
    path: "/reporteria/amortization/:id",
    element: <Amortization />
  },
  {
    path: "/reporteria/carteraConsolidada",
    element: <CarteraConsolidada />
  },
  {
    path: "/reporteria/resumenAsesor",
    element: <ResumenAsesor />
  },
  {
    path: "/reporteria/resumenAgencia",
    element: <ResumenAgencia />
  },
  {
    path: "/reporteria/colocacion",
    element: <Colocación />
  },
  {
    path: "/reporteria/mora",
    element: <Mora />
  },
  {
    path: "/reporteria/cancelaciones-anticipadas",
    element: <CancelacionesAnticipadas />
  },
  {
    path: "/reporteria/papelerias",
    element: <Papelerías />
  },
  {
    path: "/reporteria/asistencias",
    element: <Asistencias />
  },
  {
    path: "/reporteria/cobro",
    element: <Cobro />
  },
  {
    path: "/reporteria/kpi",
    element: <KPI />
  },
  {
    path: "/reporteria/kpi/:id",
    element: <KPI />
  },
  {
    path: "/reporteria/transaccionesMensuales",
    element: <TransaccionesMensuales />
  },
  { path: "reporteria/rankingAsesores", element: <RankingAsesores /> }
];

export default ReporteríaRoutes;
