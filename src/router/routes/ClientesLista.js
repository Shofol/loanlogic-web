import { lazy } from "react";

const ClientesLista = lazy(() => import("../../views/ClientesLista"));

const ClientesListaRoutes = [
  {
    path: "/clientes",
    element: <ClientesLista />
  }
];

export default ClientesListaRoutes;
