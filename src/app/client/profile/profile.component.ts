import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  username: string = '';
  role: string = '';

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth')
      .pipe(
        map(authState => authState.user)
      )
      .subscribe(user => {
        if (user) {
          this.username = user.username;
          this.role = user.role;
        }
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}


