import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as UserActions from '../../user/user.actions';
import * as fromAdmin from "../../admin.reducer";
import {Subscription} from "rxjs";
import {User} from "../user.model";
import {map, switchMap} from "rxjs/operators";
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  routeSubscription: Subscription
  user: User

  id: number
  editMode = false
  userForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAdmin.State>,
    private location: Location
) {
  }

  ngOnInit(): void {
    // set this.problem by id from state.problems
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.id = id
        // get problem in case id is not a number but "new"
        this.editMode = !isNaN(id)

        if (this.editMode) {
          this.store.dispatch(new UserActions.GetUser({id: this.id}))
        } else {
          this.store.dispatch(new UserActions.ClearUser())
        }

        return this.store.select('admin')
      }),
      map(usersState => {
        return usersState.users
      })
    ).subscribe(user => {
      this.user = user.user
      this.initForm()
    })
  }

  private initForm() {
    let userUsername = this.user.username
    let userFullname = this.user.fullname

    this.userForm = new FormGroup({
      'username': new FormControl(userUsername, Validators.required),
      'fullname': new FormControl(userFullname, Validators.required),
      'password': new FormControl('', this.editMode ? null : Validators.required),
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.userForm.value.id = this.id
      this.store.dispatch(new UserActions.UpdateUser({id: this.id,
        user: this.userForm.value
      }))
    } else {
      this.store.dispatch(new UserActions.CreateUser(this.userForm.value))
    }
    this.onCancel()
  }

  onCancel() {
    this.location.back();
  }
}
