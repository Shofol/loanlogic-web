import { lazy } from "react";

const Nit = lazy(() => import("../../views/NIT"));

const NitRoutes = [
  {
    path: "/nit/:id",
    element: <Nit />
  }
];

export default NitRoutes;
