import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const inverseLoginGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const routing = new Router();
  const authService = new AuthService();
  console.log('.', authService._session);

  if (authService._session) {
    routing.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
