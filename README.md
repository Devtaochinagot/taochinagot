# Taochinagot — Site officiel

Site statique (HTML/CSS/JS vanilla, zéro framework, zéro build) pour le club de Wushu Kung Fu **Taochinagot** — Séné / Surzur / Plaudren, Morbihan (56).

## Lancer en local

```bash
cd /Users/perso/Downloads/taochinagot
python3 -m http.server 8080
# http://localhost:8080
```

Aucune dépendance, aucun build.

---

## Sitemap

| Page | Fichier | État |
|------|---------|------|
| Accueil | `index.html` | ✅ Terminée |
| Notre Histoire | `pages/notre-histoire.html` | ✅ Terminée |
| Kung-Fu (Taolu + Sanda) | `pages/kung-fu.html` | ✅ Terminée |
| Équipe | `pages/equipe.html` | ✅ Terminée (photos FL/CM en attente) |
| Cours & Tarifs | `pages/cours.html` | ✅ Terminée |
| Compétition | `pages/competition.html` | ✅ Terminée |
| FAQ | `pages/faq.html` | ✅ Terminée |
| Contact | `pages/contact.html` | ✅ Terminée (envoi via client mail) |
| Agenda / Événements | `pages/agenda.html`, `pages/evenements.html` | ↪ Redirigent vers `competition.html#evenements` |

### Navigation

- **Kung-Fu** → sous-menu : Taolu · Sanda / Boxe chinoise
- **Compétition** → sous-menu : Événements à venir · 2026 · 2025 · … · 2021
- **Agenda** et **Événements** (anciennes URLs) → redirection vers `#evenements`

---

## Structure du projet

```
index.html
404.html
sitemap.xml
robots.txt
.nojekyll
css/style.css
js/main.js
img/                  → photos WebP optimisées
pages/
  notre-histoire.html
  kung-fu.html
  equipe.html
  cours.html
  competition.html
  faq.html
  contact.html
  agenda.html         ← redirection
  evenements.html     ← redirection
```

---

## Déploiement

**Repo GitHub :** [Devtaochinagot/taochinagot](https://github.com/Devtaochinagot/taochinagot) (privé pour l'instant)

**URL de preview (GitHub Pages, quand repo public) :**
`https://devtaochinagot.github.io/taochinagot/`

### Passer au domaine définitif (ex. taochinagot.fr)

Quand le domaine est choisi, remplacer l'URL de base dans :

- `sitemap.xml`
- `robots.txt`
- balises `og:url` de chaque page HTML
- balises `link rel="canonical"` des pages de redirection

Rechercher : `https://devtaochinagot.github.io/taochinagot`

Puis configurer le DNS du domaine vers GitHub Pages, Netlify ou Cloudflare Pages.

---

## Design system

Voir variables CSS dans `:root` (`css/style.css`) — couleurs `--ink`, `--lacquer`, `--gold`, `--paper`, typographie Fraunces + Plus Jakarta Sans, breakpoints 480 / 768 / 1024 px.

---

## Réseaux sociaux du club

| Réseau | Lien |
|--------|------|
| Facebook | https://www.facebook.com/taochinagot |
| Instagram | https://www.instagram.com/taochinagot_/ |
| Email | contact@taochinagot.fr |
| WhatsApp | https://wa.me/33631944159 |

---

## Sécurité

- Liens externes : `rel="noopener noreferrer"`
- Aucun secret dans le code
- Formulaire contact : ouvre le client mail de l'utilisateur (mailto) — **Formspree à brancher plus tard** pour un envoi sans action de l'utilisateur

---

## Prochaines étapes (nécessitent le client ou le domaine)

1. **Formspree / Netlify Forms** — remplacer l'envoi mailto du formulaire contact
2. **Domaine définitif** — mettre à jour sitemap, robots, Open Graph
3. **Photos manquantes** — coachs Florent Le Digabel et Clémence Maupay ; quelques podiums compétition (initiales en placeholder)
4. **Repo public + GitHub Pages** — quand le site est prêt à être visible
