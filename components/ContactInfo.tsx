"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ContactInfoProps {
  className?: string;
}

interface ContactItem {
  icon: typeof Mail | typeof Phone | typeof MapPin;
  labelKey: string;
  value: string;
  href: string;
}

export default function ContactInfo({ className = "" }: ContactInfoProps) {
  const { t } = useLanguage();

  const contactItems: ContactItem[] = [
    {
      icon: Mail,
      labelKey: "contact.email_label_info",
      value: "herihasinamichael@gmail.com",
      href: "mailto:herihasinamichael@gmail.com",
    },
    {
      icon: Phone,
      labelKey: "contact.phone_label",
      value: "+261 34 32 650 80",
      href: "tel:+261343265080",
    },
    {
      icon: MapPin,
      labelKey: "contact.location_label",
      value: "Antananarivo, Madagascar",
      href: "#",
    },
  ];

  const socialLinks = [
    { name: "LinkedIn", initial: "L" },
    { name: "GitHub", initial: "G" },
    { name: "Twitter", initial: "T" },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="fade-in-item">
        <p className="text-lg text-muted-foreground mb-8">
          {t("contact.info_description")}
        </p>
      </div>

      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <a
            key={index}
            href={item.href}
            className="fade-in-item flex items-start gap-4 group cursor-pointer"
          >
            <div className="p-3 bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t(item.labelKey)}
              </p>
              <p className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {item.value}
              </p>
            </div>
          </a>
        );
      })}

      <div className="fade-in-item pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          {t("contact.follow_me")}
        </p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href="#"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
              aria-label={social.name}
            >
              <span className="text-sm font-medium">{social.initial}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
