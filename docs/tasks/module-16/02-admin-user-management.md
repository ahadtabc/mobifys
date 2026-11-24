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
