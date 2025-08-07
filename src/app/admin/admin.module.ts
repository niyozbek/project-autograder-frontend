import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {StoreModule} from "@ngrx/store";
import * as fromAdmin from './admin.reducer'
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./user/user.effects";
import {UserComponent} from "./user/user.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {QuillModule} from "ngx-quill";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEditComponent} from "./problem/problem-edit/problem-edit.component";
import {ProblemSubmissionComponent} from "./problem/problem-submission/problem-submission.component";
import {SubmissionComponent} from "./submission/submission.component";
import {ProblemTestCaseComponent} from "./problem/problem-test-case/problem-test-case.component";
import {
  ProblemTestCaseEditComponent
} from "./problem/problem-test-case/problem-test-case-edit/problem-test-case-edit.component";
import {ProblemEffects} from "./problem/problem.effects";
import {SubmissionEffects} from "./submission/submission.effects";
import {TestCaseEffects} from "./test-case/test-case.effects";

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    UserEditComponent,
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
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature([UserEffects, ProblemEffects, SubmissionEffects, TestCaseEffects]),
    MatPaginatorModule,
    QuillModule.forRoot(),
  ],
})
export class AdminModule {

}
