import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * CONCEPT 9 - LAZY LOADING.
 *
 * What: instead of shipping one giant bundle, the router downloads feature code
 *       only when a user navigates to it.
 * Why:  the initial download is what users wait for. Cutting it makes the app
 *       start faster, especially on a slow connection.
 *
 * This very app is the demo: every page in the sidebar is a lazy route.
 */
@Component({
  selector: 'app-lazy-demo',
  imports: [RouterLink],
  template: `
    <h1>9. Lazy Loading</h1>
    <p class="lead">
      Only the shell is in the initial bundle. Every concept you open is fetched on demand -
      open the Network tab and watch it happen.
    </p>

    <div class="panel">
      <h2>Try it</h2>
      <p class="muted">The link below loads a chunk that has not been downloaded yet.</p>
      <a class="pill" routerLink="/heavy">Open the lazy /heavy feature &rarr;</a>
      <p class="muted" style="margin-top:.6rem;font-size:.85rem">
        In dev mode chunks are separate files; in a production build you will see them named
        with a content hash, e.g. <code class="inline">chunk-XXXX.js</code>.
      </p>
    </div>

    <div class="panel">
      <h2>The three ways to lazy-load</h2>
      <table class="grid">
        <thead><tr><th>Technique</th><th>Use it for</th></tr></thead>
        <tbody>
          <tr>
            <td class="mono">loadComponent</td>
            <td>One standalone component - the simplest case, used by most routes here.</td>
          </tr>
          <tr>
            <td class="mono">loadChildren (routes)</td>
            <td>A feature's whole route table - see <code class="inline">heavy-feature.routes.ts</code>.</td>
          </tr>
          <tr>
            <td class="mono">loadChildren (NgModule)</td>
            <td>A legacy NgModule - see the Modules page, which is itself lazily loaded.</td>
          </tr>
        </tbody>
      </table>

      <pre class="code">&#123;
  path: 'heavy',
  loadChildren: () =&gt; import('./heavy-feature.routes').then(m =&gt; m.HEAVY_FEATURE_ROUTES)
&#125;</pre>
    </div>

    <div class="panel">
      <h2>What to watch out for</h2>
      <ul class="tight">
        <li><strong>Do not lazy-load everything.</strong> Each chunk is an extra round trip. Lazy-load features, not single buttons.</li>
        <li><strong>Preload what is likely next.</strong> <code class="inline">withPreloading(PreloadAllModules)</code> downloads lazy chunks in the background after startup.</li>
        <li><strong>Budgets keep you honest.</strong> <code class="inline">angular.json</code> fails the build if the initial bundle grows past a limit.</li>
      </ul>
      <div class="note">
        <strong>Why it matters:</strong> the fastest code is the code you never send. Lazy loading
        is the cheapest performance win available in a growing app.
      </div>
    </div>
  `,
})
export class LazyDemoComponent {}
