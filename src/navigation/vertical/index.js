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
        title: "Promotor",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gestorComercial",
        role: "AGENT"
      },
      {
        id: "gestorDeCobros",
        title: "Gestor de Cobros",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gestorDeCobros",
        role: "COLLECTION-MANAGER"
      },
      {
        id: "supervisorOficina",
        title: "Supervisor Oficina",
        icon: <Circle size={20} />,
        navLink: "/dashboard/supervisorOficina",
        role: "SUPERVISOR"
      },
      {
        id: "asistenteAdministrativo",
        title: "Asis. Administrativo",
        icon: <Circle size={20} />,
        navLink: "/dashboard/asistenteAdministrativo",
        role: "ASSISTANT"
      },
      {
        id: "Administrador",
        title: "Administrador",
        icon: <Circle size={20} />,
        navLink: "/dashboard/administrador",
        role: "SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, ADMIN"
      }
    ]
  },

  {
    id: "solicitudes",
    title: "Solicitudes",
    icon: <FileText size={20} />,
    navLink: "/solicitudes"
  },

  // {
  //   id: "desembolso",
  //   title: "Desembolso",
  //   icon: <CreditCard size={20} />,
  //   navLink: "/desembolso"
  // },

  {
    id: "clientes",
    title: "Clientes",
    icon: <Users size={20} />,
    navLink: "/clientes"
  },

  {
    id: "reporteria",
    title: "Reportería",
    icon: <File size={20} />,
    navLink: "/reporteria",
    children: [
      {
        id: "carteraPorAsesor",
        title: "Cartera Promotor",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cartera-asesor"
      },
      {
        id: "carteraConsolidada",
        title: "Cartera Consolidada",
        icon: <Circle size={20} />,
        navLink: "/reporteria/carteraConsolidada"
      },
      {
        id: "resumenAsesor",
        title: "Resumen Promotor",
        icon: <Circle size={20} />,
        navLink: "/reporteria/resumenAsesor"
      },
      {
        id: "resumenAgencia",
        title: "Resumen agencia",
        icon: <Circle size={20} />,
        navLink: "/reporteria/resumenAgencia"
      },
      {
        id: "colocacion",
        title: "Colocación",
        icon: <Circle size={20} />,
        navLink: "/reporteria/colocacion"
      },
      {
        id: "mora",
        title: "Mora",
        icon: <Circle size={20} />,
        navLink: "/reporteria/mora"
      },
      {
        id: "cancelacionesAnticipadas",
        title: "Cancelaciones",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cancelaciones-anticipadas"
      },
      {
        id: "papelerias",
        title: "Papelerías",
        icon: <Circle size={20} />,
        navLink: "/reporteria/papelerias"
      },
      {
        id: "asistencias",
        title: "Asistencias",
        icon: <Circle size={20} />,
        navLink: "/reporteria/asistencias"
      },
      {
        id: "cobro",
        title: "Cobro",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cobro"
      },
      {
        id: "kpiVisualization",
        title: "KPI visualization",
        icon: <Circle size={20} />,
        navLink: "/reporteria/kpi",
        role: "AGENT, COLLECTION-MANAGER"
      },
      {
        id: "rankingAsesores",
        title: "Ranking Promotores",
        icon: <Circle size={20} />,
        navLink: "reporteria/rankingAsesores"
      },
      {
        id: "transaccionesMensuales",
        title: "Transacciones",
        icon: <Circle size={20} />,
        navLink: "reporteria/transaccionesMensuales"
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
        title: "Configurar",
        icon: <Circle size={20} />,
        navLink: "/productos/config"
      },
      {
        id: "goalConfig",
        title: "Configurar metas",
        icon: <Circle size={20} />,
        navLink: "/productos/goal-config"
      },
      {
        id: "productList",
        title: "Lista productos",
        icon: <Circle size={20} />,
        navLink: "/productos/lista"
      }
    ]
  },
  {
    id: "creditos",
    title: "Créditos",
    icon: <PieChart size={20} />,
    navLink: "/creditos",
    children: [
      // {
      //   id: "validation",
      //   title: "Validation",
      //   icon: <Circle size={20} />,
      //   navLink: "/créditos/validation"
      // },
      // {
      //   id: "visualizar-solicitud",
      //   title: "Visualizar Solicitud",
      //   icon: <Circle size={20} />,
      //   navLink: "/créditos/visualizar-solicitud"
      // },
      // {
      //   id: "garantía",
      //   title: "Garantía",
      //   icon: <Circle size={20} />,
      //   navLink: "/créditos/garantía"
      // },
      {
        id: "solicitud-credito",
        title: "Solicitud Crédito",
        icon: <Circle size={20} />,
        navLink: "/creditos/solicitud-credito"
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
