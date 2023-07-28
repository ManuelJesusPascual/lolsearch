import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const loginGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const routing = new Router();
  const authService = new AuthService();

  console.log('AAAAA', authService._session);
  if (authService._session) {
    return true;
  } else {
    routing.navigate(['/login']);
    return false;
  }
};
