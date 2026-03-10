import { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "1",
    title: { en: "E-Commerce Platform", fr: "Plateforme E-Commerce" },
    description: {
      en: "A modern full-stack e-commerce platform with real-time inventory management and secure payments.",
      fr: "Une plateforme e-commerce moderne full-stack avec gestion d’inventaire en temps réel et paiements sécurisés.",
    },
    image: "/projects/ecommerce.jpg",
    category: "Web Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "PostgreSQL",
    ],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "2",
    title: {
      en: "Task Management App",
      fr: "Application de Gestion des Tâches",
    },
    description: {
      en: "A collaborative task management application with real-time updates and team features.",
      fr: "Une application collaborative de gestion des tâches avec mises à jour en temps réel et fonctionnalités d’équipe.",
    },
    image: "/projects/taskapp.jpg",
    category: "Web Development",
    technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "3",
    title: { en: "Brand Design System", fr: "Système de Design de Marque" },
    description: {
      en: "A comprehensive design system and component library for enterprise applications.",
      fr: "Un système de design complet et une bibliothèque de composants pour applications d’entreprise.",
    },
    image: "/projects/design.jpg",
    category: "Design",
    technologies: ["Figma", "CSS", "React", "Storybook"],
    link: "https://example.com",
  },
  {
    id: "4",
    title: { en: "AI Chat Interface", fr: "Interface Chat IA" },
    description: {
      en: "An intelligent chatbot interface powered by GPT with natural language processing.",
      fr: "Une interface de chatbot intelligente propulsée par GPT avec traitement du langage naturel.",
    },
    image: "/projects/chat.jpg",
    category: "Web Development",
    technologies: ["Next.js", "OpenAI", "Socket.io", "MongoDB"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "5",
    title: { en: "Analytics Dashboard", fr: "Tableau de Bord Analytique" },
    description: {
      en: "A real-time analytics dashboard with interactive charts and data visualization.",
      fr: "Un tableau de bord analytique en temps réel avec graphiques interactifs et visualisation des données.",
    },
    image: "/projects/analytics.jpg",
    category: "Web Development",
    technologies: ["React", "D3.js", "Chart.js", "TypeScript"],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "6",
    title: { en: "Mobile App Design", fr: "Design d’Application Mobile" },
    description: {
      en: "UI/UX design for a modern fitness tracking mobile application.",
      fr: "Conception UI/UX pour une application mobile moderne de suivi fitness.",
    },
    image: "/projects/mobile.jpg",
    category: "Design",
    technologies: ["Figma", "Prototyping", "User Research"],
    link: "https://example.com",
  },
];

// Category options for filtering projects
export const projectCategories = [
  "All",
  "Web Development",
  "Desktop",
  "Mobile",
];
