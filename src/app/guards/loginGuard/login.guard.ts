import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();

  if (authService._session) {
    return true;
  } else {
    return false;
  }
};
