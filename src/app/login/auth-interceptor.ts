import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from 'typescript-cookie';
import { LoginService } from './login.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loginService: LoginService = inject(LoginService);

  let httpHeaders = new HttpHeaders();

  let basic = req.headers.get('Authorization');
  if (basic) {
    httpHeaders = httpHeaders.append('Authorization', basic);
  } else {
    const token = loginService.getToken();
    if (token) {
      httpHeaders = httpHeaders.append(loginService.AUTHORIZATION_KEY, token);
    }
  }

  if (req.method != "GET") {
    const xsrf = getCookie(loginService.XSRF_TOKEN);

    if (xsrf) {
      httpHeaders = httpHeaders.append(loginService.X_XSRF_TOKEN, xsrf);
    }
  }

  httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
  const xhr = req.clone({
    headers: httpHeaders
  });
  return next(xhr);
}
