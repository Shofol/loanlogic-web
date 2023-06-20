import { lazy } from "react";

const ClientesLista = lazy(() => import("../../views/Cliente/ClientesLista"));
const ClientesPerfil = lazy(() => import("../../views/Cliente/ClientesPerfil"));

const ClientesListaRoutes = [
  {
    path: "/clientes",
    element: <ClientesLista />
  },
  {
    path: "/clientes/:id",
    element: <ClientesPerfil />
  }
];

export default ClientesListaRoutes;
