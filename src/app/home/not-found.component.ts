import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Rendered for any URL that does not match a route (the '**' wildcard). */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="panel">
      <h1>404 - no such page</h1>
      <p class="lead">That URL did not match any route in <code class="inline">app.routes.ts</code>.</p>
      <p>
        The wildcard route <code class="inline">path: '**'</code> catches everything that falls through,
        which is how you show a friendly "not found" page instead of a blank screen.
      </p>
      <a routerLink="/">&larr; Back to the overview</a>
    </div>
  `,
})
export class NotFoundComponent {}
