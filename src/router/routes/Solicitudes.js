import { lazy } from "react";

const Solicitudes = lazy(() => import("../../views/Solicitudes"));

const SolicitudesRoutes = [
  {
    path: "/solicitudes",
    element: <Solicitudes />
  }
];

export default SolicitudesRoutes;
