"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { shouldAnimateOnScroll } from "@/utils/motion";
import {
  revealSectionHeader,
  revealSplitColumns,
} from "@/utils/gsapAnimations";

export default function Contact() {
  var sectionRef = useRef<HTMLDivElement>(null);
  var { t } = useLanguage();

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return;

    var ctx = gsap.context(function () {
      revealSectionHeader(sectionRef.current as Element, ".contact-header");
      revealSplitColumns(
        sectionRef.current as Element,
        ".contact-left",
        ".contact-form-panel",
      );
    }, sectionRef);

    return function () {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="snap-section relative py-16 sm:py-20 lg:py-24 section-blur-surface section-blur-contact"
    >
      <div className="section-shell max-w-7xl">
        <div className="contact-header">
          <SectionHeader
            titleMain={t("contact.title_main")}
            titleAccent={t("contact.title_accent")}
            subtitle={t("contact.subtitle")}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <ContactInfo className="contact-left" />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
