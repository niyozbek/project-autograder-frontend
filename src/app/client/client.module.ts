import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ClientRoutingModule} from "./client-routing.module";
import {ClientComponent} from "./client.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EffectsModule} from "@ngrx/effects";
import {ProblemComponent} from "./problem/problem.component";
import {ProblemEffects} from "./problem/problem.effects";
import {StoreModule} from "@ngrx/store";
import * as fromClient from "./client.reducer";
import {ProblemViewComponent} from "./problem-view/problem-view.component";
import {ProblemSubmissionComponent} from "./problem-submission/problem-submission.component";
import {ProblemSubmissionEffects} from "./problem-submission/problem-submission.effects";
import {ProblemTestComponent} from "./problem-test/problem-test.component";
import {MySubmissionsComponent} from "./my-submissions/my-submissions.component";
import {MySubmissionsEffects} from "./my-submissions/my-submissions.effects";
import {ProfileComponent} from "./profile/profile.component";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {MatProgressBarModule} from "@angular/material/progress-bar";

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets/monaco/min/vs',
  requireConfig: { preferScriptTags: true }
};

@NgModule({
  declarations: [
    ClientComponent,
    ProblemComponent,
    ProblemViewComponent,
    ProblemSubmissionComponent,
    ProblemTestComponent,
    MySubmissionsComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ClientRoutingModule,
        SharedModule,
        MatPaginatorModule,
        StoreModule.forFeature('client', fromClient.reducers),
        EffectsModule.forFeature([ProblemEffects, ProblemSubmissionEffects, MySubmissionsEffects]),
        MonacoEditorModule.forRoot(monacoConfig),
        MatProgressBarModule
    ],
})
export class ClientModule {

}
