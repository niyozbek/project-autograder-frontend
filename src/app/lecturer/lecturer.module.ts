import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {LecturerRoutingModule} from "./lecturer-routing.module";
import {LecturerComponent} from "./lecturer.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProblemComponent} from "./problem/problem.component";
import {EffectsModule} from "@ngrx/effects";
import {ProblemEffects} from "./problem/problem.effects";
import {ProblemEditComponent} from "./problem/problem-edit/problem-edit.component";
import {ProblemSubmissionComponent} from "./problem/problem-submission/problem-submission.component";
import {SubmissionEffects} from "./submission/submission.effects";
import {SubmissionComponent} from "./submission/submission.component";
import {ProblemTestCaseComponent} from "./problem/problem-test-case/problem-test-case.component";
import {TestCaseEffects} from "./test-case/test-case.effects";
import {
  ProblemTestCaseEditComponent
} from "./problem/problem-test-case/problem-test-case-edit/problem-test-case-edit.component";
import {StoreModule} from "@ngrx/store";
import * as fromLecturer from "./lecturer.reducer";

@NgModule({
  declarations: [
    LecturerComponent,
    ProblemComponent,
    ProblemEditComponent,
    ProblemSubmissionComponent,
    SubmissionComponent,
    ProblemTestCaseComponent,
    ProblemTestCaseEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    LecturerRoutingModule,
    SharedModule,
    MatPaginatorModule,
    StoreModule.forFeature('lecturer', fromLecturer.reducers),
    EffectsModule.forFeature([ProblemEffects, SubmissionEffects, TestCaseEffects]),
  ],
})
export class LecturerModule {

}
