import { lazy } from "react";

const ConfigForm = lazy(() => import("../../views/Productos/ConfigForm"));
const GoalConfiguration = lazy(() =>
  import("../../views/Productos/GoalConfiguration")
);

const ProductosRoutes = [
  {
    path: "/productos/config",
    element: <ConfigForm />
  },
  {
    path: "/productos/goal-config",
    element: <GoalConfiguration />
  }
];

export default ProductosRoutes;
