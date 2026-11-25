# Mobifys.store

A full-stack e-commerce application.

| Layer    | Stack                                                    |
| -------- | -------------------------------------------------------- |
| Frontend | React (Vite), React Router, Tailwind CSS                 |
| Backend  | Node.js, Express, MongoDB (Mongoose), AWS S3 for images  |
| Auth     | JWT (access + refresh cookies), OTP email, Google SSO        |
| Docs     | Postman collection, Figma designs, Eraser diagram        |

## Repository layout

```
Mobify.store/
├── frontend/            # React client (Vite)
├── backend/             # Express API, MVC + service layer
├── docs/
│   └── tasks/           # One checklist per module task
├── CONTRIBUTING.md      # Git workflow for this repo (read this first)
├── .gitattributes
└── .gitignore
```

## Quick start

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Backend**

```bash
cd backend
npm install
Copy-Item .env.example .env   # then fill in your values
npm run dev
```

## Branching model

| Branch     | Purpose                                              |
| ---------- | ---------------------------------------------------- |
| `main`     | Stable, working code. Only merged from `develop`.    |
| `develop`  | Integration branch. All features land here first.    |
| `feature/*`| One branch per task, created from `develop`.         |

Current module: **Module 16 — Admin Side & User Side**.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the exact commands.
