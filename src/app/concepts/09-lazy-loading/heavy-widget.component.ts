import { Component } from '@angular/core';

/**
 * CONCEPT 9b - the "heavy" feature.
 *
 * In a real app this would be a big screen - a dashboard, a charting library, a
 * rich editor. It is only downloaded when the user follows the link to /heavy,
 * because its route uses `loadChildren` and its own route file.
 *
 * Open your browser's Network tab, click the link, and watch a new chunk arrive.
 */
@Component({
  selector: 'app-heavy-widget',
  template: `
    <h1>Heavy feature (lazily loaded)</h1>
    <div class="panel" style="border-left:4px solid var(--ok)">
      <span class="badge badge--ok">chunk downloaded just now</span>
      <p style="margin:.6rem 0 0">
        This component - and everything it imports - arrived in its own JavaScript file, only
        after you navigated here.
      </p>
      <dl class="kv" style="margin-top:.6rem">
        <dt>loaded at</dt><dd class="mono">{{ loadedAt }}</dd>
        <dt>simulated rows</dt><dd>{{ rows.length }}</dd>
      </dl>
    </div>

    <div class="panel">
      <h2>Pretend this is expensive</h2>
      <table class="grid">
        <thead><tr><th>#</th><th>Metric</th><th>Value</th></tr></thead>
        <tbody>
          @for (row of rows; track row.id) {
            <tr><td>{{ row.id }}</td><td>{{ row.metric }}</td><td class="mono">{{ row.value }}</td></tr>
          }
        </tbody>
      </table>
    </div>

    <p><a href="/lazy-loading">&larr; back to the lazy-loading explanation</a></p>
  `,
})
export class HeavyWidgetComponent {
  readonly loadedAt = new Date().toLocaleTimeString();

  readonly rows = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    metric: `metric-${i + 1}`,
    value: (Math.sin(i) * 1000).toFixed(2),
  }));
}
