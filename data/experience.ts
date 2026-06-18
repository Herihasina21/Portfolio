import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    date: { en: "2024 — Present", fr: "2024 — Présent" },
    badge: { en: "Master", fr: "Master" },
    title: {
      en: "Master in Computer Science — E.N.I Madagascar",
      fr: "Master en Informatique — E.N.I Madagascar",
    },
    company: {
      en: "National School of Computer Science",
      fr: "École Nationale de l'Informatique",
    },
    description: {
      en: "Advanced studies in software engineering, web and mobile development, and modern architecture patterns.",
      fr: "Études avancées en génie logiciel, développement web et mobile, et architectures modernes.",
    },
    stack: ["React", "Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
    type: "education",
  },
  {
    id: "2",
    date: { en: "2021 — 2024", fr: "2021 — 2024" },
    badge: { en: "Dev", fr: "Dev" },
    title: {
      en: "Fullstack Developer — Web & Mobile Projects",
      fr: "Développeur Fullstack — Projets Web & Mobile",
    },
    company: {
      en: "Freelance & Academic Projects",
      fr: "Freelance & Projets Académiques",
    },
    description: {
      en: "Built scalable web apps, mobile solutions, and desktop tools for real-world clients and academic requirements.",
      fr: "Conception d'applications web évolutives, solutions mobiles et outils desktop pour des clients et projets académiques.",
    },
    stack: [
      "React",
      "Next.js",
      "Kotlin",
      "Spring Boot",
      "Firebase",
      "Docker",
    ],
    type: "work",
  },
  {
    id: "3",
    date: { en: "2020 — 2023", fr: "2020 — 2023" },
    badge: { en: "Licence", fr: "Licence" },
    title: {
      en: "Bachelor's in Computer Science",
      fr: "Licence en Informatique",
    },
    company: {
      en: "Madagascar",
      fr: "Madagascar",
    },
    description: {
      en: "Foundation in algorithms, databases, software development, and system design.",
      fr: "Fondations en algorithmique, bases de données, développement logiciel et conception de systèmes.",
    },
    stack: ["Java", "Python", "C#", "SQL", "Git"],
    type: "education",
  },
];
