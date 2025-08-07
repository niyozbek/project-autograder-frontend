import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as TestCaseActions from '../../../test-case/test-case.actions';
import * as fromAdmin from "../../../admin.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-problem-test-case-edit',
  templateUrl: './problem-test-case-edit.component.html'
})
export class ProblemTestCaseEditComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problemId: number
  testCaseForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAdmin.State>
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.parent.params.pipe(
      map(params => {
        return +params['id']
      }),
    ).subscribe(id => {
      this.problemId = id
      this.initForm()
    })
  }

  private initForm() {
    this.testCaseForm = new FormGroup({
      'input': new FormControl('', Validators.required),
      'expectedOutput': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.store.dispatch(new TestCaseActions.AddTestCase({
      problemId: this.problemId,
      newTestCase: this.testCaseForm.value
    }))
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
