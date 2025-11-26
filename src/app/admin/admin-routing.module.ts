import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {UserComponent} from "./user/user.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SubmissionViewComponent} from "./submission/submission-view/submission-view.component";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEditComponent} from "./problem/problem-edit/problem-edit.component";
import {ProblemSubmissionComponent} from "./problem/problem-submission/problem-submission.component";
import {ProblemTestCaseComponent} from "./problem/problem-test-case/problem-test-case.component";
import {
  ProblemTestCaseEditComponent
} from "./problem/problem-test-case/problem-test-case-edit/problem-test-case-edit.component";
import {SubmissionComponent} from "./submission/submission.component";
import {RoleComponent} from "./role/role.component";
import {RoleViewComponent} from "./role/role-view/role-view.component";
import {PermissionComponent} from "./permission/permission.component";

const routes: Routes = [
  {path: '', component: AdminComponent}, //TODO: unused route
  {path: 'users', component: UserComponent},
  {path: 'users/new', component: UserEditComponent},
  {path: 'users/:id/edit', component: UserEditComponent},
  {path: 'problems', component: ProblemComponent},
  {path: 'problems/:id', component: ProblemEditComponent},
  {path: 'problems/:id/submissions', component: ProblemSubmissionComponent},
  {path: 'problems/:id/test-cases', component: ProblemTestCaseComponent},
  {path: 'problems/:id/test-cases/new', component: ProblemTestCaseEditComponent},
  {path: 'problems/new', component: ProblemEditComponent},
  {path: 'submissions', component: SubmissionComponent},
  {path: 'submissions/:id', component: SubmissionViewComponent},
  {path: 'roles', component: RoleComponent},
  {path: 'roles/:id', component: RoleViewComponent},
  {path: 'permissions', component: PermissionComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
