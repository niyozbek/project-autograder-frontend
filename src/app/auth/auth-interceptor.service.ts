import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, take } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.token)
        });

        return next.handle(modifiedReq).pipe(
          catchError(error => {
            // Handle token expiration
            if (error.status === 401 && error.error?.reason === 'TOKEN_EXPIRED') {
              this.store.dispatch(new AuthActions.Logout());
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
