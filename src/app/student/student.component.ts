import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromStudent from "./student.reducer";
import {map, take} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit, OnDestroy {
  authStateSubscription: Subscription
  user: {
    username: string
  }

  constructor(
    private store: Store<fromStudent.State>
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
