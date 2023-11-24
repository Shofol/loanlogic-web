import { lazy } from "react";

const ClientesLista = lazy(() => import("../../views/Cliente/ClientesLista"));
const ClientesPerfil = lazy(() => import("../../views/Cliente/ClientesPerfil"));
const ClientesActualizacion = lazy(() => import("../../views/Cliente/ClientesActualizacion"));

const ClientesListaRoutes = [
  {
    path: "/clientes",
    element: <ClientesLista />
  },
  {
    path: "/clientes/edit/:id",
    element: <ClientesActualizacion />
  },
  {
    path: "/clientes/:id",
    element: <ClientesPerfil />
  }
];

export default ClientesListaRoutes;
