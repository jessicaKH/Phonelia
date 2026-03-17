# 🧠 Phonelia – Full Prototype Specification (MVP)

---

# 🎯 OBJECTIF DU PROTOTYPE

Créer un prototype interactif réaliste permettant de démontrer :

- Le workflow complet orthophoniste → enfant
- La gestion multi-patients
- La prescription d’exercices
- L’expérience enfant (gamifiée + IA simulée)
- Le suivi et reporting

⚠️ Pas de vraie IA → comportements simulés avec données mock

---

# 👥 UTILISATEURS

## 1. Orthophoniste (Web – style SaaS)
- Gestion patients
- Prescription exercices
- Analyse progrès

## 2. Enfant (App – style application tablette)
- Interface ludique
- Exercices interactifs
- Feedback immédiat

---

# 🎨 DESIGN SYSTEM

## Palette (basée sur ton logo)

- 🔵 Primary: #4F6BED (bleu doux)
- 🟣 Secondary: #8A6FF1 (violet)
- 🟢 Success: #34C759
- 🔴 Error: #FF3B30
- 🟡 Accent: #FFC857
- ⚪ Background: #F7F9FC
- ⚫ Text: #1F2937

## Style
- Rounded UI (border-radius 16px)
- Soft shadows
- Minimaliste, médical + friendly
- Icônes simples (outline)

---

# 🧱 ARCHITECTURE

## Web (Orthophoniste)
- Layout type dashboard SaaS
- Sidebar + content

## App (Enfant)
- Plein écran
- UI type mobile/tablette
- Boutons larges

---

# 🧑‍⚕️ PARTIE ORTHOPHONISTE (WEB)

## 🔐 Login
- Email / password

---

## 📊 Dashboard principal

### Contenu :
- Nombre de patients
- Activité récente
- Progression moyenne

---

## 👥 PAGE : PATIENTS (IMPORTANT)

### Objectif :
Voir tous les patients + accès rapide

### UI :
- Grille de cartes patients

### Chaque carte :
- Nom (Lucas)
- Âge
- Problème principal ("R")
- Progression (%)
- Bouton "Voir profil"

---

## 👤 PAGE : PROFIL PATIENT

⚠️ Template unique → données changent

### Sections :

### 1. Header
- Nom
- Âge
- Difficultés

---

### 2. Dashboard rapide
- Progression globale
- Nb sessions
- Dernière activité

---

### 3. 📊 Progression
- Graph (mock)
- Score par phonème

---

### 4. 📚 Activités réalisées
- Liste :
  - Nom exercice
  - Score
  - Date

---

### 5. 🎥 Sessions (IMPORTANT)
- Cards visuelles :
  - Aperçu (thumbnail mock)
  - Score
  - Durée
  - Bouton "Voir détails"

---

### 6. 🧠 Insights IA (mock)
- "Difficulté persistante sur R"
- "Amélioration sur CH"

---

## ➕ PAGE : PRESCRIRE EXERCICE

### UI : Formulaire simple + rapide

---

### 1. Sélection phonèmes (menu rapide)
- Boutons :
  - R
  - S
  - CH
  - L
  - etc.

Multi-select

---

### 2. Type d’activité
- Répétition
- Lecture
- Jeu sonore
- Imitation bouche

---

### 3. Niveau
- Débutant
- Intermédiaire
- Avancé

---

### 4. Thème
- Pirate
- Animaux
- Espace

---

### 5. Bouton :
➡️ "Générer exercice"

---

### Output :
- Exercice créé
- Assigné au patient

---

# 👶 PARTIE ENFANT (APP)

## 🎮 UX GLOBAL
- Interface ludique
- Gros boutons
- Feedback immédiat

---

## 🏠 Home

- Avatar enfant
- Message :
  "Prêt pour aujourd’hui ?"

- Liste exercices :
  - Pirate R
  - Jungle CH

Bouton :
➡️ Start

---

# 🔁 FLOW EXERCICE COMPLET

---

## 1. Introduction

Exemple :
"Le pirate Robert cherche un trésor…"

---

## 2. Exercice répétition mot (IMPORTANT)

### UI :

- Image : Pirate
- Mot affiché : **"ROBOT"**
- Bouton 🎤

---

## Interaction :

User clique → enregistre

---

## 3. Simulation IA

### Cas 1 : Correct
- ✅ "Bravo !"
- Animation

### Cas 2 : Incorrect
- ❌ "Essaie encore"
- Indication :
  "Fais vibrer ta langue"

---

## 4. Visual feedback (important)

- Animation bouche (mock)
- Option caméra :
  "Compare ta bouche"

---

## 5. Score écran

- Score : 75/100
- Mots réussis : 6/10

---

## 6. Fin

- 🎉 encouragement
- Déblocage next exercice

---

# 📊 DATA MOCK

```json
patients = [
  {
    "name": "Lucas",
    "age": 7,
    "phoneme": "R",
    "progress": 60
  },
  {
    "name": "Emma",
    "age": 8,
    "phoneme": "CH",
    "progress": 85
  }
]
🧭 ROUTES
Web

/login

/dashboard

/patients

/patient/:id

/exercise/create

App

/home

/exercise/:id

/result

⚙️ TECHNO RECOMMANDÉE
🔥 Best stack (prototype rapide)

React + Next.js

Tailwind CSS

Zustand (state simple)

Framer Motion (animations)

Alternative no-code style

Claude → générer UI React directement

🧩 COMPORTEMENT

Navigation clickable

Données statiques

Feedback simulé

🎯 OBJECTIF FINAL

Démo réaliste

Flow complet

Compréhension produit

Support pitch

🚀 BONUS (si possible)

Micro animation

Fake caméra preview

Sons feedback