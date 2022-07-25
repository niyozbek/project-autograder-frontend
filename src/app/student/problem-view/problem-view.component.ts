import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";
import {Problem} from "../problem/problem.model";
import * as fromStudent from "../student.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import * as ProblemActions from '../problem/problem.actions'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-problem-view',
  templateUrl: './problem-view.component.html',
})
export class ProblemViewComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problemId: number
  problem: Problem
  submissionForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStudent.State>
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.problemId = id
        this.store.dispatch(new ProblemActions.GetProblemDetail({problemId: this.problemId}))

        return this.store.select('student')
      }),
      map(studentState => {
        return studentState.problems
      })
    ).subscribe(problems => {
      this.problem = problems.problem
    })
    this.initForm()
  }

  private initForm() {
    this.submissionForm = new FormGroup({
      language: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      filename: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.store.dispatch(new ProblemActions.SubmitSolution({
      problemId: this.problemId,
      newSubmission: this.submissionForm.value
    }))
    this.router.navigate(['./submission'], {queryParams: {problemId: this.problemId}, relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
