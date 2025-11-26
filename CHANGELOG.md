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

## Commit 4: Admin Roles - Delete Feature
**TODO to mark done:** Line 33 `[] delete`

**Files changed:**
- `src/app/admin/role/role.actions.ts` (lines 9, 51-56, 65) - added DELETE_ROLE action
- `src/app/admin/role/role.effects.ts` (lines 63-71) - added deleteRole effect
- `src/app/admin/role/role.component.ts` (lines 45-49) - added onDelete method
- `src/app/admin/role/role.component.html` (line 29) - added Delete button

**Why this implementation:**
- **Problem:** No way to remove roles from the system via UI
- **Approach:** Standard NgRx pattern - dispatch action -> effect calls HTTP DELETE -> refresh list
- **Pattern:** Same as other delete operations would follow in codebase
- **Confirmation:** Added simple `confirm()` dialog to prevent accidental deletes (MVP approach, no custom modal needed)
- **After delete:** Effect dispatches GetRoles to refresh the list automatically

**Commit message:**
```
feat(admin): add role delete functionality
```

---

## Commit 5: Admin Users - Role Assignment
**TODO to mark done:** Line 26 `[] select2 roles, use a specific route for assigning role.`

**Files changed:**
- `src/app/admin/user/user.actions.ts` (lines 6, 47-52, 70) - added ASSIGN_ROLES action
- `src/app/admin/user/user.effects.ts` (lines 4, 8, 81-93) - added assignRoles effect using PUT /users/{id}/assign-roles
- `src/app/admin/user/user-edit/user-edit.component.ts` (lines 1, 6-7, 10, 18, 21-22, 37, 53-59, 69-92) - added roles logic
- `src/app/admin/user/user-edit/user-edit.component.html` (lines 51-67) - added roles checkbox section

**Why this implementation:**
- **Problem:** Admins could create/edit users but couldn't assign roles
- **Backend endpoint:** Uses existing `PUT /users/{id}/assign-roles` (ASSIGN_ROLE permission required)
- **Approach:** Checkbox list for roles (same pattern as role-edit permissions)
- **Separate section:** Role assignment is visually separate from user details because it uses a different API endpoint
- **Edit mode only:** Roles section only shows when editing (user must exist first)
- **What breaks without this:** Users would have no roles and no permissions

**Commit message:**
```
feat(admin): add role assignment to user edit
```

---

## Commit 6: Client My Submissions Route
**TODO to mark done:** 
- Line 48-49 `[] problems route > [] get all` - Already working, mark as DONE
- Line 39-41 `[] submissions route > [] get-all, [] view` - Implemented now

**Files created:**
- `src/app/client/my-submissions/my-submissions.model.ts` - submission model with status map
- `src/app/client/my-submissions/my-submissions.actions.ts` - GET_MY_SUBMISSIONS, LOAD_MY_SUBMISSIONS
- `src/app/client/my-submissions/my-submissions.reducer.ts` - state management
- `src/app/client/my-submissions/my-submissions.effects.ts` - API call to /api/submissions/own
- `src/app/client/my-submissions/my-submissions.component.ts` - component logic
- `src/app/client/my-submissions/my-submissions.component.html` - table with submissions

**Files modified:**
- `src/app/client/client.reducer.ts` (line 3, 10, 19) - added mySubmissions reducer
- `src/app/client/client.module.ts` (lines 17-18, 27, 35) - registered component and effects
- `src/app/client/client-routing.module.ts` (lines 8, 14) - added /submissions route

**Why this implementation:**
- **Problem:** Users couldn't see all their submissions in one place
- **Backend:** Uses existing `GET /api/submissions/own` endpoint (VIEW_OWN_SUBMISSION permission)
- **Pattern:** Same NgRx pattern as problems - actions, effects, reducer, component
- **View link:** Each submission links to existing `/client/submissions/:id` (ProblemTestComponent)
- **Status display:** Reuses status badge styling from admin submission model

**Commit message:**
```
feat(client): add my submissions list page
```

---

## Commit 7: Own Profile Route
**TODO to mark done:** Lines 2-6 `[] own-profile route > [] view, [] update`

**Note:** Update is partially done - view works, but edit requires backend `/api/users/me` endpoint.

**Files created:**
- `src/app/client/profile/profile.component.ts` - reads username/role from auth state
- `src/app/client/profile/profile.component.html` - displays profile card

**Files modified:**
- `src/app/client/client.module.ts` (lines 19, 29) - registered ProfileComponent
- `src/app/client/client-routing.module.ts` (lines 9, 16) - added /profile route
- `src/app/header/header.component.html` (lines 44-46) - added Profile link in navbar

**Why this implementation:**
- **Problem:** Users couldn't see their profile
- **Limitation:** Backend doesn't have `/api/users/me` endpoint; auth state only has username/role (no ID)
- **MVP solution:** Display username and role from local auth state (no API call needed)
- **Future:** When backend adds `/api/users/me`, can fetch full profile and enable editing

**Commit message:**
```
feat(client): add profile page (view only)
```

---

## Remaining TODO items:
- Client problem/{id}/submissions route (lines 42-47)
- Improve design consistency (line 10) - low priority
- Update Angular (line 50) - low priority

