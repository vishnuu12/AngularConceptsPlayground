import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, delay, distinctUntilChanged, map, of, switchMap } from 'rxjs';

/**
 * CONCEPT 13b - RxJS inside a service.
 *
 * An Observable is a stream of values over time. Here the stream is "what the
 * user has typed". The interesting part is not the subject - it is the
 * OPERATORS, which is where RxJS earns its place:
 *
 *   debounceTime      wait for a pause before doing anything
 *   distinctUntilChanged  ignore repeats
 *   switchMap         start the new request and CANCEL the previous one
 *   map               transform each value
 *   delay             (here) pretend the search is remote
 *
 * Without switchMap you get the classic bug: a slow response for "an" arrives
 * after a fast response for "angular" and overwrites the correct results.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly catalogue = [
    'Angular', 'React', 'Vue', 'Svelte', 'Solid', 'RxJS',
    'NgRx', 'Akita', 'TypeScript', 'Signals', 'Zoneless', 'Observables',
  ];

  /** BehaviorSubject: a Subject that also replays its current value to new subscribers. */
  private readonly term = new BehaviorSubject<string>('');

  /** Every keystroke goes here. */
  setTerm(term: string): void {
    this.term.next(term);
  }

  /** The search results, as a stream. The template subscribes with the async pipe. */
  readonly results$: Observable<string[]> = this.term.pipe(
    debounceTime(300),          // wait until the user pauses typing
    distinctUntilChanged(),     // ignore "ang" -> "ang"
    map((term) => term.trim().toLowerCase()),
    switchMap((term) =>         // cancel the previous in-flight search
      of(this.search(term)).pipe(delay(250)),
    ),
  );

  /** How many keystrokes have been pushed through the subject. */
  readonly keystrokes$: Observable<number> = this.term.pipe(map((term) => term.length));

  private search(term: string): string[] {
    return term ? this.catalogue.filter((item) => item.toLowerCase().includes(term)) : [];
  }
}
