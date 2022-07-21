import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LecturerComponent} from "./lecturer/lecturer.component";
import {StudentComponent} from "./student/student.component";
import {AdminComponent} from "./admin.component";
import {LecturerEditComponent} from "./lecturer/lecturer-edit/lecturer-edit.component";
import {StudentEditComponent} from "./student/student-edit/student-edit.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'lecturer', component: LecturerComponent},
      {path: 'lecturer/new', component: LecturerEditComponent},
      {path: 'student', component: StudentComponent},
      {path: 'student/new', component: StudentEditComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
