import {Component, OnInit} from '@angular/core';
import {User} from "../user/user.model";
import {Store} from "@ngrx/store";
import * as UserActions from '../user/user.actions';
import {PageEvent} from "@angular/material/paginator";
import * as fromAdmin from '../admin.reducer'
import {map} from "rxjs/operators";

@Component({
  selector: 'app-admin-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  students: User[]

  constructor(
    private store: Store<fromAdmin.State>
  ) { }

  ngOnInit(): void {
    this.store.select('admin')
      .pipe(
        map(adminState => adminState.users)
      ).subscribe(users => {
        this.students = users.students
    })

    this.store.dispatch(new UserActions.GetStudents({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new UserActions.GetStudents({pageIndex: $event.pageIndex, pageSize: $event.pageSize}))
  }
}
