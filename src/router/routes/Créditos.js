import { lazy } from "react";

const ValidationForm = lazy(() =>
  import("../../views/Créditos/ValidationForm")
);

const Garantía = lazy(() => import("../../views/Créditos/Garantía"));

const VisualizarSolicitud = lazy(() =>
  import("../../views/Créditos/VisualizarSolicitud")
);

const CréditosRoutes = [
  {
    path: "/créditos/validation/:id",
    element: <ValidationForm />
  },
  {
    path: "/créditos/garantía",
    element: <Garantía />
  },
  {
    path: "/créditos/visualizar-solicitud",
    element: <VisualizarSolicitud />
  }
];

export default CréditosRoutes;
