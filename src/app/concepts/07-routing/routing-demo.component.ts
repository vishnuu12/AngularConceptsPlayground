import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * CONCEPT 7a - ROUTING, the shell.
 *
 * The router maps a URL to a component. That is what turns a pile of pages into
 * a single-page app: the URL changes, the browser does not reload, and Angular
 * swaps the view.
 *
 * This component owns the child <router-outlet>, so /routing renders this shell
 * and then one of the child routes inside it.
 */
@Component({
  selector: 'app-routing-demo',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>7. Routing</h1>
    <p class="lead">
      URLs map to views. This page is itself a routed component that contains a second,
      nested <code class="inline">&lt;router-outlet&gt;</code> for its children.
    </p>

    <div class="panel">
      <h2>Child routes</h2>
      <p class="muted">
        These links do not reload the page - watch the URL bar. The active one gets
        <code class="inline">is-active</code> from <code class="inline">routerLinkActive</code>.
      </p>
      <div class="row">
        <a class="pill" routerLink="/routing" routerLinkActive="badge--accent" [routerLinkActiveOptions]="{ exact: true }">
          Overview
        </a>
        <a class="pill" routerLink="/routing/detail/1" routerLinkActive="badge--accent">Detail #1</a>
        <a class="pill" routerLink="/routing/detail/2" [queryParams]="{ from: 'link' }" routerLinkActive="badge--accent">
          Detail #2 (with ?from=link)
        </a>
      </div>

      <div class="row" style="margin-top:.8rem">
        <button class="primary" (click)="goToRandom()">Navigate in code</button>
        <button (click)="goWithQuery()">Navigate with query params</button>
        <button (click)="goBack()">Back</button>
      </div>
    </div>

    <!-- The child route renders here. -->
    <div class="panel panel--soft">
      <router-outlet />
    </div>

    <div class="panel">
      <h2>Ways to navigate</h2>
      <table class="grid">
        <thead><tr><th>Technique</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Template link</td><td class="mono">routerLink="/routing/detail/1"</td></tr>
          <tr><td>Template with params</td><td class="mono">[routerLink]="['/routing/detail', id]"</td></tr>
          <tr><td>Query params</td><td class="mono">[queryParams]="&#123; from: 'link' &#125;"</td></tr>
          <tr><td>In code</td><td class="mono">router.navigate(['/routing/detail', 3])</td></tr>
          <tr><td>Read a param</td><td class="mono">route.snapshot.paramMap.get('id')</td></tr>
          <tr><td>Read a query param</td><td class="mono">route.snapshot.queryParamMap.get('from')</td></tr>
        </tbody>
      </table>
      <div class="note">
        <strong>Why it matters:</strong> because the URL is the source of truth, every screen is
        linkable, bookmarkable, shareable and reachable with the back button - for free.
      </div>
    </div>
  `,
})
export class RoutingDemoComponent {
  private readonly router = inject(Router);

  goToRandom(): void {
    const id = Math.floor(Math.random() * 3) + 1;
    void this.router.navigate(['/routing', 'detail', id]);
  }

  goWithQuery(): void {
    void this.router.navigate(['/routing', 'detail', 2], {
      queryParams: { from: 'code', ts: Date.now() },
    });
  }

  goBack(): void {
    // Uses the browser history, exactly like the back button.
    history.back();
  }
}
