import { lazy } from "react";

const ValidationForm = lazy(() =>
  import("../../views/Créditos/ValidationForm")
);

const Garantía = lazy(() => import("../../views/Créditos/Garantía"));

const CréditosRoutes = [
  {
    path: "/créditos/validation/:id",
    element: <ValidationForm />,
  },
  {
    path: "/créditos/garantía",
    element: <Garantía />,
  },
];

export default CréditosRoutes;
