import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * CONCEPT 8a - a functional route guard.
 *
 * A guard is a function the router calls BEFORE it activates a route. It can:
 *   - return `true`            -> navigation proceeds
 *   - return `false`           -> navigation is cancelled (user stays put)
 *   - return a UrlTree         -> navigation is redirected (the usual choice)
 *   - return an Observable/Promise of any of those (for async checks)
 *
 * This one is CanActivate: "may this user open this route at all?"
 * Guards run in the injection context, so `inject()` works inside them.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Not logged in: send them to the guards page, remembering where they were
  // headed so we can send them back after a successful login.
  return router.createUrlTree(['/guards'], {
    queryParams: { redirectTo: state.url },
  });
};

/*
  The other guards you will meet (all have a functional form like this one):

    CanActivateChild  - guard every child of a route
    CanDeactivate     - "you have unsaved changes, really leave?"  (needs the
                        component to answer a canDeactivate() method)
    CanMatch          - decide whether a route is even a candidate (used to
                        serve different routes to different user types)
    Resolve           - fetch data BEFORE the component activates, so the
                        component never renders an empty state
*/
