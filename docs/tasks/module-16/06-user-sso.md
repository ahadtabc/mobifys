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
