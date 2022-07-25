import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../user/user.model";
import {Store} from "@ngrx/store";
import * as UserActions from '../user/user.actions';
import {PageEvent} from "@angular/material/paginator";
import * as fromAdmin from "../admin.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-lecturer',
  templateUrl: './lecturer.component.html'
})

export class LecturerComponent implements OnInit, OnDestroy {
  lecturers: User[]
  adminStateSubscription: Subscription

  constructor(
    private store: Store<fromAdmin.State>
  ) {
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.store.select('admin')
      .pipe(
        map(adminState => adminState.users)
      ).subscribe(users => {
      this.lecturers = users.lecturers
    })

    this.store.dispatch(new UserActions.GetLecturers({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new UserActions.GetLecturers({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe()
  }

}
