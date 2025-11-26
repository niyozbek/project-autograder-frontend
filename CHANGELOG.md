# Frontend Changelog

## Commit 1: Fix Auth Redirect
**TODO solved:** `[Done] http://localhost:4200/not-found on the all users` (line 52)

**Files changed:**
- `src/app/auth/store/auth.effects.ts` (line 95-100)

**Why:** After login, the app redirected users to `/{role}` (e.g., `/lecturer`, `/student`). These routes don't exist - only `/admin` and `/client` do. This caused non-admin users to land on `/not-found`.

**Solution:** Route ADMIN to `/admin`, all others (LECTURER, STUDENT) to `/client`.

**Commit message:**
```
fix: redirect LECTURER/STUDENT to /client after login
```

---

## Commit 2: Admin Roles - View Feature
**TODO solved:** `[] roles route > [] view` (line 30)

**Files changed:**
- `src/app/admin/role/role-view/role-view.component.ts` (new)
- `src/app/admin/role/role-view/role-view.component.html` (new)
- `src/app/admin/admin.module.ts` (line 28, 46 - added import and declaration)
- `src/app/admin/admin-routing.module.ts` (line 16, 33 - added import and route)

**Why:** The roles list had a "View" button but no component to display the role details. Following the same pattern as `submission-view`.

**Solution:** Created `RoleViewComponent` that fetches role by ID and displays name + permissions list.

**Commit message:**
```
feat(admin): add role view component
```

---

## Commit 3: (Pending)
Admin Roles - Create/Edit Feature

