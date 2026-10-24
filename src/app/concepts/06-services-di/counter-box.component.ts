import { Component, Input, inject } from '@angular/core';
import { CounterService } from './counter.service';

/**
 * CONCEPT 6e - SHARED instance.
 *
 * This component does NOT list CounterService in its own `providers`, so it
 * walks up the injector tree and finds the app-wide singleton. Render two of
 * these and they share one counter - click either and both change.
 */
@Component({
  selector: 'app-counter-box',
  template: `
    <div class="panel panel--soft" style="margin:0">
      <strong>{{ label }}</strong>
      <p class="muted" style="margin:.2rem 0 .5rem;font-size:.85rem">shares the app-wide instance</p>
      <div class="row">
        <button class="primary" (click)="counter.increment()">+1</button>
        <span class="badge badge--info">count = {{ counter.count() }}</span>
      </div>
    </div>
  `,
})
export class CounterBoxComponent {
  @Input() label = 'Counter';
  readonly counter = inject(CounterService);
}

/**
 * CONCEPT 6f - PRIVATE instance.
 *
 * By listing CounterService in `providers`, this component creates a NEW
 * injector level for itself. Anything it asks for gets a fresh instance, and
 * anything it renders below also sees that instance instead of the root one.
 *
 * That is hierarchical DI: a component can override what "the" service means
 * for its own subtree.
 */
@Component({
  selector: 'app-isolated-counter',
  providers: [CounterService], // <-- its own instance, isolated from the root one
  template: `
    <div class="panel panel--soft" style="margin:0">
      <strong>{{ label }}</strong>
      <p class="muted" style="margin:.2rem 0 .5rem;font-size:.85rem">has its OWN instance</p>
      <div class="row">
        <button class="primary" (click)="counter.increment()">+1</button>
        <span class="badge badge--ok">count = {{ counter.count() }}</span>
      </div>
    </div>
  `,
})
export class IsolatedCounterComponent {
  @Input() label = 'Isolated';
  readonly counter = inject(CounterService);
}
