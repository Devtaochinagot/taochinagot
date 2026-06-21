# Taochinagot — Site officiel

Site statique (HTML/CSS/JS vanilla, zéro framework, zéro build) pour le club de Wushu Kung Fu **Taochinagot** — Séné / Surzur / Plaudren, Morbihan (56).

## Lancer en local

```bash
cd /Users/perso/Downloads/taochinagot
python3 -m http.server 8080
# http://localhost:8080
```

Aucune dépendance, aucun build. Toutes les pages fonctionnent en ouvrant directement `index.html`.

---

## Sitemap

| Page | Fichier | État |
|------|---------|------|
| Accueil | `index.html` | ✅ Terminée |
| Notre Histoire | `pages/notre-histoire.html` | ✅ Terminée |
| Kung-Fu (Taolu + Sanda) | `pages/kung-fu.html` | ✅ Terminée |
| Équipe | `pages/equipe.html` | ✅ Terminée |
| Cours & Tarifs | `pages/cours.html` | ✅ Terminée |
| Compétition | `pages/palmares.html` | ✅ Terminée |
| Événements | `pages/evenements.html` | ↪ Redirige vers `palmares.html#evenements` |
| FAQ | `pages/faq.html` | ✅ Terminée |
| Contact | `pages/contact.html` | ✅ Terminée |
| Agenda | `pages/agenda.html` | ✅ Terminée |

### Navigation

- **Kung-Fu** → sous-menu : Taolu · Sanda / Boxe chinoise
- **Compétition** → sous-menu : Événements à venir · (séparateur) · 2026 · 2025 · 2024 · 2023 · 2022 · 2021
- **Événements** supprimé de la nav principale → redirige vers `palmares.html#evenements`

---

## Structure du projet

```
index.html
css/
  style.css          → design system complet + tous les styles
js/
  main.js            → burger mobile, accordéon FAQ, ombre header, dropdown touch
img/
  logo.png
  hero-sanda.jpg / hero-tao.jpg
  equipe-yann.jpg / equipe-vincent.jpg / equipe-philippe.jpg / equipe-candice.jpg
  dojo-sene.jpg / dojo-surzur.jpg / dojo-plaudren.jpg
  taolu-mains-nues.jpg / taolu-armes.jpg / taolu-competition.jpg
  sanda-pied-poing.jpg / sanda-projection.jpg / sanda-competition.jpg
  home-sanda.jpg
  video-wushu-thumb.jpg
pages/
  notre-histoire.html
  kung-fu.html
  equipe.html
  cours.html
  palmares.html
  evenements.html     ← meta-refresh vers palmares.html#evenements
  agenda.html
  faq.html
  contact.html
```

---

## Design system

### Couleurs (`css/style.css` → `:root`)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--ink` | `#0d0a07` | Fond header/footer, sections sombres |
| `--ink-soft` | `#261e16` | Variante fond sombre légèrement plus claire |
| `--lacquer` | `#a8201a` | Rouge laque — CTA principal, accents forts |
| `--gold` | `#c4972e` | Or — accents, liens sur fond sombre |
| `--gold-soft` | `#dfc07a` | Or doux — variante hover |
| `--paper` | `#f8f2e6` | Fond clair par défaut (body) |
| `--paper-warm` | `#ede4d3` | Fond clair légèrement plus chaud |
| `--jade` | `#3f5d4e` | Vert jade — contact, accents secondaires |
| `--white` | `#fffdf9` | Blanc cassé pour cartes et texte sur fond sombre |
| `--radius` | `2px` | Border-radius global (design anguleux voulu) |

### Typographie

- **Display** (titres) : `Fraunces` — variable font, serif
- **Corps** : `Plus Jakarta Sans` — lisible, moderne
- Échelle en `clamp()` pour fluidité mobile → desktop

### Composants CSS principaux

- `.btn` + variantes : `btn-primary`, `btn-gold`, `btn-outline`, `btn-outline-dark`
- `.eyebrow` — label au-dessus des titres de section
- `.section-head` (+ `.center`) — bloc titre + description
- `.card-grid` / `.discipline-card` — grille disciplines
- `.discipline-card--photo` — cover card avec image plein cadre, titre visible, texte au survol
- `.discipline-card--ink` — cover card sans photo (fond dégradé sombre)
- `.dojo-grid` / `.dojo-card` — grille des 3 dojos avec photos réelles
- `.coach-grid` / `.coach-card` — fiches coachs (photos carrées, object-fit contain)
- `.faq-list` / `.faq-item` — accordéon FAQ
- `.page-hero` — bandeau titre de chaque sous-page
- `.contact-grid` / `.contact-form` / `.location-card` — page Contact
- `.taolu-video-ratio` / `.taolu-video-thumb-link` — thumbnails vidéo YouTube cliquables
- `.timeline-section` / `.timeline-item` / `.timeline-content` — timeline Notre Histoire (fond clair)
- `.palmares-year-group`, `.palmares-event`, `.palmares-result`, `.palmares-medal-dot` — page Compétition
- `.footer-social` — liens réseaux sociaux en footer

---

## Comportement nav

**Desktop (≥ 980px)** : dropdown au survol (CSS uniquement). Cliquer sur le nom de page navigue directement.

**Touch / mobile (< 980px)** : clic ouvre/ferme le sous-menu (JS), burger ouvre le menu mobile.

---

## Réseaux sociaux du club

| Réseau | Lien |
|--------|------|
| Facebook | https://www.facebook.com/taochinagot |
| Instagram | https://www.instagram.com/taochinagot_/ |
| Email | contact@taochinagot.fr |
| WhatsApp | https://wa.me/33631944159 |

Présents dans le footer de toutes les pages et sur la page Contact.

---

## Page Compétition

Résultats organisés par année (2026 → 2021), ancres `#2026` … `#2021` pour la navigation directe depuis le sous-menu.

Chaque événement contient : eyebrow (type de compétition), titre (ville), date/lieu, badges de médailles (Or/Argent/Bronze), grille de résultats, note narrative, placeholders photo/vidéo.

**Grille résultats** : `grid-template-columns: 10px 1fr 1fr 1fr` — 3 colonnes égales (nom / catégorie / médaille). Catégorie centrée via `justify-self: center`, médaille alignée à droite via `justify-self: end`.

---

## Vidéos

Les iframes YouTube ont été remplacées par des cards thumbnail cliquables (image CDN YouTube `hqdefault.jpg` + overlay play SVG). Raison : les vidéos concernées bloquent l'embedding (Error 153).

---

## Sécurité

- Tous les liens externes utilisent `rel="noopener noreferrer"`
- Aucun secret, clé API ou token dans le code
- Aucun `innerHTML` ou `eval()` dans le JS
- Formulaire de contact : `action="#"` — **à brancher** sur Formspree ou Netlify Forms avant mise en production

---

## Décisions produit

- CTA "1er cours offert" présent dans le header de **toutes** les pages → pointe vers `contact.html#formulaire`
- Gong Fang : pas de page dédiée (pas de cours actif), mentionné sur l'accueil uniquement
- Pas de témoignages clients au lancement
- Compétition : ordre chronologique décroissant (plus récent en tête)
- Cartes disciplines accueil : Sanda (photo) et Taolu (fond sombre) sont cliquables vers `kung-fu.html#sanda` / `#taolu`

---

## Prochaines étapes

1. Intégrer photos et vidéos des événements dans la page Compétition (remplacer `.palmares-media-placeholder`)
2. Brancher le formulaire de contact sur Formspree ou Netlify Forms
3. Ajouter un `sitemap.xml` avant déploiement
4. Ajouter une photo pour la carte Taolu sur l'accueil (actuellement fond sombre)
5. Ajouter une photo pour la carte Gong Fang sur l'accueil (actuellement fond sombre)
