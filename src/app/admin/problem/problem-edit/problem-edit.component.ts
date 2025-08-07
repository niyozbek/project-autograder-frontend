import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as ProblemActions from '../problem.actions';
import {Problem} from "../problem.model";
import * as fromAdmin from "../../admin.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-problem-edit',
  templateUrl: './problem-edit.component.html',
})
export class ProblemEditComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problem: Problem

  id: number
  editMode = false
  problemForm: FormGroup
  quillConfiguration: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAdmin.State>
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
          this.store.dispatch(new ProblemActions.GetProblemDetail({id: this.id}))
        } else {
          this.store.dispatch(new ProblemActions.ClearProblemDetail())
        }

        return this.store.select('admin')
      }),
      map(problemsState => {
        return problemsState.problems
      })
    ).subscribe(problem => {
      this.problem = problem.problem
      this.initForm()
    })

    this.quillConfiguration = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        [{color: []}, {background: []}],
        ['link'],
        ['clean'],
      ],
    };
  }

  private initForm() {
    let problemTitle = this.problem.title
    let problemStatus = this.problem.status
    let problemDescription = this.problem.description

    this.problemForm = new FormGroup({
      'title': new FormControl(problemTitle, Validators.required),
      'status': new FormControl(problemStatus),
      'description': new FormControl(problemDescription, Validators.required)
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new ProblemActions.UpdateProblem({id: this.id, newProblem: this.problemForm.value}))
    } else {
      this.store.dispatch(new ProblemActions.CreateProblem(this.problemForm.value))
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
