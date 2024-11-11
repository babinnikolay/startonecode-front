import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, Subject, take, tap, throwError } from 'rxjs';
import { removeCookie } from 'typescript-cookie';
import { environment } from '../../environments/environments';
// import { NotificationType } from '../share/notification/notification-type.enum';
// import { TextNotification } from '../share/notification/notification.model';
// import { NotificationService } from '../share/notification/notification.service';
import { LoginState } from './login-state.enum';
import { User } from './user.model';

interface TokenResponse {
  exp: number,
  iat: number,
  iss: string,
  sub: string,
  username: string,
  uuid: string,
  email: string
}

interface NewUserCredentialDto {
  email: string,
  currentPassword: string,
  newPassword: string
}

@Injectable({providedIn: 'root'})
export class LoginService {
  public USER_KEY = "user";
  public AUTHORIZATION_KEY = "Authorization";
  public XSRF_TOKEN = "XSRF-TOKEN";
  public X_XSRF_TOKEN = 'X-XSRF-TOKEN';
  public empty: User = new User("", "", "", "", new Date());
  private _user!: User;
  isAuth: Subject<boolean> = new BehaviorSubject(false);
  loginState: Subject<LoginState> = new BehaviorSubject<LoginState>(LoginState.AUTHORIZATION);

  constructor(private http: HttpClient //, private notificationService: NotificationService
  ) {
    let item = localStorage.getItem(this.USER_KEY);
    if (item != null) {
      const jsonUser = JSON.parse(item);
      const user = new User(jsonUser.uuid, jsonUser.name, jsonUser.email, jsonUser._token, jsonUser._tokenExpirationDate);

      if (user && user.token) {
        this.setLogin(user.token, user.name);
        this.loginState.next(LoginState.LOGGED);
      }
    }
  }

  login(name: string, password: string, remember: boolean) {
    return this.http.post<any>(environment.API_URL + environment.LOGIN_ENDPOINT, undefined, {
      observe: 'response',
      headers: {
        'Authorization': 'Basic ' + window.btoa(name + ':' + password)
      },
      params: {
        remember
      },
      withCredentials: true
    })
      .pipe(
        tap(response => {
          console.log(response)
          const token = response.headers.get(this.AUTHORIZATION_KEY);
          let uuid;
          if (token != null) {
            const name = response.body!.name;
            this.setLogin(token, name);
            this.loginState.next(LoginState.LOGGED);
          }
        }),
        catchError(err => throwError(() => err)));
  }

  register(name: string, email: string, password: string) {
    return this.http.post<User>(environment.API_URL + environment.REGISTER_ENDPOINT, {name, email, password})
  }

  getToken(): string | null {
    if (!this._user)
      return null;

    let token = this._user.token;

    if (!token) {
      this.isAuth.next(false);
      this.loginState.next(LoginState.AUTHORIZATION);
      // this.notificationService.notification.next(
      //   new TextNotification("Token expired", "Please login", NotificationType.INFO))
    }

    return token;
  }

  get user(): User {
    if (!this._user) {
      const userFromStorage = JSON.parse(localStorage.getItem(this.USER_KEY)!);
      if (userFromStorage)
        this._user = userFromStorage;
    }
    return this._user;
  }

  logout() {
    this.http.post(environment.API_URL + environment.LOGOUT_ENDPOINT, {}).pipe(take(1)).subscribe(res => {
      this.loginState.next(LoginState.AUTHORIZATION);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTHORIZATION_KEY);
      removeCookie(this.XSRF_TOKEN);
      this._user = this.empty;
      this.isAuth.next(false);
    });
  }

  changeEmail(email: string) {
    return this.http.put<NewUserCredentialDto>(environment.API_URL + environment.CHANGE_EMAIL_ENDPOINT,
      {email: email}, {withCredentials: true});
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.put<NewUserCredentialDto>(environment.API_URL + environment.CHANGE_PASSWORD_ENDPOINT, {
      currentPassword,
      newPassword
    }, {withCredentials: true})
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  private setLogin(token: string | null, name: string) {
    if (token != null) {
      const decoded = jwtDecode<TokenResponse>(token, {});
      const uuid = decoded.uuid;
      const email = decoded.email;

      let exp = 0;
      if (decoded.exp)
        exp = decoded.exp;

      const expDate = new Date(+exp * 1000);

      const user = new User(uuid, name, email, token, expDate);
      localStorage.setItem(this.AUTHORIZATION_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this._user = user;
      this.isAuth.next(true);
    }
  }
}
