import {Component, OnInit} from '@angular/core';
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromLecturer from "./lecturer.reducer";

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
})
export class LecturerComponent implements OnInit {

  user: {
    username: string
  }

  constructor(
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.store.select('auth')
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
}
