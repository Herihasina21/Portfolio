export type LanguageText = {
  en: string;
  fr: string;
};

export type ProjectScope = "academic" | "professional" | "personal" | "freelance";

export interface Project {
  id: string;
  title: LanguageText;
  description: LanguageText;
  overview?: LanguageText;
  challenges?: LanguageText;
  role?: LanguageText;
  problem?: LanguageText;
  solution?: LanguageText;
  features?: LanguageText[];
  categoryLabel?: LanguageText;
  projectScope: ProjectScope;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  github?: string;
}

export interface Experience {
  id: string;
  date: LanguageText;
  badge: LanguageText;
  title: LanguageText;
  company: LanguageText;
  description?: LanguageText;
  stack?: string[];
  type: "work" | "education";
}

export interface Service {
  id: string;
  title: LanguageText;
  description: LanguageText;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type Language = "en" | "fr";
