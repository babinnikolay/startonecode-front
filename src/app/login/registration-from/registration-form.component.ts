import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
// import { NotificationType } from '../../share/notification/notification-type.enum';
// import { TextNotification } from '../../share/notification/notification.model';
// import { NotificationService } from '../../share/notification/notification.service';
import { LoginState } from '../login-state.enum';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private loginService: LoginService//, private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.min(5)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required,
        Validators.minLength(6)])
    })
  }

  onRegister() {
    if (!this.registrationForm.valid) {
      const name = this.registrationForm.get('name')
      // const notification = new TextNotification('Required name, email and password',
      //   'Name must be more than 4 characters long, and password must be more 6 characters long',
      //   NotificationType.ERROR);
      // this.notificationService.notification.next(notification);
      return;
    }

    this.loginService.register(this.registrationForm.value.name, this.registrationForm.value.email, this.registrationForm.value.password)
      .pipe(take(1))
      .subscribe(response => {
        this.loginService.loginState.next(LoginState.AUTHORIZATION);
      });
  }

  onCancel() {
    this.loginService.loginState.next(LoginState.AUTHORIZATION);
  }
}
