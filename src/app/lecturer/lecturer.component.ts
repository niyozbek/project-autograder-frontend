import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromLecturer from "./lecturer.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
})
export class LecturerComponent implements OnInit, OnDestroy {
  authStateSubscription: Subscription

  user: {
    username: string
  }

  constructor(
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.authStateSubscription = this.store.select('auth')
      .pipe(
        take(1),
        map(authState => authState.user)
      )
      .subscribe(user => {
        this.user = {
          username: user.username
        }
      })
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe()
  }
}
