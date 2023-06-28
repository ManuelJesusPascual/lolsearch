import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const inverseLoginGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();

  if (authService._session) {
    return false;
  } else {
    return true;
  }
};
