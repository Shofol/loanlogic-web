import { lazy } from "react";
import RankingAsesores from "../../views/Reporteria/RankingAsesores";

const CarteraPorAsesor = lazy(() =>
  import("../../views/Reporteria/CarteraPorAsesor")
);

const CarteraConsolidada = lazy(() =>
  import("../../views/Reporteria/CarteraConsolidada")
);

const Amortization = lazy(() => import("../../views/Reporteria/Amortization"));

const ResumenAsesor = lazy(() =>
  import("../../views/Reporteria/ResumenAsesor")
);

const Colocación = lazy(() => import("../../views/Reporteria/Colocación"));

const Mora = lazy(() => import("../../views/Reporteria/Mora"));
const CancelacionesAnticipadas = lazy(() =>
  import("../../views/Reporteria/CancelacionesAnticipadas")
);
const Papelerías = lazy(() => import("../../views/Reporteria/Papelerías"));
const Asistencias = lazy(() => import("../../views/Reporteria/Asistencias"));
const Cobro = lazy(() => import("../../views/Reporteria/Cobro"));
const ResumenAgencia = lazy(() =>
  import("../../views/Reporteria/ResumenAgencia")
);
const KPI = lazy(() => import("../../views/Reporteria/KPI"));
const TransaccionesMensuales = lazy(() =>
  import("../../views/Reporteria/TransaccionesMensuales")
);
const FormatoAsistencias = lazy(() =>
  import("../../views/Reporteria/FormatoAsistencias")
);

const ReporteriaRoutes = [
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
    path: "/reporteria/formatoAsistencias",
    element: <FormatoAsistencias />
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

export default ReporteriaRoutes;
