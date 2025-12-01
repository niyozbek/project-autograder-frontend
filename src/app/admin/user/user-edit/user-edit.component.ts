import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as UserActions from '../../user/user.actions';
import * as RoleActions from '../../role/role.actions';
import * as fromAdmin from "../../admin.reducer";
import {Subscription} from "rxjs";
import {User} from "../user.model";
import {Role} from "../../role/role.model";
import {map, switchMap} from "rxjs/operators";
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-admin-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  user: User
  allRoles: Role[] = []
  selectedRoleIds: number[] = []

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
    // Fetch all roles for the checkbox list
    this.store.dispatch(new RoleActions.GetRoles({pageIndex: 0, pageSize: 100}))

    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.id = id
        this.editMode = !isNaN(id)

        if (this.editMode) {
          this.store.dispatch(new UserActions.GetUser({id: this.id}))
        } else {
          this.store.dispatch(new UserActions.ClearUser())
        }

        return this.store.select('admin')
      })
    ).subscribe(adminState => {
      this.user = adminState.users.user
      this.allRoles = adminState.roles.roles

      if (this.editMode && this.user.roles) {
        this.selectedRoleIds = this.user.roles.map(r => r.id)
      }

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

  isRoleSelected(roleId: number): boolean {
    return this.selectedRoleIds.includes(roleId)
  }

  onRoleChange(roleId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked
    if (checked) {
      this.selectedRoleIds.push(roleId)
    } else {
      this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== roleId)
    }
  }

  onAssignRoles() {
    const roles = this.selectedRoleIds.map(id => ({id}))
    this.store.dispatch(new UserActions.AssignRoles({
      id: this.id,
      roles: roles
    }))
  }

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }
}
