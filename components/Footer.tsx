'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ]

  return (
    <footer className="relative bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-foreground">Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building beautiful digital experiences one project at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} All rights reserved. Made with
            <Heart className="w-3 h-3 inline-block mx-1 text-accent" />
            by Your Name
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
