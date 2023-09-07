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
        id: "carteraConsolidada",
        title: "Cartera Consolidada",
        icon: <Circle size={20} />,
        navLink: "/reportería/carteraConsolidada"
      },
      {
        id: "resumenAsesor",
        title: "Resumen asesor",
        icon: <Circle size={20} />,
        navLink: "/reportería/resumenAsesor"
      },
      {
        id: "resumenAgencia",
        title: "Resumen agencia",
        icon: <Circle size={20} />,
        navLink: "/reportería/resumenAgencia"
      },
      {
        id: "colocación",
        title: "Colocación",
        icon: <Circle size={20} />,
        navLink: "/reportería/colocación"
      },
      {
        id: "mora",
        title: "Mora",
        icon: <Circle size={20} />,
        navLink: "/reportería/mora"
      },
      {
        id: "cancelacionesAnticipadas",
        title: "Cancelaciones",
        icon: <Circle size={20} />,
        navLink: "/reportería/cancelaciones-anticipadas"
      },
      {
        id: "papelerías",
        title: "Papelerías",
        icon: <Circle size={20} />,
        navLink: "/reportería/papelerías"
      },
      {
        id: "asistencias",
        title: "Asistencias",
        icon: <Circle size={20} />,
        navLink: "/reportería/asistencias"
      },
      {
        id: "cobro",
        title: "Cobro",
        icon: <Circle size={20} />,
        navLink: "/reportería/cobro"
      },
      {
        id: "kpiVisualization",
        title: "KPI visualization",
        icon: <Circle size={20} />,
        navLink: "/reportería/kpi"
      },
      {
        id: "rankingAsesores",
        title: "Ranking Asesores",
        icon: <Circle size={20} />,
        navLink: "reportería/rankingAsesores"
      },
      {
        id: "transaccionesMensuales",
        title: "Transacciones",
        icon: <Circle size={20} />,
        navLink: "reportería/transaccionesMensuales"
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
    id: "créditos",
    title: "Créditos",
    icon: <PieChart size={20} />,
    navLink: "/créditos",
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
        id: "solicitud-crédito",
        title: "Solicitud Crédito",
        icon: <Circle size={20} />,
        navLink: "/créditos/solicitud-crédito"
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
