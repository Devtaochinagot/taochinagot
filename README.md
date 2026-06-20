# Taochinagot — Refonte du site

Site multi-pages (HTML/CSS/JS vanilla, pas de framework) pour le club de Wushu
Kung Fu Taochinagot (Séné / Surzur / Plaudren, Morbihan).

Objectif : remplacer l'ancien site (non responsive, illisible sur mobile,
contenu en blocs de texte non structurés) par un site mobile-first, clair,
pensé pour convertir des visiteurs en pratiquants (CTA "1er cours offert"
omniprésent).

## Comment lancer le site en local

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur, ou
lancer un serveur statique pour que les chemins relatifs et le menu mobile
se comportent normalement :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Avec Claude Code : se placer dans ce dossier et demander d'éditer les pages
directement, en gardant le design system ci-dessous comme référence.

## Structure du projet

```
index.html              → page d'accueil (complète)
css/style.css           → design system + tous les styles du site
js/main.js              → menu burger mobile, accordéon FAQ, ombre header au scroll
pages/
  notre-histoire.html    → placeholder (contenu prêt, voir plus bas)
  sanda.html             → placeholder
  taolu.html             → placeholder
  equipe.html            → placeholder (contenu prêt, voir plus bas)
  cours-tarifs.html      → placeholder (contenu prêt, voir plus bas)
  palmares.html          → placeholder (contenu prêt, voir plus bas)
  agenda.html            → placeholder (contenu prêt, voir plus bas)
  contact.html           → TERMINÉE (formulaire + 3 localisations)
```

Toutes les pages partagent le même header (logo, nav desktop, burger mobile,
CTA "1er cours offert"), le même footer, et chargent `../css/style.css` et
`../js/main.js` (chemins relatifs car elles sont dans `pages/`).

## État d'avancement

- ✅ Page d'accueil : terminée (hero, profils Enfant/Adulte, 3 disciplines,
  3 dojos, bandeau palmarès, FAQ)
- ✅ Page Contact : terminée (formulaire nom/email/dojo/message + 3 cartes
  de localisation)
- ⏳ Toutes les autres pages : structure + header/footer/page-hero en place,
  contenu central à rédiger (placeholder "page en construction" pour l'instant)
- ⏳ Images : aucune image réelle encore intégrée — tous les visuels sont des
  blocs placeholder en CSS (dégradé + texte). À remplacer par les vraies
  photos (logo, coachs, dojos, compétitions) quand disponibles.

## Sitemap validée avec le client

1. **Accueil** (`index.html`)
2. **Notre Histoire** (`pages/notre-histoire.html`) — fusion des anciennes
   pages "Kung-Fu" (sens du mot Wushu/Kung Fu) + "Historique" (chronologie
   du club 2005 → 2024+) + mot du président
3. **Sanda** (`pages/sanda.html`) — boxe chinoise, page dédiée (séparée de Taolu)
4. **Taolu** (`pages/taolu.html`) — page dédiée
   - Gong Fang n'a pas de page dédiée (pas de cours dédié actuellement) :
     mentionné brièvement sur l'accueil et/ou dans Cours & Tarifs seulement
5. **L'Équipe** (`pages/equipe.html`)
6. **Cours & Tarifs** (`pages/cours-tarifs.html`) — planning des 3 dojos +
   tarifs 2025-2026 + FAQ pratique
7. **Palmarès** (`pages/palmares.html`) — résultats compétitions, organisés
   **chronologiquement, du plus récent au plus ancien**
8. **Agenda** (`pages/agenda.html`) — événements à venir
9. **Contact** (`pages/contact.html`) — terminée

Pages fusionnées / supprimées par rapport à l'ancien site : "Kung-Fu" et
"Taos" n'existent plus en tant que telles (voir ci-dessus pour où leur
contenu doit aller).

## Design system (à respecter sur toutes les nouvelles pages)

### Couleurs (variables CSS définies dans `:root`, `css/style.css`)

| Variable      | Hex       | Usage                                      |
|---------------|-----------|---------------------------------------------|
| `--ink`       | `#1a1410` | Fond header/footer, sections sombres        |
| `--lacquer`   | `#a8201a` | Rouge laque — CTA principal, accents forts   |
| `--gold`      | `#c9a13b` | Or — accents, CTA secondaire, liens sur fond sombre |
| `--paper`     | `#f3ede1` | Fond clair par défaut (body)                |
| `--jade`      | `#3f5d4e` | Vert jade — réservé succès/validation (peu utilisé) |
| `--white`     | `#fffdfa` | Blanc cassé pour cartes et texte sur fond sombre |

Palette volontairement martiale/traditionnelle, pas de gris froid ni de
couleurs criardes.

### Typographie

- **Display** (titres `h1`–`h4`) : `Cormorant` (serif, via Google Fonts) —
  élégant, légèrement gravé, évoque la calligraphie sans pastiche.
- **Corps** : `Inter` — neutre, très lisible sur mobile.
- Échelle définie en `clamp()` pour rester fluide entre mobile et desktop.

### Signature visuelle

Le séparateur de section `.brush-divider` (trait de pinceau en SVG, à
intégrer si besoin entre certaines sections) est l'élément distinctif du
site — préférer ça à des bordures asiatiques décoratives clichées.

### Composants déjà prêts dans `css/style.css`

- `.btn` + variantes (`btn-primary`, `btn-gold`, `btn-outline`, `btn-outline-dark`)
- `.eyebrow` — petit label au-dessus des titres de section
- `.section-head` (+ `.center`) — bloc titre + description de section
- `.card-grid` / `.discipline-card` — grille de cartes (3 colonnes desktop, 1 mobile)
- `.dojo-grid` / `.dojo-card` — grille des 3 dojos
- `.profile-split` / `.profile-card` — bloc Enfant/Adulte de l'accueil
- `.highlight-banner` — bandeau plein rouge (utilisé pour le palmarès sur l'accueil)
- `.faq-list` / `.faq-item` — accordéon FAQ (JS dans `main.js`)
- `.page-hero` — bandeau de titre en tête de chaque sous-page
- `.placeholder-page` — bloc générique "page en construction" (à retirer
  une fois chaque page complétée)
- `.contact-grid` / `.contact-form` / `.location-card` — page Contact

Tout est mobile-first : les règles par défaut sont pour mobile, les
`@media (min-width: ...)` ajoutent la mise en page desktop. Respecter cet
ordre pour toute nouvelle règle.

### CTA "1er cours offert"

Présent dans le header (desktop + mobile) de **toutes** les pages. Pointe
vers `contact.html#formulaire` (chemin relatif selon la profondeur :
`pages/contact.html#formulaire` depuis `index.html`, `contact.html#formulaire`
depuis les autres pages de `pages/`). Ne pas rediriger ce CTA vers
"Cours & Tarifs" — décision validée : il doit aller au formulaire de contact.

## Contenu déjà collecté, prêt à intégrer

Le client a fourni le contenu brut de l'ancien site. Résumé de ce qui doit
nourrir chaque page (texte à réécrire/reformater, pas à copier tel quel) :

### Notre Histoire
- Sens des mots Kung Fu / Gong Fu / Wushu (étymologie, à vulgariser)
- Chronologie : création le 02/06/2005 par Catherine Berriau Couillard et
  David Lenechet → arrivée Yann Dussol 2006 → ouverture Surzur 2006-2008 →
  comité élargi 2010 (Gouezin, Maupay, Menard, Batno) → ouverture Plaudren
  2015 → présidence Gérald Weber (déc. 2015) → présidence Antoine Chenel
  (déc. 2019, période Covid) → retour Gérald Weber (2024) → 2024 : ancienne
  élève porteuse de la flamme olympique à Vannes (06/06/2024) → 20e année du club
- Mot du président Gérald Weber (déplacé ici depuis l'accueil)

### L'Équipe
6 profils de coachs avec parcours martial détaillé et expérience sportive :
Yann Dussol (Surzur/Séné), Philippe Gouezin (Plaudren, arbitre national),
Vincent Menard (Surzur), Florent Le Digabel (Surzur), Clémence Maupay,
Candice Weber (Surzur, multiple championne de France, ambassadrice flamme
olympique 2024). Détails complets dans l'historique de conversation —
à mettre en cartes structurées (photo + nom + dojo + parcours + palmarès),
pas en bloc de texte comme l'ancien site.

### Cours & Tarifs
- Planning : Surzur (lundi 18h45-19h45 enfants, lundi 19h45-21h30 Sanda
  ados/adultes, jeudi 20h15-22h00 Sanda ados/adultes), Séné (Le Derf,
  horaires à confirmer), Plaudren (Ty An Holl, horaires à confirmer)
- Tarifs saison 2025-2026 : Enfant 155€, Adulte 210€, 2 enfants 260€,
  3 enfants 330€*, 1 adulte+1 enfant 340€, 1 adulte+2 enfants 400€*,
  2 adultes+2 enfants 500€* (*tarifs promotionnels)
- FAQ pratique déjà rédigée sur l'accueil — à dupliquer/étendre ici si besoin

### Palmarès
Très riche historique de résultats 2021→2026 (opens, championnats de
France, coupes de France, stages). À organiser **chronologiquement, du
plus récent au plus ancien**, avec mise en avant des titres de Championne
de France (Candice Weber, Klervie Ledan, etc.) et des podiums récents
(Vitrolles avril 2026, Saint-Marcel février 2026, etc.). Contenu complet
disponible dans l'historique de conversation avec le client — éviter le
copier-coller verbatim, reformater en fiches résultat par événement.

### Sanda / Taolu
Définitions courtes déjà présentes sur l'accueil (cartes disciplines) à
développer en pages complètes : technique, public concerné, niveau de
contact (Sanda = pieds/poings/projections, semi ou plein contact ; Taolu =
chorégraphies avec ou sans armes).

### Agenda
Prochain événement connu : Championnat National de Sanda Light, 25-26
avril 2026, Vitrolles (13), Gymnase Maurice Piot.

## Décisions produit actées avec le client (à ne pas re-discuter)

- Offre "1er cours gratuit/offert" confirmée → CTA omniprésent
- FAQ pratique sur l'accueil pour lever les freins à l'inscription
- Pas de témoignages clients pour le lancement
- Gong Fang n'a pas de page dédiée (pas de cours actif sur cette discipline)
- Palmarès = ordre chronologique décroissant (récent → ancien), pas de
  regroupement par type de compétition

## Prochaines étapes suggérées

1. Récupérer logo réel, photos des coachs, photos des dojos et de
   compétitions (actuellement tout est en placeholder visuel)
2. Rédiger/intégrer le contenu des 6 pages restantes en s'appuyant sur la
   section "Contenu déjà collecté" ci-dessus
3. Remplacer les blocs `.placeholder-page` une fois chaque page terminée
4. Tester sur mobile réel (iPhone notamment — c'était le problème n°1 de
   l'ancien site) à chaque étape
5. Envisager d'extraire header/footer en partials si le projet passe sur un
   générateur de site statique (actuellement dupliqués dans chaque .html
   par simplicité, volontairement, pour rester en HTML pur sans build)
