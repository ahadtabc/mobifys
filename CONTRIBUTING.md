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
