import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as UserActions from '../../user/user.actions';
import * as fromAdmin from "../../admin.reducer";

@Component({
  selector: 'app-admin-student-edit',
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {
  id: number
  editMode = false
  studentForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAdmin.State>
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let studentUsername = ''
    let studentPassword = ''


    this.studentForm = new FormGroup({
      'username': new FormControl(studentUsername, Validators.required),
      'password': new FormControl(studentPassword, Validators.required)
    })
  }

  onSubmit() {
    if (this.editMode) {
      // TODO: later implement update
    } else {
      this.store.dispatch(new UserActions.CreateStudent(this.studentForm.value))
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
