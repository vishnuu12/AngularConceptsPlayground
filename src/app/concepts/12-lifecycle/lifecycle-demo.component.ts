import { Component, signal } from '@angular/core';
import { LifecycleChildComponent } from './lifecycle-child.component';

/**
 * CONCEPT 12 - LIFECYCLE HOOKS.
 *
 * What: methods Angular calls at defined moments in a component's life.
 * Why:  "load data when the component appears", "stop the timer when it goes
 *       away" - without hooks you would have no reliable place to put either.
 *
 * This page logs every hook as it fires. Press the buttons and watch the order.
 */
@Component({
  selector: 'app-lifecycle-demo',
  imports: [LifecycleChildComponent],
  template: `
    <h1>12. Lifecycle Hooks</h1>
    <p class="lead">
      Angular calls these methods at specific moments. Below, the child reports each one as it
      runs - change the input and the order becomes obvious.
    </p>

    <div class="panel">
      <h2>Controls</h2>
      <div class="row">
        <button class="primary" (click)="bumpValue()">Change the child's input (ngOnChanges)</button>
        <button (click)="showChild.set(!showChild())">
          {{ showChild() ? 'Destroy' : 'Create' }} the child
        </button>
        <button (click)="events.set([])">Clear log</button>
      </div>
    </div>

    <div class="panel">
      <h2>Child component</h2>
      @if (showChild()) {
        <app-lifecycle-child label="lifecycle child" [value]="value()" (logged)="record($event)" />
      } @else {
        <p class="muted">The child does not exist. Create it to see the hooks fire.</p>
      }
    </div>

    <div class="panel">
      <h2>Hook log</h2>
      <div class="log">
        @for (event of events(); track $index) {
          <div>{{ event }}</div>
        } @empty {
          <div class="muted">Nothing yet.</div>
        }
      </div>
    </div>

    <div class="panel">
      <h2>The hooks worth knowing</h2>
      <table class="grid">
        <thead><tr><th>Hook</th><th>When</th><th>Typical use</th></tr></thead>
        <tbody>
          <tr><td class="mono">constructor</td><td>First, before inputs are set</td><td>Set up fields only - never call the server here</td></tr>
          <tr><td class="mono">ngOnChanges</td><td>Every time an &#64;Input changes</td><td>React to new input values</td></tr>
          <tr><td class="mono">ngOnInit</td><td>Once, after the first ngOnChanges</td><td>Load data, initialise</td></tr>
          <tr><td class="mono">ngAfterViewInit</td><td>After the view (and child views) exist</td><td>Reach into a &#64;ViewChild</td></tr>
          <tr><td class="mono">ngAfterContentInit</td><td>After projected content exists</td><td>Work with &#64;ContentChild</td></tr>
          <tr><td class="mono">ngOnDestroy</td><td>Just before removal</td><td>Unsubscribe, clear timers</td></tr>
        </tbody>
      </table>
      <div class="note">
        <strong>Why it matters:</strong> <code class="inline">ngOnDestroy</code> is where leaks are
        prevented. A subscription or interval that outlives its component keeps running forever.
        (Modern shortcut: <code class="inline">takeUntilDestroyed()</code> in RxJS, which wires
        the unsubscribe up for you.)
      </div>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>Order: ngOnChanges, ngOnInit, ngAfterContentInit, ngAfterViewInit, ngOnDestroy - plus the Checked variants and ngDoCheck.</li>
        <li>ngOnInit is where you load data. The constructor is only for wiring fields, because inputs are not set yet.</li>
        <li>ngOnChanges fires on every input change - except for signal inputs, which the reactivity system tracks instead of reporting a change event.</li>
        <li>ngOnDestroy is where leaks are prevented: unsubscribe, clear timers, disconnect. takeUntilDestroyed() ties a subscription to the component's lifetime without a manual unsubscribe.</li>
        <li>OnPush only checks the component when an input reference changes, an event fires inside it, an async pipe emits, or a signal it reads changes. The catch: mutating an input in place will not trigger a check.</li>
      </ul>
    </div>
  `,
})
export class LifecycleDemoComponent {
  readonly showChild = signal(true);
  readonly value = signal(1);
  readonly events = signal<string[]>([]);

  bumpValue(): void {
    this.value.update((v) => v + 1);
  }

  record(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.events.update((events) => [...events, `${time}  ${message}`].slice(-14));
  }
}
