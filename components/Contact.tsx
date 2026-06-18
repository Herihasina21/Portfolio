"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll(".fade-in-item");
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Séparer le titre pour avoir "Get In" en couleur normale et "Touch" en accent
  const titleParts = t("contact.title").split(" ");
  const firstWords = titleParts.slice(0, -1).join(" ");
  const lastWord = titleParts[titleParts.length - 1];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            {firstWords} <span className="text-accent">{lastWord}</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
