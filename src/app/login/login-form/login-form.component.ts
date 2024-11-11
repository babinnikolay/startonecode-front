import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, take } from 'rxjs';
// import { OrderControlPanelComponent } from '../../order/order-control-panel/order-control-panel.component';
// import { NotificationType } from '../../share/notification/notification-type.enum';
// import { TextNotification } from '../../share/notification/notification.model';
// import { NotificationService } from '../../share/notification/notification.service';
// import { LoggedFormComponent } from '../logged-form/logged-form.component';
// import { LoginControlPanelComponent } from '../login-control-panel/login-control-panel.component';
import { LoginState } from '../login-state.enum';
import { LoginService } from '../login.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    // OrderControlPanelComponent,
    // LoginControlPanelComponent,
    // LoggedFormComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  user!: User;
  private loginSub!: Subscription;
  private authSub!: Subscription;
  private loginStateSub!: Subscription;
  loginState!: LoginState;

  constructor(private loginService: LoginService, private router: Router //, private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.authSub = this.loginService.isAuth.subscribe(isAuth => {
      this.user = this.loginService.user;
    });
    this.loginStateSub = this.loginService.loginState.subscribe(state => {
      this.loginState = state;
    });
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'remember': new FormControl(false)
    });
  }

  onLogin() {
    if (!this.loginForm.valid) {
      // const notification = new TextNotification('Name and password required',
      //   'Enter correct name and password', NotificationType.ERROR);
      // this.notificationService.notification.next(notification);
      return
    }

    this.loginService.login(this.loginForm.value.name, this.loginForm.value.password, this.loginForm.value.remember)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.user = this.loginService.user;
          this.router.navigate(['/lessons']);
        }, error: err => {
          let message = err.message;
          if (err.status === 401)
            message = "Bad credentials."
          console.log(message);
          // const notification = new TextNotification("Error", message, NotificationType.ERROR);
          // this.notificationService.notification.next(notification);
        }
      });
  }

  onRegistration() {
    this.loginService.loginState.next(LoginState.REGISTRATION);
  }

  ngOnDestroy() {
    if (this.loginSub)
      this.loginSub.unsubscribe();

    if (this.loginStateSub)
      this.loginStateSub.unsubscribe();

    if (this.authSub)
      this.authSub.unsubscribe();
  }

  protected readonly LoginState = LoginState;
}
