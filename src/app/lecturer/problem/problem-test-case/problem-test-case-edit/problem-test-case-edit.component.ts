import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as TestCaseActions from '../../../test-case/test-case.actions';
import * as fromLecturer from "../../../lecturer.reducer";

@Component({
  selector: 'app-lecturer-problem-test-case-edit',
  templateUrl: './problem-test-case-edit.component.html'
})
export class ProblemTestCaseEditComponent implements OnInit {
  problemId: number
  testCaseForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.route.parent.params.pipe(
      map(params => {
        return +params['id']
      }),
    ).subscribe(id => {
      this.problemId = id
      this.initForm()
    })
  }

  private initForm() {
    let testCaseInput = ''
    let testCaseExpectedOutput = ''

    this.testCaseForm = new FormGroup({
      'input': new FormControl(testCaseInput, Validators.required),
      'expectedOutput': new FormControl(testCaseExpectedOutput, Validators.required)
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
}
