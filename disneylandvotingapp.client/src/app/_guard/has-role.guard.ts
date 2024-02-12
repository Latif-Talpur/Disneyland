import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, of, switchMap } from 'rxjs';
import { Role, User } from '../_models';
import { TokenStorageService } from '../_services/token-storage.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const expectedRoles: Role[] = route.data['roles'];
  
  return inject(TokenStorageService )
    .getUserRole()
    .pipe(
      switchMap((userRole: Role) => {
        const hasRole = expectedRoles.some(role => userRole === role);
        if (hasRole) return of(true);
        else {
          {
            return from(router.navigate(['login']));
          }
        }
      })
    );
};
