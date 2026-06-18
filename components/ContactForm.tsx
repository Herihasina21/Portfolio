"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormData } from "@/types";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const { toast } = useToast();

  // Real-time field validation with translations
  const validateField = (name: string, value: string) => {
    const errors = { ...fieldErrors };

    if (name === "name") {
      if (!value.trim()) {
        errors.name = `${t("contact.name_label")} ${t("contact.field_required")}`;
      } else if (value.length < 2) {
        errors.name = t("contact.name_min_length");
      } else {
        delete errors.name;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        errors.email = `${t("contact.email_label")} ${t("contact.field_required")}`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = t("contact.email_invalid");
      } else {
        delete errors.email;
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        errors.message = `${t("contact.message_label")} ${t("contact.field_required")}`;
      } else if (value.length < 10) {
        errors.message = t("contact.message_min_length");
      } else {
        delete errors.message;
      }
    }

    setFieldErrors(errors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation with translated messages
      const errors: string[] = [];

      if (!formData.name.trim()) {
        errors.push(
          `${t("contact.name_label")} ${t("contact.field_required")}`,
        );
      } else if (formData.name.length < 2) {
        errors.push(t("contact.name_min_length"));
      }

      if (!formData.email.trim()) {
        errors.push(
          `${t("contact.email_label")} ${t("contact.field_required")}`,
        );
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push(t("contact.email_invalid"));
      }

      if (!formData.message.trim()) {
        errors.push(
          `${t("contact.message_label")} ${t("contact.field_required")}`,
        );
      } else if (formData.message.length < 10) {
        errors.push(t("contact.message_min_length"));
      }

      if (errors.length > 0) {
        toast({
          title: t("contact.validation_error"),
          description: errors[0],
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("contact.success"),
        description: t("contact.success_description"),
      });

      setFormData({ name: "", email: "", message: "" });
      setFieldErrors({});
    } catch (error) {
      toast({
        title: t("contact.error"),
        description: t("contact.error_description"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`fade-in-item space-y-6 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-lg p-8 rounded-2xl border border-border/50 hover:border-accent/20 transition-all duration-300 shadow-lg relative overflow-hidden group ${className}`}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground"
          >
            {t("contact.name_label")}
          </label>
          {formData.name && !fieldErrors.name && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              ✓ {t("contact.valid")}
            </span>
          )}
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("contact.name_placeholder")}
          className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
            fieldErrors.name
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : formData.name && !fieldErrors.name
                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                : "border-border focus:border-accent focus:ring-accent/20"
          }`}
        />
        {fieldErrors.name && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground"
          >
            {t("contact.email_label")}
          </label>
          {formData.email && !fieldErrors.email && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              ✓ {t("contact.valid")}
            </span>
          )}
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("contact.email_placeholder")}
          className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
            fieldErrors.email
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : formData.email && !fieldErrors.email
                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                : "border-border focus:border-accent focus:ring-accent/20"
          }`}
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-foreground"
          >
            {t("contact.message_label")}
          </label>
          {formData.message && (
            <span
              className={`text-xs ${
                fieldErrors.message ? "text-red-500" : "text-green-500"
              }`}
            >
              {formData.message.length}/10+ {t("contact.char_count")}
            </span>
          )}
        </div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("contact.message_placeholder")}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
            fieldErrors.message
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : formData.message && !fieldErrors.message
                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                : "border-border focus:border-accent focus:ring-accent/20"
          }`}
        />
        {fieldErrors.message && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || Object.keys(fieldErrors).length > 0}
        className="w-full bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-accent-foreground font-semibold py-3 rounded-lg group transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isLoading ? t("contact.sending") : t("contact.send")}
        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
