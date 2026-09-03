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
  freelance: {
    en: "FREELANCE PROJECT",
    fr: "PROJET FREELANCE",
  },
};

var PLATFORM_LABELS = {
  web: {
    en: "WEB APPLICATION",
    fr: "APPLICATION WEB",
  },
  mobile: {
    en: "MOBILE APPLICATION",
    fr: "APPLICATION MOBILE",
  },
} as const;

function getProjectPlatform(category: string): keyof typeof PLATFORM_LABELS {
  return category.toLowerCase().includes("mobile") ? "mobile" : "web";
}

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
      en: "Web platform for virtual sports and casino strategies, with paid subscriptions, admin-managed access, and real-time round data via Cloudflare Workers and Supabase.",
      fr: "Plateforme web de stratégies sport virtuel et casino, avec abonnements payants, accès géré par l'administrateur, et récupération de données de rounds en temps réel via Cloudflare Workers et Supabase.",
    },
    projectScope: "personal",
    problem: {
      en: "Users needed a centralized platform to access strategies, manage subscriptions securely, and follow live virtual-sport rounds without exposing sensitive API traffic.",
      fr: "Les utilisateurs avaient besoin d'une plateforme centralisée pour accéder aux stratégies, gérer leurs abonnements en toute sécurité, et suivre les rounds de sport virtuel en live sans exposer le trafic API sensible.",
    },
    solution: {
      en: "A React and TypeScript web app with secure accounts, subscription access, and live round updates for virtual sports leagues, powered by Supabase and Cloudflare Workers.",
      fr: "Une application web React et TypeScript avec comptes sécurisés, accès par abonnement, et mises à jour en direct des rounds pour les ligues de sport virtuel, grâce à Supabase et Cloudflare Workers.",
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
        en: "Real-time round data via Cloudflare Worker",
        fr: "Données de rounds en temps réel via Cloudflare Worker",
      },
      {
        en: "Supabase auth, database and caching",
        fr: "Auth, base de données et cache avec Supabase",
      },
    ],
    image: "/assets/ims.png",
    category: "Web Development",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Cloudflare Workers",
    ],
    link: "https://virtual-2min-detect.vercel.app/login",
  },
  {
    id: "6",
    title: {
      en: "Lary Beauty Home",
      fr: "Lary Beauty Home",
    },
    description: {
      en: "Freelance landing website for a home beauty institute — services, booking flow, and contact. Currently in development.",
      fr: "Site vitrine freelance pour un institut de beauté à domicile : prestations, réservation et contact. Projet en cours de développement.",
    },
    projectScope: "freelance",
    problem: {
      en: "The institute needed an elegant online presence to showcase services and guide clients toward booking an appointment.",
      fr: "L'institut avait besoin d'une présence en ligne élégante pour présenter ses prestations et orienter les clientes vers la prise de rendez-vous.",
    },
    solution: {
      en: "A responsive Next.js website with a refined UI, dark mode, dedicated sections for services and booking, and clear call-to-action buttons.",
      fr: "Un site Next.js responsive avec une interface soignée, mode sombre, sections prestations et réservation, et boutons d'appel à l'action clairs.",
    },
    features: [
      {
        en: "Elegant responsive landing page",
        fr: "Page d'accueil responsive et élégante",
      },
      {
        en: "Services and booking sections",
        fr: "Sections prestations et réservation",
      },
      {
        en: "Light and dark theme",
        fr: "Thème clair et sombre",
      },
      {
        en: "Contact and appointment CTAs",
        fr: "Contact et prise de rendez-vous",
      },
    ],
    image: "/assets/larybeauty.png",
    category: "Web Development",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/rakoto-orgs/Lary-Beauty-Home",
  },
];

export function getProjectCategoryLabel(
  project: Project,
  language: "en" | "fr",
): string {
  if (project.categoryLabel) {
    return project.categoryLabel[language];
  }

  var scopeLabel = SCOPE_LABELS[project.projectScope][language];
  var platformLabel =
    PLATFORM_LABELS[getProjectPlatform(project.category)][language];

  return scopeLabel + " · " + platformLabel;
}
