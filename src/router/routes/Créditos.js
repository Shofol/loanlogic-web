import { lazy } from "react";

const ValidationForm = lazy(() =>
  import("../../views/Créditos/ValidationForm")
);

const Garantía = lazy(() => import("../../views/Créditos/Garantía"));
const Solicitudes = lazy(() => import("../../views/Créditos/Solicitudes"));
const ClientesLista = lazy(() => import("../../views/Créditos/ClientesLista"));

const DashboardRoutes = [
  {
    path: "/créditos/validation",
    element: <ValidationForm />
  },
  {
    path: "/créditos/garantía",
    element: <Garantía />
  },
  {
    path: "/créditos/solicitudes",
    element: <Solicitudes />
  },
  {
    path: "/créditos/clientes",
    element: <ClientesLista />
  }
];

export default DashboardRoutes;
