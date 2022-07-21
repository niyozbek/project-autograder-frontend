import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LecturerComponent} from "./lecturer.component";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEditComponent} from "./problem/problem-edit/problem-edit.component";
import {ProblemSubmissionComponent} from "./problem/problem-submission/problem-submission.component";
import {SubmissionComponent} from "./submission/submission.component";
import {ProblemTestCaseComponent} from "./problem/problem-test-case/problem-test-case.component";
import {
  ProblemTestCaseEditComponent
} from "./problem/problem-test-case/problem-test-case-edit/problem-test-case-edit.component";

const routes: Routes = [
  {
    path: '', component: LecturerComponent, children: [
      {
        path: 'problem', component: ProblemComponent, children: [
          {path: ':id', component: ProblemEditComponent},
          {path: ':id/submission', component: ProblemSubmissionComponent},
          {path: ':id/test-case', component: ProblemTestCaseComponent, children: [
              {path: 'new', component: ProblemTestCaseEditComponent}
            ]},
          {path: 'new', component: ProblemEditComponent}
        ],
      },
      {path: 'submission/:id', component: SubmissionComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturerRoutingModule {

}
