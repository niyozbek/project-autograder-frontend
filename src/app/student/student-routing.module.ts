import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentComponent} from "./student.component";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemViewComponent} from "./problem-view/problem-view.component";
import {ProblemSubmissionComponent} from "./problem-submission/problem-submission.component";
import {ProblemTestComponent} from "./problem-test/problem-test.component";

const routes: Routes = [
  {path: '', component: StudentComponent}, //TODO: unused route
  {path: 'problem', component: ProblemComponent},
  {path: 'problem/:id', component: ProblemViewComponent},
  {path: 'problem/:id/submission', component: ProblemSubmissionComponent},
  {path: 'submission/:id', component: ProblemTestComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule {

}
