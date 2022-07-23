import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {StudentRoutingModule} from "./student-routing.module";
import {StudentComponent} from "./student.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EffectsModule} from "@ngrx/effects";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEffects} from "./problem/problem.effects";
import {StoreModule} from "@ngrx/store";
import * as fromStudent from "./student.reducer";
import {ProblemViewComponent} from "./problem-view/problem-view.component";
import {ProblemSubmissionComponent} from "./problem-submission/problem-submission.component";
import {ProblemSubmissionEffects} from "./problem-submission/problem-submission.effects";
import {ProblemTestComponent} from "./problem-test/problem-test.component";

@NgModule({
  declarations: [
    StudentComponent,
    ProblemComponent,
    ProblemViewComponent,
    ProblemSubmissionComponent,
    ProblemTestComponent
  ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        StudentRoutingModule,
        SharedModule,
        MatPaginatorModule,
        StoreModule.forFeature('student', fromStudent.reducers),
        EffectsModule.forFeature([ProblemEffects, ProblemSubmissionEffects]),
    ],
})
export class StudentModule {

}
