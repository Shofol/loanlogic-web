import { lazy } from "react";

const Usuarios = lazy(() => import("../../views/Usuarios"));

const UsuariosRoutes = [
  {
    path: "/usuarios",
    element: <Usuarios />
  }
];

export default UsuariosRoutes;
