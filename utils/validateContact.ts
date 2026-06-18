import type { ContactFormData } from '@/types'

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormData, string>
>

type TranslateFn = (key: string) => string

export function validateContactForm(
  data: ContactFormData,
  t: TranslateFn,
): ContactFieldErrors {
  var errors: ContactFieldErrors = {}

  if (!data.name.trim()) {
    errors.name = t('contact.name_required')
  } else if (data.name.trim().length < 2) {
    errors.name = t('contact.name_min_length')
  } else if (data.name.trim().length > 80) {
    errors.name = t('contact.name_max_length')
  }

  if (!data.email.trim()) {
    errors.email = t('contact.email_required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = t('contact.email_invalid')
  }

  if (!data.subject.trim()) {
    errors.subject = t('contact.subject_required')
  } else if (data.subject.trim().length < 3) {
    errors.subject = t('contact.subject_min_length')
  } else if (data.subject.trim().length > 120) {
    errors.subject = t('contact.subject_max_length')
  }

  if (!data.message.trim()) {
    errors.message = t('contact.message_required')
  } else if (data.message.trim().length < 10) {
    errors.message = t('contact.message_min_length')
  } else if (data.message.trim().length > 2000) {
    errors.message = t('contact.message_max_length')
  }

  return errors
}

export function validateContactField(
  name: keyof ContactFormData,
  value: string,
  t: TranslateFn,
): string | undefined {
  var trimmed = value.trim()

  if (name === 'name') {
    if (!trimmed) return t('contact.name_required')
    if (trimmed.length < 2) return t('contact.name_min_length')
    if (trimmed.length > 80) return t('contact.name_max_length')
  }

  if (name === 'email') {
    if (!trimmed) return t('contact.email_required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return t('contact.email_invalid')
    }
  }

  if (name === 'subject') {
    if (!trimmed) return t('contact.subject_required')
    if (trimmed.length < 3) return t('contact.subject_min_length')
    if (trimmed.length > 120) return t('contact.subject_max_length')
  }

  if (name === 'message') {
    if (!trimmed) return t('contact.message_required')
    if (trimmed.length < 10) return t('contact.message_min_length')
    if (trimmed.length > 2000) return t('contact.message_max_length')
  }

  return undefined
}
