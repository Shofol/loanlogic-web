import { lazy } from "react";

const ValidationForm = lazy(() =>
  import("../../views/Créditos/ValidationForm")
);

const Garantía = lazy(() => import("../../views/Créditos/Garantía"));

const VisualizarSolicitud = lazy(() =>
  import("../../views/Créditos/VisualizarSolicitud")
);

const SolicitudCrédito = lazy(() =>
  import("../../views/Créditos/SolicitudCrédito")
);

const CréditosRoutes = [
  {
    path: "/créditos/validation/:id",
    element: <ValidationForm />
  },
  {
    path: "/créditos/garantía/:id",
    element: <Garantía />
  },
  {
    path: "/créditos/visualizar-solicitud/:id",
    element: <VisualizarSolicitud />
  },
  {
    path: "/créditos/solicitud-crédito",
    element: <SolicitudCrédito />
  }
];

export default CréditosRoutes;
