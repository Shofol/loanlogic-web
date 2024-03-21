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
    title: "Panel",
    icon: <Home size={20} />,
    navLink: "/home",
    role: "AGENT, COLLECTION-MANAGER, SUPERVISOR','ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
    children: [
      {
        id: "promotor",
        title: "Promotor",
        icon: <Circle size={20} />,
        navLink: "/dashboard/promotor",
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
        id: "supervisorSucursal",
        title: "Supervisor Sucursal",
        icon: <Circle size={20} />,
        navLink: "/dashboard/supervisorSucursal",
        role: "SUPERVISOR"
      },
      {
        id: "auxiliarComercial",
        title: "Aux. Comercial",
        icon: <Circle size={20} />,
        navLink: "/dashboard/auxiliarComercial",
        role: "ASSISTANT"
      },
      {
        id: "jefeComercial",
        title: "Jefe Comercial",
        icon: <Circle size={20} />,
        navLink: "/dashboard/jefeComercial",
        role: "SALES-DIRECTOR"
      },   {
        id: "supervisorCobros",
        title: "Supervisor Cobros",
        icon: <Circle size={20} />,
        navLink: "/dashboard/supervisorCobros",
        role: "COLLECTION-DIRECTOR"
      },   {
        id: "auxiliarOperativo",
        title: "Aux. Operativo",
        icon: <Circle size={20} />,
        navLink: "/dashboard/auxiliarOperativo",
        role: "ACCOUNTING"
      },   {
        id: "gerenteComercial",
        title: "Gerente Comercial",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gerenteComercial",
        role: "COMERCIAL-EXECUTIVE"
      },   {
        id: "gerenteFinanciero",
        title: "Gerente Financiero",
        icon: <Circle size={20} />,
        navLink: "/dashboard/gerenteFinanciero",
        role: "FINANCE-EXECUTIVE"
      },   {
        id: "jefeSoporte",
        title: "Jefe de Soporte",
        icon: <Circle size={20} />,
        navLink: "/dashboard/jefeSoporte",
        role: "SUPPORT-EXECUTIVE"
      },
      {
        id: "Administrador",
        title: "Administrador",
        icon: <Circle size={20} />,
        navLink: "/dashboard/administrador",
        role: "ADMIN"
      }
    ]
  },

  {
    id: "solicitudes",
    title: "Solicitudes",
    icon: <FileText size={20} />,
    navLink: "/solicitudes",
    role: "AGENT, COLLECTION-MANAGER, SUPERVISOR','ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
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
    navLink: "/clientes",
    role: "AGENT, COLLECTION-MANAGER, SUPERVISOR','ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
  },

  {
    id: "reporteria",
    title: "Reportería",
    icon: <File size={20} />,
    navLink: "/reporteria",
    role: "AGENT, COLLECTION-MANAGER, SUPERVISOR','ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
    children: [
      {
        id: "carteraPorAsesor",
        title: "Cartera Promotor",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cartera-asesor",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "carteraConsolidada",
        title: "Cartera Consolidada",
        icon: <Circle size={20} />,
        navLink: "/reporteria/carteraConsolidada",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "resumenAsesor",
        title: "Resumen Promotor",
        icon: <Circle size={20} />,
        navLink: "/reporteria/resumenAsesor",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "resumenAgencia",
        title: "Resumen agencia",
        icon: <Circle size={20} />,
        navLink: "/reporteria/resumenAgencia",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
      },
      {
        id: "colocacion",
        title: "Colocación",
        icon: <Circle size={20} />,
        navLink: "/reporteria/colocacion",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "mora",
        title: "Mora",
        icon: <Circle size={20} />,
        navLink: "/reporteria/mora",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "cancelacionesAnticipadas",
        title: "Anticipos",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cancelaciones-anticipadas",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "papelerias",
        title: "Papelerías",
        icon: <Circle size={20} />,
        navLink: "/reporteria/papelerias",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "asistencias",
        title: "Asistencias",
        icon: <Circle size={20} />,
        navLink: "/reporteria/asistencias",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "formatoAsistencias",
        title: "Formato Asistencias",
        icon: <Circle size={20} />,
        navLink: "/reporteria/FormatoAsistencias",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      },
      {
        id: "cobro",
        title: "Cobro",
        icon: <Circle size={20} />,
        navLink: "/reporteria/cobro",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

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
        navLink: "reporteria/rankingAsesores",
        role: "AGENT, COLLECTION-MANAGER, SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
      },
      {
        id: "transaccionesMensuales",
        title: "Transacciones",
        icon: <Circle size={20} />,
        navLink: "reporteria/transaccionesMensuales",
        role: "SUPERVISOR, ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",

      }
    ]
  },
  {
    id: "productos",
    title: "Productos",
    icon: <Package size={20} />,
    navLink: "/productos",
    role: "ADMIN",
    children: [
      {
        id: "productConfig",
        title: "Configurar",
        icon: <Circle size={20} />,
        navLink: "/productos/config",
        role: "ADMIN",

      },
      {
        id: "goalConfig",
        title: "Configurar metas",
        icon: <Circle size={20} />,
        navLink: "/productos/goal-config",
        role: "SALES-DIRECTOR, ADMIN",
      },
      {
        id: "productList",
        title: "Lista productos",
        icon: <Circle size={20} />,
        navLink: "/productos/lista",
        role: "ADMIN",
      }
    ]
  },
  {
    id: "creditos",
    title: "Créditos",
    icon: <PieChart size={20} />,
    navLink: "/creditos",
    role: "AGENT, COLLECTION-MANAGER, SUPERVISOR','ASSISTANT, SALES-DIRECTOR, COLLECTION-DIRECTOR, ACCOUNTING, COMERCIAL-EXECUTIVE, FINANCE-EXECUTIVE, SUPPORT-EXECUTIVE, ADMIN",
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
    navLink: "/usuarios",
    role: "ADMIN"
  }
];
