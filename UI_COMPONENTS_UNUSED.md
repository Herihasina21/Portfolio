# Composants UI Non Utilisés

## Résumé
Votre projet utilise uniquement le composant **Button** dans l'application actuelle. Tous les autres composants shadcn/ui peuvent être supprimés pour réduire la taille du projet.

## Composants Utilisés
- ✅ **button.tsx** - Utilisé dans: Hero.tsx, Navbar.tsx, Projects.tsx, Contact.tsx

## Composants Non Utilisés (Peut être supprimés)

### Formulaires & Inputs
- accordion.tsx
- checkbox.tsx
- combobox.tsx
- command.tsx
- dropdown-menu.tsx
- form.tsx
- input.tsx
- input-group.tsx
- label.tsx
- radio-group.tsx
- select.tsx
- switch.tsx
- textarea.tsx

### Affichage & Contenu
- alert.tsx
- alert-dialog.tsx
- avatar.tsx
- badge.tsx
- card.tsx
- empty.tsx
- kbd.tsx
- separator.tsx
- skeleton.tsx
- spinner.tsx
- table.tsx
- tooltip.tsx

### Navigation & Menu
- breadcrumb.tsx
- button-group.tsx
- field.tsx
- item.tsx
- pagination.tsx
- tabs.tsx
- toggle.tsx
- toggle-group.tsx

### Dialogues & Popups
- dialog.tsx
- drawer.tsx (sheet.tsx)
- hover-card.tsx
- popover.tsx
- sidebar.tsx

### Utilitaires
- carousel.tsx
- calendar.tsx
- collapsible.tsx
- context-menu.tsx
- progress.tsx
- scroll-area.tsx
- slider.tsx
- sonner.tsx
- toast.tsx
- toaster.tsx
- use-toast.ts

## Recommandations

### Option 1: Garder comme C'est
Si vous planifiez d'ajouter d'autres fonctionnalités à l'avenir, gardez les composants UI existants.

### Option 2: Nettoyer le Projet
Supprimez les composants non utilisés pour:
- Réduire la taille du bundle (~20-30% de réduction)
- Simplifier la structure du projet
- Améliorer les performances de build

## Instructions de Suppression

Supprimez les fichiers du dossier `components/ui/` qui ne sont pas listés dans "Composants Utilisés":

```bash
# Exemple pour bash/zsh
cd components/ui/
rm accordion.tsx
rm checkbox.tsx
# ... etc
```

Ou manuellement via l'interface v0.
