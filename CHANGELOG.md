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

## Commit 3: Admin Roles - Create/Edit Feature
**TODO to mark done:** Line 31 `[] create` and line 32 `[] update with select2 permissions`

**Files changed:**
- `src/app/admin/role/role.actions.ts` (added CREATE_ROLE, UPDATE_ROLE, CLEAR_ROLE actions)
- `src/app/admin/role/role.reducer.ts` (added CLEAR_ROLE case)
- `src/app/admin/role/role.effects.ts` (added createRole, updateRole effects)
- `src/app/admin/role/role-edit/role-edit.component.ts` (new)
- `src/app/admin/role/role-edit/role-edit.component.html` (new)
- `src/app/admin/role/role.component.html` (added "New Role" button)
- `src/app/admin/admin.module.ts` (added RoleEditComponent import + declaration)
- `src/app/admin/admin-routing.module.ts` (added routes: roles/new, roles/:id/edit)

**Why:** Role management needed create/update functionality. Used checkbox list for permissions selection (simpler than select2, works without extra dependencies). Follows existing patterns from user-edit component.

**Commit message:**
```
feat(admin): add role create/edit with permissions selection
```

---

## Commit 4: (Pending)
Admin Roles - Delete Feature

