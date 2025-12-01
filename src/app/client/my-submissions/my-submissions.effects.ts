import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import * as MySubmissionsActions from './my-submissions.actions';
import {MySubmission} from "./my-submissions.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class MySubmissionsEffects {
  apiUrl = environment.apiUrl + '/api/submissions';

  getMySubmissions = createEffect(() => this.actions$.pipe(
    ofType(MySubmissionsActions.GET_MY_SUBMISSIONS),
    switchMap((params: MySubmissionsActions.GetMySubmissions) => {
      return this.http.get<any>(
        this.apiUrl + '/own',
        {
          params: {
            pageNo: params.payload.pageIndex,
            pageSize: params.payload.pageSize
          }
        }
      );
    }),
    map((page: { content: MySubmission[] }) => {
      return new MySubmissionsActions.LoadMySubmissions(page.content);
    })
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
