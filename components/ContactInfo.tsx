"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Circle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_LOCATION,
} from "@/constants/social";

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className = "" }: ContactInfoProps) {
  var { t } = useLanguage();

  var contactItems = [
    {
      icon: Mail,
      labelKey: "contact.email_label_info",
      value: CONTACT_EMAIL,
      href: SOCIAL_LINKS.email,
    },
    {
      icon: Phone,
      labelKey: "contact.phone_label",
      value: CONTACT_PHONE.display,
      href: SOCIAL_LINKS.phone,
    },
    {
      icon: MapPin,
      labelKey: "contact.location_label",
      value: CONTACT_LOCATION.display,
      href: CONTACT_LOCATION.href,
    },
  ];

  var socialLinks = [
    { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: Linkedin },
    { name: "GitHub", href: SOCIAL_LINKS.github, icon: Github },
    { name: "Email", href: SOCIAL_LINKS.email, icon: Mail },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {contactItems.map(function (item, index) {
        var Icon = item.icon;
        return (
          <a
            key={index}
            href={item.href}
            className="contact-card fade-in-item portfolio-card portfolio-card-hover flex items-start gap-4 p-5 group"
          >
            <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {t(item.labelKey)}
              </p>
              <p className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                {item.value}
              </p>
            </div>
          </a>
        );
      })}

      <div className="contact-card fade-in-item portfolio-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500" />
          <p className="text-sm font-semibold text-foreground">
            {t("contact.available")}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("contact.available_desc")}
        </p>
      </div>

      <div className="fade-in-item pt-2">
        <p className="text-sm text-muted-foreground mb-3">{t("contact.follow_me")}</p>
        <div className="flex gap-3">
          {socialLinks.map(function (social) {
            var Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-card border border-border/60 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                aria-label={social.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
