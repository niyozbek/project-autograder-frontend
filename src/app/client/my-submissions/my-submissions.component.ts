import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromClient from "../client.reducer";
import {MySubmission, STATUSES} from "./my-submissions.model";
import * as MySubmissionsActions from './my-submissions.actions';
import {Subscription} from "rxjs";

@Component({
  standalone: false,
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
})
export class MySubmissionsComponent implements OnInit, OnDestroy {
  clientStateSubscription: Subscription;
  submissions: MySubmission[] = [];

  constructor(
    private store: Store<fromClient.State>
  ) {
  }

  ngOnInit(): void {
    this.clientStateSubscription = this.store.select('client')
      .subscribe((clientState: any) => {
        if (clientState.mySubmissions) {
          this.submissions = clientState.mySubmissions.submissions;
        }
      });

    this.store.dispatch(new MySubmissionsActions.GetMySubmissions({
      pageIndex: 0,
      pageSize: 10
    }));
  }

  getStatusLabel(status: string): string {
    return STATUSES[status]?.label || status || 'Unknown';
  }

  getStatusStyle(status: string): string {
    return STATUSES[status]?.labelStyle || 'badge badge-secondary';
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new MySubmissionsActions.GetMySubmissions({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }));
  }

  ngOnDestroy(): void {
    this.clientStateSubscription.unsubscribe();
  }
}


