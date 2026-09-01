'use client'

import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

function ToastIcon({ variant }: { variant?: 'default' | 'destructive' | 'success' | null }) {
  if (variant === 'success') {
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
        aria-hidden="true"
      >
        <CheckCircle2 className="h-5 w-5" />
      </span>
    )
  }

  if (variant === 'destructive') {
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/12 text-red-600 dark:bg-red-400/15 dark:text-red-400"
        aria-hidden="true"
      >
        <AlertCircle className="h-5 w-5" />
      </span>
    )
  }

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
      aria-hidden="true"
    >
      <Info className="h-5 w-5" />
    </span>
  )
}

export function Toaster() {
  var { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <ToastIcon variant={variant ?? 'default'} />
            <div className="grid min-w-0 flex-1 gap-0.5 sm:gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
