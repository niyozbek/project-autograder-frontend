import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import {AuthEffects} from './auth/store/auth.effects';
import {environment} from 'src/environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ErrorPageComponent} from "./error-page/error-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
