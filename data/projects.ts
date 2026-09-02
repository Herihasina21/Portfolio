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
    id: "1",
    title: {
      en: "UX/UI Optimization - Sehatra.com",
      fr: "Optimisation UX/UI - Sehatra.com",
    },
    description: {
      en: "Professional internship focused on improving the customer journey and user experience on Sehatra.com.",
      fr: "Stage professionnel visant à améliorer le parcours client et l'expérience utilisateur sur Sehatra.com.",
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
    id: "2",
    title: {
      en: "Smart Track",
      fr: "Smart Track",
    },
    description: {
      en: "Professional internship at Tagip: migration of an existing React Native app to native Kotlin/Android for better performance and scalability.",
      fr: "Stage professionnel chez Tagip pour l'obtention de la licence professionnelle : migration d'une application React Native existante vers Kotlin natif pour améliorer les performances et la scalabilité.",
    },
    projectScope: "professional",
    problem: {
      en: "The existing React Native app needed better performance, smoother UX, and a more scalable native Android architecture.",
      fr: "L'application React Native existante nécessitait de meilleures performances, une UX plus fluide et une architecture Android native plus scalable.",
    },
    solution: {
      en: "Rebuilt the mobile app in Kotlin with Jetpack Compose and GraphQL (Apollo Client), replacing the React Native codebase.",
      fr: "Reconstruction de l'application mobile en Kotlin avec Jetpack Compose et GraphQL (Apollo Client), en remplacement du code React Native.",
    },
    features: [
      {
        en: "Migration from React Native to Kotlin",
        fr: "Migration de React Native vers Kotlin",
      },
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
    image: "/assets/smartTrack.png",
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
  {
    id: "3",
    title: {
      en: "Izy M'Lay – Salary Management",
      fr: "Izy M'Lay – Gestion des salaires",
    },
    description: {
      en: "Solo academic project: web application for employee salary management, payslip generation, and statistics dashboard.",
      fr: "Projet académique en solo : application web de gestion des salaires, génération de bulletins de paie et tableau de bord statistiques.",
    },
    projectScope: "academic",
    problem: {
      en: "Automate payroll processing and give managers a clear view of salary data in a company.",
      fr: "Automatiser la gestion des salaires et offrir aux responsables une vue claire des données de paie.",
    },
    solution: {
      en: "Full-stack app with Spring Boot API, React frontend, JWT auth, PDF payslip generation, and email delivery triggered by the admin.",
      fr: "Application full-stack avec API Spring Boot, frontend React, authentification JWT, génération de bulletins PDF et envoi par email déclenché par l'administrateur.",
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
        en: "Payslip delivery by email (sent by admin)",
        fr: "Envoi des bulletins de paie par email par l'administrateur",
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
      "Java Mail Sender",
      "React.js",
      "PostgreSQL",
    ],
    link: "https://example.com",
  },
  {
    id: "4",
    title: {
      en: "Geolocation & Heat Map Event",
      fr: "Géolocalisation et cartographie",
    },
    description: {
      en: "Solo academic project: real-time geolocation and heat-map visualization for a city event.",
      fr: "Projet académique en solo : application de géolocalisation et cartographie en temps réel pour un événement en ville.",
    },
    projectScope: "academic",
    problem: {
      en: "Visualize and track participant activity on a map during a city event in real time.",
      fr: "Visualiser et suivre l'activité des participants sur une carte lors d'un événement en ville, en temps réel.",
    },
    solution: {
      en: "A React Native app combining mapping, Firebase data storage, and WebSocket communication for live heat-map updates.",
      fr: "Une application React Native combinant cartographie, stockage Firebase et communication WebSocket pour des mises à jour en direct sur carte de chaleur.",
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
    id: "5",
    title: {
      en: "Izy M'Lay Stratégie",
      fr: "Izy M'Lay Stratégie",
    },
    description: {
      en: "Web platform for virtual sports and casino strategies, with memberships, paid subscriptions, and admin-managed access.",
      fr: "Plateforme web de sport virtuel et casino : stratégies, abonnements payants et gestion des accès par l'administrateur.",
    },
    projectScope: "personal",
    problem: {
      en: "Users needed a centralized platform to access strategies, subscribe to leagues or casino content, and manage their accounts securely.",
      fr: "Les utilisateurs avaient besoin d'une plateforme centralisée pour accéder aux stratégies, s'abonner aux ligues ou au casino et gérer leurs comptes en toute sécurité.",
    },
    solution: {
      en: "A web app with authentication, admin account approval, subscription plans, and integration with Facebook for tutorials and support.",
      fr: "Application web avec authentification, validation des comptes par l'administrateur, formules d'abonnement et intégration Facebook pour tutoriels et support.",
    },
    features: [
      {
        en: "Login and registration with admin approval",
        fr: "Connexion et inscription avec validation admin",
      },
      {
        en: "Paid subscriptions (Leagues & Casino)",
        fr: "Abonnements payants (Ligues et Casino)",
      },
      {
        en: "Aviator and CosmoX strategy access",
        fr: "Accès aux stratégies Aviator et CosmoX",
      },
      {
        en: "Facebook community integration",
        fr: "Intégration de la communauté Facebook",
      },
    ],
    image: "/assets/ims.png",
    category: "Web Development",
    technologies: ["React.js", "TypeScript", "Authentication", "Subscription Management"],
    link: "https://virtual-2min-detect.vercel.app/login",
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
