import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LecturerComponent} from "./lecturer/lecturer.component";
import {StudentComponent} from "./student/student.component";
import {AdminComponent} from "./admin.component";
import {LecturerEditComponent} from "./lecturer/lecturer-edit/lecturer-edit.component";
import {StudentEditComponent} from "./student/student-edit/student-edit.component";
import {UserComponent} from "./user/user.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'lecturer', component: LecturerComponent},
      {path: 'lecturer/new', component: LecturerEditComponent},
      {path: 'student', component: StudentComponent},
      {path: 'student/new', component: StudentEditComponent},
      {path: 'users', component: UserComponent},
      {path: 'users/new', component: UserEditComponent},
      {path: 'users/:id', component: UserEditComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
