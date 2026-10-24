import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, interval } from 'rxjs';
import { SearchService } from './search.service';

/**
 * CONCEPT 13 - RXJS & OBSERVABLES.
 *
 * What: an Observable is a lazy stream of values over time - 0, 1 or many, now
 *       or later. RxJS is the library of operators for composing those streams.
 * Why:  "the user typed, then I debounced, then I cancelled the stale request,
 *       then I merged in a live socket" is painful with callbacks and trivial
 *       with operators. RxJS is the vocabulary for async in Angular.
 */
@Component({
  selector: 'app-rxjs-demo',
  imports: [AsyncPipe],
  template: `
    <h1>13. RxJS &amp; Observables</h1>
    <p class="lead">
      Type below. Each keystroke goes into a stream, gets debounced, and the previous search is
      cancelled - that is three operators doing what would otherwise be a lot of bookkeeping.
    </p>

    <div class="panel">
      <h2>debounceTime + distinctUntilChanged + switchMap</h2>
      <label class="field">
        <span>Search</span>
        <input type="text" placeholder="try 'an', 're', 'rx'" [value]="term()" (input)="onInput($event)" />
      </label>
      <p class="muted" style="font-size:.85rem">
        keystrokes pushed: <span class="mono">{{ term().length }}</span>
      </p>

      <!-- The async pipe subscribes for you, and unsubscribes when the view goes away. -->
      @if (results$ | async; as results) {
        <div class="pill-list">
          @for (result of results; track result) {
            <span class="pill">{{ result }}</span>
          } @empty {
            <span class="muted">No matches.</span>
          }
        </div>
      }
    </div>

    <div class="panel">
      <h2>Manual subscription, cleaned up on destroy</h2>
      <p class="muted">
        A ticker, driven by <code class="inline">interval(1000)</code>. The subscription is tied to
        the component's lifetime with <code class="inline">takeUntilDestroyed()</code>, so it
        cannot leak.
      </p>
      <div class="row">
        <button class="primary" (click)="startTicker()" [disabled]="running()">Start</button>
        <button (click)="stopTicker()" [disabled]="!running()">Stop</button>
        <span class="badge badge--info">ticks = {{ ticks() }}</span>
      </div>
      <div class="log" style="margin-top:.6rem">
        @for (tick of tickLog(); track $index) {
          <div>{{ tick }}</div>
        } @empty {
          <div class="muted">Not started.</div>
        }
      </div>
    </div>

    <div class="panel">
      <h2>The operators you will actually use</h2>
      <table class="grid">
        <thead><tr><th>Operator</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td class="mono">map</td><td>Transform each value (like Array.map, over time)</td></tr>
          <tr><td class="mono">filter</td><td>Drop values that do not match</td></tr>
          <tr><td class="mono">debounceTime</td><td>Wait for a pause in the stream</td></tr>
          <tr><td class="mono">distinctUntilChanged</td><td>Ignore consecutive duplicates</td></tr>
          <tr><td class="mono">switchMap</td><td>Switch to a new inner stream, cancelling the old one</td></tr>
          <tr><td class="mono">mergeMap</td><td>Run inner streams in parallel (order not guaranteed)</td></tr>
          <tr><td class="mono">concatMap</td><td>Run inner streams one after another, in order</td></tr>
          <tr><td class="mono">combineLatest</td><td>Combine the latest value of several streams</td></tr>
          <tr><td class="mono">take(1)</td><td>Take one value, then complete</td></tr>
          <tr><td class="mono">catchError</td><td>Handle an error without killing the stream</td></tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <h2>Subject vs BehaviorSubject vs signal</h2>
      <table class="grid">
        <thead><tr><th></th><th>Replays to new subscribers?</th><th>Use for</th></tr></thead>
        <tbody>
          <tr><td class="mono">Subject</td><td>No</td><td>Events (clicks, "saved!")</td></tr>
          <tr><td class="mono">BehaviorSubject</td><td>Yes, the current value</td><td>State you can read at any time</td></tr>
          <tr><td class="mono">ReplaySubject</td><td>Yes, the last N</td><td>Late subscribers needing history</td></tr>
          <tr><td class="mono">signal</td><td>Always current, no subscribe</td><td>Simple component state (see the State page)</td></tr>
        </tbody>
      </table>
      <div class="note note--warn">
        <strong>Unsubscribe!</strong> Every manual <code class="inline">.subscribe()</code> is a
        potential leak. Use the <code class="inline">async</code> pipe, or
        <code class="inline">takeUntilDestroyed()</code>, or an operator that completes.
      </div>
    </div>
  `,
})
export class RxjsDemoComponent {
  private readonly search = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);

  readonly results$ = this.search.results$;
  readonly term = signal('');
  readonly ticks = signal(0);
  readonly running = signal(false);
  readonly tickLog = signal<string[]>([]);

  private ticker?: Subscription;

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.term.set(value);
    this.search.setTerm(value); // push into the stream
  }

  startTicker(): void {
    this.stopTicker();
    this.running.set(true);

    this.ticker = interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef)) // auto-unsubscribe on destroy
      .subscribe(() => {
        this.ticks.update((t) => t + 1);
        this.tickLog.update((log) => [...log, `tick ${this.ticks()} at ${new Date().toLocaleTimeString()}`].slice(-6));
      });
  }

  stopTicker(): void {
    this.ticker?.unsubscribe();
    this.ticker = undefined;
    this.running.set(false);
  }
}
