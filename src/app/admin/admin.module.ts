import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {LecturerComponent} from "./lecturer/lecturer.component";
import {StudentComponent} from "./student/student.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {LecturerEditComponent} from "./lecturer/lecturer-edit/lecturer-edit.component";
import {StudentEditComponent} from "./student/student-edit/student-edit.component";
import {StoreModule} from "@ngrx/store";
import * as fromAdmin from './admin.reducer'
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./user/user.effects";

@NgModule({
  declarations: [
    AdminComponent,
    LecturerComponent,
    LecturerEditComponent,
    StudentComponent,
    StudentEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature([UserEffects]),
    MatPaginatorModule
  ],
})
export class AdminModule {

}
