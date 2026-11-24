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
