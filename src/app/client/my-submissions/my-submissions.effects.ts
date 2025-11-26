import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import * as MySubmissionsActions from './my-submissions.actions';
import {MySubmission} from "./my-submissions.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class MySubmissionsEffects {
  apiUrl = environment.apiUrl + '/api/submissions';

  @Effect()
  getMySubmissions = this.actions$.pipe(
    ofType(MySubmissionsActions.GET_MY_SUBMISSIONS),
    switchMap((params: MySubmissionsActions.GetMySubmissions) => {
      return this.http.get<MySubmission[]>(
        this.apiUrl + '/own',
        {
          params: {
            pageNo: params.payload.pageIndex,
            pageSize: params.payload.pageSize
          }
        }
      );
    }),
    map(submissions => {
      return new MySubmissionsActions.LoadMySubmissions(submissions);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}

