# Structure du Projet Portfolio

Portfolio one-page de **Herihasina Michael Rakotoarivony** — Next.js 16, React 19, Tailwind CSS v4, GSAP, i18n FR/EN.

---

## Arborescence

```
Portfolio/
│
├── app/
│   ├── layout.tsx              # Layout racine, métadonnées SEO, viewport
│   ├── page.tsx                # Page d'accueil (Navbar → sections → Footer)
│   ├── providers.tsx           # ThemeProvider, LanguageProvider, SmoothScroll, Toaster
│   ├── globals.css             # Variables thème, utilitaires Tailwind, styles Hero
│   └── animations.css          # Keyframes (fade, slide, float) + reduced-motion
│
├── components/
│   ├── Navbar.tsx              # Nav, thème, langue, lien CV, section active
│   ├── LanguageSelector.tsx    # Dropdown FR/EN
│   ├── Hero.tsx                # Hero + portrait PNG + animations GSAP
│   ├── About.tsx               # Présentation, stats animées, timeline
│   ├── ExperienceTimeline.tsx  # Timeline parcours (About)
│   ├── Skills.tsx              # Onglets Frontend/Backend/Outils/Design + filtres GSAP
│   ├── TechSkillCard.tsx       # Carte compétence avec glow
│   ├── Projects.tsx            # Filtres Tous/Web/Desktop/Mobile + grille GSAP
│   ├── ProjectCard.tsx         # Carte projet
│   ├── ProjectModal.tsx        # Modal détail projet (dialog)
│   ├── Contact.tsx             # Section contact (orchestration)
│   ├── ContactForm.tsx         # Formulaire + validation + toast
│   ├── ContactInfo.tsx         # Cartes email, téléphone, localisation
│   ├── SectionHeader.tsx       # Titre + sous-titre de section réutilisable
│   ├── Footer.tsx              # Copyright dynamique (année courante)
│   ├── SmoothScroll.tsx        # Smooth scroll GSAP (providers)
│   ├── theme-provider.tsx      # Wrapper next-themes
│   └── ui/                     # shadcn/ui — composants réellement utilisés
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       └── toaster.tsx
│
├── context/
│   └── LanguageContext.tsx     # i18n : language, setLanguage, t()
│
├── hooks/
│   ├── useActiveSection.ts     # Section visible au scroll (Navbar)
│   └── use-toast.ts            # Notifications toast (ContactForm)
│
├── locales/
│   ├── en.json                 # Traductions anglaises
│   └── fr.json                 # Traductions françaises
│
├── data/
│   ├── projects.ts             # Liste des projets
│   ├── skills.ts               # Compétences par catégorie
│   ├── experience.ts           # Parcours professionnel (timeline)
│   └── stats.ts                # Statistiques About (années, projets…)
│
├── constants/
│   └── social.ts               # Liens GitHub, LinkedIn, email
│
├── types/
│   └── index.ts                # Project, Skill, Experience, etc.
│
├── utils/
│   ├── gsapAnimations.ts       # Animations GSAP réutilisables + smooth scroll
│   ├── filterAnimations.ts     # Animations filtres Skills / Projects
│   ├── motion.ts               # prefersReducedMotion, shouldAnimateOnScroll
│   └── validateContact.ts      # Validation champs formulaire contact
│
├── lib/
│   └── utils.ts                # cn() — fusion classes Tailwind
│
├── public/
│   ├── icon.svg
│   └── assets/
│       ├── herihasina.png      # Portrait Hero (PNG transparent)
│       ├── salary.png
│       ├── sehatra.png
│       └── smarttrack.png
│
└── Configuration
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.mjs
    ├── postcss.config.mjs
    ├── components.json         # Config shadcn/ui
    └── .gitignore
```

---

## Page d'accueil (`app/page.tsx`)

Ordre des sections :

1. **Navbar** — `#home`, `#about`, `#skills`, `#projects`, `#contact`
2. **Hero** — `#home`
3. **About** — `#about`
4. **Skills** — `#skills`
5. **Projects** — `#projects`
6. **Contact** — `#contact`
7. **Footer** — copyright

---

## Composants `ui/` (shadcn)

Seuls 4 composants sont conservés après nettoyage :

| Composant    | Utilisé dans                                      |
|--------------|---------------------------------------------------|
| `button.tsx` | Hero, Navbar, ContactForm, ProjectModal           |
| `dialog.tsx` | ProjectModal                                      |
| `toast.tsx`  | Système de notifications                          |
| `toaster.tsx`| `app/providers.tsx`                               |

---

## Flux de données

### Navigation

```
Navbar.tsx
├── useActiveSection()   → surligne la section visible
├── useLanguage()        → traductions
├── useTheme()           → thème clair / sombre
└── LanguageSelector     → bascule FR / EN
```

### i18n

```
locales/en.json + locales/fr.json
        ↓
LanguageContext.tsx  →  t('clé')  →  texte traduit
        ↓
localStorage (persistance langue)
```

### Animations GSAP

| Fichier / composant   | Rôle                                              |
|-----------------------|---------------------------------------------------|
| `Hero.tsx`            | Timeline entrée (texte, portrait, orbes, float)   |
| `About.tsx`           | Compteurs stats, fade-in scroll                   |
| `Skills.tsx`          | Filtres onglets via `filterAnimations.ts`         |
| `Projects.tsx`        | Filtres catégorie + grille                        |
| `Contact.tsx`         | Fade-in cartes et formulaire                      |
| `SmoothScroll.tsx`    | Défilement fluide global                          |
| `utils/motion.ts`     | Désactive animations si `prefers-reduced-motion`  |

---

## Dépendances principales

| Package           | Usage                                      |
|-------------------|--------------------------------------------|
| `next` 16         | Framework, App Router, Image               |
| `react` 19        | UI                                         |
| `tailwindcss` 4   | Styles                                     |
| `gsap`            | Animations Hero, sections, filtres         |
| `next-themes`     | Thème clair / sombre                       |
| `lucide-react`    | Icônes                                     |
| `@radix-ui/react-dialog` | Modal projets                       |
| `@radix-ui/react-toast`  | Toasts contact                       |
| `emailjs-com`     | Contact (à brancher — envoi simulé)        |

> Note : plusieurs packages `@radix-ui/*` restent dans `package.json` suite au nettoyage ui ; un nettoyage des dépendances est possible ultérieurement.

---

## Composants Client vs Server

| Client (`'use client'`) | Server |
|-------------------------|--------|
| Navbar, Hero, About, Skills, Projects, Contact, Footer | `app/page.tsx`, `app/layout.tsx` |

Toutes les sections interactives (hooks, GSAP, context) sont en Client Components.

---

## Fichiers à compléter

| Fichier                         | Statut                          |
|---------------------------------|---------------------------------|
| `public/cv.pdf`                 | Manquant — lien Navbar présent  |
| `public/icon-light-32x32.png`   | Référencé dans layout, absent   |
| `public/icon-dark-32x32.png`    | Référencé dans layout, absent   |
| `public/apple-icon.png`         | Référencé dans layout, absent   |
| Images projets (`portfolio.png`, `heatmap.png`, …) | Partiellement absentes |
| Liens projets `example.com`     | Placeholders dans `data/projects.ts` |

---

## Ajouter une nouvelle section

1. Créer `components/MaSection.tsx` (`'use client'` si hooks/GSAP)
2. Ajouter `<MaSection />` dans `app/page.tsx`
3. Ajouter le lien dans `Navbar.tsx` (`navLinks`)
4. Ajouter les clés dans `locales/en.json` et `locales/fr.json`
5. Mettre `id="ma-section"` sur la balise `<section>` pour la détection scroll

---

## Notes

- **Thème** : sombre par défaut (`enableSystem: false`), toggle dans Navbar
- **Langue** : FR / EN, persistée en `localStorage`
- **Contact** : validation locale + toast succès/erreur ; EmailJS non connecté
- **Hero** : portrait PNG sans fond dans `public/assets/herihasina.png`
- **Footer** : `© {année} Herihasina Michael Rakotoarivony` + droits réservés
- **Branche de travail** : `feat/phase-1-polish` (polish UI, Hero, nettoyage)
