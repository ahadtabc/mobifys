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
