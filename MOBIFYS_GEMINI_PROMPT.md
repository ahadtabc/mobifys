# Mobifys.store — Complete Project Context & Source Code Export for Google Gemini

> **How to use this in Google Gemini (Chrome Browser):**
> 1. Open **https://gemini.google.com** in Google Chrome.
> 2. Click **+** (Add files) and upload this file (`MOBIFYS_GEMINI_PROMPT.md`).
> 3. Copy and send the **Starter Prompt** below alongside the uploaded file.

---

## Starter Prompt to Copy-Paste into Gemini

```text
I have attached the complete Mobifys.store project export (MOBIFYS_GEMINI_PROMPT.md), including the architecture, database schemas, API routes, frontend routes, and every source code file verbatim.

Please read the entire attached file carefully and confirm you understand:
1. The Express + MongoDB backend (MVC + service + validator layers, scoped user/admin JWT cookies with refresh token rotation, OTP verification, Google OAuth 2.0, AWS S3 / local upload fallback).
2. The React (Vite) + Redux Toolkit + React Router + React Hook Form frontend (User Storefront and Admin Console).
3. All recent updates: split User Forgot Password -> Verify OTP -> Reset Password pages, blocked-user forced logout across backend/frontend, User/Users naming across admin management, Otp.email field, and removal of mustChangePassword.

Wait for my next instruction before generating code, or ask clarifying questions if needed. Always follow the exact conventions, file structure, validators, and styling already used in this codebase.
```

---

## Complete Project Overview

- **Project Name**: `mobifys.store` (Module 16 — User Side & Admin Side)
- **Exported Source Files**: 112 text/code files (439.9 KB total)
- **Excluded Intentionally**:
  - `backend/.env` (private secrets excluded for security — `backend/.env.example` is included in full)
  - `node_modules/`, `frontend/dist/`, `.git/`, `package-lock.json` (generated/dependency artifacts)
- **Architecture Summary**:
  - **Backend**: Node.js (ES Modules), Express 5, Mongoose 9, Passport Google OAuth 2.0, Nodemailer, AWS S3 SDK v3 (with local disk fallback), `bcryptjs`, `jsonwebtoken`.
  - **Frontend**: React 19, Vite 8, React Router 7, Redux Toolkit, Axios (with single-flight token refresh + forced logout on `ACCOUNT_BLOCKED`), React Hook Form, Lucide React, React Hot Toast, Tailwind CSS / modular CSS.
  - **Auth & Security**:
    - Scoped HttpOnly cookies: `mobifys_user_access_token` / `mobifys_user_refresh_token` and `mobifys_admin_access_token` / `mobifys_admin_refresh_token`.
    - Rotating Mongo-backed `RefreshToken` families with reuse detection and `passwordChangedAt` invalidation.
    - Blocked-user enforcement (`isBlocked || status === "blocked"`): revokes tokens, clears cookies, returns `403` with `code: "ACCOUNT_BLOCKED"`, and force-logs out the frontend Redux session + redirects to `/login`.
    - User forgot-password flow split into 3 separate pages/routes: `/forgot-password` -> `/forgot-password/verify-otp` (`POST /api/user/auth/verify-otp`) -> `/reset-password` (`POST /api/user/auth/reset-password` guarded by verified OTP window).

---

## Complete File Index (112 Source Files + 2 Binary/Asset Files)

### Source & Config Files Included Verbatim Below
1. `.gitattributes` (348 bytes)
2. `.gitignore` (158 bytes)
3. `CONTRIBUTING.md` (6917 bytes)
4. `README.md` (6782 bytes)
5. `docs/tasks/module-16/01-admin-signin.md` (3303 bytes)
6. `docs/tasks/module-16/02-admin-user-management.md` (4754 bytes)
7. `docs/tasks/module-16/03-user-home-page.md` (3598 bytes)
8. `docs/tasks/module-16/04-user-auth.md` (4626 bytes)
9. `docs/tasks/module-16/05-user-otp.md` (4256 bytes)
10. `docs/tasks/module-16/06-user-sso.md` (3992 bytes)
11. `docs/tasks/module-16/07-user-forgot-password.md` (3486 bytes)
12. `docs/tasks/module-16/README.md` (3405 bytes)
13. `backend/.env.example` (1317 bytes)
14. `backend/.gitignore` (224 bytes)
15. `backend/package.json` (787 bytes)
16. `backend/README.md` (2602 bytes)
17. `backend/seedAdmin.js` (869 bytes)
18. `backend/server.js` (274 bytes)
19. `backend/src/app.js` (965 bytes)
20. `backend/src/config/db.js` (378 bytes)
21. `backend/src/config/env.js` (2426 bytes)
22. `backend/src/config/passport.js` (1901 bytes)
23. `backend/src/config/s3.js` (286 bytes)
24. `backend/src/controllers/admin/adminAuthController.js` (6112 bytes)
25. `backend/src/controllers/admin/userManagementController.js` (1198 bytes)
26. `backend/src/controllers/user/addressController.js` (1678 bytes)
27. `backend/src/controllers/user/authController.js` (4663 bytes)
28. `backend/src/controllers/user/profileController.js` (3701 bytes)
29. `backend/src/middlewares/authMiddleware.js` (2150 bytes)
30. `backend/src/middlewares/errorMiddleware.js` (1149 bytes)
31. `backend/src/middlewares/uploadMiddleware.js` (404 bytes)
32. `backend/src/models/Address.js` (1322 bytes)
33. `backend/src/models/Otp.js` (977 bytes)
34. `backend/src/models/RefreshToken.js` (1194 bytes)
35. `backend/src/models/User.js` (2368 bytes)
36. `backend/src/routes/admin/adminAuthRoutes.js` (1511 bytes)
37. `backend/src/routes/admin/userManagementRoutes.js` (441 bytes)
38. `backend/src/routes/index.js` (775 bytes)
39. `backend/src/routes/user/addressRoutes.js` (443 bytes)
40. `backend/src/routes/user/authRoutes.js` (1469 bytes)
41. `backend/src/routes/user/profileRoutes.js` (881 bytes)
42. `backend/src/services/addressService.js` (2333 bytes)
43. `backend/src/services/adminAuthService.js` (3556 bytes)
44. `backend/src/services/emailService.js` (1099 bytes)
45. `backend/src/services/otpService.js` (1610 bytes)
46. `backend/src/services/profileService.js` (5244 bytes)
47. `backend/src/services/s3Service.js` (2308 bytes)
48. `backend/src/services/tokenService.js` (10315 bytes)
49. `backend/src/services/userAuthService.js` (5991 bytes)
50. `backend/src/services/userManagementService.js` (3496 bytes)
51. `backend/src/templates/emailTemplates.js` (1573 bytes)
52. `backend/src/utils/ApiError.js` (223 bytes)
53. `backend/src/utils/asyncHandler.js` (134 bytes)
54. `backend/src/utils/generateToken.js` (366 bytes)
55. `backend/src/utils/serializers.js` (446 bytes)
56. `backend/src/validators/addressValidator.js` (4634 bytes)
57. `backend/src/validators/authValidator.js` (3722 bytes)
58. `frontend/.gitignore` (253 bytes)
59. `frontend/eslint.config.js` (568 bytes)
60. `frontend/index.html` (359 bytes)
61. `frontend/package.json` (934 bytes)
62. `frontend/README.md` (1027 bytes)
63. `frontend/src/api/axiosInstance.js` (3001 bytes)
64. `frontend/src/App.jsx` (8664 bytes)
65. `frontend/src/components/admin/AdminLayout.css` (9090 bytes)
66. `frontend/src/components/admin/AdminLayout.jsx` (8300 bytes)
67. `frontend/src/components/admin/BlockConfirmModal.css` (2193 bytes)
68. `frontend/src/components/admin/BlockConfirmModal.jsx` (2032 bytes)
69. `frontend/src/components/OtpInput.css` (973 bytes)
70. `frontend/src/components/OtpInput.jsx` (2853 bytes)
71. `frontend/src/components/user/UserLayout.css` (16521 bytes)
72. `frontend/src/components/user/UserLayout.jsx` (16467 bytes)
73. `frontend/src/index.css` (846 bytes)
74. `frontend/src/main.jsx` (1144 bytes)
75. `frontend/src/pages/admin/AdminDashboard.jsx` (0 bytes)
76. `frontend/src/pages/admin/AdminForgotPassword.css` (1265 bytes)
77. `frontend/src/pages/admin/AdminForgotPassword.jsx` (12882 bytes)
78. `frontend/src/pages/admin/AdminLogin.css` (4379 bytes)
79. `frontend/src/pages/admin/AdminLogin.jsx` (4955 bytes)
80. `frontend/src/pages/admin/AdminProfile.css` (10987 bytes)
81. `frontend/src/pages/admin/AdminProfile.jsx` (31711 bytes)
82. `frontend/src/pages/admin/UserDetails.css` (3622 bytes)
83. `frontend/src/pages/admin/UserDetails.jsx` (4949 bytes)
84. `frontend/src/pages/admin/UsersList.css` (8192 bytes)
85. `frontend/src/pages/admin/UsersList.jsx` (11975 bytes)
86. `frontend/src/pages/user/AddressFormPage.css` (2109 bytes)
87. `frontend/src/pages/user/AddressFormPage.jsx` (13173 bytes)
88. `frontend/src/pages/user/EditProfile.css` (9853 bytes)
89. `frontend/src/pages/user/EditProfile.jsx` (29116 bytes)
90. `frontend/src/pages/user/HomePage.css` (3451 bytes)
91. `frontend/src/pages/user/HomePage.jsx` (3749 bytes)
92. `frontend/src/pages/user/ManageAddresses.css` (5395 bytes)
93. `frontend/src/pages/user/ManageAddresses.jsx` (8035 bytes)
94. `frontend/src/pages/user/UserComingSoon.css` (137 bytes)
95. `frontend/src/pages/user/UserComingSoon.jsx` (161 bytes)
96. `frontend/src/pages/user/UserForgotPassword.css` (31 bytes)
97. `frontend/src/pages/user/UserForgotPassword.jsx` (3088 bytes)
98. `frontend/src/pages/user/UserLogin.css` (4047 bytes)
99. `frontend/src/pages/user/UserLogin.jsx` (6097 bytes)
100. `frontend/src/pages/user/UserProfile.css` (7540 bytes)
101. `frontend/src/pages/user/UserProfile.jsx` (8769 bytes)
102. `frontend/src/pages/user/UserResetPassword.jsx` (5643 bytes)
103. `frontend/src/pages/user/UserSignup.css` (1266 bytes)
104. `frontend/src/pages/user/UserSignup.jsx` (10465 bytes)
105. `frontend/src/pages/user/UserVerifyResetOtp.jsx` (4575 bytes)
106. `frontend/src/pages/user/VerifyEmailOtp.css` (771 bytes)
107. `frontend/src/pages/user/VerifyEmailOtp.jsx` (5374 bytes)
108. `frontend/src/redux/slices/authSlice.js` (792 bytes)
109. `frontend/src/redux/store.js` (187 bytes)
110. `frontend/src/utils/copyTextToClipboard.js` (238 bytes)
111. `frontend/src/utils/formValidation.js` (8917 bytes)
112. `frontend/vite.config.js` (163 bytes)

### Binary / Static Assets (Paths & Sizes)
- `frontend/public/favicon.svg` (9522 bytes)
- `frontend/src/assets/mobifys-logo.png` (2996 bytes)

---

## Complete Source Code (Every File Verbatim)

### `.gitattributes`
- **Size**: 348 bytes | **Lines**: 20

```text
# Normalize line endings so Windows and Linux contributors stay in sync.
* text=auto eol=lf

# Windows scripts keep CRLF.
*.bat text eol=crlf
*.cmd text eol=crlf

# Binary files are never converted.
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.webp binary
*.avif binary
*.pdf binary
*.zip binary
*.woff binary
*.woff2 binary
```

### `.gitignore`
- **Size**: 158 bytes | **Lines**: 15

```text
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/

# Logs & OS files
*.log
.DS_Store
Thumbs.db
```

### `CONTRIBUTING.md`
- **Size**: 6917 bytes | **Lines**: 206

````markdown
# Contributing to Mobifys.store

This guide is written for someone using Git for the first time on a real project.
Follow it top to bottom and you cannot get lost.

---

## 1. The mental model

```
main        ●────────────●──────────────●   (only stable, working code)
             \          /              /
develop       ●──●──●──●──●──●──●──●──●     (all finished tasks meet here)
                 \    /      \    /
feature/*         ●──●        ●──●          (one task per branch)
```

- **`main`** — what you would show a customer. Never commit directly here.
- **`develop`** — the integration branch. Every feature merges here first.
- **`feature/...`** — one branch per task. This is where you actually write code.

---

## 2. Every time you start working

```bash
git switch develop          # go to develop
git pull origin develop     # get the newest version
git switch -c feature/module-16-admin-signin   # create your task branch
```

Then open the matching file in `docs/tasks/module-16/` and work through the checklist.

---

## 3. Saving your work (do this often)

```bash
git status                  # what did I change?
git diff                    # what exactly changed?
git add .                   # stage everything you want to keep
git commit -m "feat(admin-auth): add admin login endpoint"
git push -u origin feature/module-16-admin-signin   # first push of a branch
git push                    # every push after that
```

> `git add .` also stages things you may not want. Run `git status` first, and if a
> file should never be committed, add it to `.gitignore` instead of committing it.

### Never commit these

- `.env` files (secrets, passwords, API keys) — `.gitignore` already blocks them
- `node_modules/`
- `dist/` or `build/` output
- Files you are only testing with

If you accidentally committed a secret, change the secret immediately. Removing the
commit is not enough — it stays in the history.

---

## 4. Commit message format

```
<type>(<scope>): <short description>
```

| Type       | Use it when...                                          |
| ---------- | ------------------------------------------------------- |
| `feat`     | You add a new feature (endpoint, page, button)          |
| `fix`      | You fix a bug                                           |
| `docs`     | Documentation only                                      |
| `style`    | Formatting, spacing, semicolons — no logic change       |
| `refactor` | Code restructure without changing behaviour             |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or fixing tests                                  |
| `build`    | Dependencies, bundler, package.json                     |
| `chore`    | Setup, config, anything that fits nowhere else          |

**Scope** = the part of the app: `admin-auth`, `admin-users`, `user-auth`, `user-otp`,
`user-sso`, `user-profile`, `user-address`, `user-home`, `backend`, `frontend`, `repo`.

**Rules for the description**

1. Use the imperative: "add", not "added" or "adds".
2. Lowercase first letter, no full stop at the end.
3. Keep the whole line under 72 characters.
4. Say *what* and *why*, not "update code" or "changes".

Good:

```
feat(admin-users): add block and unblock user endpoints
feat(admin-users): add search and pagination to user list
fix(user-otp): restart resend timer after successful resend
docs(module-16): add admin sign-in task checklist
```

Bad:

```
updated stuff
feat: changes
Fixed the bug.
final code
```

Need a second line of detail? Leave one blank line after the title:

```
feat(admin-users): add search with cancel support

Search matches name or email and is case-insensitive.
```

---

## 5. Branch naming

```
<type>/<module>-<short-task-name>
```

| Example                                    | Meaning                              |
| ------------------------------------------ | ------------------------------------ |
| `feature/module-16-admin-signin`           | Admin sign-in page + API             |
| `feature/module-16-admin-user-management`  | Block/unblock, search, pagination    |
| `feature/module-16-user-otp`               | OTP signup with timer and resend     |
| `fix/module-16-otp-timer-reset`            | Bug fix on the OTP timer             |
| `chore/module-16-add-eslint`               | Tooling, no product change           |

Rules: lowercase, hyphens instead of spaces, no spaces, no uppercase.

---

## 6. Finishing a task

```bash
git switch develop
git pull origin develop
git merge --no-ff feature/module-16-admin-signin -m "merge: admin signin into develop"
git push origin develop
git branch -d feature/module-16-admin-signin              # delete locally
git push origin --delete feature/module-16-admin-signin   # delete on GitHub
```

`--no-ff` keeps a visible "this was one task" bubble in the history — helpful when
you look back and ask "when did admin sign-in get added?".

When the whole module is done and tested, promote `develop` to `main`:

```bash
git switch main
git pull origin main
git merge --no-ff develop -m "chore(release): merge module 16 into main"
git push origin main
```

---

## 7. Useful commands while working

| Command                    | What it does                                    |
| -------------------------- | ----------------------------------------------- |
| `git status`               | Where am I, what changed?                       |
| `git branch`               | List local branches (`-a` includes remote)      |
| `git switch <branch>`      | Move to another branch                          |
| `git switch -c <branch>`   | Create a branch and move to it                  |
| `git log --oneline --graph --all` | See the whole history as a graph         |
| `git restore <file>`       | Throw away uncommitted changes to one file      |
| `git restore --staged <file>` | Unstage a file but keep the changes          |
| `git stash`                | Temporarily park changes (`git stash pop` to return) |

---

## 8. If something goes wrong

**I committed to the wrong branch**

```bash
git log --oneline -1                    # note the commit hash, e.g. a1b2c3d
git switch correct-branch
git cherry-pick a1b2c3d
git switch wrong-branch
git reset --hard HEAD~1                 # careful: deletes that commit
```

**I want to undo my last commit but keep the files**

```bash
git reset --soft HEAD~1
```

**Merge conflict**

Open the file, look for `<<<<<<<`, `=======`, `>>>>>>>`, keep the correct lines,
delete the markers, then:

```bash
git add <resolved-file>
git commit
```

**I am scared I broke something** — nothing is lost until you push over it. Copy the
folder first, then try. And ask before running anything with `--hard` or `force`.
````

### `README.md`
- **Size**: 6782 bytes | **Lines**: 130

````markdown
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
````

### `docs/tasks/module-16/01-admin-signin.md`
- **Size**: 3303 bytes | **Lines**: 68

````markdown
# 01 — Admin sign in

**Branch:** `feature/module-16-admin-signin`
**Requirement:** 2.a Admin sign in
**Status:** todo

## Goal

An admin can sign in with email + password and reach the admin dashboard. A normal user
must never be able to sign in through the admin login.

## API (from the Postman collection)

| Method | Endpoint                          | What it does                          |
| ------ | --------------------------------- | ------------------------------------- |
| POST   | `/api/v1/admin/auth/login`         | Check credentials, set auth cookies   |
| POST   | `/api/v1/admin/auth/logout`        | Clear cookies                         |
| GET    | `/api/v1/admin/auth/me`            | Return the signed-in admin            |

## Backend checklist

- [ ] `src/models/user.model.js` — base user schema with `name`, `email`, `password`,
      `role` (`user` \| `admin`), `isBlocked`, `isVerified`. Hash the password in a
      `pre('save')` hook and add a `comparePassword()` method.
      *(If task 04 already created this file, extend it instead of duplicating.)*
- [ ] `src/services/auth.service.js` — `loginAsAdmin(email, password)`:
      find by email, verify password, reject when `role !== 'admin'`, reject when
      `isBlocked === true`, sign access + refresh tokens.
- [ ] `src/controllers/adminAuth.controller.js` — read `req.body`, call the service,
      set `httpOnly` cookies, respond with the admin's safe fields (never the password).
- [ ] `src/routes/adminAuth.routes.js` — wire the three endpoints.
- [ ] `src/middlewares/auth.middleware.js` — verify the access token, attach `req.user`.
- [ ] `src/middlewares/role.middleware.js` — `allowRoles('admin')`.
- [ ] `src/validators/auth.validator.js` — email format, password min 8 chars.
- [ ] `src/utils/ApiError.js`, `ApiResponse.js`, `asyncHandler.js` — shared helpers.
- [ ] Mount the router in `src/routes/index.js` under `/api/v1/admin/auth`.

**Error cases to handle:** wrong password, unknown email, blocked admin, non-admin
trying the admin login. All must return `401`/`403` with a clear message.

## Frontend checklist

- [ ] `src/pages/admin/AdminLogin.jsx` — email + password form matching the Figma frame.
- [ ] `src/api/adminAuth.api.js` — `login`, `logout`, `me` calls.
- [ ] `src/context/AdminAuthContext.jsx` — store the admin, expose `login`/`logout`.
- [ ] `src/components/admin/ProtectedAdminRoute.jsx` — redirect to `/admin/login`.
- [ ] Routes: `/admin/login` (public), `/admin` (protected dashboard shell).
- [ ] Show field errors from the API, disable the button while submitting.

## Definition of done

- [ ] Admin can log in from the browser and lands on the dashboard.
- [ ] A `user` account gets `403` on the admin login endpoint.
- [ ] A blocked admin gets `403`.
- [ ] Refreshing the page keeps the admin signed in.
- [ ] `npm run lint` passes in `frontend`, no console errors.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(admin-auth): add admin login endpoint with role check
feat(admin-auth): set httpOnly access and refresh cookies on login
feat(admin-auth): add admin auth middleware and role guard
feat(admin-auth): add admin login page and protected route
docs(module-16): tick admin sign-in checklist
```
````

### `docs/tasks/module-16/02-admin-user-management.md`
- **Size**: 4754 bytes | **Lines**: 112

````markdown
# 02 — Admin user management

**Branch:** `feature/module-16-admin-user-management`
**Requirement:** 2.b User management (i–iv)
**Depends on:** task 01 (auth middleware + role guard)

## Goal

The admin dashboard has a users table where the admin can search, page through, sort
newest-first, and block or unblock a user — with a confirmation dialog before the change.

## API (from the Postman collection)

| Method | Endpoint                                   | What it does                             |
| ------ | ------------------------------------------ | ---------------------------------------- |
| GET    | `/api/v1/admin/users`                      | List users (`search`, `page`, `limit`)   |
| PATCH  | `/api/v1/admin/users/:userId/block`        | Block a user                             |
| PATCH  | `/api/v1/admin/users/:userId/unblock`      | Unblock a user                           |

Example request:

```
GET /api/v1/admin/users?search=ahad&page=2&limit=10
```

Example response:

```json
{
  "success": true,
  "data": {
    "users": [{ "_id": "...", "name": "Ahad", "email": "a@b.com", "isBlocked": false }],
    "pagination": { "page": 2, "limit": 10, "total": 37, "totalPages": 4, "hasNext": true, "hasPrev": true }
  }
}
```

## Backend checklist

### i. Block / unblock

- [ ] `src/services/adminUser.service.js` — `setBlockedStatus(userId, isBlocked)`:
      find the user, throw `404` if missing, throw `400` if the target is an admin,
      save and return the updated user.
- [ ] `src/controllers/adminUser.controller.js` — `blockUser`, `unblockUser`.
- [ ] `src/routes/adminUser.routes.js` — both routes behind
      `auth` + `allowRoles('admin')`.
- [ ] Validate `:userId` is a valid Mongo ObjectId before querying.

> Confirmation is a UI concern — the API stays a single PATCH. The frontend asks
> "Block Ahad? They will not be able to log in." and only calls the API on confirm.

### ii. Search (backend) with cancel / clear support

- [ ] Accept `search` as a query param and match `name`, `email`, and `phone` with a
      case-insensitive regex (or a Mongo text index).
- [ ] Trim the value and treat an empty string as "no filter" — this is what the
      frontend sends when the user presses the clear (×) button.
- [ ] Escape regex special characters so a search like `a+b` does not crash the query.
- [ ] Keep the filter in the URL (`?search=`) so the browser back button and refresh
      keep the results.

### iii. Pagination

- [ ] Read `page` (default `1`, min `1`) and `limit` (default `10`, max `100`).
- [ ] Use `.skip((page - 1) * limit).limit(limit)` **and** return `total` from
      `countDocuments()` so the UI can render page numbers.
- [ ] Return the `pagination` object shown above (`hasNext`, `hasPrev` included).

### iv. Sort newest first

- [ ] Always sort with `.sort({ createdAt: -1 })` in the service.
- [ ] Ensure `timestamps: true` exists on the User schema, otherwise `createdAt` is
      undefined and the sort does nothing.
- [ ] Add an index on `createdAt` and on `email` for faster queries.

### Shared

- [ ] `src/validators/adminUser.validator.js` — `page`, `limit`, `search` rules.
- [ ] Never return `password` or refresh tokens — use `.select('-password -refreshToken')`.

## Frontend checklist

- [ ] `src/pages/admin/Users.jsx` — table with name, email, joined date, status, actions.
- [ ] `src/components/admin/UserSearchBar.jsx` — input + clear (×) button that resets
      both the input and the query, and re-fetches page 1.
- [ ] Debounce the search by ~400 ms so you do not fire a request per keystroke.
- [ ] `src/components/admin/ConfirmDialog.jsx` — reusable modal used before
      block/unblock ("Cancel" / "Yes, block").
- [ ] `src/components/admin/Pagination.jsx` — prev/next + page numbers, disabled at edges.
- [ ] Show an empty state ("No users match your search") and a loading skeleton.
- [ ] Show a toast on success/failure and refresh the row without a full page reload.

## Definition of done

- [ ] Blocking a user immediately prevents that user from logging in (`403`).
- [ ] Unblocking restores access.
- [ ] Search + clear + pagination + sort work together (changing search resets to page 1).
- [ ] Admin accounts cannot be blocked from this screen.
- [ ] Table shows newest users first on first load.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(admin-users): add block and unblock user endpoints
feat(admin-users): add case-insensitive user search with clear support
feat(admin-users): add paginated user list sorted by newest first
feat(admin-users): add users table with search and pagination controls
feat(admin-users): add confirmation dialog for block and unblock
```
````

### `docs/tasks/module-16/03-user-home-page.md`
- **Size**: 3598 bytes | **Lines**: 82

````markdown
# 03 — Home page setup

**Branch:** `feature/module-16-user-home-page`
**Requirement:** 3.a Home page setup
**Status:** todo

## Goal

A visitor opens the site and sees a complete, responsive home page built from the Figma
design, with the real product data coming from the API.

## Frontend checklist

### Layout shell (build this once, reuse everywhere)

- [ ] `src/layouts/UserLayout.jsx` — wraps every public page.
- [ ] `src/components/layout/Navbar.jsx` — logo, category links, search box, cart icon
      with a count badge, profile/avatar menu, mobile hamburger.
- [ ] `src/components/layout/Footer.jsx` — links, socials, payment icons, copyright.
- [ ] `src/components/ui/Container.jsx` — one place for max-width + horizontal padding.
- [ ] Mobile menu opens as a drawer; lock body scroll while it is open.

### Home page sections (match the Figma frames top to bottom)

- [ ] `src/components/home/HeroCarousel.jsx` — auto-play, dots, arrows, pause on hover.
- [ ] `src/components/home/CategoryStrip.jsx` — category tiles linking to
      `/category/:slug`.
- [ ] `src/components/home/FeaturedProducts.jsx` — grid of `ProductCard`s.
- [ ] `src/components/home/DealBanner.jsx` — promo banner + countdown (if in the design).
- [ ] `src/components/home/BrandStrip.jsx` — brand logos.
- [ ] `src/components/home/Newsletter.jsx` — email capture with inline validation.
- [ ] `src/pages/user/Home.jsx` — assembles the sections above, in order.

### Product card (used on home, category and search pages)

- [ ] `src/components/product/ProductCard.jsx` — image (`object-cover`, fixed aspect
      ratio to stop layout shift), name, price, discount price, rating, wishlist heart.
- [ ] `src/components/ui/Skeleton.jsx` — grey placeholder while products load.
- [ ] `src/components/ui/EmptyState.jsx` — "Nothing here yet" fallback.
- [ ] Money formatting helper `src/utils/formatCurrency.js` (₹, no decimals).

### Data + routing

- [ ] `src/api/product.api.js` — `getFeatured()`, `getCategories()`.
- [ ] `src/routes/AppRoutes.jsx` — `/` -> `UserLayout` -> `Home`.
- [ ] Use `loading`, `error`, and `empty` states for every request.
- [ ] Later (not now): replace placeholder images with S3 URLs returned by the API.

### Quality

- [ ] Responsive at 360 px, 768 px, 1024 px, 1440 px (check the Figma breakpoints).
- [ ] Images use `loading="lazy"` except the hero.
- [ ] Interactive elements are real `<button>` / `<Link>` (keyboard accessible).
- [ ] `npm run lint` passes.

## Backend checklist (only what the home page needs)

- [ ] `src/models/product.model.js` — name, slug, price, discountPrice, images[],
      category, rating, stock.
- [ ] `src/models/category.model.js` — name, slug, image.
- [ ] `GET /api/v1/products/featured` — latest N featured products.
- [ ] `GET /api/v1/categories` — list for the category strip.
- [ ] Public routes: no auth middleware on these two endpoints.

## Definition of done

- [ ] Home page renders all Figma sections with real API data.
- [ ] No horizontal scroll at any breakpoint.
- [ ] Lighthouse performance ≥ 80 on mobile (images sized + lazy loaded).
- [ ] Loading and error states exist; a failed request does not blank the page.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-home): add user layout with navbar and footer
feat(user-home): add hero carousel and category strip
feat(user-home): add featured products section with skeletons
feat(user-home): add product card component
feat(products): add featured products and categories endpoints
```
````

### `docs/tasks/module-16/04-user-auth.md`
- **Size**: 4626 bytes | **Lines**: 88

````markdown
# 04 — Sign up & log in with validation

**Branch:** `feature/module-16-user-auth`
**Requirement:** 3.b User signs up & logs in with validation
**Status:** todo

## Goal

A visitor can create an account and log back in later. Every field is validated in the
browser *and* on the server, and error messages are clear enough to fix the problem.

## API (from the Postman collection)

| Method | Endpoint                  | What it does                              |
| ------ | ------------------------- | ----------------------------------------- |
| POST   | `/api/v1/auth/register`   | Create an account                         |
| POST   | `/api/v1/auth/login`      | Sign in, set auth cookies                 |
| POST   | `/api/v1/auth/logout`     | Clear cookies                             |
| GET    | `/api/v1/auth/me`         | Current user (used to restore the session) |
| POST   | `/api/v1/auth/refresh`    | Rotate the access token                   |

## Validation rules (use the same list on both sides)

| Field      | Rule                                                                 |
| ---------- | -------------------------------------------------------------------- |
| `name`     | 2–50 characters, letters and spaces only                             |
| `email`    | Valid email, lowercased and trimmed before saving                    |
| `password` | Min 8 chars, at least 1 letter and 1 number                          |
| `confirm`  | Must equal `password` (frontend only)                                |
| `phone`    | Optional, valid 10-digit number                                      |

## Backend checklist

- [ ] `src/config/db.js` — `mongoose.connect(process.env.MONGO_URI)`.
- [ ] `src/models/user.model.js` — shared schema (see task 01): unique index on `email`,
      `password` hashed in `pre('save')`, `comparePassword()` method,
      `toJSON()` that deletes `password` and `refreshToken`.
- [ ] `src/services/auth.service.js` — `register()`, `login()`, `logout()`,
      `getCurrentUser()`, `refreshTokens()`.
- [ ] Reject login when `isBlocked === true` with `403 "Your account has been blocked"`.
- [ ] `src/controllers/auth.controller.js` — thin, calls the service.
- [ ] `src/routes/auth.routes.js` + mount under `/api/v1/auth`.
- [ ] `src/validators/auth.validator.js` — all rules above; return `422` with a
      field-keyed error object:
      ```json
      { "success": false, "errors": { "email": "Email is already registered" } }
      ```
- [ ] `src/middlewares/validate.middleware.js` — turns validator output into that shape.
- [ ] `src/middlewares/error.middleware.js` — one place that formats every error.
- [ ] Cookies: `httpOnly: true`, `sameSite: 'lax'`, `secure` only in production.
- [ ] Duplicate email returns `409` with a friendly message, not a Mongo stack trace.

## Frontend checklist

- [ ] `src/api/axios.js` — base URL from `import.meta.env.VITE_API_URL`,
      `withCredentials: true`, response interceptor that calls `/auth/refresh` once on
      `401` and retries the original request.
- [ ] `src/context/AuthContext.jsx` — `user`, `loading`, `login()`, `register()`,
      `logout()`. On mount, call `/auth/me` to restore the session after a refresh.
- [ ] `src/hooks/useAuth.js` — small wrapper around the context.
- [ ] `src/pages/user/Register.jsx` and `src/pages/user/Login.jsx` — match Figma.
- [ ] `src/components/ui/FormField.jsx` — label, input, error text, `aria-invalid`.
- [ ] Validate on blur and on submit, not on every keystroke (less annoying).
- [ ] `src/components/ui/PasswordInput.jsx` — show/hide toggle.
- [ ] Disable the submit button while the request is in flight; prevent double submits.
- [ ] After register: if OTP is enabled (task 05) go to `/verify-otp`, otherwise
      straight to `/login`.
- [ ] `src/components/user/ProtectedRoute.jsx` — redirect to `/login?redirect=/cart`.
- [ ] After login, redirect to `redirect` param or `/`.

## Definition of done

- [ ] Empty, invalid and duplicate-email submissions all show a readable message.
- [ ] Password is never visible in any API response or in the Redux/React devtools.
- [ ] Refreshing a logged-in page keeps the user logged in.
- [ ] A blocked user cannot log in.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-auth): add user model with hashed password
feat(user-auth): add register and login endpoints
feat(user-auth): add shared request validation middleware
feat(user-auth): add auth context and session restore
feat(user-auth): add login and register pages with validation
```
````

### `docs/tasks/module-16/05-user-otp.md`
- **Size**: 4256 bytes | **Lines**: 86

````markdown
# 05 — Sign up with OTP (timer + resend)

**Branch:** `feature/module-16-user-otp`
**Requirement:** 3.c Sign up with OTP (with timer and resend OTP)
**Depends on:** task 04 (user registration)

## Goal

After registering, the user lands on an OTP screen with a visible countdown. They must
enter the 6-digit code from their email. When the timer hits zero, "Resend code"
becomes clickable and restarts the timer.

## API (from the Postman collection)

| Method | Endpoint                        | What it does                          |
| ------ | ------------------------------- | ------------------------------------- |
| POST   | `/api/v1/auth/otp/send`         | Create + email a code                 |
| POST   | `/api/v1/auth/otp/verify`       | Check the code, mark the user verified |
| POST   | `/api/v1/auth/otp/resend`       | Same as send, but rate limited        |

Request body: `{ "email": "user@mail.com" }` / `{ "email": "...", "otp": "123456" }`

## Rules to implement

| Rule                  | Value                                              |
| --------------------- | -------------------------------------------------- |
| Code length           | 6 digits, generated with `crypto.randomInt`         |
| Valid for             | 5 minutes                                           |
| Resend cooldown       | 60 seconds (enforced on the **server**, not just UI)|
| Max wrong attempts    | 5, then the code is deleted and a new one is needed |
| Stored form           | Hashed (bcrypt or SHA-256) — never plain text       |
| After success         | Delete the OTP record, set `isVerified: true`       |

The server must also return `resendAvailableAt` / `expiresAt` so the client timer
survives a page refresh.

## Backend checklist

- [ ] `src/models/otp.model.js` — `userId`, `email`, `otpHash`, `purpose`
      (`email-verify` \| `reset-password` \| `email-change`), `attempts`, `expiresAt`,
      plus a TTL index on `expiresAt` so Mongo cleans up automatically.
- [ ] `src/utils/generateOtp.js` — 6-digit code via `crypto.randomInt(100000, 999999)`.
- [ ] `src/services/otp.service.js` — `sendOtp`, `verifyOtp`, `resendOtp`:
      delete any previous unused code for the same user + purpose, then create the new one.
- [ ] `src/services/email.service.js` — `sendMail()` using nodemailer + the SMTP env vars.
- [ ] `src/templates/otpEmail.html` — simple branded email with the code in large text
      and the 5-minute notice.
- [ ] `src/middlewares/rateLimit.middleware.js` — limit resend per email/IP
      (`express-rate-limit`), respond `429` with "Please wait 60 seconds".
- [ ] `src/controllers/otp.controller.js` + `src/routes/otp.routes.js`.
- [ ] Comparing codes must be constant-time; return the same message for "wrong code"
      and "expired code" to avoid leaking information.

## Frontend checklist

- [ ] `src/pages/user/VerifyOtp.jsx` — route `/verify-otp`.
- [ ] `src/components/user/OtpInput.jsx` — six boxes, auto-advance on type, backspace
      moves back, paste fills all six.
- [ ] `src/hooks/useCountdown.js` — takes a target timestamp, returns `mm:ss` and
      `isFinished`; keeps ticking correctly after a page refresh.
- [ ] Resend button: disabled with "Resend in 0:59" until the timer finishes, then
      "Resend code".
- [ ] On resend success: restart the timer from the server's `expiresAt` and show a toast.
- [ ] Handle: expired code, too many attempts, already verified.
- [ ] On success: toast "Email verified" and redirect to `/login` (or straight in, if
      you auto-login).
- [ ] Block direct access to `/verify-otp` without an email in the query/state.

## Definition of done

- [ ] Code received by email works once and only once.
- [ ] Wrong code 5 times invalidates it.
- [ ] Resend is blocked for 60 s even if the user reloads or calls the API with Postman.
- [ ] Countdown is accurate after a refresh.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-otp): add otp model with hashed code and expiry
feat(user-otp): add send and verify otp endpoints
feat(user-otp): send otp email with nodemailer template
feat(user-otp): add resend cooldown rate limit
feat(user-otp): add otp input with countdown and resend
```
````

### `docs/tasks/module-16/06-user-sso.md`
- **Size**: 3992 bytes | **Lines**: 82

````markdown
# 06 — Single sign-on (Google)

**Branch:** `feature/module-16-user-sso`
**Requirement:** 3.d Login/signup with single sign-on (Google)
**Depends on:** task 04 (auth cookies + `User` model)

## Goal

The user clicks "Continue with Google", approves on the provider's page, and comes back
to the store already signed in — no password needed.

## How the flow works (memorise this picture)

```
Browser  →  GET /api/v1/auth/google            (backend builds Google URL, redirects)
Browser  →  accounts.google.com               (user approves)
Google   →  GET /api/v1/auth/google/callback  (backend exchanges code for profile)
Backend  →  find or create user, set cookies, redirect to CLIENT_URL
Browser  →  store home page, already logged in
```

The token never travels in the URL. The only thing that crosses back is a `Set-Cookie`
header, which is why the backend must be the one handling the callback.

## API (from the Postman collection)

| Method | Endpoint                             | What it does                       |
| ------ | ------------------------------------ | ---------------------------------- |
| GET    | `/api/v1/auth/google`                | Start Google flow                  |
| GET    | `/api/v1/auth/google/callback`       | Google returns here                |
## Setup before coding

- [ ] Google Cloud Console -> OAuth consent screen -> Credentials -> OAuth client (Web).
      Authorised redirect URI: `http://localhost:5000/api/v1/auth/google/callback`.
- [ ] Put the Google client ID and secret in `.env` (they are already listed in `.env.example`).
- [ ] Add the redirect URL for production later — providers do not accept `localhost`
      in a live app.

## Backend checklist

- [ ] `npm i passport passport-google-oauth20`.
- [ ] `src/models/user.model.js` — add `googleId` (sparse unique),
      make `password` optional (SSO users have no password), keep `provider` field.
- [ ] `src/config/passport.js` — configure the Google strategy with the correct `scope`
      (`profile email`) and `passReqToCallback` if you
      need the request.
- [ ] Strategy callback logic (shared helper `findOrCreateOAuthUser`):
      1. Look up by provider id → found: sign in.
      2. Else look up by email → found: link the provider id to that account.
      3. Else create a new user with `isVerified: true` (the provider already verified it).
- [ ] `src/services/auth.service.js` — reuse the same token/cookie function as password
      login so behaviour is identical.
- [ ] `src/routes/auth.routes.js` — add both `/` and `/callback` routes for Google.
- [ ] Callback handler sets cookies, then `res.redirect(\`${CLIENT_URL}/auth/success\`)`.
      On failure redirect to `${CLIENT_URL}/login?error=sso_failed`.
## Frontend checklist

- [ ] `src/components/user/SocialAuthButtons.jsx` — the Google button with the
      official brand icons (use the SVGs from the Figma file).
- [ ] Use plain links, not `fetch`: `window.location.href = \`${API_URL}/auth/google\``.
- [ ] `src/pages/user/AuthSuccess.jsx` — calls `getMe()` to refresh the auth context,
      then redirects to `/`.
- [ ] Show a readable message when the URL has `?error=sso_failed`.
- [ ] Add the buttons to both Login and Register pages.

## Definition of done

- [ ] Google login creates an account the first time and logs in afterwards.
- [ ] Signing in with Google using an email that already has a password account links
      the accounts instead of erroring.
- [ ] No access token is ever visible in a URL or in `localStorage`.
- [ ] `CLIENT_URL` is used for every redirect — no hardcoded `localhost:5173`.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-sso): add google oauth strategy with passport
feat(user-sso): link oauth accounts by email without duplicates
feat(user-sso): add social login buttons and success page
```
````

### `docs/tasks/module-16/07-user-forgot-password.md`
- **Size**: 3486 bytes | **Lines**: 76

````markdown
# 07 — Forgot password

**Branch:** `feature/module-16-user-forgot-password`
**Requirement:** 3.e Implement forgot password
**Depends on:** task 04 (auth), task 05 (email service + OTP)

## Goal

A user who forgot their password enters their email, receives a reset link (or code),
sets a new password, and can log in with it immediately.

## Flow

```
/forgot-password  ->  POST /auth/forgot-password  ->  email with link
/link expires in 15 min
/reset-password/:token  ->  POST /auth/reset-password  ->  new password saved
```

## API (from the Postman collection)

| Method | Endpoint                        | What it does                             |
| ------ | ------------------------------- | ---------------------------------------- |
| POST   | `/api/v1/auth/forgot-password`  | Send reset email                         |
| POST   | `/api/v1/auth/reset-password`   | Body: `token`, `password`, `confirmPassword` |
| GET    | `/api/v1/auth/reset-password/:token` | Optional: validate the link before showing the form |

## Backend checklist

- [ ] `src/models/user.model.js` — add `passwordResetToken` (hashed) and
      `passwordResetExpires` (15 minutes), both `select: false`.
- [ ] `src/services/auth.service.js` — `forgotPassword(email)`:
      1. Find the user. **If not found, respond `200` anyway** with the same message —
         this prevents attackers from discovering which emails have accounts.
      2. Generate a random 32-byte token (`crypto.randomBytes(32).toString('hex')`).
      3. Store only the SHA-256 hash + expiry on the user.
      4. Email the raw token in a link: `${CLIENT_URL}/reset-password/${token}`.
- [ ] `resetPassword(token, newPassword)`:
      hash the incoming token, find a user whose hash matches **and** expiry is in the
      future, set the new password, clear both reset fields, delete refresh tokens.
- [ ] Reuse `src/templates/` for a `resetPasswordEmail.html`.
- [ ] Apply the same rate limit you built for OTP (`429` after too many requests).
- [ ] `src/validators/auth.validator.js` — reuse the password rules from task 04.
- [ ] SIU (SSO-only) accounts with no password can still set one through this flow.

## Frontend checklist

- [ ] `src/pages/user/ForgotPassword.jsx` — email field, "Send reset link" button,
      success panel: "If an account exists for this email, a link is on its way."
- [ ] `src/pages/user/ResetPassword.jsx` — route `/reset-password/:token`,
      password + confirm fields, show/hide toggles, live rule checklist
      (8 chars, 1 letter, 1 number).
- [ ] Handle invalid/expired token with a friendly screen and a "Request a new link"
      button.
- [ ] After success: toast + redirect to `/login` (do **not** auto-login).
- [ ] Disable submit until the form is valid and while the request runs.

## Definition of done

- [ ] Real email arrives with a working link.
- [ ] Link works once; reusing it says "link expired".
- [ ] Link expires after 15 minutes.
- [ ] Requesting a reset for an unknown email shows the same success message on screen
      and returns `200`.
- [ ] Old password stops working, new password works.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-auth): add forgot password endpoint with hashed reset token
feat(user-auth): send password reset email and expire token after 15 minutes
feat(user-auth): add reset password endpoint with single use token
feat(user-auth): add forgot and reset password pages
```
````

### `docs/tasks/module-16/README.md`
- **Size**: 3405 bytes | **Lines**: 48

```markdown
# Module 16 — Admin Side & User Side

Task board for this module. Each task has its own branch and its own checklist file.

## Status legend

`todo` · `in progress` · `done`

## Admin side

| # | Task                                                      | Branch                                    | Checklist                                   | Status |
| - | --------------------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ------ |
| 1 | Admin sign in                                             | `feature/module-16-admin-signin`           | [01-admin-signin.md](./01-admin-signin.md)   | todo   |
| 2 | User management (block/unblock, search, pagination, sort)  | `feature/module-16-admin-user-management`  | [02-admin-user-management.md](./02-admin-user-management.md) | todo |

## User side

| # | Task                                                     | Branch                                       | Checklist                                     | Status |
| - | -------------------------------------------------------- | -------------------------------------------- | --------------------------------------------- | ------ |
| 3 | Home page setup                                          | `feature/module-16-user-home-page`            | [03-user-home-page.md](./03-user-home-page.md) | todo   |
| 4 | Sign up & log in with validation                         | `feature/module-16-user-auth`                 | [04-user-auth.md](./04-user-auth.md)           | todo   |
| 5 | Sign up with OTP (timer + resend)                        | `feature/module-16-user-otp`                  | [05-user-otp.md](./05-user-otp.md)             | todo   |
| 6 | Single sign-on (Google)                                  | `feature/module-16-user-sso`                  | [06-user-sso.md](./06-user-sso.md)             | todo   |
| 7 | Forgot password                                          | `feature/module-16-user-forgot-password`      | [07-user-forgot-password.md](./07-user-forgot-password.md) | todo |
| 8 | User profile (display, edit, email verify, change password) | `feature/module-16-user-profile`           | [08-user-profile.md](./08-user-profile.md)     | todo   |
| 9 | Address management (add, edit, delete)                   | `feature/module-16-user-address`              | [09-user-address.md](./09-user-address.md)     | todo   |

## Shared setup (already on `develop`)

- [x] Git repository, `main` + `develop` branches
- [x] Conventional commit guide in [`CONTRIBUTING.md`](../../../CONTRIBUTING.md)
- [x] MVC folder structure in `backend/src`
- [x] `.gitignore` for secrets, `node_modules`, build output
- [x] `.env.example` listing every variable the module needs

## How to read a checklist

Every checklist has the same parts:

1. **Goal** — one sentence, what the user can do when this is finished.
2. **API** — the endpoints from the Postman collection for this task.
3. **Backend checklist** — files to create and behaviour to implement.
4. **Frontend checklist** — pages/components from the Figma design.
5. **Definition of done** — what must be true before you merge into `develop`.
6. **Commit messages** — ready-made messages following the repo convention.

Work through the boxes, commit in small steps, and tick them as you go.
```

### `backend/.env.example`
- **Size**: 1317 bytes | **Lines**: 44

```dotenv
# Copy this file to .env and fill in your own values.
# .env is ignored by Git, so secrets never reach GitHub.

# Server
PORT=3001
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/mobifys

# Auth - User JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_USER_ACCESS_SECRET=replace-with-a-64-byte-hex-user-access-secret
JWT_USER_REFRESH_SECRET=replace-with-a-64-byte-hex-user-refresh-secret

# Auth - Admin JWT Secrets (separate from user secrets)
JWT_ADMIN_ACCESS_SECRET=replace-with-a-64-byte-hex-admin-access-secret
JWT_ADMIN_REFRESH_SECRET=replace-with-a-64-byte-hex-admin-refresh-secret

# Auth - Token Lifetimes
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_REMEMBER_REFRESH_EXPIRES_IN=30d

# Cookies
COOKIE_SECRET=replace-with-a-64-byte-hex-cookie-secret

# Email (used for OTP and password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google single sign-on
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3001/api/user/auth/google/callback

# AWS S3 (profile images)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=

# Frontend origin (needed for CORS and cookie sharing)
CLIENT_URL=http://localhost:5173
```

### `backend/.gitignore`
- **Size**: 224 bytes | **Lines**: 21

```text
# Dependencies
node_modules/

# Environment
.env
.env.*
!.env.example

# Logs
logs/
*.log

# Local file storage (S3 is used in production, this is only for local testing)
uploads/
tmp/

# Build output
dist/
build/
coverage/
```

### `backend/package.json`
- **Size**: 787 bytes | **Lines**: 33

```json
{
  "name": "mobifys-backend",
  "version": "0.1.0",
  "private": true,
  "description": "Mobifys e-commerce REST API (Node.js + Express + MongoDB + AWS S3)",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seedAdmin.js"
  },
  "author": "Abdul Ahad",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-s3": "^3.1177.0",
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^18.0.10",
    "express": "^5.3.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.13.1",
    "multer": "^2.5.0",
    "nodemailer": "^10.6.1",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

### `backend/README.md`
- **Size**: 2602 bytes | **Lines**: 63

````markdown
# Mobifys Backend

Node.js + Express + MongoDB REST API for the Mobifys store, following the **MVC** pattern with a service layer.

## Folder structure

```
backend/
├── src/
│   ├── config/        # Connections and third-party setup (db.js, s3.js, passport.js, env.js)
│   ├── models/        # Mongoose schemas — the "M" in MVC (User, Address, Product, Order...)
│   ├── controllers/   # The "C" in MVC — read req, call a service, send res
│   ├── services/      # Business logic — reusable, has no req/res knowledge
│   ├── routes/        # URL -> middleware -> controller mapping
│   ├── middlewares/   # auth, role check, validation result, error handler, upload
│   ├── validators/    # Request body/params validation rules (express-validator / Joi)
│   ├── utils/         # Small helpers (ApiError, ApiResponse, asyncHandler, otp, tokens)
│   └── templates/     # HTML email templates (OTP, reset password)
├── .env.example       # Copy to .env and fill in your values
└── package.json
```

### What goes where (rule of thumb)

| I want to...                              | Put the code in        |
| ----------------------------------------- | ---------------------- |
| Define the shape of a collection          | `models/`              |
| Read `req` and send a response            | `controllers/`         |
| Write logic that could be reused anywhere | `services/`            |
| Protect a route or check a role           | `middlewares/`         |
| Say which URL hits which controller       | `routes/`              |
| Check user input format                   | `validators/`          |
| Connect to MongoDB / S3 / Passport        | `config/`              |

**Controllers must stay thin.** Example flow for "block user":

```
routes/adminUser.routes.js -> middlewares/auth + allowRoles('admin')
  -> validators/user.validator.js
  -> controllers/adminUser.controller.js   (reads req.params.id, calls service)
  -> services/adminUser.service.js         (find user, update isBlocked, throw ApiError)
```

## Getting started

```bash
cd backend
npm install
cp .env.example .env   # Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

Naming conventions used everywhere:

- Files: `user.controller.js`, `user.service.js`, `user.model.js`, `user.routes.js`, `user.validator.js`
- Folders and variables: `camelCase`
- Models: `PascalCase` (`User`, `Address`)
- Constants: `UPPER_SNAKE_CASE`

## API versioning

All endpoints live under `/api/v1`. Example: `POST /api/v1/auth/login`.
````

### `backend/seedAdmin.js`
- **Size**: 869 bytes | **Lines**: 36

```javascript
import bcrypt from 'bcryptjs';
import './src/config/env.js';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';

const seedData = async () => {
  try {
    await connectDB();

    const adminEmail = 'ahadtabc@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'Admin Ahad',
        email: adminEmail,
        phone: '+91 9074243208',
        passwordHash,
        role: 'admin',
        status: 'active',
      });
      console.log('Admin created');
    } else {
      console.log('Admin already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeder Error:', error);
    process.exit(1);
  }
};

seedData();
```

### `backend/server.js`
- **Size**: 274 bytes | **Lines**: 11

```javascript
import { assertAuthEnv, env } from './src/config/env.js';
import connectDB from './src/config/db.js';
import app from './src/app.js';

assertAuthEnv();
connectDB();

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
```

### `backend/src/app.js`
- **Size**: 965 bytes | **Lines**: 37

```javascript
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { env } from './config/env.js';
import configurePassport from './config/passport.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

configurePassport();

const app = express();

// Core middleware
app.disable('x-powered-by');
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(env.cookieSecret));
app.use(passport.initialize());

// Static files & API routes
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', apiRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
```

### `backend/src/config/db.js`
- **Size**: 378 bytes | **Lines**: 15

```javascript
import mongoose from 'mongoose';
import { env } from './env.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### `backend/src/config/env.js`
- **Size**: 2426 bytes | **Lines**: 69

```javascript
import dotenv from 'dotenv';

dotenv.config();

const MIN_SECRET_LENGTH = 32;

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 3001,
  mongoUri: process.env.MONGO_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  jwt: {
    userAccessSecret: process.env.JWT_USER_ACCESS_SECRET || '',
    userRefreshSecret: process.env.JWT_USER_REFRESH_SECRET || '',
    adminAccessSecret: process.env.JWT_ADMIN_ACCESS_SECRET || '',
    adminRefreshSecret: process.env.JWT_ADMIN_REFRESH_SECRET || '',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    rememberRefreshExpiresIn: process.env.JWT_REMEMBER_REFRESH_EXPIRES_IN || '30d',
  },

  cookieSecret: process.env.COOKIE_SECRET || '',

  email: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },

  aws: {
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucketName: process.env.AWS_BUCKET_NAME || '',
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || '/api/user/auth/google/callback',
  },
};

/**
 * Validate required JWT and cookie secrets on boot so missing or weak
 * configuration fails fast instead of falling back to hardcoded values.
 */
export const assertAuthEnv = () => {
  const requiredSecrets = [
    ['JWT_USER_ACCESS_SECRET', env.jwt.userAccessSecret],
    ['JWT_USER_REFRESH_SECRET', env.jwt.userRefreshSecret],
    ['JWT_ADMIN_ACCESS_SECRET', env.jwt.adminAccessSecret],
    ['JWT_ADMIN_REFRESH_SECRET', env.jwt.adminRefreshSecret],
    ['COOKIE_SECRET', env.cookieSecret],
  ];

  for (const [name, value] of requiredSecrets) {
    if (!value || value.length < MIN_SECRET_LENGTH) {
      throw new Error(`${name} must be set and at least ${MIN_SECRET_LENGTH} characters`);
    }
  }

  const secretValues = requiredSecrets.map(([, value]) => value);
  if (new Set(secretValues).size !== secretValues.length) {
    throw new Error('JWT and cookie secrets must all be distinct cryptographic values');
  }
};
```

### `backend/src/config/passport.js`
- **Size**: 1901 bytes | **Lines**: 64

```javascript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { env } from './env.js';

const configurePassport = () => {
  if (!env.google.clientId || !env.google.clientSecret) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google.clientId,
        clientSecret: env.google.clientSecret,
        callbackURL: env.google.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) {
            return done(new Error('Google account has no public email'), null);
          }

          let user = await User.findOne({ email });

          if (user) {
            if (user.role !== 'user') {
              return done(null, false, { message: 'Use the admin portal to sign in' });
            }
            if (user.isBlocked || user.status === 'blocked') {
              return done(null, false, { message: 'Your account has been blocked' });
            }
            if (!user.googleId) {
              user.googleId = profile.id;
              if (!user.profileImage && profile.photos?.[0]?.value) {
                user.profileImage = profile.photos[0].value;
              }
              await user.save();
            }
            return done(null, user);
          }

          user = await User.create({
            name: profile.displayName || 'Mobifys User',
            email,
            googleId: profile.id,
            profileImage: profile.photos?.[0]?.value || '',
            role: 'user',
            status: 'active',
            isBlocked: false,
          });

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

export default configurePassport;
```

### `backend/src/config/s3.js`
- **Size**: 286 bytes | **Lines**: 13

```javascript
import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env.js';

const s3Client = new S3Client({
  region: env.aws.region,
  credentials: {
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey,
  },
});

export default s3Client;
```

### `backend/src/controllers/admin/adminAuthController.js`
- **Size**: 6112 bytes | **Lines**: 210

```javascript
import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeAdmin } from '../../utils/serializers.js';
import { requireFields, validatePasswordPair } from '../../validators/authValidator.js';
import issueAuthTokens, {
  revokeSessionToken,
  rotateRefreshToken,
} from '../../services/tokenService.js';
import {
  authenticateAdmin,
  resetAdminAccountPassword,
  sendAdminForgotPasswordOtp,
  updateAdminAccountPassword,
  updateAdminAccountProfile,
  verifyAdminResetOtp,
} from '../../services/adminAuthService.js';
import {
  confirmCurrentEmailVerification,
  confirmUserEmailChange,
  requestCurrentEmailVerification,
  requestUserEmailChange,
} from '../../services/profileService.js';

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password, keepSignedIn } = req.body;
  requireFields([email, password], 'Email and password are required');

  const admin = await authenticateAdmin({ email, password });
  await issueAuthTokens({ req, res, user: admin, keepSignedIn: Boolean(keepSignedIn) });

  res.status(200).json({
    success: true,
    message: 'Signed in to Admin Console',
    admin: sanitizeAdmin(admin),
  });
});

export const adminForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  requireFields([email], 'Work email address is required');

  const { email: adminEmail, expiresAt } = await sendAdminForgotPasswordOtp({ email });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${adminEmail}`,
    expiresAt,
  });
});

export const verifyAdminOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and 6-digit OTP are required');

  await verifyAdminResetOtp({ email, otp });

  res.status(200).json({
    success: true,
    message: 'Admin OTP verified. You may now set a new password.',
  });
});

export const resetAdminPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  requireFields([email, newPassword, confirmPassword], 'All fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const account = await resetAdminAccountPassword({ email, newPassword });

  res.status(200).json({
    success: true,
    message: 'Admin password updated successfully',
    account,
  });
});

export const updateAdminPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  requireFields([currentPassword, newPassword, confirmPassword], 'All password fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const admin = await updateAdminAccountPassword({
    adminId: req.user._id,
    currentPassword,
    newPassword,
  });
  await issueAuthTokens({ req, res, user: admin, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Admin password updated successfully',
  });
});

export const updateAdminProfile = asyncHandler(async (req, res) => {
  const { name, phone, removeProfileImage } = req.body;
  const admin = await updateAdminAccountProfile({
    adminId: req.user._id,
    name,
    phone,
    file: req.file,
    removeProfileImage,
  });

  res.status(200).json({
    success: true,
    message: 'Admin profile updated successfully',
    admin: sanitizeAdmin(admin),
  });
});

export const requestAdminCurrentEmailOtp = asyncHandler(async (req, res) => {
  const { currentEmail } = req.body;
  requireFields([currentEmail], 'Current registered email address is required');

  const { email, expiresAt } = await requestCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyAdminCurrentEmail = asyncHandler(async (req, res) => {
  const { currentEmail, otp } = req.body;
  requireFields([currentEmail, otp], 'Current email and 6-digit OTP are required');

  const { verifiedUntil } = await confirmCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Current email verified! You can now enter your new email address.',
    verifiedUntil,
  });
});

export const requestAdminEmailChangeOtp = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  requireFields([newEmail], 'New email address is required');

  const { email, expiresAt } = await requestUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyAdminEmailChange = asyncHandler(async (req, res) => {
  const { newEmail, otp } = req.body;
  requireFields([newEmail, otp], 'New email and OTP are required');

  const admin = await confirmUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Email address updated and verified!',
    email: admin.email,
    admin: sanitizeAdmin(admin),
  });
});

export const getAdminMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: sanitizeAdmin(req.user),
  });
});

export const refreshAdminToken = asyncHandler(async (req, res) => {
  const result = await rotateRefreshToken({ req, res, scope: 'admin' });
  if (!result.ok) {
    return res.status(result.status).json({
      success: false,
      ...(result.code ? { code: result.code } : {}),
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Admin session refreshed',
    admin: sanitizeAdmin(result.user),
  });
});

export const adminLogout = asyncHandler(async (req, res) => {
  await revokeSessionToken(req, res, 'admin');
  res.status(200).json({ success: true, message: 'Logged out from Admin Console' });
});
```

### `backend/src/controllers/admin/userManagementController.js`
- **Size**: 1198 bytes | **Lines**: 49

```javascript
import asyncHandler from '../../utils/asyncHandler.js';
import { validateObjectId } from '../../validators/authValidator.js';
import {
  getUserDetails,
  listUsers,
  toggleUserBlockStatus,
} from '../../services/userManagementService.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const { users, pagination, stats } = await listUsers({
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
    status: req.query.status,
    sort: req.query.sort,
  });

  res.status(200).json({
    success: true,
    users,
    pagination,
    stats,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'User');
  const { user, addresses } = await getUserDetails(req.params.id);

  res.status(200).json({
    success: true,
    user,
    addresses,
  });
});

export const toggleBlockUser = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'User');
  const user = await toggleUserBlockStatus(req.params.id);

  res.status(200).json({
    success: true,
    message: user.isBlocked
      ? `${user.name} has been blocked`
      : `${user.name} has been unblocked`,
    user,
  });
});
```

### `backend/src/controllers/user/addressController.js`
- **Size**: 1678 bytes | **Lines**: 60

```javascript
import asyncHandler from '../../utils/asyncHandler.js';
import { validateObjectId } from '../../validators/authValidator.js';
import { validateAddressPayload } from '../../validators/addressValidator.js';
import {
  createUserAddress,
  listUserAddresses,
  softDeleteUserAddress,
  updateUserAddress,
} from '../../services/addressService.js';

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await listUserAddresses(req.user._id);
  res.status(200).json({ success: true, addresses });
});

export const addAddress = asyncHandler(async (req, res) => {
  const validated = validateAddressPayload(req.body, { partial: false });

  const newAddress = await createUserAddress({
    userId: req.user._id,
    ...validated,
  });

  res.status(201).json({
    success: true,
    message: 'Address added successfully',
    address: newAddress,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Address');
  const validated = validateAddressPayload(req.body, { partial: true });

  const addr = await updateUserAddress({
    userId: req.user._id,
    addressId: req.params.id,
    payload: validated,
  });

  res.status(200).json({
    success: true,
    message: 'Address updated successfully',
    address: addr,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Address');
  await softDeleteUserAddress({
    userId: req.user._id,
    addressId: req.params.id,
  });

  res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
  });
});
```

### `backend/src/controllers/user/authController.js`
- **Size**: 4663 bytes | **Lines**: 159

```javascript
import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeUser } from '../../utils/serializers.js';
import {
  requireFields,
  validateEmailAddress,
  validateFullName,
  validateIndianPhone,
  validatePasswordPair,
  validateStrongPassword,
} from '../../validators/authValidator.js';
import issueAuthTokens, {
  revokeSessionToken,
  rotateRefreshToken,
} from '../../services/tokenService.js';
import {
  authenticateUser,
  resendUserOtpCode,
  resetUserPasswordWithOtp,
  sendUserForgotPasswordOtp,
  signupUserAccount,
  verifyUserForgotPasswordOtp,
  verifyUserSignupOtp,
} from '../../services/userAuthService.js';

export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  requireFields([name, email, phone, password, confirmPassword]);

  const cleanName = validateFullName(name);
  const cleanEmail = validateEmailAddress(email);
  const formattedPhone = validateIndianPhone(phone);
  validateStrongPassword(password, confirmPassword);

  const { email: registeredEmail, expiresAt } = await signupUserAccount({
    name: cleanName,
    email: cleanEmail,
    phone: formattedPhone,
    password,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${registeredEmail}`,
    email: registeredEmail,
    expiresAt,
  });
});

export const verifySignupOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and OTP are required');

  const user = await verifyUserSignupOtp({ email, otp });
  await issueAuthTokens({ req, res, user, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Account verified successfully!',
    user: sanitizeUser(user),
  });
});

export const resendUserOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;
  requireFields([email, purpose], 'Email and OTP purpose are required');

  const { expiresAt } = await resendUserOtpCode({ email, purpose });

  res.status(200).json({
    success: true,
    message: 'A new 6-digit OTP has been sent to your email',
    expiresAt,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;
  requireFields([email, password], 'Email and password are required');

  const user = await authenticateUser({ email, password });
  await issueAuthTokens({ req, res, user, keepSignedIn: Boolean(rememberMe) });

  res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    user: sanitizeUser(user),
  });
});

export const forgotUserPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  requireFields([email], 'Email address is required');

  const { email: cleanEmail, expiresAt } = await sendUserForgotPasswordOtp({ email });

  res.status(200).json({
    success: true,
    message: `Password reset OTP sent to ${cleanEmail}`,
    email: cleanEmail,
    expiresAt,
  });
});

export const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and 6-digit OTP are required');

  const { email: cleanEmail, verifiedUntil } = await verifyUserForgotPasswordOtp({ email, otp });

  res.status(200).json({
    success: true,
    message: 'OTP verified. You can now set a new password.',
    email: cleanEmail,
    verifiedUntil,
  });
});

export const resetUserPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  requireFields([email, newPassword, confirmPassword], 'All fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  await resetUserPasswordWithOtp({ email, newPassword });

  res.status(200).json({
    success: true,
    message: 'Password reset successful! You can now sign in.',
  });
});

export const getUserMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const refreshUserToken = asyncHandler(async (req, res) => {
  const result = await rotateRefreshToken({ req, res, scope: 'user' });
  if (!result.ok) {
    return res.status(result.status).json({
      success: false,
      ...(result.code ? { code: result.code } : {}),
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Session refreshed',
    user: sanitizeUser(result.user),
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  await revokeSessionToken(req, res, 'user');
  res.status(200).json({ success: true, message: 'Signed out successfully' });
});
```

### `backend/src/controllers/user/profileController.js`
- **Size**: 3701 bytes | **Lines**: 125

```javascript
import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeUser } from '../../utils/serializers.js';
import { requireFields, validatePasswordPair } from '../../validators/authValidator.js';
import issueAuthTokens from '../../services/tokenService.js';
import {
  changeAccountPassword,
  confirmCurrentEmailVerification,
  confirmUserEmailChange,
  fetchUserProfile,
  requestCurrentEmailVerification,
  requestUserEmailChange,
  updateProfileDetails,
} from '../../services/profileService.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const { user, addresses } = await fetchUserProfile(req.user._id);
  res.status(200).json({ success: true, user, addresses });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone, removeProfileImage } = req.body;
  const user = await updateProfileDetails({
    userId: req.user._id,
    name,
    phone,
    file: req.file,
    removeProfileImage,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: sanitizeUser(user),
  });
});

export const requestCurrentEmailOtp = asyncHandler(async (req, res) => {
  const { currentEmail } = req.body;
  requireFields([currentEmail], 'Current registered email address is required');

  const { email, expiresAt } = await requestCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyCurrentEmail = asyncHandler(async (req, res) => {
  const { currentEmail, otp } = req.body;
  requireFields([currentEmail, otp], 'Current email and 6-digit OTP are required');

  const { verifiedUntil } = await confirmCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Current email verified! You can now enter your new email address.',
    verifiedUntil,
  });
});

export const requestEmailChangeOtp = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  requireFields([newEmail], 'New email address is required');

  const { email, expiresAt } = await requestUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyEmailChange = asyncHandler(async (req, res) => {
  const { newEmail, otp } = req.body;
  requireFields([newEmail, otp], 'New email and OTP are required');

  const user = await confirmUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Email address updated and verified!',
    email: user.email,
    user: sanitizeUser(user),
  });
});

export const changeUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  requireFields([newPassword, confirmPassword], 'New password fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const user = await changeAccountPassword({
    userId: req.user._id,
    currentPassword,
    newPassword,
  });
  await issueAuthTokens({ req, res, user, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});
```

### `backend/src/middlewares/authMiddleware.js`
- **Size**: 2150 bytes | **Lines**: 71

```javascript
import User from '../models/User.js';
import {
  clearAuthCookies,
  getScopeConfig,
  isTokenIssuedBeforePasswordChange,
  revokeAllUserTokens,
  verifyAccessToken,
} from '../services/tokenService.js';

const extractAccessToken = (req, cookieName) => {
  if (req.cookies?.[cookieName]) {
    return req.cookies[cookieName];
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
};

const createProtectMiddleware = (scope) => async (req, res, next) => {
  try {
    const cfg = getScopeConfig(scope);
    const token = extractAccessToken(req, cfg.accessCookieName);

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
    }

    const decoded = verifyAccessToken(token, scope);
    const user = await User.findById(decoded.userId).select('-passwordHash').lean();

    if (!user || !cfg.allowedRoles.includes(user.role)) {
      return res.status(401).json({ success: false, message: 'User account not found' });
    }

    if (user.isBlocked || user.status === 'blocked') {
      await revokeAllUserTokens(user._id, scope);
      clearAuthCookies(res, scope);
      return res.status(403).json({
        success: false,
        code: 'ACCOUNT_BLOCKED',
        message: 'Your account has been blocked. Contact Mobifys support.',
      });
    }

    if (isTokenIssuedBeforePasswordChange(user, decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'Password recently changed, please log in again',
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired, please log in again' });
  }
};

export const protectUser = createProtectMiddleware('user');
export const protectAdmin = createProtectMiddleware('admin');
export const protect = protectUser;

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};
```

### `backend/src/middlewares/errorMiddleware.js`
- **Size**: 1149 bytes | **Lines**: 42

```javascript
export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    message = `${field} already exists`;
  } else if (err.name === 'MulterError') {
    statusCode = 400;
    message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Uploaded file must be under 2 MB'
        : err.message;
  }

  const payload = {
    success: false,
    message,
  };

  if (err.needsVerification) {
    payload.needsVerification = true;
  }

  res.status(statusCode).json(payload);
};
```

### `backend/src/middlewares/uploadMiddleware.js`
- **Size**: 404 bytes | **Lines**: 19

```javascript
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP) are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

export default upload;
```

### `backend/src/models/Address.js`
- **Size**: 1322 bytes | **Lines**: 62

```javascript
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    label: {
      type: String,
      enum: ['Home', 'Work', 'Other'],
      default: 'Home',
    },
    address: {
      type: String,
      required: [true, 'Flat / House / Building is required'],
      trim: true,
    },
    street: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    pin: {
      type: String,
      required: [true, 'PIN code is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

addressSchema.index({ userId: 1, status: 1, isDefault: -1, createdAt: -1 });

const Address = mongoose.model('Address', addressSchema);
export default Address;
```

### `backend/src/models/Otp.js`
- **Size**: 977 bytes | **Lines**: 45

```javascript
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['signup', 'forgot_password', 'email_change', 'current_email_verify', 'admin_reset'],
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

otpSchema.index({ email: 1, purpose: 1, verifiedAt: 1, createdAt: -1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;
```

### `backend/src/models/RefreshToken.js`
- **Size**: 1194 bytes | **Lines**: 59

```javascript
import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    scope: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    familyId: {
      type: String,
      required: true,
      index: true,
    },
    keepSignedIn: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    replacedByTokenHash: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: '',
    },
    ip: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

refreshTokenSchema.index({ userId: 1, scope: 1, revokedAt: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
```

### `backend/src/models/User.js`
- **Size**: 2368 bytes | **Lines**: 108

```javascript
import mongoose from 'mongoose';
import crypto from 'crypto';

const userOnlyDefault = (factory) =>
  function () {
    if (this.role !== 'user') return undefined;
    return typeof factory === 'function' ? factory() : factory;
  };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    passwordHash: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'unverified'],
      default: 'unverified',
    },
    isBlocked: {
      type: Boolean,
      default: userOnlyDefault(false),
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    walletBalance: {
      type: Number,
      default: userOnlyDefault(0),
    },
    wishlist: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
      default: userOnlyDefault(() => []),
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: userOnlyDefault(null),
    },
    googleId: {
      type: String,
      default: userOnlyDefault(null),
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, isBlocked: 1, createdAt: -1 });
userSchema.index({ googleId: 1 }, { sparse: true });

userSchema.pre('save', async function () {
  if (this.role === 'user') {
    if (!this.referralCode) {
      this.referralCode = 'MOB-' + crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    return;
  }

  // Admins do not store user-only referral, wallet, wishlist, block, or SSO fields
  this.referralCode = undefined;
  this.referredBy = undefined;
  this.isBlocked = undefined;
  this.walletBalance = undefined;
  this.wishlist = undefined;
  this.googleId = undefined;
});

const User = mongoose.model('User', userSchema);
export default User;
```

### `backend/src/routes/admin/adminAuthRoutes.js`
- **Size**: 1511 bytes | **Lines**: 37

```javascript
import express from 'express';
import {
  adminLogin,
  adminForgotPassword,
  verifyAdminOtp,
  resetAdminPassword,
  updateAdminPassword,
  updateAdminProfile,
  requestAdminCurrentEmailOtp,
  verifyAdminCurrentEmail,
  requestAdminEmailChangeOtp,
  verifyAdminEmailChange,
  getAdminMe,
  refreshAdminToken,
  adminLogout,
} from '../../controllers/admin/adminAuthController.js';
import { protectAdmin, adminOnly } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/refresh', refreshAdminToken);
router.post('/forgot-password', adminForgotPassword);
router.post('/verify-otp', verifyAdminOtp);
router.post('/reset-password', resetAdminPassword);
router.put('/profile', protectAdmin, adminOnly, upload.single('profileImage'), updateAdminProfile);
router.post('/profile/request-current-email-otp', protectAdmin, adminOnly, requestAdminCurrentEmailOtp);
router.post('/profile/verify-current-email', protectAdmin, adminOnly, verifyAdminCurrentEmail);
router.post('/profile/request-email-change', protectAdmin, adminOnly, requestAdminEmailChangeOtp);
router.post('/profile/verify-email-change', protectAdmin, adminOnly, verifyAdminEmailChange);
router.put('/update-password', protectAdmin, adminOnly, updateAdminPassword);
router.get('/me', protectAdmin, adminOnly, getAdminMe);
router.post('/logout', adminLogout);

export default router;
```

### `backend/src/routes/admin/userManagementRoutes.js`
- **Size**: 441 bytes | **Lines**: 17

```javascript
import express from 'express';
import {
  getAllUsers,
  getUserById,
  toggleBlockUser,
} from '../../controllers/admin/userManagementController.js';
import { protectAdmin, adminOnly } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin, adminOnly);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/toggle-block', toggleBlockUser);

export default router;
```

### `backend/src/routes/index.js`
- **Size**: 775 bytes | **Lines**: 24

```javascript
import express from 'express';
import adminAuthRoutes from './admin/adminAuthRoutes.js';
import userManagementRoutes from './admin/userManagementRoutes.js';
import userAuthRoutes from './user/authRoutes.js';
import userProfileRoutes from './user/profileRoutes.js';
import userAddressRoutes from './user/addressRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Mobifys API is running' });
});

// Admin APIs
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/users', userManagementRoutes);

// User APIs
router.use('/user/auth', userAuthRoutes);
router.use('/user/profile', userProfileRoutes);
router.use('/user/addresses', userAddressRoutes);

export default router;
```

### `backend/src/routes/user/addressRoutes.js`
- **Size**: 443 bytes | **Lines**: 19

```javascript
import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../../controllers/user/addressController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectUser);

router.get('/', getAddresses);
router.post('/', addAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;
```

### `backend/src/routes/user/authRoutes.js`
- **Size**: 1469 bytes | **Lines**: 51

```javascript
import express from 'express';
import passport from 'passport';
import {
  signupUser,
  verifySignupOtp,
  resendUserOtp,
  loginUser,
  forgotUserPassword,
  verifyForgotPasswordOtp,
  resetUserPassword,
  getUserMe,
  refreshUserToken,
  logoutUser,
} from '../../controllers/user/authController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';
import issueAuthTokens from '../../services/tokenService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { env } from '../../config/env.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);
router.post('/resend-otp', resendUserOtp);
router.post('/login', loginUser);
router.post('/refresh', refreshUserToken);
router.post('/forgot-password', forgotUserPassword);
router.post('/verify-otp', verifyForgotPasswordOtp);
router.post('/reset-password', resetUserPassword);
router.get('/me', protectUser, getUserMe);
router.post('/logout', logoutUser);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.clientUrl}/login?error=sso_failed`,
  }),
  asyncHandler(async (req, res) => {
    await issueAuthTokens({ req, res, user: req.user, keepSignedIn: true });
    res.redirect(`${env.clientUrl}/`);
  })
);

export default router;
```

### `backend/src/routes/user/profileRoutes.js`
- **Size**: 881 bytes | **Lines**: 27

```javascript
import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  requestCurrentEmailOtp,
  verifyCurrentEmail,
  requestEmailChangeOtp,
  verifyEmailChange,
  changeUserPassword,
} from '../../controllers/user/profileController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

router.use(protectUser);

router.get('/', getUserProfile);
router.put('/', upload.single('profileImage'), updateUserProfile);
router.post('/request-current-email-otp', requestCurrentEmailOtp);
router.post('/verify-current-email', verifyCurrentEmail);
router.post('/request-email-change', requestEmailChangeOtp);
router.post('/verify-email-change', verifyEmailChange);
router.put('/change-password', changeUserPassword);

export default router;
```

### `backend/src/services/addressService.js`
- **Size**: 2333 bytes | **Lines**: 91

```javascript
import Address from '../models/Address.js';
import ApiError from '../utils/ApiError.js';

export const listUserAddresses = (userId) =>
  Address.find({ userId, status: 'active' })
    .sort({ isDefault: -1, createdAt: -1 })
    .lean();

export const createUserAddress = async ({
  userId,
  label,
  address,
  street,
  city,
  state,
  pin,
  phone,
  isDefault,
}) => {
  const existingCount = await Address.countDocuments({ userId, status: 'active' });
  const shouldBeDefault = existingCount === 0 ? true : Boolean(isDefault);

  if (shouldBeDefault) {
    await Address.updateMany(
      { userId, status: 'active', isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  return Address.create({
    userId,
    label: label || 'Home',
    address,
    street,
    city,
    state,
    pin,
    phone,
    isDefault: shouldBeDefault,
  });
};

export const updateUserAddress = async ({ userId, addressId, payload }) => {
  const { label, address, street, city, state, pin, phone, isDefault } = payload;
  const addr = await Address.findOne({ _id: addressId, userId, status: 'active' });

  if (!addr) {
    throw new ApiError(404, 'Address not found');
  }

  if (isDefault) {
    await Address.updateMany(
      { userId, status: 'active', isDefault: true },
      { $set: { isDefault: false } }
    );
    addr.isDefault = true;
  }

  if (label !== undefined) addr.label = label;
  if (address !== undefined) addr.address = address;
  if (street !== undefined) addr.street = street;
  if (city !== undefined) addr.city = city;
  if (state !== undefined) addr.state = state;
  if (pin !== undefined) addr.pin = pin;
  if (phone !== undefined) addr.phone = phone;

  await addr.save();
  return addr;
};

export const softDeleteUserAddress = async ({ userId, addressId }) => {
  const addr = await Address.findOne({ _id: addressId, userId, status: 'active' });

  if (!addr) {
    throw new ApiError(404, 'Address not found');
  }

  const wasDefault = addr.isDefault;
  addr.status = 'deleted';
  addr.isDefault = false;
  await addr.save();

  if (wasDefault) {
    await Address.findOneAndUpdate(
      { userId, status: 'active' },
      { $set: { isDefault: true } },
      { sort: { createdAt: -1 } }
    );
  }
};
```

### `backend/src/services/adminAuthService.js`
- **Size**: 3556 bytes | **Lines**: 131

```javascript
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { syncProfileImage } from './s3Service.js';
import { revokeAllUserTokens } from './tokenService.js';
import {
  normalizeEmail,
  validateFullName,
  validateIndianPhone,
} from '../validators/authValidator.js';

const ADMIN_ROLES = ['admin'];

export const authenticateAdmin = async ({ email, password }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  });

  if (!admin || !admin.passwordHash) {
    throw new ApiError(401, 'Invalid admin credentials');
  }

  if (admin.status === 'blocked') {
    throw new ApiError(403, 'This admin account is disabled');
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid admin credentials');
  }

  return admin;
};

export const sendAdminForgotPasswordOtp = async ({ email }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  })
    .select('_id email')
    .lean();

  if (!admin) {
    throw new ApiError(404, 'Administrator account not found');
  }

  const { expiresAt } = await createAndSendOtp({
    email: admin.email,
    purpose: 'admin_reset',
    userId: admin._id,
  });

  return { email: admin.email, expiresAt };
};

export const verifyAdminResetOtp = async ({ email, otp }) => {
  await verifyOtpCode({
    email: normalizeEmail(email),
    otp: otp.trim(),
    purpose: 'admin_reset',
  });
};

export const resetAdminAccountPassword = async ({ email, newPassword }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  });

  if (!admin) {
    throw new ApiError(404, 'Administrator not found');
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.passwordChangedAt = new Date();
  await admin.save();
  await revokeAllUserTokens(admin._id, 'admin');

  return admin.email;
};

export const updateAdminAccountPassword = async ({ adminId, currentPassword, newPassword }) => {
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, 'Administrator not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Current admin password is incorrect');
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.passwordChangedAt = new Date();
  await admin.save();
  await revokeAllUserTokens(admin._id, 'admin');

  return admin;
};

export const updateAdminAccountProfile = async ({
  adminId,
  name,
  phone,
  file,
  removeProfileImage,
}) => {
  const admin = await User.findById(adminId);
  if (!admin || !ADMIN_ROLES.includes(admin.role)) {
    throw new ApiError(404, 'Administrator not found');
  }

  admin.name = validateFullName(name);
  if (phone !== undefined) {
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    admin.phone = trimmedPhone ? validateIndianPhone(trimmedPhone) : '';
  }

  admin.profileImage = await syncProfileImage({
    currentImageUrl: admin.profileImage,
    file,
    removeImage: removeProfileImage === 'true' || removeProfileImage === true,
    folder: 'profiles',
  });

  await admin.save();
  return admin;
};
```

### `backend/src/services/emailService.js`
- **Size**: 1099 bytes | **Lines**: 39

```javascript
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { buildOtpEmail } from '../templates/emailTemplates.js';

let cachedTransporter = null;

const getTransporter = () => {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    });
  }
  return cachedTransporter;
};

export const sendOtpEmail = async (toEmail, otp, purpose) => {
  const { subject, html } = buildOtpEmail(otp, purpose);

  // Local dev fallback if Gmail credentials are not configured
  if (!env.email.user || !env.email.pass || env.email.user === 'your_email@gmail.com') {
    console.log(`\n========================================`);
    console.log(`[DEV OTP] To: ${toEmail} | Purpose: ${purpose}`);
    console.log(`[DEV OTP] 6-Digit Code: ${otp}`);
    console.log(`========================================\n`);
    return;
  }

  await getTransporter().sendMail({
    from: `"Mobifys" <${env.email.user}>`,
    to: toEmail,
    subject,
    html,
  });
};
```

### `backend/src/services/otpService.js`
- **Size**: 1610 bytes | **Lines**: 58

```javascript
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Otp from '../models/Otp.js';
import ApiError from '../utils/ApiError.js';
import { sendOtpEmail } from './emailService.js';

const OTP_TTL_MS = 2 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

export const createAndSendOtp = async ({ email, purpose, userId = null }) => {
  await Otp.deleteMany({ email, purpose, verifiedAt: null });

  const plainOtp = crypto.randomInt(100000, 999999).toString();
  const otpHash = await bcrypt.hash(plainOtp, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await Otp.create({
    userId,
    email,
    otpHash,
    purpose,
    expiresAt,
  });

  await sendOtpEmail(email, plainOtp, purpose);
  return { expiresAt };
};

export const verifyOtpCode = async ({ email, otp, purpose }) => {
  const record = await Otp.findOne({ email, purpose, verifiedAt: null }).sort({
    createdAt: -1,
  });

  if (!record) {
    throw new ApiError(400, 'OTP not found or already used. Please request a new code.');
  }

  if (record.expiresAt < new Date()) {
    throw new ApiError(400, 'OTP has expired. Please click Resend OTP.');
  }

  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    throw new ApiError(400, 'Too many failed attempts. Please request a new OTP.');
  }

  const isMatch = await bcrypt.compare(otp, record.otpHash);
  if (!isMatch) {
    record.attempts += 1;
    await record.save();
    throw new ApiError(400, 'Invalid OTP code. Please try again.');
  }

  record.verifiedAt = new Date();
  await record.save();

  return record;
};
```

### `backend/src/services/profileService.js`
- **Size**: 5244 bytes | **Lines**: 169

```javascript
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Address from '../models/Address.js';
import Otp from '../models/Otp.js';
import ApiError from '../utils/ApiError.js';
import { syncProfileImage } from './s3Service.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { revokeAllUserTokens } from './tokenService.js';
import { normalizeEmail, validateEmailAddress } from '../validators/authValidator.js';

const CURRENT_EMAIL_WINDOW_MS = 15 * 60 * 1000;

// Profile read & update
export const fetchUserProfile = async (userId) => {
  const [user, addresses] = await Promise.all([
    User.findById(userId).select('-passwordHash').lean(),
    Address.find({ userId, status: 'active' })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean(),
  ]);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return { user, addresses };
};

export const updateProfileDetails = async ({ userId, name, phone, file, removeProfileImage }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (name && name.trim()) {
    user.name = name.trim();
  }
  if (phone !== undefined) {
    user.phone = phone.trim();
  }

  user.profileImage = await syncProfileImage({
    currentImageUrl: user.profileImage,
    file,
    removeImage: removeProfileImage === 'true' || removeProfileImage === true,
    folder: 'profiles',
  });

  await user.save();
  return user;
};

// Two-step email change (current email OTP -> new email OTP)
const assertCurrentEmailVerified = async (userId, currentEmail) => {
  const verifiedRecord = await Otp.findOne({
    userId,
    email: currentEmail,
    purpose: 'current_email_verify',
    verifiedAt: { $ne: null },
    expiresAt: { $gt: new Date() },
  })
    .select('_id')
    .lean();

  if (!verifiedRecord) {
    throw new ApiError(403, 'Please verify your current registered email with OTP first');
  }
};

export const requestCurrentEmailVerification = async ({ userId, currentEmail, enteredEmail }) => {
  const cleanEnteredEmail = normalizeEmail(enteredEmail);
  if (cleanEnteredEmail !== currentEmail) {
    throw new ApiError(400, 'Entered email does not match your current registered email');
  }

  await Otp.deleteMany({ userId, purpose: 'current_email_verify' });

  const { expiresAt } = await createAndSendOtp({
    email: currentEmail,
    purpose: 'current_email_verify',
    userId,
  });

  return { email: currentEmail, expiresAt };
};

export const confirmCurrentEmailVerification = async ({ userId, currentEmail, enteredEmail, otp }) => {
  const cleanEnteredEmail = normalizeEmail(enteredEmail);
  if (cleanEnteredEmail !== currentEmail) {
    throw new ApiError(400, 'Entered email does not match your current registered email');
  }

  const record = await verifyOtpCode({
    email: currentEmail,
    otp: otp.trim(),
    purpose: 'current_email_verify',
  });

  // Keep this verified authorization alive long enough to complete Step 2
  record.expiresAt = new Date(Date.now() + CURRENT_EMAIL_WINDOW_MS);
  await record.save();

  return { email: currentEmail, verifiedUntil: record.expiresAt };
};

export const requestUserEmailChange = async ({ userId, currentEmail, newEmail }) => {
  await assertCurrentEmailVerified(userId, currentEmail);

  const cleanNewEmail = validateEmailAddress(newEmail);
  if (cleanNewEmail === currentEmail) {
    throw new ApiError(400, 'Please enter a different email address');
  }

  const emailTaken = await User.findOne({ email: cleanNewEmail }).select('_id').lean();
  if (emailTaken) {
    throw new ApiError(409, 'This email is already in use');
  }

  const { expiresAt } = await createAndSendOtp({
    email: cleanNewEmail,
    purpose: 'email_change',
    userId,
  });

  return { email: cleanNewEmail, expiresAt };
};

export const confirmUserEmailChange = async ({ userId, currentEmail, newEmail, otp }) => {
  await assertCurrentEmailVerified(userId, currentEmail);

  const cleanNewEmail = normalizeEmail(newEmail);
  await verifyOtpCode({ email: cleanNewEmail, otp: otp.trim(), purpose: 'email_change' });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { email: cleanNewEmail } },
    { new: true }
  ).select('-passwordHash');

  await Otp.deleteMany({ userId, purpose: 'current_email_verify' });

  return user;
};

// Password change
export const changeAccountPassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.passwordHash) {
    if (!currentPassword) {
      throw new ApiError(400, 'Current password is required');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new ApiError(401, 'Current password is incorrect');
    }
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordChangedAt = new Date();
  await user.save();
  await revokeAllUserTokens(user._id, 'user');

  return user;
};
```

### `backend/src/services/s3Service.js`
- **Size**: 2308 bytes | **Lines**: 81

```javascript
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import s3Client from '../config/s3.js';
import { env } from '../config/env.js';

const hasValidAwsConfig = () =>
  Boolean(
    env.aws.accessKeyId &&
      env.aws.accessKeyId.startsWith('AKIA') &&
      env.aws.secretAccessKey &&
      env.aws.bucketName
  );

export const uploadToS3 = async (file, folder = 'profiles') => {
  const ext = path.extname(file.originalname);
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;

  if (!hasValidAwsConfig()) {
    const localDir = path.join(process.cwd(), 'uploads', folder);
    await fs.mkdir(localDir, { recursive: true });
    await fs.writeFile(path.join(localDir, randomName), file.buffer);
    return `http://localhost:${env.port}/uploads/${folder}/${randomName}`;
  }

  const fileName = `${folder}/${randomName}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.aws.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `https://${env.aws.bucketName}.s3.${env.aws.region}.amazonaws.com/${fileName}`;
};

export const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  if (fileUrl.includes('/uploads/')) {
    const relPath = fileUrl.split('/uploads/')[1];
    const fullPath = path.join(process.cwd(), 'uploads', relPath);
    await fs.unlink(fullPath).catch(() => {});
    return;
  }

  if (!fileUrl.includes('.amazonaws.com/') || !hasValidAwsConfig()) return;
  const key = fileUrl.split('.amazonaws.com/')[1];
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.aws.bucketName,
      Key: key,
    })
  );
};

export const syncProfileImage = async ({
  currentImageUrl = '',
  file,
  removeImage = false,
  folder = 'profiles',
}) => {
  if (file) {
    const nextImageUrl = await uploadToS3(file, folder);
    if (currentImageUrl) {
      await deleteFromS3(currentImageUrl).catch(() => {});
    }
    return nextImageUrl;
  }

  if (removeImage && currentImageUrl) {
    await deleteFromS3(currentImageUrl).catch(() => {});
    return '';
  }

  return currentImageUrl;
};
```

### `backend/src/services/tokenService.js`
- **Size**: 10315 bytes | **Lines**: 349

```javascript
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';
import User from '../models/User.js';
import { env } from '../config/env.js';

const TOKEN_ISSUER = 'mobifys';

// Scope configuration (separate cookies & secrets for user vs admin)
const SCOPE_CONFIG = {
  user: {
    getSecrets: () => ({
      accessSecret: env.jwt.userAccessSecret,
      refreshSecret: env.jwt.userRefreshSecret,
    }),
    accessCookieName: 'mobifys_user_access_token',
    refreshCookieName: 'mobifys_user_refresh_token',
    refreshCookiePath: '/api/user/auth',
    audience: 'mobifys-user',
    allowedRoles: ['user'],
  },
  admin: {
    getSecrets: () => ({
      accessSecret: env.jwt.adminAccessSecret,
      refreshSecret: env.jwt.adminRefreshSecret,
    }),
    accessCookieName: 'mobifys_admin_access_token',
    refreshCookieName: 'mobifys_admin_refresh_token',
    refreshCookiePath: '/api/admin/auth',
    audience: 'mobifys-admin',
    allowedRoles: ['admin'],
  },
};

const UNIT_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

export const getScopeForRole = (role) => (role === 'admin' ? 'admin' : 'user');

export const getScopeConfig = (scope) => {
  const cfg = SCOPE_CONFIG[scope];
  if (!cfg) {
    throw new Error(`Invalid auth scope: ${scope}`);
  }

  const { accessSecret, refreshSecret } = cfg.getSecrets();
  if (!accessSecret || !refreshSecret) {
    throw new Error(`Missing JWT secrets for scope: ${scope}`);
  }

  return { ...cfg, accessSecret, refreshSecret };
};

export const parseDurationToMs = (value, fallbackMs) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value * 1000;
  }
  if (typeof value !== 'string') return fallbackMs;

  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed) * 1000;
  }

  const match = trimmed.match(/^(\d+)([smhd])$/i);
  if (!match) return fallbackMs;

  return Number(match[1]) * UNIT_MS[match[2].toLowerCase()];
};

export const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

export const isTokenIssuedBeforePasswordChange = (user, tokenIatSeconds) => {
  if (!user?.passwordChangedAt || !tokenIatSeconds) return false;
  const passwordChangedSec = Math.floor(new Date(user.passwordChangedAt).getTime() / 1000);
  return passwordChangedSec > tokenIatSeconds;
};

const getBaseCookieOptions = () => ({
  httpOnly: true,
  secure: env.isProd,
  sameSite: 'lax',
});

export const clearAuthCookies = (res, scope) => {
  const cfg = SCOPE_CONFIG[scope];
  if (!cfg) return;

  const base = getBaseCookieOptions();
  res.clearCookie(cfg.accessCookieName, { ...base, path: '/' });
  res.clearCookie(cfg.refreshCookieName, { ...base, path: cfg.refreshCookiePath });
};

// JWT verification helpers
const verifyScopedJwt = (token, scope, expectedType) => {
  const cfg = getScopeConfig(scope);
  const secret = expectedType === 'refresh' ? cfg.refreshSecret : cfg.accessSecret;

  const decoded = jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer: TOKEN_ISSUER,
    audience: cfg.audience,
  });

  if (
    decoded.type !== expectedType ||
    decoded.scope !== scope ||
    !cfg.allowedRoles.includes(decoded.role)
  ) {
    throw new Error(`Invalid ${expectedType} token claims`);
  }

  return decoded;
};

export const verifyAccessToken = (token, scope) => verifyScopedJwt(token, scope, 'access');
export const verifyRefreshToken = (token, scope) => verifyScopedJwt(token, scope, 'refresh');

/**
 * Issue a short-lived JWT access token and a persistent, hashed refresh token
 * stored in MongoDB, setting both as HttpOnly cookies scoped to user or admin.
 */
export const issueAuthTokens = async ({
  req,
  res,
  user,
  keepSignedIn = false,
  familyId = null,
}) => {
  const scope = getScopeForRole(user.role);
  const cfg = getScopeConfig(scope);

  const accessExpiresIn = env.jwt.accessExpiresIn;
  const refreshExpiresIn = keepSignedIn
    ? env.jwt.rememberRefreshExpiresIn
    : env.jwt.refreshExpiresIn;

  const accessMaxAgeMs = parseDurationToMs(accessExpiresIn, 15 * 60 * 1000);
  const refreshMaxAgeMs = parseDurationToMs(
    refreshExpiresIn,
    (keepSignedIn ? 30 : 7) * 24 * 60 * 60 * 1000
  );

  const tokenFamilyId = familyId || crypto.randomUUID();
  const userIdStr = user._id.toString();

  const accessToken = jwt.sign(
    {
      sub: userIdStr,
      userId: userIdStr,
      role: user.role,
      scope,
      type: 'access',
    },
    cfg.accessSecret,
    {
      algorithm: 'HS256',
      expiresIn: accessExpiresIn,
      issuer: TOKEN_ISSUER,
      audience: cfg.audience,
      jwtid: crypto.randomUUID(),
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: userIdStr,
      userId: userIdStr,
      role: user.role,
      scope,
      type: 'refresh',
      familyId: tokenFamilyId,
    },
    cfg.refreshSecret,
    {
      algorithm: 'HS256',
      expiresIn: refreshExpiresIn,
      issuer: TOKEN_ISSUER,
      audience: cfg.audience,
      jwtid: crypto.randomUUID(),
    }
  );

  const refreshTokenHash = hashToken(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    scope,
    tokenHash: refreshTokenHash,
    familyId: tokenFamilyId,
    keepSignedIn: Boolean(keepSignedIn),
    expiresAt: new Date(Date.now() + refreshMaxAgeMs),
    userAgent: req?.get?.('user-agent') || '',
    ip: req?.ip || '',
  });

  const baseCookie = getBaseCookieOptions();
  res.cookie(cfg.accessCookieName, accessToken, {
    ...baseCookie,
    path: '/',
    maxAge: accessMaxAgeMs,
  });

  res.cookie(cfg.refreshCookieName, refreshToken, {
    ...baseCookie,
    path: cfg.refreshCookiePath,
    maxAge: refreshMaxAgeMs,
  });

  return { accessToken, refreshToken, refreshTokenHash };
};

const revokeFamily = (familyId) =>
  RefreshToken.updateMany({ familyId, revokedAt: null }, { $set: { revokedAt: new Date() } });

export const revokeAllUserTokens = async (userId, scope = null) => {
  const filter = { userId, revokedAt: null };
  if (scope) {
    filter.scope = scope;
  }
  await RefreshToken.updateMany(filter, { $set: { revokedAt: new Date() } });
};

/**
 * Rotate a refresh token: verifies JWT signature, atomically revokes the old
 * DB token, detects token reuse across a family, and issues fresh cookies.
 */
export const rotateRefreshToken = async ({ req, res, scope }) => {
  const cfg = getScopeConfig(scope);
  const rawRefreshToken = req.cookies?.[cfg.refreshCookieName];

  if (!rawRefreshToken) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Refresh token missing' };
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(rawRefreshToken, scope);
  } catch {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Invalid or expired refresh token' };
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existingRecord = await RefreshToken.findOne({ tokenHash }).lean();

  if (!existingRecord) {
    if (decoded.familyId) {
      await revokeFamily(decoded.familyId);
    }
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Session revoked, please log in again' };
  }

  if (existingRecord.revokedAt) {
    const blockedUser = await User.findById(existingRecord.userId)
      .select('isBlocked status')
      .lean();
    await revokeFamily(existingRecord.familyId);
    clearAuthCookies(res, scope);
    if (blockedUser && (blockedUser.isBlocked || blockedUser.status === 'blocked')) {
      return {
        ok: false,
        status: 403,
        code: 'ACCOUNT_BLOCKED',
        message: 'Your account has been blocked. Contact Mobifys support.',
      };
    }
    return { ok: false, status: 401, message: 'Session invalidated for security, please log in again' };
  }

  if (existingRecord.expiresAt <= new Date()) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Refresh token expired, please log in again' };
  }

  const revokedRecord = await RefreshToken.findOneAndUpdate(
    { _id: existingRecord._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
    { new: true }
  ).lean();

  if (!revokedRecord) {
    await revokeFamily(existingRecord.familyId);
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Session invalidated, please log in again' };
  }

  const user = await User.findById(existingRecord.userId).select('-passwordHash').lean();
  if (!user || !cfg.allowedRoles.includes(user.role)) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Account not found' };
  }

  if (user.isBlocked || user.status === 'blocked') {
    await revokeAllUserTokens(user._id, scope);
    clearAuthCookies(res, scope);
    return {
      ok: false,
      status: 403,
      code: 'ACCOUNT_BLOCKED',
      message: 'Your account has been blocked. Contact Mobifys support.',
    };
  }

  if (isTokenIssuedBeforePasswordChange(user, decoded.iat)) {
    await revokeAllUserTokens(user._id, scope);
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Password was changed, please log in again' };
  }

  const { refreshTokenHash: newTokenHash } = await issueAuthTokens({
    req,
    res,
    user,
    keepSignedIn: existingRecord.keepSignedIn,
    familyId: existingRecord.familyId,
  });

  await RefreshToken.updateOne(
    { _id: existingRecord._id },
    { $set: { replacedByTokenHash: newTokenHash } }
  );

  return { ok: true, user };
};

export const revokeSessionToken = async (req, res, scope) => {
  const cfg = SCOPE_CONFIG[scope];
  const rawRefreshToken = cfg ? req.cookies?.[cfg.refreshCookieName] : null;

  if (rawRefreshToken) {
    await RefreshToken.updateOne(
      { tokenHash: hashToken(rawRefreshToken), revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );
  }

  clearAuthCookies(res, scope);
};

export default issueAuthTokens;
```

### `backend/src/services/userAuthService.js`
- **Size**: 5991 bytes | **Lines**: 194

```javascript
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import ApiError from '../utils/ApiError.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { revokeAllUserTokens } from './tokenService.js';
import { normalizeEmail } from '../validators/authValidator.js';

const FORGOT_PASSWORD_RESET_WINDOW_MS = 15 * 60 * 1000;

export const signupUserAccount = async ({ name, email, phone, password }) => {
  const cleanEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: cleanEmail });

  if (existingUser && (existingUser.isBlocked || existingUser.status === 'blocked')) {
    throw new ApiError(403, 'Your account has been blocked by Admin. Contact support.');
  }

  if (existingUser && existingUser.status === 'active') {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let user;

  if (existingUser && existingUser.status === 'unverified') {
    existingUser.name = name.trim();
    existingUser.phone = phone?.trim() || '';
    existingUser.passwordHash = passwordHash;
    user = await existingUser.save();
  } else {
    user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone?.trim() || '',
      passwordHash,
      role: 'user',
      status: 'unverified',
    });
  }

  const { expiresAt } = await createAndSendOtp({
    email: cleanEmail,
    purpose: 'signup',
    userId: user._id,
  });

  return { email: cleanEmail, expiresAt };
};

export const verifyUserSignupOtp = async ({ email, otp }) => {
  const cleanEmail = normalizeEmail(email);
  await verifyOtpCode({ email: cleanEmail, otp: otp.trim(), purpose: 'signup' });

  const user = await User.findOne({ email: cleanEmail });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.status = 'active';
  await user.save();
  return user;
};

export const resendUserOtpCode = async ({ email, purpose }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' })
    .select('_id isBlocked status')
    .lean();
  if (!user) {
    throw new ApiError(404, 'Account not found');
  }
  if (user.isBlocked || user.status === 'blocked') {
    throw new ApiError(403, 'Your account has been blocked by Admin. Contact support.');
  }

  if (purpose === 'forgot_password') {
    await Otp.deleteMany({
      email: cleanEmail,
      purpose: 'forgot_password',
      verifiedAt: { $ne: null },
    });
  }

  const { expiresAt } = await createAndSendOtp({
    email: cleanEmail,
    purpose,
    userId: user._id,
  });

  return { expiresAt };
};

export const authenticateUser = async ({ email, password }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (user.isBlocked || user.status === 'blocked') {
    throw new ApiError(403, 'Your account has been blocked by Admin. Contact support.');
  }

  if (user.status === 'unverified') {
    throw new ApiError(403, 'Please verify your email via OTP before signing in.', {
      needsVerification: true,
    });
  }

  if (!user.passwordHash) {
    throw new ApiError(400, 'This account uses Google Sign-In. Please continue with Google.');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return user;
};

export const sendUserForgotPasswordOtp = async ({ email }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' })
    .select('_id isBlocked status')
    .lean();
  if (!user) {
    throw new ApiError(404, 'No account found with this email');
  }
  if (user.isBlocked || user.status === 'blocked') {
    throw new ApiError(403, 'Your account has been blocked by Admin. Contact support.');
  }

  await Otp.deleteMany({ email: cleanEmail, purpose: 'forgot_password' });

  const { expiresAt } = await createAndSendOtp({
    email: cleanEmail,
    purpose: 'forgot_password',
    userId: user._id,
  });

  return { email: cleanEmail, expiresAt };
};

export const verifyUserForgotPasswordOtp = async ({ email, otp }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' }).select('_id').lean();
  if (!user) {
    throw new ApiError(404, 'No account found with this email');
  }

  const record = await verifyOtpCode({
    email: cleanEmail,
    otp: otp.trim(),
    purpose: 'forgot_password',
  });

  // Keep the verified OTP alive during the password reset window.
  record.expiresAt = new Date(Date.now() + FORGOT_PASSWORD_RESET_WINDOW_MS);
  await record.save();

  return { email: cleanEmail, verifiedUntil: record.expiresAt };
};

export const resetUserPasswordWithOtp = async ({ email, newPassword }) => {
  const cleanEmail = normalizeEmail(email);
  const verifiedOtp = await Otp.findOne({
    email: cleanEmail,
    purpose: 'forgot_password',
    verifiedAt: { $ne: null },
    expiresAt: { $gt: new Date() },
  })
    .select('_id')
    .lean();

  if (!verifiedOtp) {
    throw new ApiError(403, 'Please verify your OTP before resetting your password');
  }

  const user = await User.findOne({ email: cleanEmail, role: 'user' });
  if (!user) {
    throw new ApiError(404, 'No account found with this email');
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordChangedAt = new Date();
  await user.save();
  await Promise.all([
    Otp.deleteMany({ email: cleanEmail, purpose: 'forgot_password' }),
    revokeAllUserTokens(user._id, 'user'),
  ]);
};
```

### `backend/src/services/userManagementService.js`
- **Size**: 3496 bytes | **Lines**: 122

```javascript
import User from '../models/User.js';
import Address from '../models/Address.js';
import ApiError from '../utils/ApiError.js';
import { revokeAllUserTokens } from './tokenService.js';

const USER_SORT_OPTIONS = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  name_asc: { name: 1, createdAt: -1 },
  name_desc: { name: -1, createdAt: -1 },
  wallet_desc: { walletBalance: -1, createdAt: -1 },
  wallet_asc: { walletBalance: 1, createdAt: -1 },
};

export const listUsers = async ({
  page = 1,
  limit = 10,
  search = '',
  status = 'all',
  sort = 'latest',
}) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const cleanSearch = search.trim();
  const cleanStatus = status.toLowerCase();
  const cleanSort = typeof sort === 'string' ? sort.toLowerCase() : 'latest';
  const sortOrder = USER_SORT_OPTIONS[cleanSort] || USER_SORT_OPTIONS.latest;

  const query = { role: 'user' };

  if (cleanSearch) {
    const escapedSearch = cleanSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.$or = [
      { name: { $regex: escapedSearch, $options: 'i' } },
      { email: { $regex: escapedSearch, $options: 'i' } },
      { phone: { $regex: escapedSearch, $options: 'i' } },
    ];
  }

  if (cleanStatus === 'active') {
    query.isBlocked = false;
  } else if (cleanStatus === 'blocked') {
    query.isBlocked = true;
  }

  const skip = (parsedPage - 1) * parsedLimit;
  const usersQuery = User.find(query)
    .select('-passwordHash')
    .sort(sortOrder)
    .skip(skip)
    .limit(parsedLimit)
    .lean();

  if (cleanSort === 'name_asc' || cleanSort === 'name_desc') {
    usersQuery.collation({ locale: 'en', strength: 2 });
  }

  const [totalUsers, users, totalAllUsers, activeUsers, blockedUsers] = await Promise.all([
    User.countDocuments(query),
    usersQuery,
    User.countDocuments({ role: 'user' }),
    User.countDocuments({ role: 'user', isBlocked: false }),
    User.countDocuments({ role: 'user', isBlocked: true }),
  ]);

  const totalPages = Math.ceil(totalUsers / parsedLimit) || 1;

  return {
    users,
    pagination: {
      currentPage: parsedPage,
      totalPages,
      totalUsers,
      limit: parsedLimit,
      showingFrom: totalUsers === 0 ? 0 : skip + 1,
      showingTo: Math.min(skip + parsedLimit, totalUsers),
    },
    stats: {
      total: totalAllUsers,
      active: activeUsers,
      blocked: blockedUsers,
    },
  };
};

export const getUserDetails = async (userId) => {
  const [user, addresses] = await Promise.all([
    User.findOne({ _id: userId, role: 'user' }).select('-passwordHash').lean(),
    Address.find({ userId, status: 'active' })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean(),
  ]);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return { user, addresses };
};

export const toggleUserBlockStatus = async (userId) => {
  const user = await User.findOne({ _id: userId, role: 'user' });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isBlocked = !user.isBlocked;
  user.status = user.isBlocked ? 'blocked' : 'active';
  await user.save();

  if (user.isBlocked) {
    await revokeAllUserTokens(user._id, 'user');
  }

  return {
    _id: user._id,
    name: user.name,
    isBlocked: user.isBlocked,
    status: user.status,
  };
};
```

### `backend/src/templates/emailTemplates.js`
- **Size**: 1573 bytes | **Lines**: 41

```javascript
const OTP_TITLES = {
  signup: 'Verify Your Mobifys Account',
  forgot_password: 'Reset Your Mobifys Password',
  email_change: 'Confirm Your New Email Address',
  current_email_verify: 'Verify Your Current Mobifys Email',
  admin_reset: 'Mobifys Admin Password Recovery Code',
};

export const buildOtpEmail = (otp, purpose) => {
  const subject = OTP_TITLES[purpose] || 'Your Mobifys Verification Code';
  const otpDigits = String(otp ?? '')
    .trim()
    .slice(0, 6)
    .split('');

  const digitBoxesHtml = otpDigits
    .map(
      (digit) => `
          <td style="padding: 0 4px;">
            <div style="width: 42px; height: 48px; line-height: 48px; background: #FFF3ED; border: 1px solid #FF5722; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; color: #FF5722;">
              ${digit}
            </div>
          </td>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
      <h2 style="color: #111; margin-bottom: 8px;">mobifys.</h2>
      <p style="color: #555; font-size: 14px;">${subject}</p>
      <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin: 20px auto; border-collapse: collapse;">
        <tr>${digitBoxesHtml}
        </tr>
      </table>
      <p style="color: #777; font-size: 12px;">This code expires in 2 minutes. Do not share this code with anyone.</p>
    </div>
  `;

  return { subject, html };
};
```

### `backend/src/utils/ApiError.js`
- **Size**: 223 bytes | **Lines**: 9

```javascript
export default class ApiError extends Error {
  constructor(statusCode, message, extra = {}) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    Object.assign(this, extra);
  }
}
```

### `backend/src/utils/asyncHandler.js`
- **Size**: 134 bytes | **Lines**: 5

```javascript
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
```

### `backend/src/utils/generateToken.js`
- **Size**: 366 bytes | **Lines**: 18

```javascript
export {
  default,
  clearAuthCookies,
  getScopeConfig,
  getScopeForRole,
  hashToken,
  isTokenIssuedBeforePasswordChange,
  issueAuthTokens,
  parseDurationToMs,
  revokeAllUserTokens,
  revokeSessionToken,
  rotateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../services/tokenService.js';

export { assertAuthEnv } from '../config/env.js';
```

### `backend/src/utils/serializers.js`
- **Size**: 446 bytes | **Lines**: 19

```javascript
export const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  profileImage: user.profileImage,
  walletBalance: user.walletBalance,
  referralCode: user.referralCode,
});

export const sanitizeAdmin = (admin) => ({
  _id: admin._id,
  name: admin.name,
  email: admin.email,
  phone: admin.phone || '',
  profileImage: admin.profileImage || '',
  role: admin.role,
});
```

### `backend/src/validators/addressValidator.js`
- **Size**: 4634 bytes | **Lines**: 159

```javascript
import ApiError from '../utils/ApiError.js';
import { normalizeName, validateIndianPhone } from './authValidator.js';

export const ADDRESS_LABELS = ['Home', 'Work', 'Other'];
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
export const ADDRESS_MIN_LENGTH = 3;
export const ADDRESS_MAX_LENGTH = 120;
export const STREET_MIN_LENGTH = 3;
export const STREET_MAX_LENGTH = 100;
export const CITY_MIN_LENGTH = 2;
export const CITY_MAX_LENGTH = 50;

const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s,./#&()-]+$/;
const CITY_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const INDIAN_PIN_REGEX = /^[1-9]\d{5}$/;

export const validateAddressLine = (value, label = 'Address', min = ADDRESS_MIN_LENGTH, max = ADDRESS_MAX_LENGTH) => {
  const clean = normalizeName(value);
  if (!clean) {
    throw new ApiError(400, `${label} is required`);
  }
  if (clean.length < min) {
    throw new ApiError(400, `${label} must be at least ${min} characters`);
  }
  if (clean.length > max) {
    throw new ApiError(400, `${label} must not exceed ${max} characters`);
  }
  if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
    throw new ApiError(400, `${label} contains invalid characters`);
  }
  return clean;
};

export const validateCityName = (city) => {
  const clean = normalizeName(city);
  if (!clean) {
    throw new ApiError(400, 'Town / City is required');
  }
  if (clean.length < CITY_MIN_LENGTH) {
    throw new ApiError(400, `Town / City must be at least ${CITY_MIN_LENGTH} characters`);
  }
  if (clean.length > CITY_MAX_LENGTH) {
    throw new ApiError(400, `Town / City must not exceed ${CITY_MAX_LENGTH} characters`);
  }
  if (!CITY_REGEX.test(clean)) {
    throw new ApiError(400, 'Town / City may only contain letters, spaces, dots, hyphens, or apostrophes');
  }
  return clean;
};

export const validateStateName = (state) => {
  const clean = normalizeName(state);
  if (!clean) {
    throw new ApiError(400, 'State is required');
  }
  const matched = INDIAN_STATES.find((item) => item.toLowerCase() === clean.toLowerCase());
  if (!matched) {
    throw new ApiError(400, 'Please select a valid Indian state or union territory');
  }
  return matched;
};

export const validateIndianPin = (pin) => {
  const clean = typeof pin === 'string' ? pin.trim() : '';
  if (!clean) {
    throw new ApiError(400, 'PIN code is required');
  }
  if (!INDIAN_PIN_REGEX.test(clean)) {
    throw new ApiError(400, 'Enter a valid 6-digit Indian PIN code (cannot start with 0)');
  }
  return clean;
};

export const validateAddressLabel = (label) => {
  if (label === undefined) return 'Home';
  if (!ADDRESS_LABELS.includes(label)) {
    throw new ApiError(400, 'Address label must be Home, Work, or Other');
  }
  return label;
};

export const validateAddressPayload = (payload, { partial = false } = {}) => {
  const cleaned = {};

  if (!partial || payload.label !== undefined) {
    cleaned.label = validateAddressLabel(payload.label);
  }
  if (!partial || payload.address !== undefined) {
    cleaned.address = validateAddressLine(
      payload.address,
      'Flat / House / Building',
      ADDRESS_MIN_LENGTH,
      ADDRESS_MAX_LENGTH
    );
  }
  if (!partial || payload.street !== undefined) {
    cleaned.street = validateAddressLine(
      payload.street,
      'Street address',
      STREET_MIN_LENGTH,
      STREET_MAX_LENGTH
    );
  }
  if (!partial || payload.city !== undefined) {
    cleaned.city = validateCityName(payload.city);
  }
  if (!partial || payload.state !== undefined) {
    cleaned.state = validateStateName(payload.state);
  }
  if (!partial || payload.pin !== undefined) {
    cleaned.pin = validateIndianPin(payload.pin);
  }
  if (!partial || payload.phone !== undefined) {
    cleaned.phone = validateIndianPhone(payload.phone);
  }
  if (payload.isDefault !== undefined) {
    cleaned.isDefault = Boolean(payload.isDefault);
  }

  return cleaned;
};
```

### `backend/src/validators/authValidator.js`
- **Size**: 3722 bytes | **Lines**: 108

```javascript
import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

const NAME_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?([6-9]\d{9})$/;

export const normalizeEmail = (email) =>
  typeof email === 'string' ? email.toLowerCase().trim() : '';

export const normalizeName = (name) =>
  typeof name === 'string' ? name.trim().replace(/\s+/g, ' ') : '';

export const requireFields = (fields, message = 'All required fields must be filled') => {
  const missing = fields.some((value) =>
    typeof value === 'string' ? !value.trim() : value === undefined || value === null || value === ''
  );
  if (missing) {
    throw new ApiError(400, message);
  }
};

export const validateFullName = (name) => {
  const cleanName = normalizeName(name);
  if (!cleanName) {
    throw new ApiError(400, 'Full name is required');
  }
  if (cleanName.length < NAME_MIN_LENGTH) {
    throw new ApiError(400, `Full name must be at least ${NAME_MIN_LENGTH} characters`);
  }
  if (cleanName.length > NAME_MAX_LENGTH) {
    throw new ApiError(400, `Full name must not exceed ${NAME_MAX_LENGTH} characters`);
  }
  if (!NAME_REGEX.test(cleanName)) {
    throw new ApiError(
      400,
      'Full name may only contain letters, spaces, dots, hyphens, or apostrophes'
    );
  }
  return cleanName;
};

export const validateEmailAddress = (email) => {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new ApiError(400, 'Email address is required');
  }
  if (cleanEmail.length > 100 || !EMAIL_REGEX.test(cleanEmail)) {
    throw new ApiError(400, 'Please enter a valid email address');
  }
  return cleanEmail;
};

export const validateIndianPhone = (phone) => {
  if (typeof phone !== 'string' || !phone.trim()) {
    throw new ApiError(400, 'Mobile number is required');
  }
  const compact = phone.replace(/[\s()-]/g, '');
  const match = compact.match(INDIAN_PHONE_REGEX);
  if (!match) {
    throw new ApiError(
      400,
      'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
    );
  }
  return `+91 ${match[1]}`;
};

export const validatePasswordPair = (password, confirmPassword, minLength = PASSWORD_MIN_LENGTH) => {
  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }
  if (typeof password !== 'string' || password.length < minLength) {
    throw new ApiError(400, `Password must be at least ${minLength} characters`);
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    throw new ApiError(400, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`);
  }
};

export const validateStrongPassword = (password, confirmPassword) => {
  validatePasswordPair(password, confirmPassword, PASSWORD_MIN_LENGTH);

  if (/\s/.test(password)) {
    throw new ApiError(400, 'Password cannot contain spaces');
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    throw new ApiError(400, 'Password must include both uppercase and lowercase letters');
  }
  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, 'Password must include at least one number');
  }
  if (!/[^A-Za-z0-9\s]/.test(password)) {
    throw new ApiError(400, 'Password must include at least one special character');
  }
};

export const validateObjectId = (id, label = 'Resource') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${label} ID`);
  }
};
```

### `frontend/.gitignore`
- **Size**: 253 bytes | **Lines**: 25

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### `frontend/eslint.config.js`
- **Size**: 568 bytes | **Lines**: 22

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

### `frontend/index.html`
- **Size**: 359 bytes | **Lines**: 14

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mobifys</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `frontend/package.json`
- **Size**: 934 bytes | **Lines**: 37

```json
{
  "name": "mobifys-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.15.0",
    "axios": "^1.21.1",
    "lucide-react": "^1.79.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-hook-form": "^7.92.0",
    "react-hot-toast": "^2.6.1",
    "react-redux": "^9.3.1",
    "react-router-dom": "^7.18.7"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.3.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "eslint": "^10.14.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "tailwindcss": "^4.3.5",
    "vite": "^8.3.6"
  }
}
```

### `frontend/README.md`
- **Size**: 1027 bytes | **Lines**: 17

```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

### `frontend/src/api/axiosInstance.js`
- **Size**: 3001 bytes | **Lines**: 117

```javascript
import axios from 'axios';
import toast from 'react-hot-toast';
import { store } from '../redux/store';
import { logoutAdminState, logoutUserState } from '../redux/slices/authSlice';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const refreshLocks = {
  user: null,
  admin: null,
};

const blockedToastTimestamps = {
  user: 0,
  admin: 0,
};

const AUTH_SKIP_PATHS = [
  '/login',
  '/signup',
  '/refresh',
  '/logout',
  '/forgot-password',
  '/reset-password',
  '/verify-',
];

const isBlockedResponse = (error) =>
  error?.response?.status === 403 &&
  error?.response?.data?.code === 'ACCOUNT_BLOCKED';

const forceLogoutBlockedScope = (scope, message) => {
  const authState = store.getState().auth;
  const wasLoggedIn =
    scope === 'admin' ? Boolean(authState.admin) : Boolean(authState.user);

  if (scope === 'admin') {
    store.dispatch(logoutAdminState());
  } else {
    store.dispatch(logoutUserState());
  }

  const now = Date.now();
  if (wasLoggedIn && now - blockedToastTimestamps[scope] > 2000) {
    blockedToastTimestamps[scope] = now;
    toast.error(message || 'Your account has been blocked. Contact Mobifys support.');
  }

  window.dispatchEvent(
    new CustomEvent('account-blocked-logout', {
      detail: { scope, message },
    })
  );
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';
    const scope = url.startsWith('/admin') ? 'admin' : 'user';
    const isAuthSkipPath = AUTH_SKIP_PATHS.some((path) => url.includes(path));

    if (isBlockedResponse(error) && !isAuthSkipPath) {
      error.isBlockedLogout = true;
      forceLogoutBlockedScope(scope, error.response?.data?.message);
      return Promise.reject(error);
    }

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthSkipPath
    ) {
      return Promise.reject(error);
    }

    const refreshEndpoint =
      scope === 'admin' ? '/admin/auth/refresh' : '/user/auth/refresh';

    originalRequest._retry = true;

    try {
      if (!refreshLocks[scope]) {
        refreshLocks[scope] = axiosInstance
          .post(refreshEndpoint)
          .finally(() => {
            refreshLocks[scope] = null;
          });
      }

      await refreshLocks[scope];
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (isBlockedResponse(refreshError)) {
        refreshError.isBlockedLogout = true;
        forceLogoutBlockedScope(scope, refreshError.response?.data?.message);
      } else if (scope === 'admin') {
        store.dispatch(logoutAdminState());
      } else {
        store.dispatch(logoutUserState());
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
```

### `frontend/src/App.jsx`
- **Size**: 8664 bytes | **Lines**: 257

```jsx
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { logoutUserState, setAdmin, setAuthInitialized, setUser } from './redux/slices/authSlice';

// Core User Shell & Entry Pages
import UserLayout from './components/user/UserLayout';
import HomePage from './pages/user/HomePage';
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';
import UserProfile from './pages/user/UserProfile';

// Lazy-loaded Secondary User Pages
const VerifyEmailOtp = lazy(() => import('./pages/user/VerifyEmailOtp'));
const UserForgotPassword = lazy(() => import('./pages/user/UserForgotPassword'));
const UserVerifyResetOtp = lazy(() => import('./pages/user/UserVerifyResetOtp'));
const UserResetPassword = lazy(() => import('./pages/user/UserResetPassword'));
const UserComingSoon = lazy(() => import('./pages/user/UserComingSoon'));
const EditProfile = lazy(() => import('./pages/user/EditProfile'));
const ManageAddresses = lazy(() => import('./pages/user/ManageAddresses'));
const AddressFormPage = lazy(() => import('./pages/user/AddressFormPage'));

// Lazy-loaded Admin Console Bundle
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminForgotPassword = lazy(() => import('./pages/admin/AdminForgotPassword'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const UsersList = lazy(() => import('./pages/admin/UsersList'));
const UserDetails = lazy(() => import('./pages/admin/UserDetails'));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        padding: '48px 24px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#6b7280',
      }}
    >
      Loading...
    </div>
  );
}

function ProtectedUserRoute({ children }) {
  const { user, initialized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [verifiedPathKey, setVerifiedPathKey] = useState(null);
  const currentPathKey = `${location.pathname}${location.search}`;
  const userId = user?._id;
  const isBlockedUser = Boolean(user && (user.isBlocked || user.status === 'blocked'));

  useEffect(() => {
    if (!initialized || !userId || isBlockedUser) return undefined;

    let active = true;
    axiosInstance
      .get('/user/auth/me')
      .then(({ data }) => {
        if (!active) return;
        if (data?.user?.isBlocked || data?.user?.status === 'blocked') {
          dispatch(logoutUserState());
          return;
        }
        dispatch(setUser(data.user));
        setVerifiedPathKey(currentPathKey);
      })
      .catch(() => {
        if (active) {
          setVerifiedPathKey(currentPathKey);
        }
      });

    return () => {
      active = false;
    };
  }, [initialized, userId, isBlockedUser, currentPathKey, dispatch]);

  if (!initialized) return <RouteFallback />;
  if (!user || isBlockedUser) return <Navigate to="/login" replace />;
  if (verifiedPathKey !== currentPathKey) return <RouteFallback />;
  return children;
}

function SessionMonitor() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const lastCheckRef = useRef(0);

  useEffect(() => {
    const handleForcedLogout = (event) => {
      const scope = event.detail?.scope;
      if (scope === 'admin') {
        if (!location.pathname.startsWith('/admin/login')) {
          navigate('/admin/login', { replace: true });
        }
      } else if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('account-blocked-logout', handleForcedLogout);
    return () => window.removeEventListener('account-blocked-logout', handleForcedLogout);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!user?._id) return undefined;

    const verifyActiveUser = () => {
      const now = Date.now();
      if (now - lastCheckRef.current < 3000) return;
      lastCheckRef.current = now;
      axiosInstance.get('/user/auth/me').catch(() => {});
    };

    window.addEventListener('focus', verifyActiveUser);
    return () => window.removeEventListener('focus', verifyActiveUser);
  }, [user?._id]);

  return null;
}

function ProtectedAdminRoute({ children }) {
  const { admin, initialized } = useSelector((state) => state.auth);
  if (!initialized) return <RouteFallback />;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      axiosInstance.get('/user/auth/me'),
      axiosInstance.get('/admin/auth/me'),
    ]).then(([userRes, adminRes]) => {
      if (!active) return;
      if (userRes.status === 'fulfilled') {
        dispatch(setUser(userRes.value.data.user));
      }
      if (adminRes.status === 'fulfilled') {
        dispatch(setAdmin(adminRes.value.data.admin));
      }
      dispatch(setAuthInitialized());
    });

    return () => {
      active = false;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <SessionMonitor />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* User Storefront Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="signup" element={<UserSignup />} />
            <Route path="verify-otp" element={<VerifyEmailOtp />} />
            <Route path="forgot-password" element={<UserForgotPassword />} />
            <Route path="forgot-password/verify-otp" element={<UserVerifyResetOtp />} />
            <Route path="reset-password" element={<UserResetPassword />} />

            {/* Protected User Profile & Address Routes */}
            <Route
              path="profile"
              element={
                <ProtectedUserRoute>
                  <UserProfile />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/orders"
              element={
                <ProtectedUserRoute>
                  <UserComingSoon title="My Orders" />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/wishlist"
              element={
                <ProtectedUserRoute>
                  <UserComingSoon title="My Wishlist" />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/edit"
              element={
                <ProtectedUserRoute>
                  <EditProfile />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses"
              element={
                <ProtectedUserRoute>
                  <ManageAddresses />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses/new"
              element={
                <ProtectedUserRoute>
                  <AddressFormPage />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses/edit/:id"
              element={
                <ProtectedUserRoute>
                  <AddressFormPage />
                </ProtectedUserRoute>
              }
            />
          </Route>

          {/* Admin Console Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="dashboard" element={<div>Dashboard Overview</div>} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="*" element={<div>Module coming soon</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### `frontend/src/components/admin/AdminLayout.css`
- **Size**: 9090 bytes | **Lines**: 485

```css
.admin-shell {
  min-height: 100vh;
  display: flex;
  background-color: var(--bg-page);
}

.admin-sidebar {
  width: 240px;
  background-color: var(--bg-sidebar);
  color: #d1d5db;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-brand {
  height: 64px;
  padding: 0 39px 0px ;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-brand-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  line-height: 1;
  white-space: nowrap;
}

.admin-brand-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-brand-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sidebar-brand-name {
  font-weight: 700;
  color: #ffffff;
  font-size: 22px;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
}

.sidebar-brand-tag {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: #9ca3af;
  text-transform: uppercase;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #9ca3af;
  transition: all 0.15s ease;
}

.sidebar-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.06);
}

.sidebar-link.active {
  background-color: var(--primary);
  color: #ffffff;
}

.admin-main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin-topbar {
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
  white-space: nowrap;
}

.topbar-brand-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.topbar-brand-subtitle {
  margin-right: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-light);
  text-transform: uppercase;
  line-height: 1;
}

.topbar-breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #c1c7d0;
}

.topbar-console-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #98a2b3;
}

.topbar-current-page {
  color: var(--text-dark);
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 16px;
}

.admin-profile-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 240px;
  padding: 4px 12px 4px 5px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #ffffff;
  color: var(--text-dark);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.admin-profile-pill:hover,
.admin-profile-pill.is-active {
  border-color: #ffb99f;
  background: #fffdfb;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.1);
}

.admin-avatar-circle {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  border: 2px solid #fff3ed;
  background: linear-gradient(135deg, #ff7043 0%, var(--primary) 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}

.admin-profile-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
  line-height: 1.1;
}

.admin-profile-name {
  max-width: 100%;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-dark);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-role-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 999px;
  background-color: var(--primary-light);
  color: var(--primary);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

.admin-topbar-divider {
  height: 32px;
  border-left: 1px solid var(--border-color);
}

.btn-admin-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #b91c1c;
  color: #ffffff;
  border: none;
  font-size: 12px;
  font-weight: 600;
}

.btn-admin-logout:hover {
  background-color: #991b1b;
}

.admin-content-area {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.admin-logout-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.admin-logout-modal {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: admin-logout-enter 0.16s ease-out;
}

.admin-logout-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.admin-logout-modal h2 {
  color: #111827;
  font-size: 19px;
  font-weight: 750;
  text-align: center;
}

.admin-logout-modal p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.admin-logout-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.admin-logout-actions button {
  min-width: 118px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.admin-logout-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.admin-logout-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.admin-logout-confirm {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.admin-logout-confirm:hover:not(:disabled) {
  background: #273449;
  border-color: #273449;
  transform: translateY(-1px);
}

.admin-logout-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes admin-logout-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .admin-logout-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}

.admin-sidebar-backdrop,
.sidebar-mobile-close,
.admin-mobile-menu-btn {
  display: none;
}

@media (max-width: 960px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 900;
    transform: translateX(-100%);
    transition: transform 0.22s ease;
    box-shadow: 12px 0 32px rgba(0, 0, 0, 0.25);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .admin-sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 890;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(2px);
  }

  .sidebar-brand {
    padding: 0 18px;
  }

  .sidebar-mobile-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 6px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: #d1d5db;
  }

  .admin-mobile-menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin-right: 12px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: #ffffff;
    color: var(--text-dark);
    flex-shrink: 0;
  }

  .admin-topbar {
    padding: 0 16px;
  }

  .admin-content-area {
    padding: 20px 16px;
  }
}

@media (max-width: 640px) {
  .topbar-console-link span,
  .topbar-breadcrumb svg:nth-of-type(2) {
    display: none;
  }

  .topbar-breadcrumb {
    gap: 8px;
    min-width: 0;
  }

  .topbar-current-page {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-profile-pill {
    max-width: none;
    padding: 3px;
    gap: 0;
  }

  .admin-profile-copy,
  .admin-topbar-divider {
    display: none;
  }

  .topbar-actions {
    gap: 10px;
  }
}
```

### `frontend/src/components/admin/AdminLayout.jsx`
- **Size**: 8300 bytes | **Lines**: 250

```jsx
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Award,
  ShoppingCart,
  RotateCcw,
  Users,
  Ticket,
  Gift,
  BarChart3,
  LogOut,
  LayoutGrid,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { logoutAdminState } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import './AdminLayout.css';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: FolderTree },
  { name: 'Brands', path: '/admin/brands', icon: Award },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Returns', path: '/admin/returns', icon: RotateCcw },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Coupons & Deals', path: '/admin/coupons', icon: Ticket },
  { name: 'Referrals', path: '/admin/referrals', icon: Gift },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
];

export default function AdminLayout() {
  const { admin } = useSelector((state) => state.auth);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage =
    pathname === '/admin/profile'
      ? 'Admin Profile'
      : navItems.find(
          (item) => pathname === item.path || pathname.startsWith(`${item.path}/`)
        )?.name || 'Dashboard';

  const adminName = admin?.name || 'Admin User';
  const adminInitials = adminName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    if (!isLogoutModalOpen && !isMobileNavOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isLogoutModalOpen && !isLoggingOut) {
          setIsLogoutModalOpen(false);
        } else if (isMobileNavOpen) {
          setIsMobileNavOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLogoutModalOpen, isLoggingOut, isMobileNavOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axiosInstance.post('/admin/auth/logout');
      dispatch(logoutAdminState());
      setIsLogoutModalOpen(false);
      toast.success('Logged out');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="admin-shell">
      {isMobileNavOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isMobileNavOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="admin-brand-icon">
            <img src={mobifysLogo} alt="Mobifys" />
          </div>
          <div className="sidebar-brand-copy">
            <div className="sidebar-brand-name">
              mobifys<span style={{ color: '#ff5521' }}>.</span>
            </div>
            <div className="sidebar-brand-tag">ADMIN CONSOLE</div>
          </div>
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
              >
                <Icon size={17} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-menu-btn"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>

          <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/admin/dashboard" className="topbar-console-link">
              <LayoutGrid size={14} />
              <span>Console</span>
            </NavLink>
            <ChevronRight size={16} aria-hidden="true" />
            <span className="topbar-current-page" aria-current="page">
              {currentPage}
            </span>
          </nav>

          <div className="topbar-actions">
            <Link
              to="/admin/profile"
              className={`admin-profile-pill ${pathname === '/admin/profile' ? 'is-active' : ''}`}
              title="Open Admin Profile"
            >
              {admin?.profileImage ? (
                <img src={admin.profileImage} alt="" className="admin-avatar-circle" />
              ) : (
                <span className="admin-avatar-circle">{adminInitials}</span>
              )}
              <span className="admin-profile-copy">
                <span className="admin-profile-name">{adminName}</span>
                <span className="admin-role-badge">ADMIN</span>
              </span>
            </Link>

            <span className="admin-topbar-divider" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="btn-admin-logout"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {/* Logout confirmation modal */}
      {isLogoutModalOpen && (
        <div
          className="admin-logout-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) {
              setIsLogoutModalOpen(false);
            }
          }}
        >
          <div
            className="admin-logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-logout-title"
            aria-describedby="admin-logout-description"
          >
            <div className="admin-logout-icon">
              <LogOut size={23} />
            </div>
            <h2 id="admin-logout-title">Sign out?</h2>
            <p id="admin-logout-description">
              Are you sure you want to sign out of the Admin Console?
            </p>
            <div className="admin-logout-actions">
              <button
                type="button"
                className="admin-logout-cancel"
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-logout-confirm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/components/admin/BlockConfirmModal.css`
- **Size**: 2193 bytes | **Lines**: 119

```css
.block-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.block-modal-card {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: block-modal-enter 0.16s ease-out;
}

.block-modal-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.block-modal-card h2 {
  color: #111827;
  font-size: 19px;
  font-weight: 750;
  text-align: center;
  overflow-wrap: anywhere;
}

.block-modal-card p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.block-modal-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.block-modal-actions button {
  min-width: 118px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.block-modal-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.block-modal-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.block-modal-confirm {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.block-modal-confirm:hover:not(:disabled) {
  background: #273449;
  border-color: #273449;
  transform: translateY(-1px);
}

.block-modal-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes block-modal-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .block-modal-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}
```

### `frontend/src/components/admin/BlockConfirmModal.jsx`
- **Size**: 2032 bytes | **Lines**: 72

```jsx
import { useEffect } from 'react';
import { Ban, ShieldCheck } from 'lucide-react';
import './BlockConfirmModal.css';

export default function BlockConfirmModal({ user, loading, onClose, onConfirm }) {
  useEffect(() => {
    if (!user) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [user, loading, onClose]);

  if (!user) return null;

  const isBlocking = !user.isBlocked;

  return (
    <div
      className="block-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="block-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-modal-title"
        aria-describedby="block-modal-description"
      >
        <div className="block-modal-icon">
          {isBlocking ? <Ban size={23} /> : <ShieldCheck size={23} />}
        </div>
        <h2 id="block-modal-title">
          {isBlocking ? `Block ${user.name}?` : `Unblock ${user.name}?`}
        </h2>
        <p id="block-modal-description">
          {isBlocking
            ? 'This user will no longer be able to sign in or place orders.'
            : 'This user will regain access to sign in and place orders.'}
        </p>
        <div className="block-modal-actions">
          <button
            type="button"
            className="block-modal-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="block-modal-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : isBlocking ? 'Block' : 'Unblock'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/src/components/OtpInput.css`
- **Size**: 973 bytes | **Lines**: 50

```css
.otp-inputs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.otp-inputs input {
  width: 100%;
  min-width: 0;
  display: block;
  height: 56px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: #f9fafb;
  color: var(--text-dark);
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  caret-color: var(--primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.otp-inputs input:focus {
  outline: none;
  border-color: var(--primary);
  background: #ffffff;
  box-shadow: 0 0 0 3px var(--primary-light);
}

.otp-inputs input:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@media (max-width: 420px) {
  .otp-inputs {
    gap: 6px;
  }

  .otp-inputs input {
    height: 52px;
    font-size: 20px;
  }
}
```

### `frontend/src/components/OtpInput.jsx`
- **Size**: 2853 bytes | **Lines**: 99

```jsx
import { useRef } from 'react';
import './OtpInput.css';

export default function OtpInput({ value = '', onChange, disabled = false, label }) {
  const inputRefs = useRef([]);
  const cleanValue = String(value).replace(/\D/g, '').slice(0, 6);
  const digits = Array.from({ length: 6 }, (_, index) => cleanValue[index] || '');

  const updateDigits = (nextDigits) => {
    onChange(nextDigits.join('').replace(/\D/g, '').slice(0, 6));
  };

  const handleChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, '');

    if (cleaned.length > 1) {
      const nextDigits = [...digits];
      cleaned
        .slice(0, 6 - index)
        .split('')
        .forEach((char, offset) => {
          nextDigits[index + offset] = char;
        });
      updateDigits(nextDigits);
      const nextFocus = Math.min(index + cleaned.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = cleaned.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    updateDigits(nextDigits);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      const nextDigits = [...digits];
      nextDigits[index - 1] = '';
      updateDigits(nextDigits);
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedDigits) return;

    onChange(pastedDigits);
    const focusIndex = Math.min(pastedDigits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="otp-inputs" role="group" aria-label={label || '6-digit verification code'}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={6}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of 6`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
```

### `frontend/src/components/user/UserLayout.css`
- **Size**: 16521 bytes | **Lines**: 887

```css
.store-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-page);
}

.store-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 40;
}

.store-topbar {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 24px;
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  align-items: center;
  gap: clamp(20px, 2vw, 36px);
}

.store-topbar .store-brand {
  margin-left: 0;
}

.store-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 26px;
  flex-shrink: 0;
  justify-self: start;
}

.store-header .store-brand-badge {
  width: 40px;
  height: 40px;
  background-color: transparent;
}

.store-header .store-brand-badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.store-header .store-brand-name {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
}

.store-brand-dot {
  color: #ff5521;
}

.store-brand-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background-color: var(--primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store-brand-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.03em;
}

.store-footer .store-brand-badge {
  width: 40px;
  height: 40px;
  background-color: transparent;
}

.store-footer .store-brand-badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.store-footer .store-brand-name {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
}

.store-search-bar {
  width: 100%;
  min-width: 0;
  max-width: 600px;
  justify-self: center;
  position: relative;
  display: flex;
  align-items: center;
}

.store-search-bar input {
  width: 100%;
  padding: 10px 46px 10px 18px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  font-size: 13px;
  color: var(--text-dark);
  box-shadow:
    inset 0 2px 6px rgba(15, 23, 42, 0.12),
    inset 0 -1px 2px rgba(255, 255, 255, 0.9);
}

.store-search-bar input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.store-search-btn {
  position: absolute;
  right: 5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store-delivery-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: clamp(24px, 3vw, 48px);
  margin-right: 0;
  justify-self: end;
}

.store-header-divider {
  height: 40px;
  border-left: 1px solid var(--border-color);
}

.store-deliver-box {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
  flex-shrink: 0;
  min-width: 0;
  text-decoration: none;
}

.store-deliver-box:hover .store-deliver-city {
  color: var(--primary);
}

.store-deliver-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-light);
}

.store-deliver-city {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-dark);
  transition: color 0.15s ease;
}

.store-header-actions {
  display: flex;
  align-items: center;
  gap: clamp(24px, 2.5vw, 40px);
  flex-shrink: 0;
}

.header-icon-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.header-cart-btn {
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
}

.icon-count-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-menu-wrap {
  position: relative;
}

.btn-account-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 210px;
  padding: 5px 12px 5px 6px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #ffffff;
  color: var(--text-dark);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.btn-account-pill:hover {
  border-color: #ffb99f;
  background: #fffdfb;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.1);
}

.btn-account-pill.btn-account-login {
  gap: 8px;
  padding: 8px 16px;
  border-color: #111827;
  background: #111827;
  color: #ffffff;
  box-shadow: none;
}

.btn-account-pill.btn-account-login:hover {
  border-color: #1f2937;
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.16);
}

.btn-account-pill:focus-visible {
  outline: 3px solid rgba(255, 87, 34, 0.22);
  outline-offset: 2px;
}

.account-pill-avatar {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  border: 2px solid #fff3ed;
  background: linear-gradient(135deg, #ff7043 0%, var(--primary) 100%);
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}

.account-pill-name {
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-pill-chevron {
  flex: 0 0 auto;
  color: #9ca3af;
  transition: transform 0.18s ease, color 0.18s ease;
}

.btn-account-pill:hover .account-pill-chevron {
  color: var(--primary);
}

.account-pill-chevron.is-open {
  transform: rotate(180deg);
}

.account-menu-panel {
  position: absolute;
  top: calc(100% + 13px);
  right: 0;
  z-index: 60;
  width: min(360px, calc(100vw - 24px));
  padding: 18px 18px 14px;
  border: 1px solid #e8eaee;
  border-top: 3px solid var(--primary);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 50px rgba(17, 24, 39, 0.2);
  animation: account-menu-enter 0.16s ease-out;
}

.account-menu-identity {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 2px 2px 17px;
  border-bottom: 1px solid #edf0f3;
}

.account-menu-avatar {
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff0e9;
  border-radius: 50%;
  background: var(--primary);
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  object-fit: cover;
}

.account-menu-identity-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 3px;
}

.account-menu-identity-copy strong {
  overflow: hidden;
  color: #111827;
  font-size: 15px;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu-identity-copy span {
  overflow: hidden;
  color: #94a3b8;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 0;
}

.account-menu-links a {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  border-radius: 10px;
  color: #475569;
  font-size: 14px;
  font-weight: 550;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.account-menu-links a > svg {
  flex: 0 0 auto;
  color: #94a3b8;
  stroke-width: 1.9;
}

.account-menu-links a:hover {
  background: #fff5f0;
  color: #1f2937;
}

.account-menu-links a:hover > svg {
  color: var(--primary);
}

.account-menu-referral-option {
  display: flex;
  align-items: center;
  gap: 6px;
}

.account-menu-referral-option > a {
  flex: 1;
  min-width: 0;
}

.account-menu-links a > span:nth-child(2) {
  flex: 1;
}

.account-menu-value {
  color: #111827;
  font-size: 14px;
  font-weight: 750;
  white-space: nowrap;
}

.account-menu-badge {
  max-width: 118px;
  overflow: hidden;
  padding: 4px 8px;
  border-radius: 7px;
  background: var(--primary-light);
  color: #c2410c;
  font-size: 11px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu-copy-code {
  max-width: 130px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  overflow: hidden;
  border: 1px solid #ffe0d2;
  border-radius: 8px;
  background: #fff7f2;
  color: #c2410c;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.account-menu-copy-code span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-menu-copy-code svg {
  flex: 0 0 auto;
}

.account-menu-copy-code:hover {
  border-color: #ffb99f;
  background: #fff0e8;
}

.account-menu-footer {
  padding-top: 12px;
  border-top: 1px solid #edf0f3;
}

.account-menu-footer button {
  width: 100%;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 12px;
  background: #111827;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.account-menu-footer button:hover {
  background: #273449;
  transform: translateY(-1px);
}

.account-logout-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.account-logout-modal {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: account-menu-enter 0.16s ease-out;
}

.account-logout-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.account-logout-modal h2 {
  color: #111827;
  font-size: 19px;
  font-weight: 750;
  text-align: center;
}

.account-logout-modal p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.account-logout-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.account-logout-actions button {
  min-width: 118px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.account-logout-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.account-logout-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.account-logout-confirm {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.account-logout-confirm:hover:not(:disabled) {
  background: #273449;
  border-color: #273449;
  transform: translateY(-1px);
}

.account-logout-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes account-menu-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .account-menu-panel {
    right: -44px;
  }

  .account-logout-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}

.store-subnav {
  border-top: 1px solid #f3f4f6;
  background-color: #ffffff;
}

.store-subnav-inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.subnav-left,
.subnav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.categories-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 8px;
  background-color: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
}

.subnav-link {
  color: #374151;
  font-weight: 500;
}

.subnav-link:hover {
  color: var(--primary);
}

.subnav-right .subnav-link {
  color: var(--text-light);
}

.store-main {
  flex: 1;
  min-height: calc(100vh - 120px);
}

/* Dark Storefront Footer */
.store-footer {
  background-color: #0b0b0c;
  color: #9ca3af;
  margin-top: auto;
}

.store-footer-grid {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px 36px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

.footer-tagline {
  font-size: 12px;
  line-height: 1.6;
  margin-top: 14px;
  max-width: 300px;
}

.footer-col-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 14px;
}

.footer-links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
}

.footer-links-list li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.store-footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  font-size: 11px;
}

.payment-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  justify-self: end;
  gap: 8px;
}

.payment-badge {
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 9px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1;
  color: #d1d5db;
}

@media (max-width: 960px) {
  .store-topbar {
    grid-template-columns: 1fr auto;
    padding: 12px 18px;
    gap: 12px 16px;
  }

  .store-search-bar {
    grid-column: 1 / -1;
    grid-row: 2;
    max-width: none;
  }

  .store-delivery-actions {
    gap: 16px;
  }

  .store-header-actions {
    gap: 16px;
  }

  .store-footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
}

@media (max-width: 640px) {
  .store-topbar {
    padding: 10px 14px;
  }

  .store-header-divider,
  .store-deliver-label {
    display: none;
  }

  .store-deliver-city {
    max-width: 96px;
    font-size: 11px;
  }

  .store-delivery-actions {
    gap: 12px;
  }

  .store-header-actions {
    gap: 12px;
  }

  .store-subnav-inner {
    padding: 8px 14px;
    overflow-x: auto;
    scrollbar-width: none;
    gap: 16px;
  }

  .store-subnav-inner::-webkit-scrollbar {
    display: none;
  }

  .subnav-left,
  .subnav-right {
    gap: 14px;
    white-space: nowrap;
  }

  .store-footer-grid {
    grid-template-columns: 1fr;
    padding: 32px 16px 24px;
    gap: 24px;
  }

  .store-footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
    padding: 16px;
  }

  .payment-badges {
    justify-content: center;
    justify-self: center;
  }
}

@media (max-width: 480px) {
  .store-header .store-brand-badge {
    width: 32px;
    height: 32px;
  }

  .store-header .store-brand-name {
    font-size: 19px;
  }

  .store-deliver-box {
    display: none;
  }

  .account-pill-name,
  .header-cart-btn > span {
    display: none;
  }

  .btn-account-pill {
    max-width: none;
    padding: 3px 6px 3px 3px;
    gap: 4px;
  }

  .btn-account-pill.btn-account-login {
    padding: 7px 12px;
  }

  .account-menu-panel {
    right: -36px;
  }
}
```

### `frontend/src/components/user/UserLayout.jsx`
- **Size**: 16467 bytes | **Lines**: 445

```jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Mail,
  Clock,
  ChevronDown,
  Package,
  Wallet,
  Gift,
  Headset,
  LogOut,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { logoutUserState } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import './UserLayout.css';

export default function UserLayout() {
  const { user } = useSelector((state) => state.auth);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const displayedAddress = user?._id ? defaultAddress : null;
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const accountMenuRef = useRef(null);
  const accountMenuTriggerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  useEffect(() => {
    if (!user?._id) {
      return undefined;
    }

    let active = true;
    const fetchDefaultAddress = async () => {
      try {
        const { data } = await axiosInstance.get('/user/addresses');
        if (active) {
          setDefaultAddress(data.addresses.find((address) => address.isDefault) || null);
        }
      } catch (err) {
        if (active) {
          setDefaultAddress(null);
          if (!err?.isBlockedLogout) {
            toast.error('Could not load your delivery address');
          }
        }
      }
    };

    fetchDefaultAddress();
    window.addEventListener('addresses-updated', fetchDefaultAddress);

    return () => {
      active = false;
      window.removeEventListener('addresses-updated', fetchDefaultAddress);
    };
  }, [user?._id]);

  useEffect(() => {
    if (!isAccountMenuOpen && !isLogoutModalOpen) return undefined;

    const handlePointerDown = (event) => {
      if (isAccountMenuOpen && !isLogoutModalOpen && !accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isLogoutModalOpen) {
          setIsLogoutModalOpen(false);
        } else {
          setIsAccountMenuOpen(false);
          accountMenuTriggerRef.current?.focus();
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen, isLogoutModalOpen]);

  useEffect(() => {
    const openLogoutConfirmation = () => {
      setIsAccountMenuOpen(false);
      setIsLogoutModalOpen(true);
    };

    window.addEventListener('open-user-logout-confirmation', openLogoutConfirmation);
    return () => {
      window.removeEventListener('open-user-logout-confirmation', openLogoutConfirmation);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axiosInstance.post('/user/auth/logout');
      dispatch(logoutUserState());
      setIsAccountMenuOpen(false);
      setIsLogoutModalOpen(false);
      toast.success('Signed out');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeAccountMenu = () => setIsAccountMenuOpen(false);

  const handleCopyReferralCode = async () => {
    if (!user?.referralCode) return;

    try {
      await navigator.clipboard.writeText(user.referralCode);
      toast.success('Referral code copied');
    } catch {
      toast.error('Could not copy the referral code');
    }
  };

  return (
    <div className="store-shell">
      <header className="store-header">
        <div className="store-topbar">
          <Link to="/" className="store-brand">
            <div className="store-brand-badge">
              <img src={mobifysLogo} alt="" />
            </div>
            <span className="store-brand-name">
              mobifys<span className="store-brand-dot">.</span>
            </span>
          </Link>

          <div className="store-search-bar">
            <input
              type="text"
              placeholder="Search humanoid, vacuum, pets, AI robots..."
            />
            <button type="button" className="store-search-btn">
              <Search size={15} />
            </button>
          </div>

          <div className="store-delivery-actions">
            <Link
              to={user ? '/profile/addresses' : '/login'}
              className="store-deliver-box"
              title={displayedAddress ? `${[displayedAddress.address, displayedAddress.street, displayedAddress.city, displayedAddress.state].filter(Boolean).join(', ')} ${displayedAddress.pin}` : 'Set delivery address'}
            >
              <MapPin size={16} color="#ff5722" />
              <div>
                <div className="store-deliver-label">DELIVER TO</div>
                <div className="store-deliver-city">
                  {displayedAddress
                    ? `${displayedAddress.city} · ${displayedAddress.pin}`
                    : user
                      ? 'Add delivery address'
                      : 'Set delivery location'}
                </div>
              </div>
            </Link>

            <span className="store-header-divider" aria-hidden="true" />

            <div className="store-header-actions">
              <Link to="/profile" className="header-icon-btn" title="Wishlist">
                <Heart size={20} />
                <span className="icon-count-badge">{user?.wishlist?.length || 0}</span>
              </Link>

              {user ? (
                <div className="account-menu-wrap" ref={accountMenuRef}>
                  <button
                    ref={accountMenuTriggerRef}
                    type="button"
                    className="btn-account-pill"
                    aria-expanded={isAccountMenuOpen}
                    aria-controls="account-menu-panel"
                    onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                  >
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="" className="account-pill-avatar" />
                    ) : (
                      <span className="account-pill-avatar">{initials}</span>
                    )}
                    <span className="account-pill-name">{user.name}</span>
                    <ChevronDown
                      className={`account-pill-chevron${isAccountMenuOpen ? ' is-open' : ''}`}
                      size={14}
                    />
                  </button>

                  {isAccountMenuOpen && (
                    <section
                      className="account-menu-panel"
                      id="account-menu-panel"
                      aria-label="Your Mobifys account"
                    >
                      <div className="account-menu-identity">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt=""
                            className="account-menu-avatar"
                          />
                        ) : (
                          <span className="account-menu-avatar">{initials}</span>
                        )}
                        <div className="account-menu-identity-copy">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>

                      <nav className="account-menu-links" aria-label="Account options">
                        <Link to="/profile" onClick={closeAccountMenu}>
                          <User size={19} />
                          <span>My Profile</span>
                        </Link>
                        <Link to="/profile/orders" onClick={closeAccountMenu}>
                          <Package size={19} />
                          <span>My Orders</span>
                        </Link>
                        <Link to="/profile/wishlist" onClick={closeAccountMenu}>
                          <Heart size={19} />
                          <span>My Wishlist</span>
                          {user.wishlist?.length > 0 && (
                            <span className="account-menu-badge">{user.wishlist.length}</span>
                          )}
                        </Link>
                        <Link to="/profile#wallet-section" onClick={closeAccountMenu}>
                          <Wallet size={19} />
                          <span>My Wallet</span>
                          <strong className="account-menu-value">
                            ₹{(user.walletBalance || 0).toLocaleString('en-IN')}.00
                          </strong>
                        </Link>
                        <div className="account-menu-referral-option">
                          <Link to="/profile#referral-section" onClick={closeAccountMenu}>
                            <Gift size={19} />
                            <span>Refer &amp; Earn</span>
                          </Link>
                          {user.referralCode && (
                            <button
                              type="button"
                              className="account-menu-copy-code"
                              onClick={handleCopyReferralCode}
                              aria-label={`Copy referral code ${user.referralCode}`}
                              title="Copy referral code"
                            >
                              <span>{user.referralCode}</span>
                              <Copy size={14} />
                            </button>
                          )}
                        </div>
                      
                        <a href="mailto:support@mobifys.in" onClick={closeAccountMenu}>
                          <Headset size={19} />
                          <span>Support</span>
                        </a>
                      </nav>

                      <div className="account-menu-footer">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-account-pill btn-account-login">
                  <User size={15} />
                  <span>Login</span>
                </Link>
              )}

              <Link to="/" className="header-icon-btn header-cart-btn">
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingCart size={20} />
                  <span className="icon-count-badge">0</span>
                </div>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>

        <nav className="store-subnav">
          <div className="store-subnav-inner">
            <div className="subnav-left">
              <span className="categories-pill">
                <Menu size={14} /> Categories ›
              </span>
              <Link to="/" className="subnav-link">Humanoids</Link>
              <Link to="/" className="subnav-link">Vacuums</Link>
              <Link to="/" className="subnav-link">Pets</Link>
              <Link to="/" className="subnav-link">Toys</Link>
            </div>
            <div className="subnav-right">
              <Link to="/" className="subnav-link">Contact</Link>
              <Link to="/" className="subnav-link">About Us</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Logout confirmation modal */}
      {isLogoutModalOpen && (
        <div
          className="account-logout-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) {
              setIsLogoutModalOpen(false);
            }
          }}
        >
          <div
            className="account-logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-logout-title"
            aria-describedby="account-logout-description"
          >
            <div className="account-logout-icon">
              <LogOut size={23} />
            </div>
            <h2 id="account-logout-title">Sign out?</h2>
            <p id="account-logout-description">Are you sure you want to sign out?</p>
            <div className="account-logout-actions">
              <button
                type="button"
                className="account-logout-cancel"
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="account-logout-confirm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <div className="store-footer-grid">
          <div>
            <div className="store-brand">
              <div className="store-brand-badge">
                <img src={mobifysLogo} alt="" />
              </div>
              <span className="store-brand-name" style={{ color: '#ffffff' }}>
                mobifys<span className="store-brand-dot">.</span>
              </span>
            </div>
            <p className="footer-tagline">
              Smart robots for a smarter future. India's premier robotics marketplace delivering
              engineering excellence.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">EXPLORE</h4>
            <ul className="footer-links-list">
              <li>Humanoid & Quadruped</li>
              <li>Cleaning Vacuums</li>
              <li>AI Desktop Pets</li>
              <li>Flash Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="footer-links-list">
              <li>
                <Mail size={14} color="#ff5722" /> support@mobifys.in
              </li>
              <li>
                <Clock size={14} color="#ff5722" /> Mon-Sat 9AM-8PM IST
              </li>
              <li>
                <MapPin size={14} color="#ff5722" /> Cochin, Kerala, India
              </li>
            </ul>
          </div>
        </div>

        <div className="store-footer-bottom">
          <div>© 2026 mobifys. All rights reserved.</div>
          <div>Privacy Policy • Terms</div>
          <div className="payment-badges">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">RUPAY</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### `frontend/src/index.css`
- **Size**: 846 bytes | **Lines**: 46

```css
:root {
  --primary: #ff5722;
  --primary-hover: #e64a19;
  --primary-light: #fff3ed;
  --bg-page: #f8f9fa;
  --bg-card: #ffffff;
  --bg-sidebar: #0d0d0d;
  --text-dark: #111827;
  --text-muted: #6b7280;
  --text-light: #9ca3af;
  --border-color: #e5e7eb;
  --success-bg: #ecfdf5;
  --success-text: #059669;
  --danger-bg: #fef2f2;
  --danger-text: #dc2626;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-page);
  color: var(--text-dark);
  line-height: 1.5;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  font-family: inherit;
  cursor: pointer;
}

input,
select {
  font-family: inherit;
}
```

### `frontend/src/main.jsx`
- **Size**: 1144 bytes | **Lines**: 41

```jsx

import React from 'react';  
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            minWidth: '280px',
            maxWidth: 'min(380px, calc(100vw - 32px))',
            minHeight: '46px',
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#1f2937',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
            fontSize: '13.5px',
            fontWeight: 500,
            lineHeight: '1.4',
          },
        }}
      />
      <App />
    </Provider>
  </React.StrictMode>
);
```

### `frontend/src/pages/admin/AdminDashboard.jsx`
- **Size**: 0 bytes | **Lines**: 0

```jsx

```

### `frontend/src/pages/admin/AdminForgotPassword.css`
- **Size**: 1265 bytes | **Lines**: 70

```css
@import './AdminLogin.css';

.otp-input-box {
  width: 100%;
  text-align: center;
  letter-spacing: 0.55em;
  font-size: 20px;
  font-weight: 700;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-dark);
}

.otp-input-box:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.otp-timer-row {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}

.resend-otp-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 600;
  font-size: 12px;
}

.resend-otp-btn:hover {
  text-decoration: underline;
}

.back-login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.back-login-link:hover {
  color: var(--text-dark);
}

.success-step-box {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-badge-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### `frontend/src/pages/admin/AdminForgotPassword.jsx`
- **Size**: 12882 bytes | **Lines**: 350

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import mobifysLogo from '../../assets/mobifys-logo.png';
import OtpInput from '../../components/OtpInput';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  minLengthPasswordRules,
  otpRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './AdminForgotPassword.css';

export default function AdminForgotPassword() {
  const [step, setStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const otpForm = useForm({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const passwordForm = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedOtp = useWatch({ control: otpForm.control, name: 'otp', defaultValue: '' });

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const sendOtpRequest = async (targetEmail) => {
    const cleanEmail = targetEmail.trim();
    const { data } = await axiosInstance.post('/admin/auth/forgot-password', {
      email: cleanEmail,
    });
    toast.success(data.message);
    setVerifiedEmail(cleanEmail);
    setTimer(120);
    setStep(2);
  };

  const onSendOtp = async ({ email }) => {
    try {
      await sendOtpRequest(email);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      await sendOtpRequest(verifiedEmail);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setResending(false);
    }
  };

  const onVerifyOtp = async ({ otp }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/verify-otp', {
        email: verifiedEmail,
        otp,
      });
      toast.success(data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const onResetPassword = async ({ newPassword, confirmPassword }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/reset-password', {
        email: verifiedEmail,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      setStep(4);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="admin-auth-page">
      <header className="admin-auth-header">
        <div className="admin-brand-icon">
          <img src={mobifysLogo} alt="Mobifys" />
        </div>
        <span className="admin-brand-title">
          mobifys<span style={{ color: '#ff5521' }}>.</span>
        </span>
        <span className="admin-brand-subtitle">ADMIN CONSOLE</span>
      </header>

      <main className="admin-auth-main">
        <div className="admin-auth-card">
          {step === 1 && (
            <form
              onSubmit={emailForm.handleSubmit(onSendOtp, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Admin Password Recovery</h1>
                <p>
                  Enter your registered administrator email address to receive a one-time code
                  (OTP).
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="admin-forgot-email">WORK EMAIL ADDRESS</label>
                <div
                  className={`input-wrapper ${emailForm.formState.errors.email ? 'has-error' : ''}`}
                >
                  <Mail className="input-icon-left" size={16} />
                  <input
                    id="admin-forgot-email"
                    type="email"
                    maxLength={EMAIL_MAX_LENGTH}
                    placeholder="admin@mobifys.in"
                    aria-invalid={Boolean(emailForm.formState.errors.email)}
                    {...emailForm.register('email', emailRules('Work email address is required'))}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="field-error-text">{emailForm.formState.errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={emailForm.formState.isSubmitting}
                className="btn-primary-full"
              >
                {emailForm.formState.isSubmitting ? 'Sending...' : 'Send Verification Code'}
                <ArrowRight size={16} />
              </button>
              <Link to="/admin/login" className="back-login-link">
                <ArrowLeft size={14} /> Back to Admin Login
              </Link>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={otpForm.handleSubmit(onVerifyOtp, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Verify Admin OTP</h1>
                <p>
                  Enter the 6-digit code sent to <strong>{verifiedEmail}</strong>
                </p>
              </div>
              <div>
                <Controller
                  name="otp"
                  control={otpForm.control}
                  rules={otpRules()}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={field.onChange}
                      disabled={otpForm.formState.isSubmitting}
                    />
                  )}
                />
                {otpForm.formState.errors.otp && (
                  <p className="field-error-text" style={{ textAlign: 'center' }}>
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <div className="otp-timer-row">
                {timer > 0 ? (
                  <span>
                    Resend OTP in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="resend-otp-btn"
                  >
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={otpForm.formState.isSubmitting || watchedOtp.length !== 6}
                className="btn-primary-full"
              >
                {otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify & Proceed'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 3 && (
            <form
              onSubmit={passwordForm.handleSubmit(onResetPassword, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Set New Admin Password</h1>
                <p>Create a strong password (minimum 8 characters).</p>
              </div>
              <div className="form-group">
                <label htmlFor="admin-reset-password">NEW ADMIN PASSWORD</label>
                <div
                  className={`input-wrapper ${
                    passwordForm.formState.errors.newPassword ? 'has-error' : ''
                  }`}
                >
                  <Lock className="input-icon-left" size={16} />
                  <input
                    id="admin-reset-password"
                    type={showNewPassword ? 'text' : 'password'}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="Minimum 8 characters"
                    aria-invalid={Boolean(passwordForm.formState.errors.newPassword)}
                    {...passwordForm.register('newPassword', {
                      ...minLengthPasswordRules('New password is required'),
                      onChange: () => {
                        if (passwordForm.getValues('confirmPassword')) {
                          void passwordForm.trigger('confirmPassword');
                        }
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="password-toggle-btn"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordForm.formState.errors.newPassword && (
                  <p className="field-error-text">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="admin-reset-confirm">CONFIRM NEW PASSWORD</label>
                <div
                  className={`input-wrapper ${
                    passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
                  }`}
                >
                  <Lock className="input-icon-left" size={16} />
                  <input
                    id="admin-reset-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="Re-enter new password"
                    aria-invalid={Boolean(passwordForm.formState.errors.confirmPassword)}
                    {...passwordForm.register(
                      'confirmPassword',
                      confirmPasswordRules(
                        () => passwordForm.getValues('newPassword'),
                        'Please confirm your new password'
                      )
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="password-toggle-btn"
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="field-error-text">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="btn-primary-full"
              >
                {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Admin Password'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="success-step-box">
              <div className="success-badge-icon">
                <CheckCircle2 size={26} />
              </div>
              <div className="admin-auth-heading" style={{ marginBottom: 0 }}>
                <h1>Admin Password Updated!</h1>
                <p>
                  Your administrator password has been updated for <strong>{verifiedEmail}</strong>.
                </p>
              </div>
              <Link to="/admin/login" className="btn-primary-full">
                Go to Admin Login Portal <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

### `frontend/src/pages/admin/AdminLogin.css`
- **Size**: 4379 bytes | **Lines**: 248

```css
.admin-auth-page {
  min-height: 100vh;
  background-color: var(--bg-page);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-auth-header {
  background-color: var(--bg-card);
  border-bottom: 1px solid #f3f4f6;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
}

.admin-brand-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-brand-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.admin-brand-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
}

.admin-brand-subtitle {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-light);
  text-transform: uppercase;
  margin-left: auto;
  line-height: 1;
  white-space: nowrap;
}

.admin-auth-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
}

.admin-auth-card {
  width: 100%;
  max-width: 430px;
  background-color: var(--bg-card);
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.admin-auth-heading {
  text-align: center;
  margin-bottom: 28px;
}

.admin-auth-heading h1 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
}

.admin-auth-heading p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
}

.admin-auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.form-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.form-label-row label {
  margin-bottom: 0;
}

.forgot-link {
  font-size: 12px;
  font-weight: 500;
  color: var(--primary);
}

.forgot-link:hover {
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon-left {
  position: absolute;
  left: 14px;
  color: var(--text-light);
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 10px 40px;
  background-color: #f9fafb;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-dark);
  transition: border-color 0.15s, background-color 0.15s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.input-wrapper.has-error input {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.field-error-text {
  margin-top: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--danger-text);
}

.password-toggle-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
}

.password-toggle-btn:hover {
  color: #4b5563;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
}

.checkbox-row input {
  width: 15px;
  height: 15px;
  accent-color: var(--primary);
}

.btn-primary-full {
  width: 100%;
  padding: 12px;
  background-color: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.15s;
}

.btn-primary-full:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.btn-primary-full:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 11px;
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 480px) {
  .admin-auth-header {
    padding: 14px 16px;
  }

  .admin-brand-subtitle {
    font-size: 10px;
  }

  .admin-auth-main {
    padding: 24px 14px;
  }

  .admin-auth-card {
    padding: 24px 18px;
  }
}
```

### `frontend/src/pages/admin/AdminLogin.jsx`
- **Size**: 4955 bytes | **Lines**: 137

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setAdmin } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import { EMAIL_MAX_LENGTH, emailRules, toastFirstFormError } from '../../utils/formValidation';
import './AdminLogin.css';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      keepSignedIn: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password, keepSignedIn }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/login', {
        email: email.trim(),
        password,
        keepSignedIn,
      });

      dispatch(setAdmin(data.admin));
      toast.success(data.message);
      navigate('/admin/users');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin sign in failed');
    }
  };

  return (
    <div className="admin-auth-page">
      <header className="admin-auth-header">
        <div className="admin-brand-icon">
          <img src={mobifysLogo} alt="Mobifys" />
        </div>
        <span className="admin-brand-title">
          mobifys<span style={{ color: '#ff5521' }}>.</span>
        </span>
        <span className="admin-brand-subtitle">ADMIN CONSOLE</span>
      </header>

      <main className="admin-auth-main">
        <div className="admin-auth-card">
          <div className="admin-auth-heading">
            <h1>Sign In</h1>
            <p>Enter your credentials to access the console</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
            className="admin-auth-form"
            noValidate
          >
            <div className="form-group">
              <label htmlFor="admin-login-email">Email Address</label>
              <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
                <Mail className="input-icon-left" size={16} />
                <input
                  id="admin-login-email"
                  type="email"
                  maxLength={EMAIL_MAX_LENGTH}
                  placeholder="admin@mobifys.in"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email', emailRules('Work email address is required'))}
                />
              </div>
              {errors.email && <p className="field-error-text">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="admin-login-password">Password</label>
                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className={`input-wrapper ${errors.password ? 'has-error' : ''}`}>
                <Lock className="input-icon-left" size={16} />
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  aria-invalid={Boolean(errors.password)}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="field-error-text">{errors.password.message}</p>}
            </div>

            <label className="checkbox-row">
              <input type="checkbox" {...register('keepSignedIn')} />
              <span>Keep me signed in</span>
            </label>

            <button type="submit" disabled={isSubmitting} className="btn-primary-full">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <footer className="admin-auth-footer">
          <div>Privacy Policy • Terms of Service • Security</div>
          <div>© 2026 mobifys. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}
```

### `frontend/src/pages/admin/AdminProfile.css`
- **Size**: 10987 bytes | **Lines**: 597

```css
.admin-profile-page {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-profile-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

.admin-profile-header p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.admin-profile-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-profile-card h2 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
}

.admin-card-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.admin-identity-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  padding: 16px 18px;
  border-radius: 14px;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
}

.admin-avatar-preview-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
}

.admin-identity-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff7043 0%, var(--primary) 100%);
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  border: 2px solid #fed7aa;
}

.admin-btn-remove-photo {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: var(--danger-text);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(17, 24, 39, 0.2);
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.admin-btn-remove-photo:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: scale(1.08);
}

.admin-btn-remove-photo:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-identity-info {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.admin-identity-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-identity-email {
  font-size: 12px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-avatar-upload-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.admin-btn-upload-photo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.admin-btn-upload-photo:hover {
  background-color: var(--primary-hover);
}

.admin-avatar-size-hint {
  font-size: 11px;
  color: var(--text-light);
}

.admin-two-col-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.admin-profile-field label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.admin-field-input {
  position: relative;
  display: flex;
  align-items: center;
}

.admin-field-icon {
  position: absolute;
  left: 14px;
  color: var(--text-light);
  pointer-events: none;
}

.admin-field-input input {
  width: 100%;
  padding: 10px 38px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  font-size: 13px;
  color: var(--text-dark);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.admin-field-input input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.admin-field-input.has-error input {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.admin-field-error {
  margin-top: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--danger-text);
}

.admin-eye-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
}

.admin-eye-btn:hover {
  color: #4b5563;
}

.admin-password-rules-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  font-size: 10px;
  color: var(--text-light);
  margin-top: 6px;
}

.admin-password-rules-row span.met {
  color: var(--primary);
  font-weight: 600;
}

.admin-card-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-admin-save-profile,
.btn-admin-update-password {
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background-color 0.15s ease;
}

.btn-admin-save-profile {
  background-color: var(--primary);
  color: #ffffff;
}

.btn-admin-save-profile:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.btn-admin-update-password {
  background-color: #111827;
  color: #ffffff;
}

.btn-admin-update-password:hover:not(:disabled) {
  background-color: #1f2937;
}

.btn-admin-save-profile:disabled,
.btn-admin-update-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-email-change-box {
  padding: 16px;
  border-radius: 14px;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-email-step-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.admin-email-step-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  background-color: var(--primary-light);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
}

.admin-email-step-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
}

.admin-inline-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.admin-email-input {
  flex: 1;
  min-width: 220px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #ffffff;
  font-size: 13px;
  color: var(--text-dark);
  transition: border-color 0.15s ease;
}

.admin-email-input:focus {
  outline: none;
  border-color: var(--primary);
}

.admin-email-input.has-error {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.admin-btn-secondary-outline {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
}

.admin-btn-secondary-outline:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.admin-btn-secondary-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-btn-orange-action {
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
}

.admin-btn-orange-action:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.admin-btn-orange-action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-email-otp-verify-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.admin-email-otp-verify-row .otp-inputs {
  width: auto;
}

.admin-email-verified-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: var(--success-bg);
  color: var(--success-text);
  font-size: 12px;
  font-weight: 600;
}

.admin-email-verified-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.admin-email-restart-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  text-decoration: underline;
}

.admin-email-restart-btn:hover {
  color: var(--text-dark);
}

.admin-profile-confirm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.admin-profile-confirm-modal {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: admin-profile-confirm-enter 0.16s ease-out;
}

.admin-profile-confirm-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.admin-profile-confirm-modal h2 {
  color: var(--text-dark);
  font-size: 19px;
  font-weight: 750;
  text-align: center;
}

.admin-profile-confirm-modal p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.admin-profile-confirm-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.admin-profile-confirm-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 118px;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.admin-profile-confirm-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.admin-profile-confirm-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.admin-profile-confirm-submit {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.admin-profile-confirm-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #273449;
  border-color: #273449;
}

.admin-profile-confirm-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes admin-profile-confirm-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .admin-profile-page {
    gap: 18px;
  }

  .admin-profile-card {
    padding: 20px 16px;
    border-radius: 16px;
  }

  .admin-two-col-fields {
    grid-template-columns: 1fr;
  }

  .admin-card-actions {
    justify-content: stretch;
  }

  .btn-admin-save-profile,
  .btn-admin-update-password {
    width: 100%;
  }

  .admin-email-input {
    min-width: 0;
  }

  .admin-email-otp-verify-row {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-email-otp-verify-row .otp-inputs {
    width: 100%;
  }

  .admin-profile-confirm-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}
```

### `frontend/src/pages/admin/AdminProfile.jsx`
- **Size**: 31711 bytes | **Lines**: 895

```jsx
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setAdmin } from '../../redux/slices/authSlice';
import OtpInput from '../../components/OtpInput';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  getPasswordChecks,
  nameRules,
  normalizeText,
  optionalProfilePhoneRules,
  strongPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './AdminProfile.css';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD'
  );
}

export default function AdminProfile() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [currentEmail, setCurrentEmail] = useState(admin?.email || '');
  const [previewUrl, setPreviewUrl] = useState(admin?.profileImage || '');
  const [imageFile, setImageFile] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [pendingProfileValues, setPendingProfileValues] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Two-Step Email Change with OTP (1: Current Email OTP, 2: New Email OTP)
  const [currentEmailOtpSent, setCurrentEmailOtpSent] = useState(false);
  const [currentEmailOtp, setCurrentEmailOtp] = useState('');
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Password toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const objectUrlRef = useRef('');
  const fileInputRef = useRef(null);

  const profileForm = useForm({
    defaultValues: {
      name: admin?.name || '',
      phone: admin?.phone || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const currentEmailForm = useForm({
    defaultValues: { currentEmail: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const newEmailForm = useForm({
    defaultValues: { newEmail: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { reset: resetProfileForm } = profileForm;

  const revokePreviewObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = '';
    }
  };

  useEffect(() => {
    let active = true;
    axiosInstance
      .get('/admin/auth/me')
      .then(({ data }) => {
        if (!active || !data?.admin) return;
        dispatch(setAdmin(data.admin));
        resetProfileForm({
          name: data.admin.name || '',
          phone: data.admin.phone || '',
        });
        setCurrentEmail(data.admin.email || '');
        setPreviewUrl(data.admin.profileImage || '');
        setImageFile(null);
        setRemoveProfileImage(false);
      })
      .catch(() => {
        toast.error('Failed to load admin profile');
      });

    return () => {
      active = false;
      revokePreviewObjectUrl();
    };
  }, [dispatch, resetProfileForm]);

  useEffect(() => {
    if (!showRemoveImageModal && !showSaveProfileModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || savingProfile) return;
      if (showSaveProfileModal) {
        setShowSaveProfileModal(false);
      } else if (showRemoveImageModal) {
        setShowRemoveImageModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showRemoveImageModal, showSaveProfileModal, savingProfile]);

  const watchedName = useWatch({
    control: profileForm.control,
    name: 'name',
    defaultValue: admin?.name || '',
  });
  const watchedNewPassword = useWatch({
    control: passwordForm.control,
    name: 'newPassword',
    defaultValue: '',
  });

  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } =
    getPasswordChecks(watchedNewPassword);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files (JPG, PNG, WebP) are allowed');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Maximum image file size is 2MB');
      event.target.value = '';
      return;
    }

    revokePreviewObjectUrl();
    const nextObjectUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextObjectUrl;
    setImageFile(file);
    setPreviewUrl(nextObjectUrl);
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    revokePreviewObjectUrl();
    setImageFile(null);
    setPreviewUrl('');
    setRemoveProfileImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSaveProfileSubmit = (values) => {
    setPendingProfileValues(values);
    setShowSaveProfileModal(true);
  };

  const confirmSaveProfile = async () => {
    const values = pendingProfileValues || profileForm.getValues();
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('name', normalizeText(values.name));
      formData.append('phone', values.phone.trim());
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      if (removeProfileImage) {
        formData.append('removeProfileImage', 'true');
      }

      const { data } = await axiosInstance.put('/admin/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      revokePreviewObjectUrl();
      setImageFile(null);
      setRemoveProfileImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreviewUrl(data.admin.profileImage || '');

      dispatch(setAdmin(data.admin));
      resetProfileForm({
        name: data.admin.name || '',
        phone: data.admin.phone || '',
      });
      toast.success(data.message);
      setShowSaveProfileModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update admin profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Step 1a: Send OTP to Current Registered Email
  const onSendCurrentEmailOtp = async ({ currentEmail: enteredCurrentEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/profile/request-current-email-otp', {
        currentEmail: enteredCurrentEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 1b: Verify Current Email OTP -> Unlock New Email Step
  const handleVerifyCurrentEmail = async () => {
    if (currentEmailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your current email');
    }
    const enteredCurrentEmail = currentEmailForm.getValues('currentEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/profile/verify-current-email', {
        currentEmail: enteredCurrentEmail,
        otp: currentEmailOtp,
      });
      toast.success(data.message);
      setCurrentEmailVerified(true);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Current email verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2a: Request OTP for New Email
  const onSendEmailOtp = async ({ newEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/profile/request-email-change', {
        newEmail: newEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setEmailOtp('');
      setEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2b: Verify New Email OTP & Update Email
  const handleVerifyEmailChange = async () => {
    if (emailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your new email');
    }
    const enteredNewEmail = newEmailForm.getValues('newEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/profile/verify-email-change', {
        newEmail: enteredNewEmail,
        otp: emailOtp,
      });
      toast.success(data.message);
      if (data.admin) {
        dispatch(setAdmin(data.admin));
      }
      setCurrentEmail(data.email);
      currentEmailForm.reset({ currentEmail: '' });
      newEmailForm.reset({ newEmail: '' });
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
      setCurrentEmailVerified(false);
      setEmailOtp('');
      setEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleRestartEmailChange = () => {
    currentEmailForm.reset({ currentEmail: '' });
    newEmailForm.reset({ newEmail: '' });
    setCurrentEmailOtp('');
    setCurrentEmailOtpSent(false);
    setCurrentEmailVerified(false);
    setEmailOtp('');
    setEmailOtpSent(false);
  };

  const onUpdatePassword = async (values) => {
    try {
      const { data } = await axiosInstance.put('/admin/auth/update-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success(data.message);
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your profile image, contact details, verified email, and password.</p>
      </div>

      {/* Section 1: Avatar & Personal Information */}
      <form
        onSubmit={profileForm.handleSubmit(onSaveProfileSubmit, toastFirstFormError)}
        className="admin-profile-card"
        noValidate
      >
        <div>
          <h2>Avatar & Personal Information</h2>
          <p className="admin-card-sub">
            Update your profile image and administrator contact details.
          </p>
        </div>

        <div className="admin-identity-box">
          <div className="admin-avatar-preview-wrap">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={watchedName || 'Admin'}
                className="admin-identity-avatar"
              />
            ) : (
              <div className="admin-identity-avatar">
                {getInitials(watchedName || admin?.name)}
              </div>
            )}
            {previewUrl && (
              <button
                type="button"
                className="admin-btn-remove-photo"
                onClick={() => setShowRemoveImageModal(true)}
                disabled={savingProfile}
                aria-label="Remove profile photo"
                title="Remove profile photo"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          <div className="admin-identity-info">
            <div className="admin-identity-name">{watchedName || admin?.name || 'Admin User'}</div>
            <div className="admin-identity-email">{currentEmail}</div>
            <div className="admin-avatar-upload-actions">
              <label className="admin-btn-upload-photo">
                <Upload size={13} /> Upload New Photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              <span className="admin-avatar-size-hint">JPG, PNG, or WebP • Max 2MB</span>
            </div>
          </div>
        </div>

        <div className="admin-two-col-fields">
          <div className="admin-profile-field">
            <label htmlFor="admin-profile-name">Full Name *</label>
            <div
              className={`admin-field-input ${
                profileForm.formState.errors.name ? 'has-error' : ''
              }`}
            >
              <User className="admin-field-icon" size={15} />
              <input
                id="admin-profile-name"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                placeholder="Administrator name"
                aria-invalid={Boolean(profileForm.formState.errors.name)}
                {...profileForm.register('name', nameRules('Name is required'))}
              />
            </div>
            {profileForm.formState.errors.name && (
              <p className="admin-field-error">{profileForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className="admin-profile-field">
            <label htmlFor="admin-profile-phone">Phone Number</label>
            <div
              className={`admin-field-input ${
                profileForm.formState.errors.phone ? 'has-error' : ''
              }`}
            >
              <Phone className="admin-field-icon" size={15} />
              <input
                id="admin-profile-phone"
                type="tel"
                placeholder="+91 98470 12345"
                aria-invalid={Boolean(profileForm.formState.errors.phone)}
                {...profileForm.register('phone', optionalProfilePhoneRules())}
              />
            </div>
            {profileForm.formState.errors.phone && (
              <p className="admin-field-error">{profileForm.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="admin-card-actions">
          <button type="submit" disabled={savingProfile} className="btn-admin-save-profile">
            <Save size={15} />
            {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Section 2: Two-Step Email Verification */}
      <div className="admin-profile-card">
        <div>
          <h2>Email Address Verification</h2>
          <p className="admin-card-sub">
            Current verified email: <strong>{currentEmail}</strong>
          </p>
        </div>

        <div className="admin-email-change-box">
          {!currentEmailVerified ? (
            <form
              onSubmit={currentEmailForm.handleSubmit(onSendCurrentEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="admin-email-step-header">
                <span className="admin-email-step-badge">Step 1 of 2</span>
                <label htmlFor="admin-current-email-verify" className="admin-email-step-title">
                  <Mail size={13} />
                  Verify Your Current Registered Email
                </label>
              </div>
              <div className="admin-inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="currentEmail"
                  control={currentEmailForm.control}
                  rules={emailRules('Enter your current registered email address')}
                  render={({ field }) => (
                    <input
                      id="admin-current-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (currentEmailOtpSent) {
                          setCurrentEmailOtpSent(false);
                          setCurrentEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter your current registered email"
                      className={`admin-email-input ${
                        currentEmailForm.formState.errors.currentEmail ? 'has-error' : ''
                      }`}
                      disabled={emailLoading}
                      aria-invalid={Boolean(currentEmailForm.formState.errors.currentEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="admin-btn-secondary-outline"
                >
                  {emailLoading && !currentEmailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {currentEmailForm.formState.errors.currentEmail && (
                <p className="admin-field-error">
                  {currentEmailForm.formState.errors.currentEmail.message}
                </p>
              )}

              {currentEmailOtpSent && (
                <div className="admin-email-otp-verify-row" style={{ marginTop: '12px' }}>
                  <OtpInput
                    value={currentEmailOtp}
                    onChange={setCurrentEmailOtp}
                    disabled={emailLoading}
                    label="Current admin email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCurrentEmail}
                    disabled={emailLoading || currentEmailOtp.length !== 6}
                    className="admin-btn-orange-action"
                  >
                    {emailLoading ? 'Verifying...' : 'Verify Current Email'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            <form
              onSubmit={newEmailForm.handleSubmit(onSendEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="admin-email-verified-banner">
                <span className="admin-email-verified-status">
                  <CheckCircle2 size={15} />
                  Current email verified ({currentEmail})
                </span>
                <button
                  type="button"
                  onClick={handleRestartEmailChange}
                  disabled={emailLoading}
                  className="admin-email-restart-btn"
                >
                  Reset
                </button>
              </div>

              <div className="admin-email-step-header" style={{ marginTop: '12px' }}>
                <span className="admin-email-step-badge">Step 2 of 2</span>
                <label htmlFor="admin-new-email-verify" className="admin-email-step-title">
                  <Mail size={13} />
                  Enter & Verify Your New Email Address
                </label>
              </div>

              <div className="admin-inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="newEmail"
                  control={newEmailForm.control}
                  rules={emailRules('Enter the new email address')}
                  render={({ field }) => (
                    <input
                      id="admin-new-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (emailOtpSent) {
                          setEmailOtpSent(false);
                          setEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter new email address"
                      className={`admin-email-input ${
                        newEmailForm.formState.errors.newEmail ? 'has-error' : ''
                      }`}
                      disabled={emailLoading}
                      aria-invalid={Boolean(newEmailForm.formState.errors.newEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="admin-btn-secondary-outline"
                >
                  {emailLoading && !emailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {newEmailForm.formState.errors.newEmail && (
                <p className="admin-field-error">
                  {newEmailForm.formState.errors.newEmail.message}
                </p>
              )}

              {emailOtpSent && (
                <div className="admin-email-otp-verify-row" style={{ marginTop: '12px' }}>
                  <OtpInput
                    value={emailOtp}
                    onChange={setEmailOtp}
                    disabled={emailLoading}
                    label="New admin email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailChange}
                    disabled={emailLoading || emailOtp.length !== 6}
                    className="admin-btn-orange-action"
                  >
                    {emailLoading ? 'Updating...' : 'Verify & Update Email'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Section 3: Security & Password */}
      <form
        onSubmit={passwordForm.handleSubmit(onUpdatePassword, toastFirstFormError)}
        className="admin-profile-card"
        noValidate
      >
        <div>
          <h2>Security & Password</h2>
          <p className="admin-card-sub">
            Update your administrator password to keep the console protected.
          </p>
        </div>

        <div className="admin-profile-field">
          <label htmlFor="admin-current-password">Current Password</label>
          <div
            className={`admin-field-input ${
              passwordForm.formState.errors.currentPassword ? 'has-error' : ''
            }`}
          >
            <Lock className="admin-field-icon" size={15} />
            <input
              id="admin-current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              aria-invalid={Boolean(passwordForm.formState.errors.currentPassword)}
              {...passwordForm.register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              className="admin-eye-btn"
              aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
            >
              {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {passwordForm.formState.errors.currentPassword && (
            <p className="admin-field-error">
              {passwordForm.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="admin-two-col-fields">
          <div className="admin-profile-field">
            <label htmlFor="admin-new-password">New Password</label>
            <div
              className={`admin-field-input ${
                passwordForm.formState.errors.newPassword ? 'has-error' : ''
              }`}
            >
              <Lock className="admin-field-icon" size={15} />
              <input
                id="admin-new-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
                aria-invalid={Boolean(passwordForm.formState.errors.newPassword)}
                {...passwordForm.register('newPassword', {
                  ...strongPasswordRules('New password is required'),
                  onChange: () => {
                    if (passwordForm.getValues('confirmPassword')) {
                      void passwordForm.trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((visible) => !visible)}
                className="admin-eye-btn"
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              >
                {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div className="admin-password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {passwordForm.formState.errors.newPassword && (
              <p className="admin-field-error">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="admin-profile-field">
            <label htmlFor="admin-confirm-password">Confirm New Password</label>
            <div
              className={`admin-field-input ${
                passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
              }`}
            >
              <Lock className="admin-field-icon" size={15} />
              <input
                id="admin-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
                aria-invalid={Boolean(passwordForm.formState.errors.confirmPassword)}
                {...passwordForm.register(
                  'confirmPassword',
                  confirmPasswordRules(
                    () => passwordForm.getValues('newPassword'),
                    'Please confirm your new password'
                  )
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                className="admin-eye-btn"
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {passwordForm.formState.errors.confirmPassword && (
              <p className="admin-field-error">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="admin-card-actions">
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="btn-admin-update-password"
          >
            <Lock size={15} />
            {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>

      {showRemoveImageModal && (
        <div
          className="admin-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowRemoveImageModal(false);
          }}
        >
          <div
            className="admin-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-remove-photo-title"
          >
            <div className="admin-profile-confirm-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="admin-remove-photo-title">Remove photo?</h2>
            <p>Your profile photo will be removed when you save your changes.</p>
            <div className="admin-profile-confirm-actions">
              <button
                type="button"
                className="admin-profile-confirm-cancel"
                onClick={() => setShowRemoveImageModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-profile-confirm-submit"
                onClick={() => {
                  handleRemoveImage();
                  setShowRemoveImageModal(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveProfileModal && (
        <div
          className="admin-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !savingProfile) {
              setShowSaveProfileModal(false);
            }
          }}
        >
          <div
            className="admin-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-save-profile-title"
            aria-describedby="admin-save-profile-description"
          >
            <div className="admin-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="admin-save-profile-title">Save changes?</h2>
            <p id="admin-save-profile-description">
              Save your updated administrator profile information?
            </p>
            <div className="admin-profile-confirm-actions">
              <button
                type="button"
                className="admin-profile-confirm-cancel"
                onClick={() => setShowSaveProfileModal(false)}
                disabled={savingProfile}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-profile-confirm-submit"
                onClick={confirmSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/pages/admin/UserDetails.css`
- **Size**: 3622 bytes | **Lines**: 209

```css
.user-details-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.details-header-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.details-identity {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.details-avatar-lg {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: var(--primary);
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details-name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status-pill.active {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.status-pill.blocked {
  background-color: var(--danger-bg);
  color: var(--danger-text);
}

.wallet-text {
  font-weight: 600;
  color: var(--success-text);
}

.details-name-row h1 {
  font-size: 20px;
  font-weight: 700;
}

.details-meta {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 4px;
}

.details-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-back-users {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-back-users:hover {
  background-color: #f9fafb;
}

.btn-toggle-status {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-toggle-status.block {
  background-color: var(--danger-bg);
  color: var(--danger-text);
}

.btn-toggle-status.unblock {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 24px;
}

.info-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card h2 {
  font-size: 14px;
  font-weight: 700;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4b5563;
}

.wallet-summary-row {
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.address-item-box {
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.default-tag {
  font-size: 10px;
  background-color: var(--primary-light);
  color: var(--primary);
  padding: 2px 6px;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .details-header-card,
  .info-card {
    padding: 18px;
  }

  .details-identity {
    align-items: flex-start;
  }

  .details-header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-back-users,
  .btn-toggle-status {
    flex: 1;
    justify-content: center;
  }
}
```

### `frontend/src/pages/admin/UserDetails.jsx`
- **Size**: 4949 bytes | **Lines**: 143

```jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ban, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import BlockConfirmModal from '../../components/admin/BlockConfirmModal';
import './UserDetails.css';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const loadDetails = useCallback(async () => {
    const { data } = await axiosInstance.get(`/admin/users/${id}`);
    return data;
  }, [id]);

  useEffect(() => {
    let active = true;
    loadDetails()
      .then((data) => {
        if (!active) return;
        setUser(data.user);
        setAddresses(data.addresses);
      })
      .catch((err) => {
        if (active) {
          toast.error(err.response?.data?.message || 'Failed to fetch user details');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [loadDetails]);

  const handleToggleBlock = async () => {
    try {
      setActionLoading(true);
      const { data } = await axiosInstance.patch(`/admin/users/${id}/toggle-block`);
      toast.success(data.message);
      setShowModal(false);
      const refreshed = await loadDetails();
      setUser(refreshed.user);
      setAddresses(refreshed.addresses);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div style={{ fontSize: '12px', color: '#6b7280' }}>Loading profile...</div>;
  if (!user) return <div style={{ fontSize: '12px', color: '#dc2626' }}>User not found.</div>;

  return (
    <div className="user-details-page">
      <div className="details-header-card">
        <div className="details-identity">
          <div className="details-avatar-lg">
            {user.name?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="details-name-row">
              <h1>{user.name}</h1>
              <span className={`status-pill ${user.isBlocked ? 'blocked' : 'active'}`}>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </span>
            </div>
            <p className="details-meta">
              Referral Code: <strong>{user.referralCode}</strong> • Joined{' '}
              {new Date(user.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="details-header-actions">
          <Link to="/admin/users" className="btn-back-users">
            <ArrowLeft size={14} /> Back to Users
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className={`btn-toggle-status ${user.isBlocked ? 'unblock' : 'block'}`}
          >
            {user.isBlocked ? <CheckCircle size={14} /> : <Ban size={14} />}
            {user.isBlocked ? 'Unblock User' : 'Block User'}
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="info-card">
          <h2>Contact & Wallet Info</h2>
          <div className="contact-row">
            <Mail size={14} /> {user.email}
          </div>
          <div className="contact-row">
            <Phone size={14} /> {user.phone || 'Not provided'}
          </div>
          <div className="wallet-summary-row">
            <span>Wallet Balance:</span>
            <strong className="wallet-text">
              ₹{(user.walletBalance || 0).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        <div className="info-card">
          <h2>Saved Addresses ({addresses.length})</h2>
          {addresses.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>No saved addresses yet.</p>
          ) : (
            addresses.map((addr) => (
              <div key={addr._id} className="address-item-box">
                <div className="address-label-row">
                  <MapPin size={13} color="#ff5722" /> {addr.label}
                  {addr.isDefault && <span className="default-tag">Default</span>}
                </div>
                <p style={{ color: '#4b5563' }}>
                  {[addr.address, addr.street, addr.city, addr.state].filter(Boolean).join(', ')} - {addr.pin}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <BlockConfirmModal
        user={showModal ? user : null}
        loading={actionLoading}
        onClose={() => setShowModal(false)}
        onConfirm={handleToggleBlock}
      />
    </div>
  );
}
```

### `frontend/src/pages/admin/UsersList.css`
- **Size**: 8192 bytes | **Lines**: 467

```css
.users-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

.page-header p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.user-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.user-stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  text-align: left;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.user-stat-card:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.user-stat-card.is-selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.stat-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-box.total {
  background-color: var(--primary-light);
  color: var(--primary);
}

.stat-icon-box.active {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.stat-icon-box.blocked {
  background-color: var(--danger-bg);
  color: var(--danger-text);
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.2;
}

@media (max-width: 768px) {
  .user-stats-grid {
    grid-template-columns: 1fr;
  }
}

.toolbar-card {
  background-color: #ffffff;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
}

.toolbar-controls {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.search-form-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 200px;
  min-width: 180px;
  max-width: 340px;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-light);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 38px;
  padding: 0 34px 0 36px;
  background-color: #f9fafb;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 12px;
  color: var(--text-dark);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.clear-search-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
}

.clear-search-btn:hover {
  color: var(--text-dark);
  background-color: #e5e7eb;
}

.btn-search-submit {
  height: 38px;
  padding: 0 18px;
  background-color: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-search-submit:hover {
  background-color: var(--primary-hover);
}

.status-select {
  height: 38px;
  padding: 0 14px;
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  flex-shrink: 0;
}

.btn-refresh {
  width: 38px;
  height: 38px;
  border: 1px solid var(--border-color);
  background-color: #ffffff;
  border-radius: 10px;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-refresh:hover {
  color: var(--text-dark);
  background-color: #f9fafb;
}

.sort-control-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
}

.sort-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.table-card {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  text-align: left;
}

.users-table th {
  padding: 14px 20px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-light);
  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
  white-space: nowrap;
}

.users-table td {
  padding: 14px 20px;
  font-size: 12px;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.users-table tbody tr:hover {
  background-color: #f9fafb;
}

.users-table tbody tr.user-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.users-table tbody tr.user-row:hover,
.users-table tbody tr.user-row:focus-visible {
  background-color: var(--primary-light);
}

.users-table tbody tr.user-row:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar-img,
.user-avatar-initials {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-avatar-initials {
  background-color: var(--primary-light);
  color: var(--primary);
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-weight: 600;
  color: var(--text-dark);
}

.user-sub {
  font-size: 11px;
  color: var(--text-light);
}

.wallet-text {
  font-weight: 600;
  color: var(--success-text);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.status-pill.active {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.status-pill.blocked {
  background-color: var(--danger-bg);
  color: var(--danger-text);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.icon-action-btn {
  padding: 6px;
  border-radius: 8px;
  border: none;
  background: none;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.icon-action-btn:hover {
  background-color: #f3f4f6;
  color: var(--text-dark);
}

.icon-action-btn.block {
  color: var(--danger-text);
}

.icon-action-btn.unblock {
  color: var(--success-text);
}

.table-empty-cell {
  padding: 48px;
  text-align: center;
  color: var(--text-light);
}

.pagination-footer {
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
}

.page-btn:hover {
  background-color: #f3f4f6;
}

.page-btn.active {
  background-color: var(--primary);
  color: #ffffff;
}

@media (max-width: 640px) {
  .users-page {
    gap: 18px;
  }

  .toolbar-card {
    padding: 14px;
    gap: 10px;
  }

  .toolbar-controls {
    flex: 1 1 100%;
    width: 100%;
    gap: 8px;
  }

  .search-form-box {
    flex: 1 1 100%;
    max-width: none;
  }

  .btn-search-submit,
  .status-select {
    flex: 1;
  }

  .sort-control-group {
    width: 100%;
    margin-left: 0;
  }

  .sort-select {
    flex: 1;
  }

  .pagination-footer {
    padding: 14px 16px;
  }
}
```

### `frontend/src/pages/admin/UsersList.jsx`
- **Size**: 11975 bytes | **Lines**: 373

```jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { Search, X, RotateCw, Eye, Ban, CheckCircle, Users, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import BlockConfirmModal from '../../components/admin/BlockConfirmModal';
import './UsersList.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);

  const {
    register: registerSearch,
    control: searchControl,
    handleSubmit: handleSearchFormSubmit,
    reset: resetSearchForm,
  } = useForm({
    defaultValues: { search: '' },
  });

  const watchedSearch = useWatch({ control: searchControl, name: 'search', defaultValue: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    showingFrom: 0,
    showingTo: 0,
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    const { data } = await axiosInstance.get('/admin/users', {
      params: {
        search: appliedSearch,
        status: statusFilter,
        sort: sortBy,
        page,
        limit: 10,
      },
    });
    return data;
  }, [appliedSearch, statusFilter, sortBy, page]);

  const applyUsersResponse = useCallback((data) => {
    setUsers(data.users);
    setPagination(data.pagination);
    if (data.stats) setStats(data.stats);
  }, []);

  useEffect(() => {
    let active = true;
    fetchUsers()
      .then((data) => {
        if (active) applyUsersResponse(data);
      })
      .catch((err) => {
        if (active) {
          toast.error(err.response?.data?.message || 'Failed to load users');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchUsers, applyUsersResponse]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      applyUsersResponse(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to refresh users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = handleSearchFormSubmit(({ search }) => {
    setPage(1);
    setAppliedSearch(search.trim());
  });

  const handleClearSearch = () => {
    resetSearchForm({ search: '' });
    setAppliedSearch('');
    setPage(1);
  };

  const handleConfirmToggleBlock = async () => {
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      const { data } = await axiosInstance.patch(
        `/admin/users/${selectedUser._id}/toggle-block`
      );
      toast.success(data.message);
      setSelectedUser(null);
      setLoading(true);
      const refreshed = await fetchUsers();
      applyUsersResponse(refreshed);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
      setLoading(false);
    }
  };

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users</h1>
        <p>
          Manage registered users, search accounts, and control access.
        </p>
      </div>

      <div className="user-stats-grid">
        <button
          type="button"
          onClick={() => {
            setStatusFilter('all');
            setPage(1);
          }}
          className={`user-stat-card ${statusFilter === 'all' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box total">
            <Users size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Users</span>
            <strong className="stat-value">{stats.total.toLocaleString('en-IN')}</strong>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('active');
            setPage(1);
          }}
          className={`user-stat-card ${statusFilter === 'active' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box active">
            <UserCheck size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Active Users</span>
            <strong className="stat-value">{stats.active.toLocaleString('en-IN')}</strong>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('blocked');
            setPage(1);
          }}
          className={`user-stat-card ${statusFilter === 'blocked' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box blocked">
            <Ban size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Blocked Users</span>
            <strong className="stat-value">{stats.blocked.toLocaleString('en-IN')}</strong>
          </div>
        </button>
      </div>

      <div className="toolbar-card">
        <div className="toolbar-controls">
          <form onSubmit={handleSearchSubmit} className="search-form-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="search-input"
              {...registerSearch('search')}
            />
            {(watchedSearch || appliedSearch) && (
              <button
                type="button"
                onClick={handleClearSearch}
                title="Clear search"
                className="clear-search-btn"
              >
                <X size={14} />
              </button>
            )}
          </form>

          <button type="button" onClick={handleSearchSubmit} className="btn-search-submit">
            Search
          </button>


          <button type="button" onClick={handleRefresh} title="Refresh" className="btn-refresh">
            <RotateCw size={15} />
          </button>
        </div>

        <div className="sort-control-group">
          <label htmlFor="users-sort-select" className="sort-label">
            Sort By:
          </label>
          <select
            id="users-sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="status-select sort-select"
          >
            <option value="latest">Latest Registered</option>
            <option value="oldest">Oldest Registered</option>
            <option value="name_asc">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="wallet_desc">Wallet (High–Low)</option>
            <option value="wallet_asc">Wallet (Low–High)</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Joined</th>
                <th>Wallet</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="table-empty-cell">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty-cell">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="user-avatar-img" />
                        ) : (
                          <div className="user-avatar-initials">{getInitials(user.name)}</div>
                        )}
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-sub">
                            {user.email} {user.phone ? `• ${user.phone}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="wallet-text">
                      ₹{(user.walletBalance || 0).toLocaleString('en-IN')}
                    </td>

                    <td>
                      {user.isBlocked ? (
                        <span className="status-pill blocked">
                          <span className="status-dot" /> Blocked
                        </span>
                      ) : (
                        <span className="status-pill active">
                          <span className="status-dot" /> Active
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/users/${user._id}`}
                          title="View Details"
                          className="icon-action-btn"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          title={user.isBlocked ? 'Unblock User' : 'Block User'}
                          className={`icon-action-btn ${user.isBlocked ? 'unblock' : 'block'}`}
                        >
                          {user.isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer">
          <div>
            Showing <strong>{pagination.showingFrom}</strong>–
            <strong>{pagination.showingTo}</strong> of{' '}
            <strong>{pagination.totalUsers}</strong> registered users
          </div>

          <div className="pagination-pages">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={page === pageNum ? 'page-btn active' : 'page-btn'}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BlockConfirmModal
        user={selectedUser}
        loading={actionLoading}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleConfirmToggleBlock}
      />
    </div>
  );
}
```

### `frontend/src/pages/user/AddressFormPage.css`
- **Size**: 2109 bytes | **Lines**: 99

```css
@import './EditProfile.css';

.address-phone-wrap {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: #f9fafb;
  overflow: hidden;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.address-phone-wrap:focus-within {
  border-color: var(--primary);
  background-color: #ffffff;
}

.address-phone-prefix {
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  border-right: 1px solid var(--border-color);
  user-select: none;
  flex-shrink: 0;
}

.address-phone-wrap .address-phone-input {
  flex: 1;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  padding: 10px 14px 10px 12px;
}

.address-phone-wrap .address-phone-input:focus {
  background: transparent;
}

.edit-field-group.has-error .edit-input,
.edit-field-group.has-error .address-phone-wrap {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.edit-field-group.has-error .address-phone-wrap .address-phone-input {
  background: transparent;
}

.address-field-error {
  font-size: 11px;
  font-weight: 500;
  color: var(--danger-text);
}

.label-options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.edit-field-group .label-option-card {
  padding: 12px 16px;
  margin-bottom: 0;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  line-height: 1.2;
}

.edit-field-group .label-option-card input[type='radio'] {
  width: 15px;
  height: 15px;
  margin: 0;
  flex-shrink: 0;
  accent-color: var(--primary);
  cursor: pointer;
}

.edit-field-group .label-option-card.selected {
  border-color: var(--primary);
  background-color: var(--primary-light);
  color: var(--primary);
}

@media (max-width: 480px) {
  .label-options-grid {
    grid-template-columns: 1fr;
  }
}
```

### `frontend/src/pages/user/AddressFormPage.jsx`
- **Size**: 13173 bytes | **Lines**: 401

```jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { MapPin, Save, Home, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import {
  ADDRESS_LABELS,
  ADDRESS_MAX_LENGTH,
  CITY_MAX_LENGTH,
  INDIAN_STATES,
  STREET_MAX_LENGTH,
  addressLineRules,
  cityRules,
  extractIndianDigits,
  extractPinDigits,
  indianPhoneRules,
  normalizeText,
  pinRules,
  stateRules,
  streetRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './AddressFormPage.css';

export default function AddressFormPage() {
  const { id } = useParams(); // Present when editing an existing address
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pendingAddressValues, setPendingAddressValues] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: 'Home',
      address: '',
      street: '',
      city: '',
      state: '',
      pin: '',
      phone: '',
      isDefault: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedLabel = useWatch({ control, name: 'label', defaultValue: 'Home' });

  useEffect(() => {
    if (!isEdit) return;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        const found = data.addresses.find((a) => a._id === id);
        if (found) {
          reset({
            label: found.label || 'Home',
            address: found.address || '',
            street: found.street || '',
            city: found.city || '',
            state: found.state || '',
            pin: extractPinDigits(found.pin),
            phone: extractIndianDigits(found.phone),
            isDefault: Boolean(found.isDefault),
          });
        }
      })
      .catch((err) => {
        if (!err?.isBlockedLogout) toast.error('Failed to load address');
      });
  }, [id, isEdit, reset]);

  useEffect(() => {
    if (!showUpdateModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        setShowUpdateModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showUpdateModal, loading]);

  const saveAddress = async (values) => {
    const formValues = values || pendingAddressValues || getValues();
    const payload = {
      label: formValues.label,
      address: normalizeText(formValues.address),
      street: normalizeText(formValues.street),
      city: normalizeText(formValues.city),
      state: formValues.state,
      pin: formValues.pin.trim(),
      phone: formValues.phone.trim(),
      isDefault: Boolean(formValues.isDefault),
    };

    try {
      setLoading(true);
      if (isEdit) {
        const { data } = await axiosInstance.put(`/user/addresses/${id}`, payload);
        toast.success(data.message);
      } else {
        const { data } = await axiosInstance.post('/user/addresses', payload);
        toast.success(data.message);
      }
      setShowUpdateModal(false);
      window.dispatchEvent(new Event('addresses-updated'));
      navigate('/profile/addresses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const onValidSubmit = async (values) => {
    if (isEdit) {
      setPendingAddressValues(values);
      setShowUpdateModal(true);
      return;
    }

    await saveAddress(values);
  };

  return (
    <div className="edit-profile-container">
      <nav className="edit-profile-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">
              <Home size={14} />
              Home
            </Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile/addresses">Manage Addresses</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <span aria-current="page">{isEdit ? 'Edit Address' : 'Add New Address'}</span>
          </li>
        </ol>
      </nav>

      <div className="profile-page-title">
        <h1>
          <MapPin
            size={22}
            color="#ff5722"
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          />
          {isEdit ? 'Edit Delivery Address' : 'Add New Address'}
        </h1>
        <p>
          Enter your complete flat/building, street address, town/city, state, 6-digit PIN code,
          and Indian mobile number.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onValidSubmit, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div className={`edit-field-group ${errors.address ? 'has-error' : ''}`}>
          <label htmlFor="address-line">Flat, House No., Building, Apartment *</label>
          <input
            id="address-line"
            type="text"
            maxLength={ADDRESS_MAX_LENGTH}
            placeholder="Plot 42, Cyber Heights"
            className="edit-input"
            aria-invalid={Boolean(errors.address)}
            {...register('address', addressLineRules())}
          />
          {errors.address && <p className="address-field-error">{errors.address.message}</p>}
        </div>

        <div className={`edit-field-group ${errors.street ? 'has-error' : ''}`}>
          <label htmlFor="address-street">Street Address / Area / Locality *</label>
          <input
            id="address-street"
            type="text"
            maxLength={STREET_MAX_LENGTH}
            placeholder="Nilambur Road, Near Town Hall"
            className="edit-input"
            aria-invalid={Boolean(errors.street)}
            {...register('street', streetRules())}
          />
          {errors.street && <p className="address-field-error">{errors.street.message}</p>}
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${errors.city ? 'has-error' : ''}`}>
            <label htmlFor="address-city">Town / City *</label>
            <input
              id="address-city"
              type="text"
              maxLength={CITY_MAX_LENGTH}
              placeholder="Malappuram"
              className="edit-input"
              aria-invalid={Boolean(errors.city)}
              {...register('city', cityRules())}
            />
            {errors.city && <p className="address-field-error">{errors.city.message}</p>}
          </div>

          <div className={`edit-field-group ${errors.state ? 'has-error' : ''}`}>
            <label htmlFor="address-state">State *</label>
            <select
              id="address-state"
              className="edit-input"
              aria-invalid={Boolean(errors.state)}
              {...register('state', stateRules())}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {errors.state && <p className="address-field-error">{errors.state.message}</p>}
          </div>
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${errors.pin ? 'has-error' : ''}`}>
            <label htmlFor="address-pin">PIN Code *</label>
            <Controller
              name="pin"
              control={control}
              rules={pinRules()}
              render={({ field }) => (
                <input
                  id="address-pin"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={field.value}
                  onChange={(e) => field.onChange(extractPinDigits(e.target.value))}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  placeholder="679338"
                  className="edit-input"
                  aria-invalid={Boolean(errors.pin)}
                />
              )}
            />
            {errors.pin && <p className="address-field-error">{errors.pin.message}</p>}
          </div>

          <div className={`edit-field-group ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="address-phone">Phone Number *</label>
            <div className="address-phone-wrap">
              <span className="address-phone-prefix">+91</span>
              <Controller
                name="phone"
                control={control}
                rules={indianPhoneRules({ requiredMessage: 'Contact phone is required' })}
                render={({ field }) => (
                  <input
                    id="address-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={field.value}
                    onChange={(e) => field.onChange(extractIndianDigits(e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="9847012345"
                    className="edit-input address-phone-input"
                    aria-invalid={Boolean(errors.phone)}
                  />
                )}
              />
            </div>
            {errors.phone && <p className="address-field-error">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="edit-field-group">
          <label>Address Label</label>
          <div className="label-options-grid">
            {ADDRESS_LABELS.map((lbl) => (
              <label
                key={lbl}
                className={
                  watchedLabel === lbl ? 'label-option-card selected' : 'label-option-card'
                }
              >
                <input
                  type="radio"
                  value={lbl}
                  {...register('label')}
                />
                <span>{lbl}</span>
              </label>
            ))}
          </div>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            style={{ accentColor: '#ff5722', width: '16px', height: '16px' }}
            {...register('isDefault')}
          />
          <span>Make this my default delivery address</span>
        </label>

        <div className="edit-bottom-bar">
          <Link to="/profile/addresses" className="btn-secondary-outline">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="btn-orange-action">
            <Save size={14} /> {loading ? 'Saving...' : isEdit ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>

      {showUpdateModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !loading) {
              setShowUpdateModal(false);
            }
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-address-title"
            aria-describedby="update-address-description"
          >
            <div className="edit-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="update-address-title">Update address?</h2>
            <p id="update-address-description">
              Save changes to your <strong>{watchedLabel}</strong> delivery address?
            </p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowUpdateModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={() => saveAddress()}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/pages/user/EditProfile.css`
- **Size**: 9853 bytes | **Lines**: 553

```css
.edit-profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 28px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.edit-profile-breadcrumb ol {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  list-style: none;
}

.edit-profile-breadcrumb li {
  display: flex;
  align-items: center;
}

.edit-profile-breadcrumb a,
.edit-profile-breadcrumb li > span {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.edit-profile-breadcrumb a {
  color: #64748b;
}

.edit-profile-breadcrumb a:hover {
  background: #ffffff;
  color: var(--primary);
}

.edit-profile-breadcrumb li > span {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 700;
}

.edit-profile-breadcrumb-separator {
  color: #cbd5e1;
}

@media (max-width: 480px) {
  .edit-profile-breadcrumb ol {
    gap: 2px;
  }

  .edit-profile-breadcrumb a,
  .edit-profile-breadcrumb li > span {
    padding: 0 8px;
    font-size: 11px;
  }
}

.edit-section-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edit-section-card h2 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-dark);
}

.edit-section-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.avatar-upload-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.avatar-preview-lg {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: var(--primary-light);
  color: var(--primary);
  font-size: 24px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  border: 2px solid #fed7aa;
}

.avatar-preview-wrap {
  position: relative;
  width: 76px;
  height: 76px;
  flex: 0 0 76px;
}

.btn-upload-photo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 10px;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-upload-photo:hover {
  background-color: var(--primary-hover);
}

.avatar-action-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.btn-remove-photo {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 27px;
  height: 27px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: var(--danger-text);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(17, 24, 39, 0.2);
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.btn-remove-photo:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: scale(1.08);
}

.btn-remove-photo:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.edit-profile-confirm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.edit-profile-confirm-modal {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: edit-profile-confirm-enter 0.16s ease-out;
}

.edit-profile-confirm-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.edit-profile-confirm-modal h2 {
  color: var(--text-dark);
  font-size: 19px;
  font-weight: 750;
  text-align: center;
}

.edit-profile-confirm-modal p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.edit-profile-confirm-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.edit-profile-confirm-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 118px;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.edit-profile-confirm-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.edit-profile-confirm-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.edit-profile-confirm-submit {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.edit-profile-confirm-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #273449;
  border-color: #273449;
}

.edit-profile-confirm-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes edit-profile-confirm-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .edit-profile-confirm-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}

.two-col-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.edit-field-group > label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.edit-input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  font-size: 13px;
  color: var(--text-dark);
}

.edit-input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.edit-field-group.has-error .edit-input {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.field-error-text {
  margin-top: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--danger-text);
}

.edit-password-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.edit-password-input {
  padding-right: 40px;
}

.edit-password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.edit-password-toggle:hover {
  color: #4b5563;
}

.edit-password-toggle:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

.edit-password-rules-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  font-size: 10px;
  color: var(--text-light);
  margin-top: 2px;
}

.edit-password-rules-row span.met {
  color: var(--primary);
  font-weight: 600;
}

.email-change-box {
  padding: 16px;
  border-radius: 14px;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inline-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.inline-action-row input {
  flex: 1;
  min-width: 200px;
}

.email-otp-verify-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.email-otp-verify-row .otp-inputs {
  width: auto;
}

.email-step-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.email-step-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  background-color: var(--primary-light);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
}

.email-step-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
}

.email-verified-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: var(--success-bg);
  color: var(--success-text);
  font-size: 12px;
  font-weight: 600;
}

.email-verified-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.email-restart-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  text-decoration: underline;
}

.email-restart-btn:hover {
  color: var(--text-dark);
}

.btn-secondary-outline {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
}

.btn-secondary-outline:hover {
  background-color: #f3f4f6;
}

.btn-orange-action {
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-orange-action:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.btn-orange-action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.edit-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

@media (max-width: 640px) {
  .edit-profile-container {
    padding: 20px 16px 48px;
    gap: 18px;
  }

  .edit-section-card {
    padding: 20px 16px;
    border-radius: 16px;
  }

  .two-col-fields {
    grid-template-columns: 1fr;
  }

  .inline-action-row input {
    min-width: 0;
  }

  .email-otp-verify-row {
    flex-direction: column;
    align-items: stretch;
  }

  .email-otp-verify-row .otp-inputs {
    width: 100%;
  }

  .edit-bottom-bar {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .edit-bottom-bar a,
  .edit-bottom-bar button {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
```

### `frontend/src/pages/user/EditProfile.jsx`
- **Size**: 29116 bytes | **Lines**: 820

```jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Upload,
  Save,
  Mail,
  Lock,
  Trash2,
  Home,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import OtpInput from '../../components/OtpInput';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  getPasswordChecks,
  nameRules,
  normalizeText,
  optionalProfilePhoneRules,
  strongPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './EditProfile.css';

export default function EditProfile() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [pendingProfileValues, setPendingProfileValues] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Email Change with 2-Step OTP (1: Current Email OTP, 2: New Email OTP)
  const [currentEmailOtpSent, setCurrentEmailOtpSent] = useState(false);
  const [currentEmailOtp, setCurrentEmailOtp] = useState('');
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Change Password UI toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileForm = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const currentEmailForm = useForm({
    defaultValues: {
      currentEmail: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const newEmailForm = useForm({
    defaultValues: {
      newEmail: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedProfileName = useWatch({
    control: profileForm.control,
    name: 'name',
    defaultValue: '',
  });
  const watchedNewPassword = useWatch({
    control: passwordForm.control,
    name: 'newPassword',
    defaultValue: '',
  });
  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } =
    getPasswordChecks(watchedNewPassword);

  const { reset: resetProfileForm } = profileForm;

  useEffect(() => {
    axiosInstance
      .get('/user/profile')
      .then(({ data }) => {
        resetProfileForm({
          name: data.user.name || '',
          phone: data.user.phone || '',
        });
        setCurrentEmail(data.user.email || '');
        setPreviewUrl(data.user.profileImage || '');
      })
      .catch((err) => {
        if (!err?.isBlockedLogout) toast.error('Failed to load profile data');
      });
  }, [resetProfileForm]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    setRemoveProfileImage(true);
  };

  // Save Name, Phone & S3 Profile Photo
  const onProfileSubmit = (values) => {
    setPendingProfileValues(values);
    setShowSaveProfileModal(true);
  };

  const confirmSaveProfile = async () => {
    const values = pendingProfileValues || profileForm.getValues();
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('name', normalizeText(values.name));
      formData.append('phone', values.phone.trim());
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      if (removeProfileImage) {
        formData.append('removeProfileImage', 'true');
      }

      const { data } = await axiosInstance.put('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setUser(data.user));
      toast.success(data.message);
      setShowSaveProfileModal(false);
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Step 1a: Send OTP to Current Registered Email
  const onSendCurrentEmailOtp = async ({ currentEmail: enteredCurrentEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/request-current-email-otp', {
        currentEmail: enteredCurrentEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 1b: Verify Current Email OTP -> Unlock New Email Step
  const handleVerifyCurrentEmail = async () => {
    if (currentEmailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your current email');
    }
    const enteredCurrentEmail = currentEmailForm.getValues('currentEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/verify-current-email', {
        currentEmail: enteredCurrentEmail,
        otp: currentEmailOtp,
      });
      toast.success(data.message);
      setCurrentEmailVerified(true);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Current email verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2a: Request OTP for New Email
  const onSendEmailOtp = async ({ newEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/request-email-change', {
        newEmail: newEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setEmailOtp('');
      setEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2b: Verify New Email OTP & Update Email
  const handleVerifyEmailChange = async () => {
    if (emailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your new email');
    }
    const enteredNewEmail = newEmailForm.getValues('newEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/verify-email-change', {
        newEmail: enteredNewEmail,
        otp: emailOtp,
      });
      toast.success(data.message);
      if (data.user) {
        dispatch(setUser(data.user));
      }
      setCurrentEmail(data.email);
      currentEmailForm.reset({ currentEmail: '' });
      newEmailForm.reset({ newEmail: '' });
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
      setCurrentEmailVerified(false);
      setEmailOtp('');
      setEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleRestartEmailChange = () => {
    currentEmailForm.reset({ currentEmail: '' });
    newEmailForm.reset({ newEmail: '' });
    setCurrentEmailOtp('');
    setCurrentEmailOtpSent(false);
    setCurrentEmailVerified(false);
    setEmailOtp('');
    setEmailOtpSent(false);
  };

  // Change Password
  const onChangePassword = async (values) => {
    try {
      const { data } = await axiosInstance.put('/user/profile/change-password', values);
      toast.success(data.message);
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="edit-profile-container">
      <nav className="edit-profile-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">
              <Home size={14} />
              Home
            </Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <span aria-current="page">Edit Profile</span>
          </li>
        </ol>
      </nav>

      <div className="profile-page-title">
        <h1>Edit Profile</h1>
        <p>Update your profile image, contact details, verified email, and account password.</p>
      </div>

      {/* Form 1: Avatar + Personal Details */}
      <form
        onSubmit={profileForm.handleSubmit(onProfileSubmit, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div>
          <h2>Avatar & Personal Information</h2>
          <p className="edit-section-sub">
            Upload a JPG, PNG, or GIF image for your profile.
          </p>
        </div>

        <div className="avatar-upload-row">
          <div className="avatar-preview-wrap">
            {previewUrl ? (
              <img src={previewUrl} alt="Avatar preview" className="avatar-preview-lg" />
            ) : (
              <div className="avatar-preview-lg">
                {watchedProfileName?.slice(0, 2).toUpperCase() || 'U'}
              </div>
            )}
            {previewUrl && (
              <button
                type="button"
                className="btn-remove-photo"
                onClick={() => setShowRemoveImageModal(true)}
                disabled={savingProfile}
                aria-label="Remove profile photo"
                title="Remove profile photo"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          <div>
            <div className="avatar-action-buttons">
              <label className="btn-upload-photo">
                <Upload size={14} /> Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>
              Maximum file size: 2MB
            </p>
          </div>
        </div>

        <div className="two-col-fields">
          <div
            className={`edit-field-group ${profileForm.formState.errors.name ? 'has-error' : ''}`}
          >
            <label htmlFor="profile-name">Full Name *</label>
            <input
              id="profile-name"
              type="text"
              maxLength={NAME_MAX_LENGTH}
              className="edit-input"
              aria-invalid={Boolean(profileForm.formState.errors.name)}
              {...profileForm.register('name', nameRules('Name cannot be empty'))}
            />
            {profileForm.formState.errors.name && (
              <p className="field-error-text">{profileForm.formState.errors.name.message}</p>
            )}
          </div>

          <div
            className={`edit-field-group ${profileForm.formState.errors.phone ? 'has-error' : ''}`}
          >
            <label htmlFor="profile-phone">Phone Number</label>
            <input
              id="profile-phone"
              type="tel"
              placeholder="+91 98470 12345"
              className="edit-input"
              aria-invalid={Boolean(profileForm.formState.errors.phone)}
              {...profileForm.register('phone', optionalProfilePhoneRules())}
            />
            {profileForm.formState.errors.phone && (
              <p className="field-error-text">{profileForm.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="edit-bottom-bar" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" disabled={savingProfile} className="btn-orange-action">
            <Save size={14} /> {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Section 2: Two-Step Email Edit with OTP Verification */}
      <div className="edit-section-card">
        <div>
          <h2>Email Address Verification</h2>
          <p className="edit-section-sub">
            Current verified email: <strong>{currentEmail}</strong>
          </p>
        </div>

        <div className="email-change-box">
          {!currentEmailVerified ? (
            <form
              onSubmit={currentEmailForm.handleSubmit(onSendCurrentEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="email-step-header">
                <span className="email-step-badge">Step 1 of 2</span>
                <label htmlFor="current-email-verify" className="email-step-title">
                  <Mail size={13} />
                  Verify Your Current Registered Email
                </label>
              </div>
              <div className="inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="currentEmail"
                  control={currentEmailForm.control}
                  rules={emailRules('Enter your current registered email address')}
                  render={({ field }) => (
                    <input
                      id="current-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (currentEmailOtpSent) {
                          setCurrentEmailOtpSent(false);
                          setCurrentEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter your current registered email"
                      className="edit-input"
                      disabled={emailLoading}
                      aria-invalid={Boolean(currentEmailForm.formState.errors.currentEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="btn-secondary-outline"
                >
                  {emailLoading && !currentEmailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {currentEmailForm.formState.errors.currentEmail && (
                <p className="field-error-text">
                  {currentEmailForm.formState.errors.currentEmail.message}
                </p>
              )}

              {currentEmailOtpSent && (
                <div className="email-otp-verify-row" style={{ marginTop: '10px' }}>
                  <OtpInput
                    value={currentEmailOtp}
                    onChange={setCurrentEmailOtp}
                    disabled={emailLoading}
                    label="Current email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCurrentEmail}
                    disabled={emailLoading || currentEmailOtp.length !== 6}
                    className="btn-orange-action"
                  >
                    {emailLoading ? 'Verifying...' : 'Verify Current Email'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            <form
              onSubmit={newEmailForm.handleSubmit(onSendEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="email-verified-banner">
                <span className="email-verified-status">
                  <CheckCircle2 size={15} />
                  Current email verified ({currentEmail})
                </span>
                <button
                  type="button"
                  onClick={handleRestartEmailChange}
                  disabled={emailLoading}
                  className="email-restart-btn"
                >
                  Reset
                </button>
              </div>

              <div className="email-step-header" style={{ marginTop: '12px' }}>
                <span className="email-step-badge">Step 2 of 2</span>
                <label htmlFor="new-email-verify" className="email-step-title">
                  <Mail size={13} />
                  Enter & Verify Your New Email Address
                </label>
              </div>

              <div className="inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="newEmail"
                  control={newEmailForm.control}
                  rules={emailRules('Enter the new email address')}
                  render={({ field }) => (
                    <input
                      id="new-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (emailOtpSent) {
                          setEmailOtpSent(false);
                          setEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter new email address"
                      className="edit-input"
                      disabled={emailLoading}
                      aria-invalid={Boolean(newEmailForm.formState.errors.newEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="btn-secondary-outline"
                >
                  {emailLoading && !emailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {newEmailForm.formState.errors.newEmail && (
                <p className="field-error-text">
                  {newEmailForm.formState.errors.newEmail.message}
                </p>
              )}

              {emailOtpSent && (
                <div className="email-otp-verify-row" style={{ marginTop: '10px' }}>
                  <OtpInput
                    value={emailOtp}
                    onChange={setEmailOtp}
                    disabled={emailLoading}
                    label="New email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailChange}
                    disabled={emailLoading || emailOtp.length !== 6}
                    className="btn-orange-action"
                  >
                    {emailLoading ? 'Updating...' : 'Verify & Update Email'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Section 3: Change Password */}
      <form
        onSubmit={passwordForm.handleSubmit(onChangePassword, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div>
          <h2>Security & Master Authentication</h2>
          <p className="edit-section-sub">Update your password to keep your account protected.</p>
        </div>

        <div
          className={`edit-field-group ${
            passwordForm.formState.errors.currentPassword ? 'has-error' : ''
          }`}
        >
          <label htmlFor="edit-current-password">Current Password</label>
          <div className="edit-password-input-wrap">
            <input
              id="edit-current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              className="edit-input edit-password-input"
              aria-invalid={Boolean(passwordForm.formState.errors.currentPassword)}
              {...passwordForm.register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              className="edit-password-toggle"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
              aria-pressed={showCurrentPassword}
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordForm.formState.errors.currentPassword && (
            <p className="field-error-text">
              {passwordForm.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="two-col-fields">
          <div
            className={`edit-field-group ${
              passwordForm.formState.errors.newPassword ? 'has-error' : ''
            }`}
          >
            <label htmlFor="edit-new-password">New Password</label>
            <div className="edit-password-input-wrap">
              <input
                id="edit-new-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
                className="edit-input edit-password-input"
                aria-invalid={Boolean(passwordForm.formState.errors.newPassword)}
                {...passwordForm.register('newPassword', {
                  ...strongPasswordRules('New password is required'),
                  onChange: () => {
                    if (passwordForm.getValues('confirmPassword')) {
                      void passwordForm.trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                className="edit-password-toggle"
                onClick={() => setShowNewPassword((visible) => !visible)}
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                aria-pressed={showNewPassword}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="edit-password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {passwordForm.formState.errors.newPassword && (
              <p className="field-error-text">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div
            className={`edit-field-group ${
              passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
            }`}
          >
            <label htmlFor="edit-confirm-password">Confirm New Password</label>
            <div className="edit-password-input-wrap">
              <input
                id="edit-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
                className="edit-input edit-password-input"
                aria-invalid={Boolean(passwordForm.formState.errors.confirmPassword)}
                {...passwordForm.register(
                  'confirmPassword',
                  confirmPasswordRules(
                    () => passwordForm.getValues('newPassword'),
                    'Please confirm your new password'
                  )
                )}
              />
              <button
                type="button"
                className="edit-password-toggle"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordForm.formState.errors.confirmPassword && (
              <p className="field-error-text">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="btn-orange-action"
          >
            <Lock size={14} />{' '}
            {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>

      {showRemoveImageModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowRemoveImageModal(false);
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-photo-title"
          >
            <div className="edit-profile-confirm-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="remove-photo-title">Remove photo?</h2>
            <p>Your profile photo will be removed when you save your changes.</p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowRemoveImageModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={() => {
                  handleRemoveImage();
                  setShowRemoveImageModal(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveProfileModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !savingProfile) {
              setShowSaveProfileModal(false);
            }
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-profile-title"
            aria-describedby="save-profile-description"
          >
            <div className="edit-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="save-profile-title">Save changes?</h2>
            <p id="save-profile-description">Save your updated profile information?</p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowSaveProfileModal(false)}
                disabled={savingProfile}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={confirmSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/pages/user/HomePage.css`
- **Size**: 3451 bytes | **Lines**: 192

```css
.home-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.hero-banner {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  border-radius: 24px;
  padding: 56px 48px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-eyebrow {
  display: inline-block;
  width: fit-content;
  padding: 5px 12px;
  border-radius: 999px;
  background-color: rgba(255, 87, 34, 0.2);
  color: #ff8a65;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-banner h1 {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.15;
  max-width: 600px;
}

.hero-banner p {
  font-size: 14px;
  color: #d1d5db;
  max-width: 520px;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 8px;
}

.btn-hero-primary {
  padding: 12px 24px;
  border-radius: 12px;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-hero-primary:hover {
  background-color: var(--primary-hover);
}

.btn-hero-secondary {
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
}

.categories-grid,
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.category-card,
.product-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.15s, box-shadow 0.15s;
}

.category-card:hover,
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.category-card h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
}

.category-card p {
  font-size: 12px;
  color: var(--text-muted);
}

.product-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: var(--primary-light);
  color: var(--primary);
  margin-bottom: 10px;
}

.product-card h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.product-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.product-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-dark);
}

@media (max-width: 768px) {
  .home-container {
    padding: 20px 16px 48px;
    gap: 32px;
  }

  .hero-banner {
    padding: 34px 22px;
    border-radius: 18px;
    gap: 14px;
  }

  .hero-banner h1 {
    font-size: 28px;
  }

  .categories-grid,
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
    gap: 14px;
  }
}

@media (max-width: 480px) {
  .hero-banner h1 {
    font-size: 24px;
  }

  .hero-cta-row a {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
```

### `frontend/src/pages/user/HomePage.jsx`
- **Size**: 3749 bytes | **Lines**: 114

```jsx
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Bot, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import './HomePage.css';

const featuredRobots = [
  {
    id: '1',
    tag: 'Humanoid',
    name: 'Tesla Optimus (Gen 2)',
    desc: 'Ceramic White • Standard Kinetic Config',
    price: '₹4,47,998',
  },
  {
    id: '2',
    tag: 'AI Companion',
    name: 'EMO AI Desktop Pet',
    desc: 'Matte Black & Cyber Purple • Smart Voice',
    price: '₹4,999',
  },
  {
    id: '3',
    tag: 'Quadruped',
    name: 'Boston Dynamics Spot',
    desc: 'Industrial Yellow • Enterprise SLAM Suite',
    price: '₹4,89,999',
  },
  {
    id: '4',
    tag: 'Smart Vacuum',
    name: 'Robolta R6 Pro',
    desc: 'Matte Gold & Black • 8000Pa Auto-Wash',
    price: '₹39,999',
  },
];

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      <section className="hero-banner">
        <span className="hero-eyebrow">NEXT-GEN ROBOTICS MARKETPLACE</span>
        <h1>Smart Robots for a Smarter Future.</h1>
        <p>
          Explore autonomous humanoids, intelligent cleaning vacuums, and interactive AI desktop
          companions engineered for modern homes and labs.
        </p>
        <div className="hero-cta-row">
          {user ? (
            <Link to="/profile" className="btn-hero-primary">
              Go to My Profile <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-hero-primary">
                Create Mobifys Account <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-hero-secondary">
                Sign In to Portal
              </Link>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Explore Categories</h2>
        </div>
        <div className="categories-grid">
          <div className="category-card">
            <Bot size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>Humanoids</h3>
            <p>Bipedal autonomous assistant robots</p>
          </div>
          <div className="category-card">
            <Sparkles size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>Cleaning Vacuums</h3>
            <p>LiDAR-guided robotic floor care</p>
          </div>
          <div className="category-card">
            <Cpu size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>AI Desktop Pets</h3>
            <p>Interactive expressive desk companions</p>
          </div>
          <div className="category-card">
            <ShieldCheck size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>STEM & Robotics Toys</h3>
            <p>Programmable kits for creators</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Featured Robotics Fleet</h2>
        </div>
        <div className="products-grid">
          {featuredRobots.map((item) => (
            <div key={item.id} className="product-card">
              <span className="product-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <p className="product-desc">{item.desc}</p>
              <div className="product-price-row">
                <span className="product-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### `frontend/src/pages/user/ManageAddresses.css`
- **Size**: 5395 bytes | **Lines**: 294

```css
.addresses-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.addresses-header-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.addresses-header-row h1 {
  font-size: 26px;
  font-weight: 800;
}

.addresses-header-row p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.btn-add-address {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 12px;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.btn-add-address:hover {
  background-color: var(--primary-hover);
}

.addresses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
  gap: 20px;
}

.address-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.address-card.default-card {
  border-top: 3px solid var(--primary);
}

.address-card-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.label-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: #f3f4f6;
  color: #374151;
}

.default-node-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: var(--success-bg);
  color: var(--success-text);
}

.address-street {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.5;
}

.address-city-pin {
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
}

.address-phone {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 8px;
}

.address-card-footer {
  padding-top: 14px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.address-card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-addr-edit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

.btn-addr-edit:hover {
  color: var(--primary);
}

.btn-addr-delete {
  background: none;
  border: none;
  color: var(--danger-text);
  display: flex;
  align-items: center;
  padding: 4px;
}

.btn-set-default {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
}

.btn-set-default:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .addresses-container {
    padding: 20px 16px 48px;
    gap: 18px;
  }

  .addresses-header-row h1 {
    font-size: 22px;
  }

  .btn-add-address {
    width: 100%;
    justify-content: center;
  }

  .address-card {
    padding: 18px;
  }

  .address-delete-actions button {
    min-width: 0;
    flex: 1;
    padding: 0 10px;
  }
}

.address-delete-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(3px);
}

.address-delete-modal {
  width: 100%;
  max-width: 360px;
  padding: 26px 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.26);
  animation: address-delete-enter 0.16s ease-out;
}

.address-delete-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border: 1px solid #ffe2d5;
  border-radius: 16px;
  background: var(--primary-light);
  color: var(--primary);
}

.address-delete-modal h2 {
  color: #111827;
  font-size: 19px;
  font-weight: 750;
  text-align: center;
}

.address-delete-modal p {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.address-delete-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
}

.address-delete-actions button {
  min-width: 118px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.address-delete-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.address-delete-cancel:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.address-delete-confirm {
  border: 1px solid #111827;
  background: #111827;
  color: #ffffff;
}

.address-delete-confirm:hover:not(:disabled) {
  background: #273449;
  border-color: #273449;
  transform: translateY(-1px);
}

.address-delete-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@keyframes address-delete-enter {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### `frontend/src/pages/user/ManageAddresses.jsx`
- **Size**: 8035 bytes | **Lines**: 236

```jsx
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Plus, Edit3, Trash2, CheckCircle2, User, MapPin, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './ManageAddresses.css';

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAddresses = async () => {
    const { data } = await axiosInstance.get('/user/addresses');
    setAddresses(data.addresses);
  };

  useEffect(() => {
    let active = true;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        if (active) setAddresses(data.addresses);
      })
      .catch((err) => {
        if (active && !err?.isBlockedLogout) toast.error('Failed to load addresses');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!deleteTarget) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !deleting) {
        setDeleteTarget(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteTarget, deleting]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const { data } = await axiosInstance.delete(`/user/addresses/${deleteTarget._id}`);
      toast.success(data.message);
      setDeleteTarget(null);
      window.dispatchEvent(new Event('addresses-updated'));
      await fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const handleSetDefault = async (addr) => {
    try {
      const { data } = await axiosInstance.put(`/user/addresses/${addr._id}`, {
        isDefault: true,
      });
      toast.success(data.message);
      window.dispatchEvent(new Event('addresses-updated'));
      fetchAddresses();
    } catch {
      toast.error('Could not set default address');
    }
  };

  return (
    <div className="addresses-container">
      <div className="profile-subnav-tabs">
        <NavLink to="/profile" end className="profile-tab-link">
          <User size={14} /> My Profile
        </NavLink>
        <NavLink to="/profile/addresses" className="profile-tab-link active">
          <MapPin size={14} /> Addresses ({addresses.length})
        </NavLink>
        <NavLink to="/profile/edit" className="profile-tab-link">
          <ShieldCheck size={14} /> Account Security
        </NavLink>
      </div>

      <div className="addresses-header-row">
        <div>
          <h1>Manage Delivery Addresses</h1>
          <p>Add, edit, or remove your saved delivery destinations.</p>
        </div>

        <Link to="/profile/addresses/new" className="btn-add-address">
          <Plus size={16} /> Add New Address
        </Link>
      </div>

      {loading ? (
        <p style={{ fontSize: '13px', color: '#6b7280' }}>Loading saved addresses...</p>
      ) : addresses.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            padding: '48px',
            borderRadius: '18px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            You haven't added any delivery addresses yet.
          </p>
          <Link to="/profile/addresses/new" className="btn-add-address">
            <Plus size={16} /> Add Your First Address
          </Link>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={addr.isDefault ? 'address-card default-card' : 'address-card'}
            >
              <div>
                <div className="address-card-badges">
                  <span className="label-badge">{addr.label}</span>
                  {addr.isDefault && <span className="default-node-badge">● Default Address</span>}
                </div>

                <div className="address-street">
                  {[addr.address, addr.street].filter(Boolean).join(', ')}
                </div>
                <div className="address-city-pin">
                  {[addr.city, addr.state].filter(Boolean).join(', ')} — {addr.pin}
                </div>
                <div className="address-phone">Phone: {addr.phone}</div>
              </div>

              <div className="address-card-footer">
                <div className="address-card-actions">
                  <Link to={`/profile/addresses/edit/${addr._id}`} className="btn-addr-edit">
                    <Edit3 size={14} /> Edit Address
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(addr)}
                    title="Delete address"
                    className="btn-addr-delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {addr.isDefault ? (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#059669',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={14} /> Active Default
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr)}
                    className="btn-set-default"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div
          className="address-delete-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !deleting) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            className="address-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-address-title"
            aria-describedby="delete-address-description"
          >
            <div className="address-delete-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="delete-address-title">Delete address?</h2>
            <p id="delete-address-description">
              Remove your <strong>{deleteTarget.label}</strong> address (
              {[deleteTarget.address, deleteTarget.city].filter(Boolean).join(', ')})?
            </p>
            <div className="address-delete-actions">
              <button
                type="button"
                className="address-delete-cancel"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="address-delete-confirm"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### `frontend/src/pages/user/UserComingSoon.css`
- **Size**: 137 bytes | **Lines**: 8

```css
.user-coming-soon {
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 24px;
  font-size: 14px;
  color: var(--text-muted);
}
```

### `frontend/src/pages/user/UserComingSoon.jsx`
- **Size**: 161 bytes | **Lines**: 6

```jsx
import './UserComingSoon.css';

export default function UserComingSoon({ title }) {
  return <div className="user-coming-soon">{title} coming soon</div>;
}
```

### `frontend/src/pages/user/UserForgotPassword.css`
- **Size**: 31 bytes | **Lines**: 1

```css
@import './VerifyEmailOtp.css';
```

### `frontend/src/pages/user/UserForgotPassword.jsx`
- **Size**: 3088 bytes | **Lines**: 89

```jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { EMAIL_MAX_LENGTH, emailRules, toastFirstFormError } from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: location.state?.email || '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSendCode = async ({ email }) => {
    try {
      const cleanEmail = email.trim();
      const { data } = await axiosInstance.post('/user/auth/forgot-password', {
        email: cleanEmail,
      });
      toast.success(data.message);
      navigate('/forgot-password/verify-otp', {
        state: { email: data.email || cleanEmail },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onSendCode, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <KeyRound size={24} />
            </div>
            <h1>Forgot Password?</h1>
            <p>
              Enter your registered email address below. We will dispatch a 6-digit verification
              security code.
            </p>
          </div>

          <div className="field-block">
            <label htmlFor="user-forgot-email">REGISTERED EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="user-forgot-email"
                type="email"
                maxLength={EMAIL_MAX_LENGTH}
                placeholder="e.g. yourname@domain.com"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules('Registered email address is required'))}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Sending...' : 'Send Verification Code'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Cancel and return to Sign
              in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/UserLogin.css`
- **Size**: 4047 bytes | **Lines**: 234

```css
.user-auth-wrapper {
  padding: 48px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-auth-card {
  width: 100%;
  max-width: 440px;
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.user-auth-header {
  text-align: center;
  margin-bottom: 24px;
}

.user-auth-header h1 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-dark);
}

.user-auth-header p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
  line-height: 1.5;
}

.sso-buttons-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-sso {
  width: 100%;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  color: var(--text-dark);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.15s;
}

.sso-brand-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
}

.btn-sso:hover {
  background-color: #f3f4f6;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-light);
  text-transform: uppercase;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #e5e7eb;
}

.user-auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-block label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #374151;
  margin-bottom: 6px;
}

.field-input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon-left {
  position: absolute;
  left: 14px;
  color: var(--text-light);
  pointer-events: none;
}

.field-input-box input {
  width: 100%;
  padding: 11px 40px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  font-size: 13px;
  color: var(--text-dark);
}

.field-input-box input:focus {
  outline: none;
  border-color: var(--primary);
  background-color: #ffffff;
}

.field-input-box.has-error input {
  border-color: var(--danger-text);
  background-color: #fffafa;
}

.field-error-text {
  margin-top: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--danger-text);
}

.eye-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
}

.remember-forgot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  cursor: pointer;
}

.remember-label input {
  accent-color: var(--primary);
  width: 15px;
  height: 15px;
}

.orange-link {
  color: var(--primary);
  font-weight: 600;
}

.orange-link:hover {
  text-decoration: underline;
}

.btn-user-submit {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.btn-user-submit:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.btn-user-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-switch-footer {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 20px;
}

@media (max-width: 480px) {
  .user-auth-wrapper {
    padding: 24px 14px;
  }

  .user-auth-card {
    padding: 26px 18px;
    border-radius: 16px;
  }

  .user-auth-header h1 {
    font-size: 21px;
  }

  .remember-forgot-row {
    flex-wrap: wrap;
    gap: 8px;
  }
}
```

### `frontend/src/pages/user/UserLogin.jsx`
- **Size**: 6097 bytes | **Lines**: 170

```jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance, { API_BASE_URL } from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import { emailRules, toastFirstFormError } from '../../utils/formValidation';
import './UserLogin.css';

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'sso_failed') {
      toast.error('Google sign-in failed or your account is blocked.');
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const onSubmit = async (values) => {
    const cleanEmail = values.email.trim();
    try {
      const { data } = await axiosInstance.post('/user/auth/login', {
        email: cleanEmail,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      dispatch(setUser(data.user));
      toast.success(data.message);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        toast.error(err.response.data.message);
        navigate('/verify-otp', { state: { email: cleanEmail } });
      } else {
        toast.error(err.response?.data?.message || 'Sign in failed');
      }
    }
  };

  const handleGoogleSSO = () => {
    window.location.href = `${API_BASE_URL}/user/auth/google`;
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <div className="user-auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your account.</p>
        </div>

        <div className="sso-buttons-group">
          <button type="button" onClick={handleGoogleSSO} className="btn-sso">
            <svg className="sso-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.37-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="auth-divider">OR SIGN IN</div>

        <form
          onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="field-block">
            <label htmlFor="login-email">EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="login-email"
                type="email"
                placeholder="Your email address"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules())}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="login-password">PASSWORD</label>
            <div className={`field-input-box ${errors.password ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.password)}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="eye-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="field-error-text">{errors.password.message}</p>}
          </div>

          <div className="remember-forgot-row">
            <label className="remember-label">
              <input type="checkbox" {...register('rememberMe')} />
              <span>Remember Me</span>
            </label>
            <Link to="/forgot-password" className="orange-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-footer">
          New to mobifys?{' '}
          <Link to="/signup" className="orange-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/UserProfile.css`
- **Size**: 7540 bytes | **Lines**: 395

```css
.profile-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-subnav-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.profile-tab-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  transition: all 0.15s;
}

.profile-tab-link:hover {
  color: var(--text-dark);
}

.profile-tab-link.active {
  background-color: #111827;
  color: #ffffff;
  border-color: #111827;
}

.profile-page-title h1 {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-dark);
}

.profile-page-title p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.profile-hero-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.profile-identity-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.profile-avatar-circle,
.profile-avatar-img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-avatar-circle {
  background-color: var(--primary-light);
  color: var(--primary);
  font-size: 22px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.profile-name-line h2 {
  font-size: 20px;
  font-weight: 700;
}

.verified-user-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  background-color: var(--success-bg);
  color: var(--success-text);
}

.profile-contact-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.profile-member-since {
  font-size: 11px;
  color: var(--text-light);
  margin-top: 4px;
}

.profile-hero-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-edit-profile {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: #f9fafb;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
}

.btn-edit-profile:hover {
  background-color: #f3f4f6;
}

.btn-user-signout {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  background-color: var(--danger-bg);
  font-size: 12px;
  font-weight: 600;
  color: var(--danger-text);
}

.profile-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 18px;
}

.profile-section-card {
  min-width: 0;
  min-height: 300px;
  padding: 22px;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  box-shadow: 0 4px 14px rgba(17, 24, 39, 0.035);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.profile-section-card:hover {
  border-color: #d7dce3;
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.07);
  transform: translateY(-2px);
}

.profile-card-content {
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  margin-bottom: 2px;
}

.profile-card-content h3 {
  color: var(--text-dark);
  font-size: 16px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.profile-card-content p {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.65;
}

.profile-card-content p strong {
  color: #1f2937;
  font-weight: 700;
}

.card-pill-tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid #ffe2d5;
  border-radius: 999px;
  background: var(--primary-light);
  color: #c2410c;
  font-size: 11px;
  font-weight: 750;
  white-space: nowrap;
}

.card-pill-tag.green {
  border-color: #bbf7d0;
  background: var(--success-bg);
  color: var(--success-text);
}

.card-icon-badge.green {
  background: var(--success-bg);
  color: var(--success-text);
}

.saved-address-preview {
  padding: 10px 12px;
  border: 1px solid #edf0f3;
  border-radius: 12px;
  background: #f9fafb;
}

.saved-address-preview strong {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 12px;
  font-weight: 700;
}

.saved-address-preview > div {
  margin-top: 4px;
  overflow: hidden;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.45;
  text-overflow: ellipsis;
}

.default-chip {
  padding: 3px 7px;
  border-radius: 999px;
  background: var(--success-bg);
  color: var(--success-text);
  font-size: 9px;
  font-weight: 750;
}

.card-orange-link {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid #ffe0d2;
  border-radius: 10px;
  background: #fff7f2;
  color: #c2410c;
  font-size: 12px;
  font-weight: 700;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
}

.card-orange-link:hover {
  border-color: #ffb99f;
  background: #fff0e8;
  color: #9a3412;
}

.profile-referral-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 12px;
}

.profile-referral-line strong {
  color: var(--text-dark);
}

.profile-copy-referral {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: 4px;
  padding: 5px 8px;
  border: 1px solid #ffe0d2;
  border-radius: 8px;
  background: #fff7f2;
  color: #c2410c;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.profile-copy-referral:hover {
  border-color: #ffb99f;
  background: #fff0e8;
}

.card-icon-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .profile-cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .profile-container {
    padding: 20px 16px 48px;
    gap: 18px;
  }

  .profile-page-title h1 {
    font-size: 22px;
  }

  .profile-hero-card {
    padding: 18px;
  }

  .profile-avatar-circle,
  .profile-avatar-img {
    width: 56px;
    height: 56px;
    font-size: 18px;
  }

  .profile-hero-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-edit-profile,
  .btn-user-signout {
    flex: 1;
    justify-content: center;
  }

  .profile-cards-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .profile-section-card {
    min-height: 0;
    padding: 20px;
  }
}
```

### `frontend/src/pages/user/UserProfile.jsx`
- **Size**: 8769 bytes | **Lines**: 261

```jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  MapPin,
  Wallet,
  ShieldCheck,
  Edit3,
  LogOut,
  ArrowRight,
  Gift,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import copyTextToClipboard from '../../utils/copyTextToClipboard';
import './UserProfile.css';

export default function UserProfile() {
  const authUser = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(authUser || null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(!authUser);

  const dispatch = useDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    let active = true;

    axiosInstance
      .get('/user/profile')
      .then(({ data }) => {
        if (!active) return;
        setProfile(data.user);
        setAddresses(data.addresses);
        dispatch(setUser(data.user));
      })
      .catch((err) => {
        if (active && !err?.isBlockedLogout) {
          toast.error(err.response?.data?.message || 'Failed to load profile');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading || !profile || !hash) return undefined;
    const frameId = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(frameId);
  }, [hash, loading, profile]);

  const handleCopyReferralCode = async () => {
    try {
      await copyTextToClipboard(profile.referralCode);
      toast.success('Referral code copied');
    } catch {
      toast.error('Could not copy the referral code');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p style={{ fontSize: '13px', color: '#6b7280' }}>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  const initials = profile.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-container">
      {/* Sub-navigation Tabs */}
      <div className="profile-subnav-tabs">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <User size={14} /> My Profile
        </NavLink>
        <NavLink
          to="/profile/addresses"
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <MapPin size={14} /> Addresses ({addresses.length})
        </NavLink>
        <NavLink
          to="/profile/edit"
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <ShieldCheck size={14} /> Account Security
        </NavLink>
      </div>

      <div className="profile-page-title">
        <h1>My Profile</h1>
        <p>Manage your personal details, delivery locations, wallet, and account security.</p>
      </div>

      {/* User Identity Card */}
      <div className="profile-hero-card">
        <div className="profile-identity-left">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={profile.name} className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-circle">{initials}</div>
          )}

          <div>
            <div className="profile-name-line">
              <h2>{profile.name}</h2>
              <span className="verified-user-pill">● Verified User</span>
            </div>
            <div className="profile-contact-meta">
              {profile.phone ? `${profile.phone} • ` : ''}
              {profile.email}
            </div>
            {profile.createdAt && (
              <div className="profile-member-since">
                Member since{' '}
                {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>

        <div className="profile-hero-actions">
          <Link to="/profile/edit" className="btn-edit-profile">
            <Edit3 size={14} /> Edit Profile
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-user-logout-confirmation'))}
            className="btn-user-signout"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="profile-cards-grid">
        {/* Wallet & Referral Card */}
        <div className="profile-section-card" id="wallet-section">
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge">
                <Wallet size={18} />
              </div>
              <span className="card-pill-tag">
                ₹{(profile.walletBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <h3>My Wallet</h3>
            <p>
              Available Balance:{' '}
              <strong>₹{(profile.walletBalance || 0).toLocaleString('en-IN')}.00</strong> • Instant
              checkout active for hardware orders.
            </p>
          </div>
          <div id="referral-section" className="profile-referral-line">
            <Gift size={14} color="#ff5722" />
            <span>Share referral code:</span>
            <strong>{profile.referralCode}</strong>
            {profile.referralCode && (
              <button
                type="button"
                className="profile-copy-referral"
                onClick={handleCopyReferralCode}
                aria-label={`Copy referral code ${profile.referralCode}`}
                title="Copy referral code"
              >
                <Copy size={14} />
                Copy
              </button>
            )}
          </div>
        </div>

        {/* Saved Delivery Locations Card */}
        <div className="profile-section-card">
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge">
                <MapPin size={18} />
              </div>
              <span className="card-pill-tag">{addresses.length} Saved</span>
            </div>
            <h3>Saved Locations</h3>
            {addresses.length === 0 ? (
              <p>No delivery addresses saved yet. Add one for faster checkout.</p>
            ) : (
              addresses.slice(0, 2).map((addr) => (
                <div key={addr._id} className="saved-address-preview">
                  <strong>
                    {addr.label}
                    {addr.isDefault && <span className="default-chip">Default</span>}
                  </strong>
                  <div style={{ color: '#6b7280', marginTop: '2px' }}>
                    {[addr.address, addr.street, addr.city, addr.state].filter(Boolean).join(', ')} - {addr.pin}
                  </div>
                </div>
              ))
            )}
          </div>
          <Link to="/profile/addresses" className="card-orange-link">
            Manage Addresses <ArrowRight size={14} />
          </Link>
        </div>

        {/* Account Security Card */}
        <div className="profile-section-card">
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge green">
                <ShieldCheck size={18} />
              </div>
              <span className="card-pill-tag green">ACTIVE</span>
            </div>
            <h3> Account Security</h3>
            <p>
              Update your profile photo, verify a new email address with OTP, or change your
              account password anytime.
            </p>
          </div>
          <Link to="/profile/edit" className="card-orange-link">
            Change Password & Email <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/UserResetPassword.jsx`
- **Size**: 5643 bytes | **Lines**: 162

```jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import {
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  minLengthPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const otpVerified = Boolean(location.state?.otpVerified);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!email || !otpVerified) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, otpVerified, navigate]);

  const onResetSubmit = async ({ newPassword, confirmPassword }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  if (!email || !otpVerified) {
    return null;
  }

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onResetSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <Lock size={24} />
            </div>
            <h1>Set New Password</h1>
            <p>
              OTP verified for <strong>{email}</strong>. Create a new password for your account.
            </p>
          </div>

          <div className="field-block">
            <label htmlFor="user-reset-password">NEW PASSWORD</label>
            <div className={`field-input-box ${errors.newPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="user-reset-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
                aria-invalid={Boolean(errors.newPassword)}
                {...register('newPassword', {
                  ...minLengthPasswordRules('New password is required'),
                  onChange: () => {
                    if (getValues('confirmPassword')) {
                      void trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="eye-btn"
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && <p className="field-error-text">{errors.newPassword.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="user-reset-confirm">CONFIRM NEW PASSWORD</label>
            <div className={`field-input-box ${errors.confirmPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="user-reset-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register(
                  'confirmPassword',
                  confirmPasswordRules(
                    () => getValues('newPassword'),
                    'Please confirm your new password'
                  )
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="eye-btn"
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Updating...' : 'Update Password & Continue'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/UserSignup.css`
- **Size**: 1266 bytes | **Lines**: 68

```css
@import './UserLogin.css';

.field-label-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.field-label-meta label {
  margin-bottom: 0;
}

.field-char-count {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-light);
}

.field-input-box.phone-input-box .phone-country-code {
  position: absolute;
  left: 38px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: var(--text-muted);
  padding-right: 8px;
  border-right: 1px solid var(--border-color);
  pointer-events: none;
}

.field-input-box.phone-input-box input {
  padding: 11px 14px 11px 84px;
}

.password-rules-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  font-size: 10px;
  color: var(--text-light);
  margin-top: 6px;
}

.password-rules-row span.met {
  color: var(--primary);
  font-weight: 600;
}

.terms-check-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

.terms-check-row input {
  margin-top: 2px;
  accent-color: var(--primary);
}
```

### `frontend/src/pages/user/UserSignup.jsx`
- **Size**: 10465 bytes | **Lines**: 275

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance, { API_BASE_URL } from '../../api/axiosInstance';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  extractIndianDigits,
  getPasswordChecks,
  indianPhoneRules,
  nameRules,
  normalizeText,
  strongPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './UserSignup.css';

export default function UserSignup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreed: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedName = useWatch({ control, name: 'name', defaultValue: '' });
  const watchedPassword = useWatch({ control, name: 'password', defaultValue: '' });
  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } = getPasswordChecks(watchedPassword);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/signup', {
        name: normalizeText(values.name),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success(data.message);
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <div className="user-auth-header">
          <h1>Create Your Account</h1>
          <p>Explore the future of autonomous robotics with Mobifys.</p>
        </div>

        <div className="sso-buttons-group">
          <button
            type="button"
            onClick={() => (window.location.href = `${API_BASE_URL}/user/auth/google`)}
            className="btn-sso"
          >
            <svg className="sso-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.37-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="auth-divider">OR REGISTER</div>

        <form
          onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="field-block">
            <div className="field-label-meta">
              <label htmlFor="signup-name">FULL NAME</label>
              <span className="field-char-count">
                {watchedName.length}/{NAME_MAX_LENGTH}
              </span>
            </div>
            <div className={`field-input-box ${errors.name ? 'has-error' : ''}`}>
              <User className="field-icon-left" size={16} />
              <input
                id="signup-name"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                placeholder="Your full name (2–50 letters)"
                aria-invalid={Boolean(errors.name)}
                {...register('name', nameRules())}
              />
            </div>
            {errors.name && <p className="field-error-text">{errors.name.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-email">EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="signup-email"
                type="email"
                maxLength={EMAIL_MAX_LENGTH}
                placeholder="Your email address"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules())}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-phone">Phone Number</label>
            <div className={`field-input-box phone-input-box ${errors.phone ? 'has-error' : ''}`}>
              <Phone className="field-icon-left" size={16} />
              <span className="phone-country-code">+91</span>
              <Controller
                name="phone"
                control={control}
                rules={indianPhoneRules()}
                render={({ field }) => (
                  <input
                    id="signup-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={field.value}
                    onChange={(e) => field.onChange(extractIndianDigits(e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="9876543210"
                    aria-invalid={Boolean(errors.phone)}
                  />
                )}
              />
            </div>
            {errors.phone && <p className="field-error-text">{errors.phone.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-password">PASSWORD</label>
            <div className={`field-input-box ${errors.password ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.password)}
                {...register('password', {
                  ...strongPasswordRules(),
                  onChange: () => {
                    if (getValues('confirmPassword')) {
                      void trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="eye-btn"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {errors.password && <p className="field-error-text">{errors.password.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-confirm-password">RE-ENTER PASSWORD</label>
            <div className={`field-input-box ${errors.confirmPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-confirm-password"
                type={showConfirmPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register(
                  'confirmPassword',
                  confirmPasswordRules(() => getValues('password'))
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass((prev) => !prev)}
                className="eye-btn"
                aria-label={showConfirmPass ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="terms-check-row">
              <input
                type="checkbox"
                {...register('agreed', {
                  validate: (value) =>
                    value || 'Please agree to the Terms of Service & Privacy Policy',
                })}
              />
              <span>
                I agree to mobifys <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>
              </span>
            </label>
            {errors.agreed && <p className="field-error-text">{errors.agreed.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-footer">
          Already have an account?{' '}
          <Link to="/login" className="orange-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/UserVerifyResetOtp.jsx`
- **Size**: 4575 bytes | **Lines**: 152

```jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import OtpInput from '../../components/OtpInput';
import { otpRules, toastFirstFormError } from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserVerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const watchedOtp = useWatch({ control, name: 'otp', defaultValue: '' });

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
      return;
    }
    if (timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [email, timer, navigate]);

  const handleResendCode = async () => {
    try {
      setResending(true);
      const { data } = await axiosInstance.post('/user/auth/resend-otp', {
        email,
        purpose: 'forgot_password',
      });
      toast.success(data.message);
      setTimer(120);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    } finally {
      setResending(false);
    }
  };

  const onVerifyOtp = async ({ otp }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/verify-otp', {
        email,
        otp,
      });
      toast.success(data.message);
      navigate('/reset-password', {
        state: { email: data.email || email, otpVerified: true },
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onVerifyOtp, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <ShieldCheck size={24} />
            </div>
            <h1>Verify OTP</h1>
            <p>
              Enter the 6-digit verification code sent to <strong>{email}</strong> to continue.
            </p>
          </div>

          <div className="field-block">
            <label>6-DIGIT VERIFICATION CODE</label>
            <Controller
              name="otp"
              control={control}
              rules={otpRules()}
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.otp && (
              <p className="field-error-text" style={{ textAlign: 'center' }}>
                {errors.otp.message}
              </p>
            )}
            <div className="otp-resend-line" style={{ marginTop: '8px' }}>
              {timer > 0 ? (
                <span>
                  Resend code in {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              ) : (
                <button type="button" onClick={handleResendCode} disabled={resending}>
                  {resending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || watchedOtp.length !== 6}
            className="btn-user-submit"
          >
            {isSubmitting ? 'Verifying...' : 'Verify & Proceed'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link
              to="/forgot-password"
              state={{ email }}
              className="orange-link"
              style={{ color: '#6b7280' }}
            >
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Change email address
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### `frontend/src/pages/user/VerifyEmailOtp.css`
- **Size**: 771 bytes | **Lines**: 39

```css
@import './UserLogin.css';

.auth-badge-square {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.otp-resend-line {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}

.otp-resend-line button {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 700;
}

.verified-ring-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid var(--primary);
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}
```

### `frontend/src/pages/user/VerifyEmailOtp.jsx`
- **Size**: 5374 bytes | **Lines**: 166

```jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { MailCheck, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import OtpInput from '../../components/OtpInput';
import { otpRules, toastFirstFormError } from '../../utils/formValidation';
import './VerifyEmailOtp.css';

export default function VerifyEmailOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email || '';
  const [timer, setTimer] = useState(120);
  const [verified, setVerified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const watchedOtp = useWatch({ control, name: 'otp', defaultValue: '' });

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }
    if (verified || timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [email, timer, verified, navigate]);

  const onVerify = async ({ otp }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/verify-signup-otp', {
        email,
        otp,
      });
      dispatch(setUser(data.user));
      toast.success(data.message);
      setVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axiosInstance.post('/user/auth/resend-otp', {
        email,
        purpose: 'signup',
      });
      toast.success(data.message);
      setTimer(120);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        {!verified ? (
          <form
            onSubmit={handleSubmit(onVerify, toastFirstFormError)}
            className="user-auth-form"
            noValidate
          >
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <MailCheck size={24} />
              </div>
              <h1>Verify Your Email</h1>
              <p>
                We have sent a 6-digit verification code to <strong>{email}</strong>. Enter the code
                below to proceed.
              </p>
            </div>

            <div>
              <Controller
                name="otp"
                control={control}
                rules={otpRules()}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.otp && (
                <p className="field-error-text" style={{ textAlign: 'center' }}>
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="otp-resend-line">
              Didn&apos;t receive the code?{' '}
              {timer > 0 ? (
                <span style={{ color: '#ff5722', fontWeight: 600 }}>
                  Resend in {String(Math.floor(timer / 60)).padStart(2, '0')}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              ) : (
                <button type="button" onClick={handleResend}>
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || watchedOtp.length !== 6}
              className="btn-user-submit"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-footer">
              <Link to="/signup" className="orange-link" style={{ color: '#6b7280' }}>
                <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to registration
              </Link>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="verified-ring-icon">
              <ShieldCheck size={30} />
            </div>
            <div className="user-auth-header">
              <h1>Welcome to mobifys! Account Created</h1>
              <p>
                Your mobifys robotics account has been verified and activated. You&apos;re all set to
                explore premier robotics and manage your profile.
              </p>
            </div>
            <Link to="/" className="btn-user-submit">
              Explore Mobifys <ArrowRight size={16} />
            </Link>
            <div className="auth-switch-footer">
              <Link to="/profile" className="orange-link">
                Go to My Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### `frontend/src/redux/slices/authSlice.js`
- **Size**: 792 bytes | **Lines**: 40

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  admin: null,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logoutAdminState: (state) => {
      state.admin = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUserState: (state) => {
      state.user = null;
    },
    setAuthInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const {
  setAdmin,
  logoutAdminState,
  setUser,
  logoutUserState,
  setAuthInitialized,
} = authSlice.actions;
export default authSlice.reducer;
```

### `frontend/src/redux/store.js`
- **Size**: 187 bytes | **Lines**: 8

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

### `frontend/src/utils/copyTextToClipboard.js`
- **Size**: 238 bytes | **Lines**: 8

```javascript
export default async function copyTextToClipboard(text) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard access is unavailable in this browser context');
  }

  await navigator.clipboard.writeText(text);
}
```

### `frontend/src/utils/formValidation.js`
- **Size**: 8917 bytes | **Lines**: 298

```javascript
import toast from 'react-hot-toast';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 100;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const ADDRESS_MIN_LENGTH = 3;
export const ADDRESS_MAX_LENGTH = 120;
export const STREET_MIN_LENGTH = 3;
export const STREET_MAX_LENGTH = 100;
export const CITY_MIN_LENGTH = 2;
export const CITY_MAX_LENGTH = 50;

export const ADDRESS_LABELS = ['Home', 'Work', 'Other'];
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const NAME_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const FLEXIBLE_INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?([6-9]\d{9})$/;
const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s,./#&()-]+$/;
const CITY_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const INDIAN_PIN_REGEX = /^[1-9]\d{5}$/;

export function normalizeText(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

export function extractIndianDigits(rawValue = '') {
  const digitsOnly = String(rawValue).replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2, 12);
  }
  if (digitsOnly.length > 10 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1, 11);
  }
  return digitsOnly.slice(0, 10);
}

export function extractPinDigits(rawValue = '') {
  return String(rawValue).replace(/\D/g, '').slice(0, 6);
}

export function extractOtpDigits(rawValue = '') {
  return String(rawValue).replace(/\D/g, '').slice(0, 6);
}

export function getPasswordChecks(password = '') {
  return {
    hasMinMaxLen:
      password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH,
    hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9\s]/.test(password),
  };
}

function findFirstErrorMessage(errorNode) {
  if (!errorNode || typeof errorNode !== 'object') return null;
  if (typeof errorNode.message === 'string' && errorNode.message) {
    return errorNode.message;
  }
  for (const nested of Object.values(errorNode)) {
    const found = findFirstErrorMessage(nested);
    if (found) return found;
  }
  return null;
}

export function toastFirstFormError(errors) {
  const firstMessage = findFirstErrorMessage(errors);
  if (firstMessage) {
    toast.error(firstMessage);
  }
}

export const nameRules = (requiredMessage = 'Full name is required') => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return requiredMessage;
    if (clean.length < NAME_MIN_LENGTH) {
      return `Full name must be at least ${NAME_MIN_LENGTH} characters`;
    }
    if (clean.length > NAME_MAX_LENGTH) {
      return `Full name must not exceed ${NAME_MAX_LENGTH} characters`;
    }
    if (!NAME_REGEX.test(clean)) {
      return 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
    }
    return true;
  },
});

export const emailRules = (requiredMessage = 'Email address is required') => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!clean) return requiredMessage;
    if (clean.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(clean)) {
      return 'Enter a valid email address';
    }
    return true;
  },
});

export const indianPhoneRules = ({
  required = true,
  requiredMessage = 'Indian mobile number is required',
} = {}) => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) {
      return required ? requiredMessage : true;
    }
    if (!INDIAN_PHONE_REGEX.test(clean)) {
      return 'Enter a valid 10-digit Indian mobile number (starts with 6–9)';
    }
    return true;
  },
});

export const optionalProfilePhoneRules = () => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) return true;
    const compact = clean.replace(/[\s()-]/g, '');
    if (!FLEXIBLE_INDIAN_PHONE_REGEX.test(compact)) {
      return 'Enter a valid 10-digit Indian mobile number (e.g. +91 98470 12345)';
    }
    return true;
  },
});

export const strongPasswordRules = (requiredMessage = 'Password is required') => ({
  validate: (value) => {
    const password = typeof value === 'string' ? value : '';
    if (!password) return requiredMessage;
    if (/\s/.test(password)) return 'Password cannot contain spaces';
    if (password.length < PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`;
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return 'Include both uppercase and lowercase letters';
    }
    if (!/[0-9]/.test(password)) return 'Include at least one number';
    if (!/[^A-Za-z0-9\s]/.test(password)) return 'Include at least one special character';
    return true;
  },
});

export const minLengthPasswordRules = (
  requiredMessage = 'Password is required',
  minLength = PASSWORD_MIN_LENGTH
) => ({
  validate: (value) => {
    const password = typeof value === 'string' ? value : '';
    if (!password) return requiredMessage;
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`;
    }
    return true;
  },
});

export const confirmPasswordRules = (
  getPasswordValue,
  requiredMessage = 'Please re-enter your password'
) => ({
  validate: (value) => {
    if (!value) return requiredMessage;
    if (value !== getPasswordValue()) return 'Passwords do not match';
    return true;
  },
});

export const otpRules = (requiredMessage = 'Enter the 6-digit verification code') => ({
  validate: (value) => {
    const clean = extractOtpDigits(value);
    if (clean.length !== 6) return requiredMessage;
    return true;
  },
});

export const addressLineRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Flat / House No. / Building is required';
    if (clean.length < ADDRESS_MIN_LENGTH) {
      return `Must be at least ${ADDRESS_MIN_LENGTH} characters`;
    }
    if (clean.length > ADDRESS_MAX_LENGTH) {
      return `Must not exceed ${ADDRESS_MAX_LENGTH} characters`;
    }
    if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
      return 'Contains invalid characters';
    }
    return true;
  },
});

export const streetRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Street address is required';
    if (clean.length < STREET_MIN_LENGTH) {
      return `Street address must be at least ${STREET_MIN_LENGTH} characters`;
    }
    if (clean.length > STREET_MAX_LENGTH) {
      return `Street address must not exceed ${STREET_MAX_LENGTH} characters`;
    }
    if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
      return 'Street address contains invalid characters';
    }
    return true;
  },
});

export const cityRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Town / City is required';
    if (clean.length < CITY_MIN_LENGTH) {
      return `Town / City must be at least ${CITY_MIN_LENGTH} characters`;
    }
    if (clean.length > CITY_MAX_LENGTH) {
      return `Town / City must not exceed ${CITY_MAX_LENGTH} characters`;
    }
    if (!CITY_REGEX.test(clean)) {
      return 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
    }
    return true;
  },
});

export const stateRules = () => ({
  validate: (value) => {
    if (!value || !INDIAN_STATES.includes(value)) {
      return 'Please select a state / union territory';
    }
    return true;
  },
});

export const pinRules = () => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) return 'PIN code is required';
    if (!INDIAN_PIN_REGEX.test(clean)) {
      return 'Enter a valid 6-digit Indian PIN code (cannot start with 0)';
    }
    return true;
  },
});
```

### `frontend/vite.config.js`
- **Size**: 163 bytes | **Lines**: 7

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server:{open:true},
});
```
