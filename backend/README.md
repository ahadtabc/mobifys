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
