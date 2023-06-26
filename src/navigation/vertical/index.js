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
      },
      {
        id: "asistenteAdministrativo",
        title: "Asis. Administrativo",
        icon: <Circle size={20} />,
        navLink: "/dashboard/asistenteAdministrativo"
      },
      {
        id: "Administrador",
        title: "Administrador",
        icon: <Circle size={20} />,
        navLink: "/dashboard/administrador"
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
      },
      {
        id: "goalConfig",
        title: "Configurar metas",
        icon: <Circle size={20} />,
        navLink: "/productos/goal-config"
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
