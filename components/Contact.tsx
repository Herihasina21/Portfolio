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
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card/30 section-bg-patch"
    >
      <div className="max-w-7xl mx-auto">
        <div className="contact-header">
          <SectionHeader
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ContactInfo className="contact-left" />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
