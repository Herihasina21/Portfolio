import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: {
      en: "PortfolioMLay",
      fr: "PortfolioMLay",
    },
    description: {
      en: "An interactive and captivating personal portfolio to showcase my web development projects, built with modern animations and smooth transitions.",
      fr: "Un portfolio personnel interactif et captivant pour présenter mes réalisations en développement web, avec des animations modernes et des transitions fluides.",
    },
    image: "/assets/portfolio.png",
    category: "Web Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "2",
    title: {
      en: "Heat Map Events",
      fr: "Événement de carte de chaleur",
    },
    description: {
      en: "A mobile geolocation and mapping application displaying a heat map of city events, showing activity zones based on real-time Firebase and WebSocket data.",
      fr: "Application mobile de géolocalisation et cartographie pour voir une carte de chaleur des événements en ville, affichant les zones d'activités selon les données Firebase et WebSocket.",
    },
    image: "/assets/heatmap.png",
    category: "Mobile",
    technologies: ["React Native", "TypeScript", "Firebase", "WebSocket"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "3",
    title: {
      en: "Izy M'Lay Entreprise – Salary Management",
      fr: "Izy M'Lay Entreprise – Gestion des salaires",
    },
    description: {
      en: "A web application for managing employee salaries, including employee management, bonuses and deductions, payslip generation and email dispatch, and a dashboard for statistics tracking.",
      fr: "Une application web de gestion des salaires des employés, intégrant la gestion des employés, des salaires, des bonus et déductions, la génération et l'envoi des bulletins de paie par email, ainsi qu'un tableau de bord pour le suivi des statistiques.",
    },
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
    github: "https://github.com",
  },
  {
    id: "4",
    title: {
      en: "UX/UI Optimization – Sehatra.com",
      fr: "Optimisation UX/UI – Sehatra.com",
    },
    description: {
      en: "Internship project involving frontend and backend development to improve customer journey and user experience on Sehatra.com, making navigation more intuitive and the overall interface more engaging.",
      fr: "Stage impliquant le développement frontend et backend pour améliorer le parcours client et l'expérience utilisateur sur Sehatra.com, en rendant la navigation intuitive et l'interface globale plus engageante.",
    },
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
      en: "A web application for managing employee leave requests, with a manager-controlled approval or rejection process.",
      fr: "Une application web de gestion des congés, offrant aux employés la possibilité de soumettre des demandes de congé, avec un processus d'approbation ou de refus géré par le responsable.",
    },
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
    github: "https://github.com",
  },
  {
    id: "6",
    title: {
      en: "Izy M'Lay Pharmacie",
      fr: "Izy M'Lay Pharmacie",
    },
    description: {
      en: "A desktop application for pharmacy management with medicine management, PDF invoice generation, stock alerts, and sales analytics including top-selling medicines and monthly revenue charts.",
      fr: "Une application desktop pour la gestion d'une pharmacie avec gestion des médicaments, génération de factures PDF, alertes de stock, et statistiques de vente avec les médicaments les plus vendus et les recettes mensuelles.",
    },
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
    github: "https://github.com",
  },
  {
    id: "7",
    title: {
      en: "Smart Track",
      fr: "Smart Track",
    },
    description: {
      en: "A mobile application for real-time vehicle tracking using modern Android technologies.",
      fr: "Application mobile pour le suivi en temps réel des véhicules, développée avec les technologies Android modernes.",
    },
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

// Category options for filtering projects
export const projectCategories = [
  "All",
  "Web Development",
  "Desktop",
  "Mobile",
];
