import { Injectable, signal } from '@angular/core';

/**
 * CONCEPT 6b - a SERVICE.
 *
 * A service is just a class that holds logic or state that components share.
 * The @Injectable decorator makes it injectable.
 *
 * `providedIn: 'root'` means "Angular, create ONE instance for the whole app
 * and give that same instance to everyone who asks". That is what makes it a
 * place to keep shared state - every component sees the same counter.
 *
 * (The alternative, registering it in a component's `providers`, gives that
 * component its own private instance - see IsolatedCounterComponent.)
 */
@Injectable({ providedIn: 'root' })
export class CounterService {
  // A signal is a value Angular can watch. .update/.set change it and every
  // template reading it is refreshed automatically.
  private readonly _count = signal(0);

  /** Exposed read-only, so components cannot set it behind our back. */
  readonly count = this._count.asReadonly();

  increment(): void {
    this._count.update((c) => c + 1);
  }

  reset(): void {
    this._count.set(0);
  }
}
