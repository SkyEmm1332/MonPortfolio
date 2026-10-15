# Problèmes corrigés — À consulter AVANT toute modification

Ce fichier liste les problèmes déjà rencontrés et corrigés sur le site.
**Ne jamais annuler une correction existante en corrigeant un autre problème.**
Toujours vérifier ici si un comportement semble étrange : il a peut-être une raison.

---

## Timeline (section Expériences / Réalisations)

### 1. Oscillation du scroll pendant les animations
- **Symptôme** : le scroll rebondit/oscille pendant les zooms et dézooms (pas de 20-150px vers l'arrière)
- **Cause** : le code écrivait directement dans les internes de Lenis (`targetScroll`, `animatedScroll`, `velocity`) à chaque frame, et `lockFloor` pouvait redescendre
- **Solution** : `lenis.stop()` pendant le hold (fige proprement), `lenis.start()` à la libération. Ne JAMAIS réécrire les internes de Lenis directement
- **Fichier** : index.html, bloc clamp (chercher `lenis.stop()`)

### 2. Le scroll disparaît / mouvement gauche-droite au zoom
- **Symptôme** : la barre de défilement (scrollbar) disparaît pendant l'animation, le contenu se décale de ~15px
- **Cause** : `lenis.stop()` applique `overflow:clip` sur html → la scrollbar disparaît
- **Solution** : `document.documentElement.style.overflowY = 'scroll'` pendant le stop (inline, prioritaire), retiré après
- **Ne pas toucher** : `html{overflow-x:hidden;overflow-y:scroll}` en début de CSS (body ne doit PAS avoir overflow — sinon le sticky des cartes casse)

### 3. Hold bloqué sur mobile (impossible d'avancer)
- **Symptôme** : sur mobile, l'animation de R1 reste bloquée, impossible de descendre
- **Cause** : `blockScroll` ne cumulait que `e.deltaY` (molette) → sur touchmove aucun delta → le hold ne se libérait jamais
- **Solution** : gestion du touch — `touchstart` capture `lastTouchY`, `touchmove` calcule `lastTouchY - clientY` et cumule si > 0
- **Fichier** : index.html, fonction `blockScroll`

### 4. Les badges apparaissent pendant l'animation des R (mobile)
- **Symptôme** : les badges "Réalisation X" s'affichent en même temps que le zoom/dézoom
- **Cause** : `badges[i].style.opacity = badgeShow ? 1 : S.pins[i]` → quand badgeShow=0, l'opacité suivait le pin du zoom actif
- **Solution** : mobile → `visited[i] && S.ps[i] < 0.05` (le badge n'apparaît qu'après la fin complète de l'animation de la R) ; opacity = `badgeShow ? 1 : 0` (plus S.pins)
- **Desktop inchangé** : `visited[i] || S.pins[i] > 0.02`

### 5. Chevauchement E1 et son dot pendant le zoom des R
- **Symptôme** : la première expérience et son cercle restent visibles sous les infos R
- **Cause** : `LIST_X` réduit à 25 (desktop) → les E ne sortaient plus assez de l'écran
- **Solution** : `LIST_X = 108` (desktop ET mobile) → les E sortent complètement pendant le zoom
- **Ne pas réduire LIST_X en dessous de 108**

### 6. Mélange des infos R pendant les transitions
- **Symptôme** : R1 et R2 semi-visibles en même temps pendant le passage
- **Cause** : seuil d'opacité trop permissif (`cl((ps-0.2)/0.5)`) + infos trop larges (1060px)
- **Solution** : `cl((S.ps[i] - 0.45) / 0.35)` (seuil net) + largeur `min(820px, calc(100vw - 480px))`
- **Ne pas élargir les infos ni baisser le seuil d'opacité**

### 7. L'animation se déclenche automatiquement / se dézoome seule
- **Cause** : le hold se libérait sur le temps (`H_MIN * 0.4` seul)
- **Solution** : le hold ne se libère QUE par le scroll de l'utilisateur (`userScrollRelease` posé par blockScroll quand le cumul atteint ADVANCE=40px)
- **Ne pas remettre de libération automatique par le temps**

---

## Cartes empilées (section Compétences)

### 8. Animation d'empilement (sticky) cassée
- **Symptôme** : les cartes ne s'empilent plus (pas de sticky) OU les cartes ont un décalage de 88px
- **Cause double** :
  1. `.our-services` (parent) était `position:sticky` → double sticky, l'enfant ne colle pas → il faut `.our-services{position:static}` sur mobile
  2. `body{overflow-x:hidden}` crée un contexte de scroll sur body → casse le sticky → `overflow` seulement sur `html`
- **Solution** : sticky sur `.stacking-card` (top:88px, top:0 sous nav-hidden), parent static, overflow sur html uniquement
- **Ne jamais mettre overflow sur body**

### 9. Navbar qui disparaît dans la section cartes
- **Comportement voulu** : la navbar disparaît UNIQUEMENT en scrollant vers le bas dans la section compétences (jusqu'aux certifications), avec hystérésis (seuil 4px) pour éviter les oscillations
- **Script** : chercher `nav-hidden` dans index.html
- **Mobile uniquement** : le script a un garde `if (window.innerWidth >= 992) return`

### 10. Badges des cartes confondus avec les titres
- **Cause** : `.stacking-cards__item-top` en position absolute (desktop) chevauchait le h3
- **Solution** : sur mobile, `position:static; width:100%; justify-content:flex-start` (badges à gauche au-dessus des titres)

---

## Encodage & affichage

### 11. Mojibake (Ã©, â€", Â«, etc.)
- **Cause** : double-encodage UTF-8 de textes en clair (é, —, ', «)
- **Solution** : remplacer par les vrais caractères (é, —, ', «). Vérifier avec un scan des fichiers
- **Commande de vérification** : chercher `Ã`, `â€`, `Â«` dans index.html

### 12. Le CSS s'affichait comme texte avant le site
- **Cause** : balise `<style>` ouvrante manquante après `<head>`
- **Solution** : toujours vérifier l'appariement `<style>`/`</style>` après une modification du début du fichier

---

## Divers

### 13. Favicon ORBIX
- **Solution** : `img/favicon.png` = "S" blanc en police Caveat sur fond rouge #ff2e2e (comme le logo Skyemmvnl)
- Titre : "Skyemmvnl — Portfolio"

### 14. R8 (Refonte v2 portfolio)
- **Comportement voulu** : pas d'image ni de bouton (titre + description uniquement)

### 15. Hero mobile
- **Comportement voulu** : image au-dessus du contenu (static, centrée, 70vw max 280px), mots DEV/APP WEB/PROJET/<CODE> centrés, "Développeur Web · Gestionnaire de projets" SOUS le bloc `$ cd Abidjan`, sans "Titi"

### 16. Cartes outils
- **Comportement voulu** : toutes les mêmes tailles (178px desktop, 140px mobile), noms tronqués avec ellipsis si trop longs

---

## Règles générales
1. **TOUJOURS tester après chaque modification** : desktop (1400px) ET mobile (390px) — parcours R1→R8, 0 erreur JS, pas de débordement
2. **Ne jamais "corriger" un problème en cassant une correction listée ici**
3. Les scripts de test sont dans le dossier temp (pptr) — relancer les vérifications clés :
   - parcours complet (R1→R8 vues, 8/8 visited)
   - 0 rebond de scroll
   - badges visibles seulement après l'animation (mobile)
   - cartes empilées sticky fonctionnelles
