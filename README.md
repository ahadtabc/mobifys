# Mobifys.store

A full-stack e-commerce web application built with a React (Vite) frontend and an Express + MongoDB backend following an MVC + service-layer architecture.

## Tech Stack

| Layer        | Stack                                                                 |
| ------------ | --------------------------------------------------------------------- |
| Frontend     | React (Vite), React Router, Redux Toolkit, Axios, Lucide React, React Hot Toast, modular CSS |
| Backend      | Node.js (ES Modules), Express 5, MongoDB (Mongoose), Multer           |
| Auth         | Scoped JWT (access + rotating refresh HttpOnly cookies), OTP email, Passport Google OAuth 2.0, `bcryptjs` |
| Storage/Mail | AWS S3 (`@aws-sdk/client-s3`) with local `/uploads` fallback, Nodemailer |

## Repository Layout

```text
mobifys/
├── frontend/                     # React client (Vite)
│   └── src/
│       ├── api/                  # Axios instance & token refresh interceptor
│       ├── assets/               # Static assets
│       ├── components/           # Shared, admin, and user layout/modal components
│       ├── pages/
│       │   ├── admin/            # Admin auth, dashboard, UsersList, UserDetails
│       │   └── user/             # Storefront, auth/OTP, profile, addresses
│       ├── redux/                # Store and auth slice
│       └── utils/                # Client helpers
├── backend/                      # Express API (MVC + service layer)
│   ├── server.js                 # Entry point
│   ├── seedAdmin.js              # Default admin seeder
│   ├── .env.example              # Environment variable template
│   ├── README.md                 # Backend architecture notes
│   └── src/
│       ├── app.js                # Express app & middleware wiring
│       ├── config/               # DB, env, Passport, and S3 configuration
│       ├── controllers/          # admin/ and user/ HTTP handlers
│       ├── middlewares/          # Auth guards, error handler, Multer upload
│       ├── models/               # Address, Otp, RefreshToken, User schemas
│       ├── routes/               # /api route definitions (admin/ & user/)
│       ├── services/             # Business logic layer
│       ├── templates/            # HTML email templates
│       ├── utils/                # ApiError, asyncHandler, tokens, serializers
│       └── validators/           # Request validation helpers
├── docs/
│   └── tasks/module-16/          # Module 16 task documentation
├── CONTRIBUTING.md               # Git workflow for this repository
├── .gitattributes
└── .gitignore
```

## Implemented Features (Module 16)

### User Storefront & Account
- **Authentication**: Email/password signup with validation and 6-digit email OTP verification, login with Remember Me support, Google OAuth 2.0 SSO, and OTP-based forgot/reset password.
- **Profile Management**: View and edit account details, upload profile avatar (AWS S3 or local `/uploads` fallback), change password with visibility toggles, and perform a 2-step OTP email update.
- **Address Management**: Create, update, and delete Indian delivery addresses with confirmation dialogs and field validation.

### Admin Console
- **Admin Auth**: Dedicated admin login and OTP password reset flow isolated from storefront user cookies.
- **User Management**: Searchable and filterable users table (`UsersList`) with status counts, account detail inspection (`UserDetails`), and block/unblock toggle with confirmation modal.

### Security & Session Architecture
- Separate user and admin JWT access/refresh secret pairs (`mobifys_user_*` and `mobifys_admin_*`) delivered via `HttpOnly` cookies.
- Mongo-backed rotating refresh tokens with password-change invalidation.
- Frontend Axios interceptor handles single-flight token refresh on expired access tokens.

## API Route Groups

All routes are mounted under `/api` (see [backend/src/routes/index.js](./backend/src/routes/index.js)):

| Base Path             | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `/api/health`         | API health check                             |
| `/api/user/auth`      | User signup, OTP verification, login, Google OAuth, password reset, refresh/logout |
| `/api/user/profile`   | User profile retrieval, update, avatar upload, email OTP change |
| `/api/user/addresses` | User delivery address CRUD                   |
| `/api/admin/auth`     | Admin login, OTP reset, refresh, logout      |
| `/api/admin/users`    | Admin user listing, details, block/unblock   |

## Quick Start

### 1. Backend Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Update `backend/.env` with your MongoDB URI, email/OAuth/S3 credentials (if used), and strong random hex secrets (for example via `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`).

Key environment variables defined in [backend/.env.example](./backend/.env.example):
- `PORT` (default `3001`), `NODE_ENV`, `MONGO_URI`, `CLIENT_URL` (default `http://localhost:5173`)
- `JWT_USER_ACCESS_SECRET`, `JWT_USER_REFRESH_SECRET`, `JWT_ADMIN_ACCESS_SECRET`, `JWT_ADMIN_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`, `JWT_REMEMBER_REFRESH_EXPIRES_IN`, `COOKIE_SECRET`
- `EMAIL_USER`, `EMAIL_PASS`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`

Seed the default super admin account (`admin@mobifys.in`) and start the backend server:

```powershell
npm run seed
npm run dev
```

Backend runs on `http://localhost:3001`. Available scripts in `backend/package.json`: `npm run start`, `npm run dev`, `npm run seed`.

### 2. Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. Available scripts in `frontend/package.json`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

## Branching Model

| Branch      | Purpose                                           |
| ----------- | ------------------------------------------------- |
| `main`      | Stable, working code. Only merged from `develop`. |
| `develop`   | Integration branch. All features land here first. |
| `feature/*` | One branch per task, created from `develop`.      |

Current module: **Module 16 — Admin Side & User Side**.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for Git workflow guidelines and [backend/README.md](./backend/README.md) for backend layer details.
