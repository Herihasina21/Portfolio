export type LanguageText = {
  en: string;
  fr: string;
};

export interface Project {
  id: string;
  title: LanguageText;
  description: LanguageText;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  github?: string;
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
  message: string;
}

export type Language = "en" | "fr";
