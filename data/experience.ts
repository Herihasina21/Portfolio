import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    date: { en: "Jan 2026 — Present", fr: "Janv. 2026 — Présent" },
    badge: { en: "Master I", fr: "Master I" },
    title: {
      en: "Master's in Software Engineering & Databases",
      fr: "Master I en Génie Logiciel et Bases de Données",
    },
    company: {
      en: "National School of Computer Science (E.N.I) — Madagascar",
      fr: "École Nationale d'Informatique (E.N.I) — Madagascar",
    },
    type: "education",
  },
  {
    id: "2",
    date: { en: "Sept 2025 — Dec 2025", fr: "Sept. 2025 — Déc. 2025" },
    badge: { en: "L3 Internship", fr: "Stage L3" },
    title: {
      en: "Android Developer Intern — Smart Track",
      fr: "Stagiaire Développeur Android — Smart Track",
    },
    company: {
      en: "TAG-IP",
      fr: "TAG-IP",
    },
    description: {
      en: "Licence III internship: migrated a React Native vehicle tracking app to native Kotlin / Jetpack Compose.",
      fr: "Stage Licence III : migration d'une application React Native de géolocalisation de véhicules vers Kotlin / Jetpack Compose.",
    },
    stack: ["Kotlin", "Jetpack Compose", "GraphQL", "Apollo Client", "Gradle"],
    type: "work",
  },
  {
    id: "3",
    date: { en: "Aug 2024 — Nov 2024", fr: "Août 2024 — Nov. 2024" },
    badge: { en: "L2 Internship", fr: "Stage L2" },
    title: {
      en: "Fullstack Developer Intern — UX/UI Optimization",
      fr: "Stagiaire Développeur Fullstack — Optimisation UX/UI",
    },
    company: {
      en: "Sehatra.com",
      fr: "Sehatra.com",
    },
    description: {
      en: "Licence II internship: improved the customer journey and user experience with frontend and backend developments.",
      fr: "Stage Licence II : amélioration du parcours client et de l'expérience utilisateur, développements frontend et backend.",
    },
    stack: ["HTML/CSS", "JavaScript", "Python", "Django"],
    type: "work",
  },
  {
    id: "4",
    date: { en: "2022 — 2025", fr: "2022 — 2025" },
    badge: { en: "Licence", fr: "Licence" },
    title: {
      en: "Bachelor's in Software Engineering & Databases",
      fr: "Licence en Génie Logiciel et Bases de Données",
    },
    company: {
      en: "National School of Computer Science (E.N.I) — Madagascar",
      fr: "École Nationale d'Informatique (E.N.I) — Madagascar",
    },
    type: "education",
  },
];
