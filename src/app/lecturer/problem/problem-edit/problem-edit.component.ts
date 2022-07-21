import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as ProblemActions from '../problem.actions';
import {Problem} from "../problem.model";
import * as fromLecturer from "../../lecturer.reducer";

@Component({
  selector: 'app-lecturer-problem-detail',
  templateUrl: './problem-edit.component.html'
})
export class ProblemEditComponent implements OnInit {
  problem: Problem

  id: number
  editMode = false
  problemForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    // set this.problem by id from state.problems
    this.route.params.pipe(
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

        return this.store.select('lecturer')
      }),
      map(problemsState => {
        return problemsState.problems
      })
    ).subscribe(problem => {
      this.problem = problem.problem
      this.initForm()
    })
  }

  private initForm() {
    let problemTitle = this.problem.title
    let problemStatus = this.problem.status
    let problemDescription = this.problem.description

    this.problemForm = new FormGroup({
      'title': new FormControl(problemTitle, Validators.required),
      'status': new FormControl(problemStatus, Validators.required),
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
}
