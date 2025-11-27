import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common'
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'
import {map} from "rxjs/operators";

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {

  }

  ngOnInit() {
    // localstorage works only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.store.select('auth')
        .pipe(
          // take(1),
          map(authState => {
            return authState.user
          }))
        .subscribe(user => {
            const isAuth = !!user
            if (!isAuth) {
              this.store.dispatch(new AuthActions.AutoLogin())
            }
          }
        )
    }
  }
}
