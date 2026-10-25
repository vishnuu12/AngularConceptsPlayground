import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * CONCEPT 8 - GUARDS.
 *
 * What: a guard is a function the router runs before navigating.
 * Why:  without it, every component has to check "am I allowed?" itself, and
 *       one forgotten check is a security hole. A guard puts that decision in
 *       ONE place, next to the route.
 */
@Component({
  selector: 'app-guards-demo',
  imports: [RouterLink],
  template: `
    <h1>8. Guards</h1>
    <p class="lead">
      A guard decides whether navigation may happen. Below, <code class="inline">authGuard</code>
      protects the <code class="inline">/admin</code> route.
    </p>

    <div class="panel">
      <h2>Current state</h2>
      <dl class="kv">
        <dt>logged in?</dt>
        <dd>
          <span class="badge" [class.badge--ok]="auth.isLoggedIn()" [class.badge--warn]="!auth.isLoggedIn()">
            {{ auth.isLoggedIn() ? 'yes - ' + auth.user() : 'no' }}
          </span>
        </dd>
      </dl>

      @if (!auth.isLoggedIn()) {
        <div class="row" style="margin-top:.6rem">
          <input
            type="text"
            style="max-width:220px"
            placeholder="your name"
            [value]="name()"
            (input)="onName($event)"
          />
          <button class="primary" (click)="login()">Log in</button>
        </div>
      } @else {
        <button style="margin-top:.6rem" (click)="auth.logout()">Log out</button>
      }

      @if (redirectTo()) {
        <div class="note note--warn" style="margin-top:.8rem">
          You were heading to <code class="inline">{{ redirectTo() }}</code> but the guard stopped
          you. Log in, then follow the link again.
        </div>
      }
    </div>

    <div class="panel">
      <h2>Try it</h2>
      <p class="muted">
        Follow the link while logged OUT, then while logged IN. Same URL, different outcome.
      </p>
      <a class="pill" routerLink="/admin">Go to the protected /admin route &rarr;</a>
    </div>

    <div class="panel">
      <h2>The guard itself</h2>
      <pre class="code">export const authGuard: CanActivateFn = (_route, state) => &#123;
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;              // allow

  return router.createUrlTree(['/guards'], &#123;      // redirect instead
    queryParams: &#123; redirectTo: state.url &#125;
  &#125;);
&#125;;</pre>
      <p style="margin-top:.6rem" class="muted">
        Returning a <code class="inline">UrlTree</code> is the idiomatic "no" - it redirects
        instead of leaving the user staring at an unchanged page.
      </p>
    </div>

    <div class="panel">
      <h2>Guard types</h2>
      <table class="grid">
        <thead><tr><th>Guard</th><th>Question it answers</th></tr></thead>
        <tbody>
          <tr><td class="mono">CanActivate</td><td>May this route be opened at all? (auth)</td></tr>
          <tr><td class="mono">CanActivateChild</td><td>Same, for every child route</td></tr>
          <tr><td class="mono">CanDeactivate</td><td>May the user LEAVE? ("unsaved changes!")</td></tr>
          <tr><td class="mono">CanMatch</td><td>Should this route even be considered? (A/B by role)</td></tr>
          <tr><td class="mono">Resolve</td><td>Fetch data before the component appears</td></tr>
        </tbody>
      </table>
      <div class="note">
        <strong>Important:</strong> guards are a UX feature, not a security boundary. Anyone can
        call your API directly, so the server must enforce access too. Guards just stop users from
        landing on screens they cannot use.
      </div>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>A guard is a function that runs before navigation and returns true to allow, false to cancel, or a UrlTree to redirect.</li>
        <li>Types: CanActivate, CanActivateChild, CanDeactivate (the unsaved-changes one people forget), CanMatch and Resolve.</li>
        <li>Returning router.createUrlTree(...) is the idiomatic no - it redirects instead of leaving the user on an unchanged page.</li>
        <li>Guards are a UX feature, not a security boundary. Anyone can call your API directly, so the server must enforce access. That is usually the point of the question.</li>
        <li>They run in the injection context, so inject() works inside them - no constructor needed.</li>
      </ul>
    </div>
  `,
})
export class GuardsDemoComponent {
  readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly name = signal('Vishnu');
  /** Set by authGuard when it bounces you back here. */
  readonly redirectTo = signal(this.route.snapshot.queryParamMap.get('redirectTo') ?? '');

  onName(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  login(): void {
    this.auth.login(this.name().trim() || 'guest');
  }
}
