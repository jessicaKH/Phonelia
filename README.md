# Phonelia

Prototype interactif d'une application d'orthophonie pour enfants.

## Concept

Phonelia connecte orthophonistes et enfants autour d'exercices de phonologie gamifiés.

**Interface orthophoniste (web)** — dashboard SaaS pour gérer les patients, prescrire des exercices et suivre la progression.

**Interface enfant (app)** — expérience ludique sur tablette avec feedback simulé (IA mock).

## Stack

- [Next.js 14](https://nextjs.org/) — framework React
- [Tailwind CSS](https://tailwindcss.com/) — styles
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Recharts](https://recharts.org/) — graphiques

## Installation

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Routes

| Interface | Route |
|---|---|
| Login | `/login` |
| Dashboard orthophoniste | `/dashboard` |
| Patients | `/patients` |
| Profil patient | `/patient/:id` |
| Créer exercice | `/exercise/create` |
| Home enfant | `/home` |
| Exercice | `/exercise/:id` |
| Résultats | `/result` |
