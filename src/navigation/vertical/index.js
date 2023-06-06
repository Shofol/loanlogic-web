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
  Shield,
  Circle
} from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/home",
    children: [
      {
        id: "gestorComercial",
        title: "Gestor comercial",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gestorComercial"
      },
      {
        id: "gestorDeCobros",
        title: "Gestor de Cobros",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gestorDeCobros"
      },
      {
        id: "supervisorOficina",
        title: "Supervisor Oficina",
        icon: <Circle size={20} />,
        navLink: "/dashboard/supervisorOficina"
      }
    ]
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
    // children: [
    //   {
    //     id: "debtCollection",
    //     title: "Debt Collection",
    //     icon: <Circle size={20} />,
    //     navLink: "/cobranza/debtCollection"
    //   }
    // ]
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
    navLink: "/reportería",
    children: [
      {
        id: "carteraPorAsesor",
        title: "Cartera por Asesor",
        icon: <Circle size={20} />,
        navLink: "/reportería/cartera-asesor"
      },
      {
        id: "amortization",
        title: "Amortization Table",
        icon: <Circle size={20} />,
        navLink: "/reportería/amortization"
      },
      {
        id: "carteraConsolidada",
        title: "Cartera Consolidada",
        icon: <Circle size={20} />,
        navLink: "/reportería/carteraConsolidada"
      }
    ]
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
        icon: <Circle size={20} />,
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
        icon: <Circle size={20} />,
        navLink: "/créditos/validation"
      },
      {
        id: "garantía",
        title: "Garantía",
        icon: <Circle size={20} />,
        navLink: "/créditos/garantía"
      },
      {
        id: "solicitudes",
        title: "Solicitudes",
        icon: <Circle size={20} />,
        navLink: "/créditos/solicitudes"
      },
      {
        id: "clientes",
        title: "Clientes",
        icon: <Circle size={20} />,
        navLink: "/créditos/clientes"
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
