import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

export const AuthActivateRouteGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const loginService: LoginService = inject(LoginService);

  let token = loginService.getToken();

  const Authorize = token != null;

  if (!Authorize)
    router.navigate(['login']);

  return Authorize;
}
