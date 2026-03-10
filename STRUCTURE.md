# Structure du Projet Portfolio

## 📁 Arborescence Complète

```
portfolio-project/
│
├── 📂 app/                              # Application Next.js 16 (App Router)
│   ├── layout.tsx                       # Layout racine avec métadonnées SEO
│   ├── page.tsx                         # Page d'accueil principale
│   ├── providers.tsx                    # Providers: ThemeProvider + LanguageProvider (Client)
│   ├── globals.css                      # Styles globaux + scrollbar personnalisée
│   ├── animations.css                   # Animations GSAP + Tailwind
│   ├── icon.svg                         # Favicon
│   └── apple-icon.png
│
├── 📂 components/                       # Composants React réutilisables
│   ├── Navbar.tsx                       # Navigation avec langue/thème + détection scroll
│   ├── Hero.tsx                         # Section hero avec animations GSAP
│   ├── About.tsx                        # Section "À Propos"
│   ├── Skills.tsx                       # Section Compétences avec onglets (4 catégories)
│   ├── Projects.tsx                     # Section Projets avec filtre + ScrollTrigger
│   ├── Contact.tsx                      # Formulaire de contact EmailJS
│   ├── Footer.tsx                       # Pied de page
│   ├── Services.tsx                     # Ancien composant (remplacé par Skills)
│   └── 📂 ui/                           # Composants shadcn/ui
│       ├── button.tsx                   # Boutons réutilisables
│       ├── card.tsx                     # Cartes/conteneurs
│       ├── accordion.tsx                # Accordion replié/déplié
│       ├── alert.tsx                    # Alertes
│       ├── badge.tsx                    # Labels/badges
│       ├── checkbox.tsx                 # Cases à cocher
│       ├── dialog.tsx                   # Modales/popups
│       ├── dropdown-menu.tsx            # Menus déroulants
│       ├── form.tsx                     # Gestion formulaires React Hook Form
│       ├── input.tsx                    # Champs de texte
│       ├── label.tsx                    # Labels
│       ├── popover.tsx                  # Petits popups
│       ├── radio-group.tsx              # Boutons radio
│       ├── select.tsx                   # Sélecteurs
│       ├── skeleton.tsx                 # Placeholders de chargement
│       ├── switch.tsx                   # Interrupteurs
│       ├── tabs.tsx                     # Onglets (utilisé dans Skills)
│       ├── textarea.tsx                 # Zones texte multilignes
│       ├── tooltip.tsx                  # Infobulle au survol
│       └── ... (autres composants)
│
├── 📂 context/                          # Contextes React
│   └── LanguageContext.tsx              # Gestion i18n (EN/FR) avec localStorage
│
├── 📂 hooks/                            # Hooks React personnalisés
│   ├── useActiveSection.ts              # Détecte section visible au scroll
│   ├── use-mobile.ts                    # Hook détecteur de mobile
│   └── use-toast.ts                     # Hook notifications toast
│
├── 📂 data/                             # Données statiques
│   ├── projects.ts                      # Array d'objets Project
│   └── translations.ts                  # (optionnel) Traductions i18n
│
├── 📂 types/                            # Interfaces TypeScript
│   └── index.ts                         # Types: Project, Skill, Language, etc.
│
├── 📂 utils/                            # Fonctions utilitaires
│   ├── gsapAnimations.ts                # Animations GSAP réutilisables
│   └── cn.ts                            # Fonction classNames (Tailwind)
│
├── 📂 public/                           # Ressources statiques (images, fonts)
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   ├── icon.svg
│   ├── apple-icon.png
│   └── (images projets, logos, etc.)
│
├── 📂 styles/                           # Styles additionnels (si besoin)
│   └── (généralement dans globals.css)
│
└── 📄 Fichiers de Configuration
    ├── package.json                     # Dépendances + scripts
    ├── tsconfig.json                    # Configuration TypeScript
    ├── tailwind.config.mjs               # Configuration Tailwind CSS v4
    ├── next.config.mjs                  # Configuration Next.js
    ├── .eslintrc.json                   # Configuration ESLint
    └── .gitignore
```

---

## 🎨 Détail du dossier `components/ui/`

Le dossier `ui/` contient les **composants shadcn/ui** - une collection de composants React non stylisés, accessible et customisable basée sur Radix UI.

### **1️⃣ Composants de Formulaire**
| Composant | Usage | Utilisé? |
|-----------|-------|----------|
| `input.tsx` | Champs de texte simples | ✅ Contact |
| `textarea.tsx` | Zones texte multilignes | ✅ Contact |
| `form.tsx` | Gestion React Hook Form | ✅ Contact |
| `label.tsx` | Labels accessibles | ✅ Contact |
| `checkbox.tsx` | Cases à cocher | ❌ |
| `radio-group.tsx` | Boutons radio | ❌ |
| `select.tsx` | Sélecteurs déroulants | ❌ |
| `switch.tsx` | Interrupteurs on/off | ❌ |

### **2️⃣ Composants d'Affichage**
| Composant | Usage | Utilisé? |
|-----------|-------|----------|
| `button.tsx` | Boutons réutilisables | ✅ Hero, Skills, Projects |
| `card.tsx` | Conteneurs cartes | ✅ Projects, Skills |
| `badge.tsx` | Petits labels/tags | ✅ Projects |
| `alert.tsx` | Messages d'alerte | ❌ |
| `skeleton.tsx` | Placeholders chargement | ❌ |
| `empty.tsx` | État vide | ❌ |

### **3️⃣ Composants de Navigation**
| Composant | Usage | Utilisé? |
|-----------|-------|----------|
| `tabs.tsx` | Onglets | ✅ Skills (Languages/Frameworks/SGBD/Outils) |
| `dropdown-menu.tsx` | Menus déroulants | ❌ |
| `pagination.tsx` | Navigation pages | ❌ |
| `breadcrumb.tsx` | Fil d'Ariane | ❌ |

### **4️⃣ Composants de Dialogue**
| Composant | Usage | Utilisé? |
|-----------|-------|----------|
| `dialog.tsx` | Modales/popups | ❌ |
| `popover.tsx` | Petits popups | ❌ |
| `hover-card.tsx` | Carte au survol | ❌ |
| `sheet.tsx` | Drawer latéral | ❌ |
| `tooltip.tsx` | Infobulle survol | ❌ |

### **5️⃣ Nouveaux Composants (Shadcn v1.7+)**
| Composant | Usage | Utilisé? |
|-----------|-------|----------|
| `spinner.tsx` | Indicateur chargement | ❌ |
| `button-group.tsx` | Groupe de boutons | ❌ |
| `field.tsx` | Champs groupés | ❌ |
| `input-group.tsx` | Groupes inputs | ❌ |
| `kbd.tsx` | Affichage touches clavier | ❌ |
| `item.tsx` | Éléments listés | ❌ |

---

## 🔄 Flux de Données & Architecture

### **Navigation & Scroll Detection**
```
Navbar.tsx
├── useActiveSection() → Détecte section visible
├── useLanguage() → Récupère langue actuelle
├── useTheme() → Récupère thème (light/dark)
└── Affiche liens actifs en couleur accent
```

### **Traductions (i18n)**
```
LanguageContext.tsx
├── État: language (en/fr) + setLanguage()
├── Fonction: t(key) → retourne traduction
├── Stockage: localStorage
└── Fallback: Traductions par défaut anglaises
```

### **Animations**
```
Composants avec animations GSAP:
├── Hero.tsx → Character stagger + fade-in
├── Projects.tsx → ScrollTrigger (fade + scale)
└── Skills.tsx → Fade-in au scroll

Classe CSS: .scroll-indicator
└── Animée avec: animate-bounce (Tailwind)
```

### **Contenu Statique**
```
data/projects.ts
└── Array[Project]
    ├── id, title, description
    ├── category (Web/Mobile/Design)
    ├── technologies
    └── image, link

types/index.ts
├── interface Project {}
├── interface Skill {}
├── type Language = 'en' | 'fr'
└── interface Translations {}
```

---

## 📦 Dépendances Principales

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "gsap": "^3.12.3",
    "react-icons": "^5.0.0",
    "next-themes": "^0.2.1",
    "emailjs-com": "^3.2.0",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.0.0",
    "@types/react": "^19.0.0"
  }
}
```

---

## 🎯 Points Clés de Compréhension

### **1. Composants Client vs Server**
- **Client (`'use client'`):** Navbar, Hero, Skills, Projects, Contact (besoin hooks/context)
- **Server:** About, Footer (contenu statique)

### **2. Animations**
- **GSAP:** Hero (character stagger), Projects (ScrollTrigger)
- **Tailwind:** animate-bounce (scroll indicator)
- **CSS Custom:** animations.css (float)

### **3. Accessibilité**
- Tous les boutons ont type/aria-label
- Couleurs respectent WCAG (contrast 4.5:1)
- Scrollbar customisée mais accessible

### **4. Performance**
- Images optimisées (Next.js Image)
- Lazy loading projects avec IntersectionObserver
- CSS-in-JS minimal (Tailwind)
- GSAP avec context pour cleanup

---

## 🚀 Pour Ajouter une Nouvelle Section

1. **Créer le composant:** `components/NewSection.tsx` ('use client')
2. **Importer dans:** `app/page.tsx`
3. **Ajouter au Navbar:** navLinks array dans `Navbar.tsx`
4. **Ajouter traductions:** Dans `LanguageContext.tsx`
5. **Ajouter id:** `<section id="new-section">` pour scroll detection

---

## 📝 Notes Importantes

- **Scrollbar:** Customisée dans `globals.css` (couleur accent, width: 8px)
- **Thème:** Dark mode par défaut, toggle dans Navbar
- **Langue:** EN/FR, stockée dans localStorage, par défaut: navigateur
- **Animations:** ScrollTrigger désactivé sur mobile (<768px) pour perf
- **Form Contact:** EmailJS prêt, besoin PUBLIC_KEY d'EmailJS pour fonctionner
