import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
    standalone: false,
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    token: string = null;
    isLoading = false;
    isSubmitting = false;
    error: string = null;
    successMessage: string = null;
    private storeSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromApp.AppState>,
        private router: Router
    ) { }

    ngOnInit() {
        this.token = this.route.snapshot.queryParams['token'];
        if (!this.token) {
            this.error = 'Invalid or missing reset token.';
        }

        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            this.successMessage = authState.successMessage;
            if (!this.isLoading) {
                this.isSubmitting = false;
            }
        });
    }

    onSubmit(form: NgForm) {
        if (!form.valid || !this.token || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;
        const newPassword = form.value.password;
        this.store.dispatch(new AuthActions.ResetPasswordStart({
            token: this.token,
            newPassword: newPassword
        }));
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
        this.store.dispatch(new AuthActions.ClearError());
    }
}
