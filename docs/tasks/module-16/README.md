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
