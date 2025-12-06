import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

@NgModule({
  declarations: [
    AuthComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]),
    SharedModule
  ],
  exports: [
    AuthComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule {

}
