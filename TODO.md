# Common
[] own-profilems route
  [] get all
[] update
  [] view
  [] update
[DONE] set proper permissions_enum, and buttons should be visible depending on that
  [DONE] Hide admin menu from non-admin users (role-based visibility)
  [DONE] Prevent 500 errors by not showing unauthorized pages
[] improve design of crud pages, all should be similar and simple, standardized.

# Fixed Issues (Elite Backend Integration)
[DONE] WebSocket endpoint - updated from /gs-guide-websocket to /ws/submissions
[DONE] Role-based menu visibility - proper menus for each role
  - ADMIN: Full admin dropdown (Users, Problems, Submissions, Roles, Permissions)
  - LECTURER: Manage dropdown (Problems, Submissions, Roles) 
  - STUDENT: Only client problems view
[DONE] Authorization UX - users only see pages they have permissions for
# Admin
[DONE] problems route
[DONE] submissions route - view submissions from all problems
[] users route
  [DONE] get-all
  [DONE] create
  [DONE] update
    [] select2 roles, use a specific route for assigning role.
  [DONE] remove lecturer, student.
[] roles route
  [DONE] get-all
  [DONE] view
  [DONE] create
  [DONE] update with select2 permissions
  [Done] delete
[DONE] permissions route
  [DONE] get-all
[DONE] display error message for submission
# Client
[DONE] display error message for submission
[DONE] submissions route
  [DONE] get-all
  [DONE] view
[] problem/{id}/submissions route
  [] get all
    [] submission button for each problem
    [] test-cases button for each problem
  [] view
  [] submit one more
[] problems route
  [DONE] get all
[Done] update angular to the newest version.

[Done] http://localhost:4200/not-found on the all users
