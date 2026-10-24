import { Injectable, inject } from '@angular/core';
import { GREETING_CONFIG } from './greeting.config';

/**
 * CONCEPT 6d - a service that depends on CONFIGURATION, injected by token.
 *
 * `inject(GREETING_CONFIG)` is the modern replacement for the constructor
 * parameter form:
 *
 *     constructor(@Inject(GREETING_CONFIG) private config: GreetingConfig) {}
 *
 * Both do the same thing. inject() is shorter and works in field initialisers.
 */
@Injectable({ providedIn: 'root' })
export class GreetingService {
  private readonly config = inject(GREETING_CONFIG);

  greet(name: string): string {
    return `${this.config.prefix}, ${name}!`;
  }

  /** Formats a number the way the configured locale expects. */
  formatMoney(amount: number): string {
    return new Intl.NumberFormat(this.config.locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  get locale(): string {
    return this.config.locale;
  }
}
