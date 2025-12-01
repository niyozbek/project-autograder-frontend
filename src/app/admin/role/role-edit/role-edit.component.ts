import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as RoleActions from '../role.actions';
import * as PermissionActions from '../../permission/permission.actions';
import * as fromAdmin from "../../admin.reducer";
import {Subscription} from "rxjs";
import {Role} from "../role.model";
import {Permission} from "../../permission/permission.model";
import {map, switchMap} from "rxjs/operators";
import {Location} from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-admin-role-edit',
  templateUrl: './role-edit.component.html'
})
export class RoleEditComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  role: Role
  allPermissions: Permission[] = []
  selectedPermissionIds: number[] = []

  id: number
  editMode = false
  roleForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAdmin.State>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    // Fetch all permissions for the checkbox list
    this.store.dispatch(new PermissionActions.GetPermissions({pageIndex: 0, pageSize: 100}))

    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.id = id
        this.editMode = !isNaN(id)

        if (this.editMode) {
          this.store.dispatch(new RoleActions.GetRole({roleId: this.id}))
        } else {
          this.store.dispatch(new RoleActions.ClearRole())
        }

        return this.store.select('admin')
      })
    ).subscribe(adminState => {
      this.role = adminState.roles.role
      this.allPermissions = adminState.permissions.permissions

      if (this.editMode && this.role.permissions) {
        this.selectedPermissionIds = this.role.permissions.map(p => p.id)
      }

      this.initForm()
    })
  }

  private initForm() {
    this.roleForm = new FormGroup({
      'name': new FormControl(this.role?.name || '', Validators.required)
    })
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedPermissionIds.includes(permissionId)
  }

  onPermissionChange(permissionId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked
    if (checked) {
      this.selectedPermissionIds.push(permissionId)
    } else {
      this.selectedPermissionIds = this.selectedPermissionIds.filter(id => id !== permissionId)
    }
  }

  onSubmit() {
    const permissions = this.selectedPermissionIds.map(id => ({id}))

    if (this.editMode) {
      this.store.dispatch(new RoleActions.UpdateRole({
        id: this.id,
        name: this.roleForm.value.name,
        permissions: permissions
      }))
    } else {
      this.store.dispatch(new RoleActions.CreateRole({
        name: this.roleForm.value.name,
        permissions: permissions
      }))
    }
  }

  onCancel() {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}


