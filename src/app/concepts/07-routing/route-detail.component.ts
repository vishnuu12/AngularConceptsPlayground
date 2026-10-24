import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * CONCEPT 7b - reading parameters.
 *
 * The route is `detail/:id`, so `/routing/detail/2` puts "2" in the `id`
 * parameter. There are two ways to read it:
 *
 *   snapshot : route.snapshot.paramMap.get('id')   - read once, simple
 *   observable: route.paramMap.subscribe(...)      - reacts when it CHANGES
 *
 * The snapshot is fine here. If the same component can be reused with a
 * different id without being destroyed (e.g. /user/1 -> /user/2), you need the
 * observable form, because the snapshot would be stale.
 *
 * (Angular 19 alternative: enable `withComponentInputBinding()` - which this app
 *  does - and just declare `@Input() id!: string`. The router fills it in.)
 */
@Component({
  selector: 'app-route-detail',
  template: `
    <h3 style="margin-top:0">Detail (child route)</h3>
    <dl class="kv">
      <dt>route param :id</dt><dd class="mono">{{ id }}</dd>
      <dt>query param ?from</dt><dd class="mono">{{ from }}</dd>
      <dt>full URL</dt><dd class="mono">{{ fullUrl }}</dd>
    </dl>
    <p class="muted" style="font-size:.85rem">
      Change the id in the URL bar and press enter - the router re-renders this component.
    </p>
  `,
})
export class RouteDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly id = this.route.snapshot.paramMap.get('id') ?? '(none)';
  readonly from = this.route.snapshot.queryParamMap.get('from') ?? '(none)';
  readonly fullUrl = this.route.snapshot.url.map((segment) => segment.path).join('/');
}
