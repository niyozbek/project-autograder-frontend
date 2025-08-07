import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";
import {Problem} from "../problem/problem.model";
import * as fromClient from "../client.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import * as ProblemActions from '../problem/problem.actions'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Runtime} from '../problem/runtime.model';
import {Submission} from "../problem-submission/problem-submission.model";

@Component({
  selector: 'app-client-problem-view',
  templateUrl: './problem-view.component.html',
})
export class ProblemViewComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problemId: number
  problem: Problem
  submissionForm: FormGroup

  // monaco-editor-settings
  editorOptions = {theme: 'vs-dark', language: 'java'};
  runtimes: Runtime[];
  runtimeIndex: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromClient.State>
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
        this.store.dispatch(new ProblemActions.GetRuntimes({problemId: this.problemId}))

        return this.store.select('client')
      }),
      map(clientState => {
        return clientState.problems
      })
    ).subscribe(problems => {
      this.problem = problems.problem
      this.runtimes = problems.runtimes
    })

    this.initForm()
  }

  private initForm() {
    this.submissionForm = new FormGroup({
      language: new FormControl('', Validators.required),
      version: new FormControl({value: '', disabled: true}, Validators.required),
      filename: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    const submission = new Submission();
    submission.code = this.submissionForm.value.code;
    submission.filename = this.submissionForm.value.filename;
    submission.language = this.runtimes[this.runtimeIndex].language;
    submission.version = this.runtimes[this.runtimeIndex].version;

    this.store.dispatch(new ProblemActions.SubmitSolution({
      problemId: this.problemId,
      newSubmission: submission
    }))
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

  valueChange(runtimeIndex: number) {
    this.runtimeIndex = runtimeIndex
    this.editorOptions.language = this.runtimes[runtimeIndex].language
    this.submissionForm.get('version').setValue(this.runtimes[runtimeIndex].version)
  }
}
