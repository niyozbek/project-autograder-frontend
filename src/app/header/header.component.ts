import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  isAdmin = false
  isLecturer = false
  isStudent = false
  private userSub: Subscription

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user
        this.isAdmin = false
        this.isLecturer = false
        this.isStudent = false
        if (this.isAuthenticated) {
          switch (user.role) {
            case 'ADMIN':
              this.isAdmin = true
              break
            case 'LECTURER':
              this.isLecturer = true
              break
            case 'STUDENT':
              this.isStudent = true
              break
          }
        }
      })
  }

  onLogout() {
    // this.authService.logout()
    this.store.dispatch(new AuthActions.Logout())
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
