"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { shouldAnimateOnScroll } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  var sectionRef = useRef<HTMLDivElement>(null);
  var { t } = useLanguage();

  useEffect(function () {
    if (!shouldAnimateOnScroll()) return;

    var ctx = gsap.context(function () {
      if (!sectionRef.current) return;

      var leftItems = sectionRef.current.querySelectorAll(".contact-card");
      gsap.fromTo(
        leftItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      var form = sectionRef.current.querySelector(".fade-in-item");
      if (form) {
        gsap.fromTo(
          form,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          },
        );
      }
    }, sectionRef);

    return function () {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
