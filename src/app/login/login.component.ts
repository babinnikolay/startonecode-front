import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// import { LoginControlPanelComponent } from './login-control-panel/login-control-panel.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginState } from './login-state.enum';
import { LoginService } from './login.service';
import { RegistrationFormComponent } from './registration-from/registration-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    LoginFormComponent,
    RegistrationFormComponent,
    // LoginControlPanelComponent
  ],
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  state: LoginState = LoginState.AUTHORIZATION;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.loginState.subscribe(state => {
      this.state = state;
    })
  }

  protected readonly LoginService = LoginService;
  protected readonly LoginState = LoginState;
}
