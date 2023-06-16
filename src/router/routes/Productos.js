import { lazy } from "react";

const ConfigForm = lazy(() => import("../../views/Productos/ConfigForm"));

const ProductosRoutes = [
  {
    path: "/productos/config",
    element: <ConfigForm />
  }
];

export default ProductosRoutes;
