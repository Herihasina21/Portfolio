'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import type { ContactFormData } from '@/types'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})
  const { toast } = useToast()

  // Real-time field validation
  const validateField = (name: string, value: string) => {
    const errors = { ...fieldErrors }

    if (name === 'name') {
      if (!value.trim()) {
        errors.name = 'Name is required'
      } else if (value.length < 2) {
        errors.name = 'Name must be at least 2 characters'
      } else {
        delete errors.name
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = 'Invalid email address'
      } else {
        delete errors.email
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        errors.message = 'Message is required'
      } else if (value.length < 10) {
        errors.message = 'Message must be at least 10 characters'
      } else {
        delete errors.message
      }
    }

    setFieldErrors(errors)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      const elements = sectionRef.current.querySelectorAll('.fade-in-item')
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
              start: 'top 70%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validation
      const errors: string[] = []
      
      if (!formData.name.trim()) {
        errors.push('Name is required')
      } else if (formData.name.length < 2) {
        errors.push('Name must be at least 2 characters')
      }

      if (!formData.email.trim()) {
        errors.push('Email is required')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address')
      }

      if (!formData.message.trim()) {
        errors.push('Message is required')
      } else if (formData.message.length < 10) {
        errors.push('Message must be at least 10 characters')
      }

      if (errors.length > 0) {
        toast({
          title: 'Validation Error',
          description: errors[0],
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      // EmailJS integration (you'll need to set up EmailJS account)
      // For now, we'll simulate the submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully.',
      })

      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="fade-in-item">
              <p className="text-lg text-muted-foreground mb-8">
                Have a project in mind or just want to say hello? I'd love to hear from you!
                Feel free to reach out through any of these channels.
              </p>
            </div>

            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <a
                  key={index}
                  href={info.href}
                  className="fade-in-item flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              )
            })}

            <div className="fade-in-item pt-4">
              <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
              <div className="flex gap-4">
                {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  >
                    <span className="text-sm font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="fade-in-item space-y-6 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-lg p-8 rounded-2xl border border-border/50 hover:border-accent/20 transition-all duration-300 shadow-lg relative overflow-hidden group"
          >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                  Name
                </label>
                {formData.name && !fieldErrors.name && (
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.name
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : formData.name && !fieldErrors.name
                    ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                    : 'border-border focus:border-accent focus:ring-accent/20'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                  Email
                </label>
                {formData.email && !fieldErrors.email && (
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    ✓ Valid
                  </span>
                )}
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.email
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : formData.email && !fieldErrors.email
                    ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                    : 'border-border focus:border-accent focus:ring-accent/20'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                  Message
                </label>
                {formData.message && (
                  <span className={`text-xs ${
                    fieldErrors.message ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formData.message.length}/10+ chars
                  </span>
                )}
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
                  fieldErrors.message
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : formData.message && !fieldErrors.message
                    ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                    : 'border-border focus:border-accent focus:ring-accent/20'
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
              {isLoading ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
