import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'client', canActivate: [AuthGuard], loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: 'not-found' },

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
