import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * CONCEPT 8c - the PROTECTED page.
 *
 * Nothing in this component checks whether you are allowed in. That decision
 * was made before the component was ever created, by `authGuard` on the route.
 *
 * This is the point of guards: the component does not have to defend itself.
 */
@Component({
  selector: 'app-admin',
  template: `
    <h1>Admin area</h1>
    <div class="panel" style="border-left:4px solid var(--ok)">
      <span class="badge badge--ok">you got through the guard</span>
      <p style="margin:.6rem 0 0">
        Welcome, <strong>{{ auth.user() }}</strong>. This route is declared with
        <code class="inline">canActivate: [authGuard]</code>, so an anonymous visitor never
        reaches this component at all.
      </p>
      <p class="muted" style="margin:.4rem 0 0;font-size:.85rem">
        Try: log out on the Guards page, then come back here - you will be redirected.
      </p>
    </div>
  `,
})
export class AdminComponent {
  readonly auth = inject(AuthService);
}
