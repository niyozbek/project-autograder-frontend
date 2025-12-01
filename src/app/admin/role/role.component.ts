import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "./role.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAdmin from "../admin.reducer";
import {map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import * as RoleActions from './role.actions';

@Component({
  standalone: false,
  selector: 'app-admin-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit, OnDestroy {
  baseRoute: string;
  roles: Role[]
  adminStateSubscription: Subscription

  constructor(
    private router: Router,
    private store: Store<fromAdmin.State>
  ) { }

  ngOnInit(): void {
    this.baseRoute = this.router.url;
    this.adminStateSubscription = this.store.select('admin')
      .pipe(
        map(adminState => adminState.roles)
      )
      .subscribe(roles => {
        this.roles = roles.roles
      })

    this.store.dispatch(new RoleActions.GetRoles({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new RoleActions.GetRoles({pageIndex: $event.pageIndex, pageSize: $event.pageSize}))
  }

  onDelete(roleId: number) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.store.dispatch(new RoleActions.DeleteRole({id: roleId}))
    }
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe()
  }
}
