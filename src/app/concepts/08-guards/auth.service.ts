import { Injectable, computed, signal } from '@angular/core';

/**
 * CONCEPT 8b - the thing the guard checks.
 *
 * In a real app this would hold a token and talk to a backend. Here it is just
 * a signal, so you can log in and out with a click and watch the guard react.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<string | null>(null);

  /** The logged-in user's name, or null. */
  readonly user = this._user.asReadonly();

  /** A computed signal: derived from _user, recalculated automatically. */
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(name: string): void {
    this._user.set(name);
  }

  logout(): void {
    this._user.set(null);
  }
}
