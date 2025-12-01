import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAdmin from "../../admin.reducer";
import * as RoleActions from '../role.actions';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Role} from "../role.model";
import {Subscription} from "rxjs";
import {Location} from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-admin-role-view',
  templateUrl: './role-view.component.html',
})
export class RoleViewComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  id: number
  role: Role

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAdmin.State>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.id = id
        this.store.dispatch(new RoleActions.GetRole({roleId: this.id}))
        return this.store.select('admin')
      }),
      map(adminState => {
        return adminState.roles
      })
    ).subscribe(rolesState => {
      this.role = rolesState.role
    })
  }

  onBack(): void {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}


