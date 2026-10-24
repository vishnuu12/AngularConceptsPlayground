import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

/**
 * CONCEPT 10c - a shared log, so the interceptor's work is VISIBLE on the page
 * instead of hidden in the console.
 */
@Injectable({ providedIn: 'root' })
export class HttpLogService {
  private readonly _lines = signal<string[]>([]);
  readonly lines = this._lines.asReadonly();

  add(line: string): void {
    const stamped = `${new Date().toLocaleTimeString()}  ${line}`;
    this._lines.update((lines) => [...lines, stamped].slice(-10));
  }

  clear(): void {
    this._lines.set([]);
  }
}

/**
 * CONCEPT 10d - a functional INTERCEPTOR.
 *
 * An interceptor sits between your code and the network. Every request passes
 * through it on the way out and every response on the way back, which makes it
 * the right place for cross-cutting concerns:
 *
 *   - adding an Authorization header
 *   - logging / timing
 *   - retrying failed requests
 *   - showing a global spinner
 *   - rewriting URLs (dev proxy, environment switching)
 *
 * This one just logs. It calls `next(req)` to pass the request along - exactly
 * like middleware in a server framework.
 *
 * Interceptors run inside an injection context, so `inject()` works at the top
 * of the function - no constructor needed.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const log = inject(HttpLogService);
  const started = performance.now();
  log.add(`-> ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const ms = (performance.now() - started).toFixed(0);
          log.add(`<- ${event.status} ${req.method} ${req.url} (${ms} ms)`);
        }
      },
      error: (error: unknown) => {
        log.add(`!! ${req.method} ${req.url} failed`);
        console.error('[http] request failed', error);
      },
    }),
  );
};
