import { lazy } from "react";

const ConfigForm = lazy(() => import("../../views/Productos/ConfigForm"));
const GoalConfiguration = lazy(() =>
  import("../../views/Productos/GoalConfiguration")
);
const ProductosLista = lazy(() =>
  import("../../views/Productos/ProductosLista")
);

const ProductosRoutes = [
  {
    path: "/productos/config",
    element: <ConfigForm />
  },
  {
    path: "/productos/config/:id",
    element: <ConfigForm />
  },
  {
    path: "/productos/goal-config",
    element: <GoalConfiguration />
  },
  {
    path: "/productos/lista",
    element: <ProductosLista />
  }
];

export default ProductosRoutes;
