import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {UserComponent} from "./user/user.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SubmissionComponent} from "./submission/submission.component";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEditComponent} from "./problem/problem-edit/problem-edit.component";
import {ProblemSubmissionComponent} from "./problem/problem-submission/problem-submission.component";
import {ProblemTestCaseComponent} from "./problem/problem-test-case/problem-test-case.component";
import {
  ProblemTestCaseEditComponent
} from "./problem/problem-test-case/problem-test-case-edit/problem-test-case-edit.component";

const routes: Routes = [
  {path: '', component: AdminComponent}, //TODO: unused route
  {path: 'users', component: UserComponent},
  {path: 'users/new', component: UserEditComponent},
  {path: 'users/:id/edit', component: UserEditComponent},
  {path: 'problem', component: ProblemComponent},
  {path: 'problem/:id', component: ProblemEditComponent},
  {path: 'problem/:id/submission', component: ProblemSubmissionComponent},
  {path: 'problem/:id/test-case', component: ProblemTestCaseComponent, children: [
      {path: 'new', component: ProblemTestCaseEditComponent}
    ]},
  {path: 'problem/new', component: ProblemEditComponent},
  {path: 'submission/:id', component: SubmissionComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
