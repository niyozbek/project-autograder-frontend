import {Component, OnDestroy, OnInit} from '@angular/core';
import {Permission} from './permission.model';
import {Store} from '@ngrx/store';
import * as PermissionActions from './permission.actions';
import {PageEvent} from '@angular/material/paginator';
import * as fromAdmin from '../admin.reducer';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit, OnDestroy {
  baseRoute: string;
  permissions: Permission[];
  adminStateSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromAdmin.State>
  ) {}

  ngOnInit(): void {
    this.baseRoute = this.router.url;
    this.adminStateSubscription = this.store.select('admin')
      .pipe(
        map(adminState => adminState.permissions)
      ).subscribe(permissions => {
        this.permissions = permissions.permissions;
      });

    this.store.dispatch(new PermissionActions.GetPermissions({
      pageIndex: 0,
      pageSize: 10
    }));
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new PermissionActions.GetPermissions({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }));
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }
}
