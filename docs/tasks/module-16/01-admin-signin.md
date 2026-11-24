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
