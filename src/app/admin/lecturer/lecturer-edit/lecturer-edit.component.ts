import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from "../../../store/app.reducer";
import * as UserActions from '../../user/user.actions';

@Component({
  selector: 'app-admin-lecturer-edit',
  templateUrl: './lecturer-edit.component.html'
})
export class LecturerEditComponent implements OnInit {
  id: number
  editMode = false
  lecturerForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let lecturerUsername = ''
    let lecturerPassword = ''

    this.lecturerForm = new FormGroup({
      'username': new FormControl(lecturerUsername, Validators.required),
      'password': new FormControl(lecturerPassword, Validators.required)
    })
  }

  onSubmit() {
    if (this.editMode) {
      // TODO: later implement update
    } else {
      this.store.dispatch(new UserActions.CreateLecturer(this.lecturerForm.value))
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
