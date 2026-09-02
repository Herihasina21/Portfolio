export const CONTACT_EMAIL = "herihasinamichael@gmail.com";

export const CONTACT_PHONE = {
  display: "+261 34 32 650 80",
  href: "tel:+261343265080",
} as const;

export const CONTACT_LOCATION = {
  display: "Antananarivo, Madagascar",
  href: "#contact",
} as const;

export const SOCIAL_LINKS = {
  email: `mailto:${CONTACT_EMAIL}`,
  github: "https://github.com/Herihasina21",
  linkedin:
    "https://www.linkedin.com/in/herihasina-michael-rakotoarivony-1769732b5/",
  phone: CONTACT_PHONE.href,
} as const;
