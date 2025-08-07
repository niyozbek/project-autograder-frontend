import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ClientComponent} from "./client.component";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemViewComponent} from "./problem-view/problem-view.component";
import {ProblemSubmissionComponent} from "./problem-submission/problem-submission.component";
import {ProblemTestComponent} from "./problem-test/problem-test.component";

const routes: Routes = [
  {path: '', component: ClientComponent}, //TODO: unused route
  {path: 'problems', component: ProblemComponent},
  {path: 'problems/:id', component: ProblemViewComponent},
  {path: 'problems/:id/submission', component: ProblemSubmissionComponent},
  {path: 'submissions/:id', component: ProblemTestComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule {

}
