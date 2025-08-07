import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromClient from "./client.reducer";
import {map, take} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit, OnDestroy {
  authStateSubscription: Subscription
  user: {
    username: string
  }

  constructor(
    private store: Store<fromClient.State>
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
