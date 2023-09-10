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
    path: "/creditos/validation/:id",
    element: <ValidationForm />
  },
  {
    path: "/creditos/garantia/:id",
    element: <Garantía />
  },
  {
    path: "/creditos/visualizar-solicitud/:id",
    element: <VisualizarSolicitud />
  },
  {
    path: "/creditos/solicitud-credito",
    element: <SolicitudCrédito />
  }
];

export default CréditosRoutes;
