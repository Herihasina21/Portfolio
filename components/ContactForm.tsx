"use client";

import { useState, useRef } from "react";
import { shakeElement } from "@/utils/gsapAnimations";
import emailjs from "@emailjs/browser";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormData } from "@/types";
import {
  validateContactForm,
  validateContactField,
  type ContactFieldErrors,
} from "@/utils/validateContact";

interface ContactFormProps {
  className?: string;
}

type TouchedFields = Partial<Record<keyof ContactFormData, boolean>>;

export default function ContactForm({ className = "" }: ContactFormProps) {
  var { t } = useLanguage();
  var { toast } = useToast();
  var formRef = useRef<HTMLFormElement>(null);
  var [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  var [isLoading, setIsLoading] = useState(false);
  var [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  var [touched, setTouched] = useState<TouchedFields>({});
  var [submitAttempted, setSubmitAttempted] = useState(false);

  var showError = function (field: keyof ContactFormData) {
    return (touched[field] || submitAttempted) && fieldErrors[field];
  };

  var shakeField = function (fieldName: string) {
    if (!formRef.current) return;
    var el = formRef.current.querySelector(`[data-field="${fieldName}"]`);
    if (!el) return;
    shakeElement(el as HTMLElement);
  };

  var handleBlur = function (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    var name = e.target.name as keyof ContactFormData;
    var value = e.target.value;
    setTouched(function (prev) {
      return { ...prev, [name]: true };
    });
    var error = validateContactField(name, value, t);
    setFieldErrors(function (prev) {
      var next = { ...prev };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  };

  var handleChange = function (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    var name = e.target.name as keyof ContactFormData;
    var value = e.target.value;
    setFormData(function (prev) {
      return { ...prev, [name]: value };
    });

    if (touched[name] || submitAttempted) {
      var error = validateContactField(name, value, t);
      setFieldErrors(function (prev) {
        var next = { ...prev };
        if (error) next[name] = error;
        else delete next[name];
        return next;
      });
    }
  };

  var handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);

    var errors = validateContactForm(formData, t);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      var firstErrorField = Object.keys(errors)[0];
      shakeField(firstErrorField);
      return;
    }

    var serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    var templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    var publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: t("contact.config_error"),
        description: t("contact.config_error_description"),
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey,
      );

      toast({
        title: t("contact.success"),
        description: t("contact.success_description"),
        variant: "success",
        duration: 5000,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
      setFieldErrors({});
      setTouched({});
      setSubmitAttempted(false);
    } catch {
      toast({
        title: t("contact.error"),
        description: t("contact.error_description"),
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  var inputClass = function (field: keyof ContactFormData, hasValue: boolean) {
    if (showError(field)) {
      return "border-red-500/60 focus:border-red-500 focus:ring-red-500/20";
    }
    if (hasValue && !fieldErrors[field]) {
      return "border-green-500/40 focus:border-green-500 focus:ring-green-500/20";
    }
    return "border-border/60 focus:border-accent focus:ring-accent/20";
  };

  var fields: Array<{
    id: keyof ContactFormData;
    label: string;
    placeholder: string;
    type: string;
    icon: typeof User;
    multiline?: boolean;
    maxLength?: number;
  }> = [
    {
      id: "name",
      label: t("contact.name_label"),
      placeholder: t("contact.name_placeholder"),
      type: "text",
      icon: User,
      maxLength: 80,
    },
    {
      id: "email",
      label: t("contact.email_label"),
      placeholder: t("contact.email_placeholder"),
      type: "email",
      icon: Mail,
      maxLength: 120,
    },
    {
      id: "subject",
      label: t("contact.subject_label"),
      placeholder: t("contact.subject_placeholder"),
      type: "text",
      icon: FileText,
      maxLength: 120,
    },
  ];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`contact-form-panel portfolio-card p-6 sm:p-8 space-y-5 ${className}`}
    >
      <div>
        <h3 className="text-xl font-bold text-foreground mb-1">
          {t("contact.form_title")}
        </h3>
        <p className="text-sm text-muted-foreground">{t("contact.form_subtitle")}</p>
      </div>

      {fields.map(function (field) {
        var Icon = field.icon;
        var value = formData[field.id];
        var error = showError(field.id);
        return (
          <div key={field.id} data-field={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-foreground mb-2"
            >
              {field.label}
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                aria-invalid={!!error}
                aria-describedby={error ? `${field.id}-error` : undefined}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${inputClass(field.id, !!value)}`}
              />
            </div>
            {error && (
              <p id={`${field.id}-error`} className="text-xs text-red-400 mt-1.5">
                {fieldErrors[field.id]}
              </p>
            )}
          </div>
        );
      })}

      <div data-field="message">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            {t("contact.message_label")}
            <span className="text-red-400 ml-1">*</span>
          </label>
          <span className="text-xs text-muted-foreground">
            {formData.message.length}/2000
          </span>
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("contact.message_placeholder")}
            rows={5}
            maxLength={2000}
            aria-invalid={!!showError("message")}
            aria-describedby={showError("message") ? "message-error" : undefined}
            required
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${inputClass("message", !!formData.message)}`}
          />
        </div>
        {showError("message") && (
          <p id="message-error" className="text-xs text-red-400 mt-1.5">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-accent-foreground font-semibold py-3 rounded-xl gap-2"
      >
        {isLoading ? t("contact.sending") : t("contact.send")}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
