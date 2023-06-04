import {
  Mail,
  Home,
  FileText,
  Layers,
  CreditCard,
  Users,
  File,
  Package,
  PieChart,
  User,
  Clipboard,
  Shield
} from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/home"
  },

  {
    id: "solicitudes",
    title: "Solicitudes",
    icon: <FileText size={20} />,
    navLink: "/solicitudes"
  },

  {
    id: "cobranza",
    title: "Cobranza",
    icon: <Layers size={20} />,
    navLink: "/cobranza"
  },

  {
    id: "desembolso",
    title: "Desembolso",
    icon: <CreditCard size={20} />,
    navLink: "/desembolso"
  },

  {
    id: "clientes",
    title: "Clientes",
    icon: <Users size={20} />,
    navLink: "/clientes"
  },

  {
    id: "reportería",
    title: "Reportería",
    icon: <File size={20} />,
    navLink: "/reportería"
  },
  {
    id: "productos",
    title: "Productos",
    icon: <Package size={20} />,
    navLink: "/productos",
    children: [
      {
        id: "productConfig",
        title: "Configuration",
        icon: <Clipboard size={20} />,
        navLink: "/productos/config"
      }
    ]
  },
  {
    id: "créditos",
    title: "Créditos",
    icon: <PieChart size={20} />,
    navLink: "/créditos",
    children: [
      {
        id: "validation",
        title: "Validation",
        icon: <Shield size={20} />,
        navLink: "/créditos/validation"
      }
    ]
  },

  {
    id: "usuarios",
    title: "Usuarios",
    icon: <User size={20} />,
    navLink: "/usuarios"
  }
];
