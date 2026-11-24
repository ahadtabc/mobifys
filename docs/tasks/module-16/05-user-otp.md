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
