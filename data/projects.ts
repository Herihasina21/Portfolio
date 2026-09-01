import { Project, ProjectScope } from "@/types";

var PLACEHOLDER_HOSTS = ["example.com", "github.com"];

var SCOPE_LABELS: Record<ProjectScope, { en: string; fr: string }> = {
  academic: {
    en: "ACADEMIC PROJECT",
    fr: "PROJET ACADÉMIQUE",
  },
  professional: {
    en: "PROFESSIONAL PROJECT",
    fr: "PROJET PROFESSIONNEL",
  },
  personal: {
    en: "PERSONAL PROJECT",
    fr: "PROJET PERSONNEL",
  },
};

export function hasLiveProjectLink(link: string | undefined): boolean {
  if (!link) return false;

  try {
    var url = new URL(link);
    if (PLACEHOLDER_HOSTS.includes(url.hostname)) {
      return url.hostname === "github.com" && url.pathname.length > 1;
    }
    return true;
  } catch {
    return false;
  }
}

export const projects: Project[] = [
  {
    id: "2",
    title: {
      en: "Geolocation & Mapping",
      fr: "Géolocalisation et cartographie",
    },
    description: {
      en: "Solo mobile app developed at the National School of Computer Science for geolocation and heat-map visualization.",
      fr: "Développement en solo au sein de l'École Nationale d'Informatique d'une application mobile de géolocalisation et cartographie.",
    },
    projectScope: "academic",
    problem: {
      en: "Visualize and track positions on a map from a mobile device in real time.",
      fr: "Visualiser et suivre des positions sur une carte depuis un appareil mobile en temps réel.",
    },
    solution: {
      en: "A React Native app combining mapping, Firebase data storage, and WebSocket communication for live updates.",
      fr: "Une application React Native combinant cartographie, stockage Firebase et communication WebSocket pour des mises à jour en direct.",
    },
    features: [
      {
        en: "Real-time geolocation",
        fr: "Géolocalisation en temps réel",
      },
      {
        en: "Heat-map visualization",
        fr: "Affichage cartographique en carte de chaleur",
      },
      {
        en: "Firebase synchronization",
        fr: "Synchronisation via Firebase",
      },
      {
        en: "WebSocket live updates",
        fr: "Communication WebSocket",
      },
    ],
    image: "/assets/heatmap.png",
    category: "Mobile",
    technologies: ["React Native", "TypeScript", "Firebase", "WebSocket"],
    link: "https://example.com",
  },
  {
    id: "3",
    title: {
      en: "Izy M'Lay – Salary Management",
      fr: "Izy M'Lay – Gestion des salaires",
    },
    description: {
      en: "Web application for employee salary management, payslip generation, and statistics dashboard.",
      fr: "Application web de gestion des salaires, génération de bulletins de paie et tableau de bord statistiques.",
    },
    projectScope: "academic",
    problem: {
      en: "Automate payroll processing and give managers a clear view of salary data.",
      fr: "Automatiser la gestion des salaires et offrir aux responsables une vue claire des données de paie.",
    },
    solution: {
      en: "Full-stack app with Spring Boot API, React frontend, JWT auth, and PDF payslip generation.",
      fr: "Application full-stack avec API Spring Boot, frontend React, authentification JWT et génération de bulletins PDF.",
    },
    features: [
      {
        en: "Employee and salary management",
        fr: "Gestion des employés et des salaires",
      },
      {
        en: "Bonuses and deductions",
        fr: "Bonus et déductions",
      },
      {
        en: "PDF payslip generation",
        fr: "Génération de bulletins de paie PDF",
      },
      {
        en: "Statistics dashboard",
        fr: "Tableau de bord statistiques",
      },
    ],
    image: "/assets/salary.png",
    category: "Web Development",
    technologies: [
      "Java",
      "Spring Boot",
      "JWT",
      "Flying Saucer PDF",
      "React.js",
      "PostgreSQL",
    ],
    link: "https://example.com",
  },
  {
    id: "4",
    title: {
      en: "UX/UI Optimization – Sehatra.com",
      fr: "Optimisation UX/UI – Sehatra.com",
    },
    description: {
      en: "Internship project improving customer journey and user experience on Sehatra.com.",
      fr: "Stage visant à améliorer le parcours client et l'expérience utilisateur sur Sehatra.com.",
    },
    projectScope: "professional",
    problem: {
      en: "The existing site needed a more intuitive navigation and a more engaging interface.",
      fr: "Le site existant nécessitait une navigation plus intuitive et une interface plus engageante.",
    },
    solution: {
      en: "Frontend and backend improvements with Django, focusing on UX flows and interface consistency.",
      fr: "Améliorations frontend et backend avec Django, centrées sur les parcours UX et la cohérence de l'interface.",
    },
    features: [
      {
        en: "Customer journey optimization",
        fr: "Optimisation du parcours client",
      },
      {
        en: "Responsive interface redesign",
        fr: "Refonte responsive de l'interface",
      },
      {
        en: "Backend integration with Django",
        fr: "Intégration backend Django",
      },
    ],
    image: "/assets/sehatra.png",
    category: "Web Development",
    technologies: ["HTML/CSS", "JavaScript", "Python", "Django"],
    link: "https://sehatra.com",
  },
  {
    id: "5",
    title: {
      en: "Leave Management System",
      fr: "Gestion des congés",
    },
    description: {
      en: "Web app for employee leave requests with manager approval workflow.",
      fr: "Application web de gestion des demandes de congé avec workflow d'approbation par le responsable.",
    },
    projectScope: "academic",
    problem: {
      en: "Manual leave tracking was slow and error-prone for both employees and managers.",
      fr: "Le suivi manuel des congés était lent et source d'erreurs pour les employés et les responsables.",
    },
    solution: {
      en: "ASP.NET Core MVC application with role-based approval and SQL Server persistence.",
      fr: "Application ASP.NET Core MVC avec approbation par rôle et persistance SQL Server.",
    },
    features: [
      {
        en: "Leave request submission",
        fr: "Soumission des demandes de congé",
      },
      {
        en: "Manager approval workflow",
        fr: "Workflow d'approbation responsable",
      },
      {
        en: "RESTful API integration",
        fr: "Intégration API RESTful",
      },
    ],
    image: "/assets/conges.png",
    category: "Web Development",
    technologies: [
      "C#",
      "ASP.NET Core MVC",
      "Razor View",
      "RESTful APIs",
      "SQL Server",
    ],
    link: "https://example.com",
  },
  {
    id: "6",
    title: {
      en: "Izy M'Lay Pharmacy",
      fr: "Izy M'Lay Pharmacie",
    },
    description: {
      en: "Desktop pharmacy management with stock alerts, PDF invoices, and sales analytics.",
      fr: "Application desktop de gestion de pharmacie avec alertes de stock, factures PDF et statistiques de vente.",
    },
    projectScope: "academic",
    problem: {
      en: "Pharmacies needed a local tool to manage inventory, sales, and billing efficiently.",
      fr: "Les pharmacies avaient besoin d'un outil local pour gérer stocks, ventes et facturation efficacement.",
    },
    solution: {
      en: "Java desktop app with Hibernate, PDF generation, and charts for sales insights.",
      fr: "Application Java desktop avec Hibernate, génération PDF et graphiques pour le suivi des ventes.",
    },
    features: [
      {
        en: "Medicine inventory management",
        fr: "Gestion des médicaments",
      },
      {
        en: "PDF invoice generation",
        fr: "Génération de factures PDF",
      },
      {
        en: "Low-stock alerts",
        fr: "Alertes de stock",
      },
      {
        en: "Sales analytics charts",
        fr: "Graphiques de statistiques de vente",
      },
    ],
    image: "/assets/pharmacie.png",
    category: "Desktop",
    technologies: [
      "Java",
      "JDBC / Hibernate",
      "PDF Generation",
      "JavaFX / Swing",
      "Charts / Data Visualization",
    ],
    link: "https://example.com",
  },
  {
    id: "7",
    title: {
      en: "Smart Track",
      fr: "Smart Track",
    },
    description: {
      en: "Mobile app for real-time vehicle tracking with modern Android technologies.",
      fr: "Application mobile de suivi en temps réel des véhicules avec les technologies Android modernes.",
    },
    projectScope: "professional",
    problem: {
      en: "Fleet operators needed live visibility on vehicle positions and trip status.",
      fr: "Les gestionnaires de flotte avaient besoin d'une visibilité en direct sur les positions et le statut des trajets.",
    },
    solution: {
      en: "Android app built with Kotlin, Jetpack Compose, and GraphQL via Apollo Client.",
      fr: "Application Android en Kotlin et Jetpack Compose, avec GraphQL via Apollo Client.",
    },
    features: [
      {
        en: "Real-time vehicle tracking",
        fr: "Suivi des véhicules en temps réel",
      },
      {
        en: "Jetpack Compose UI",
        fr: "Interface Jetpack Compose",
      },
      {
        en: "GraphQL data layer",
        fr: "Couche de données GraphQL",
      },
    ],
    image: "/assets/smarttrack.png",
    category: "Mobile",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "GraphQL",
      "Apollo Client",
      "Gradle",
    ],
    link: "https://play.google.com/store/apps/details?id=com.tagip.smarttrack&hl=fr",
  },
];

export function getProjectCategoryLabel(
  project: Project,
  language: "en" | "fr",
): string {
  if (project.categoryLabel) {
    return project.categoryLabel[language];
  }

  return SCOPE_LABELS[project.projectScope][language];
}
