import { InjectionToken } from '@angular/core';

/**
 * CONCEPT 6c - an InjectionToken for configuration.
 *
 * A service cannot always be constructed from other services - sometimes it
 * needs a plain value (a string, a number, an object). You cannot ask DI for
 * `string`, because there are thousands of strings.
 *
 * An InjectionToken creates a unique, typed key you CAN ask for:
 *
 *     providers: [{ provide: GREETING_CONFIG, useValue: { prefix: 'Hello', locale: 'en-IN' } }]
 */
export interface GreetingConfig {
  /** Text put in front of the name. */
  prefix: string;
  /** A locale tag, e.g. 'en-IN'. */
  locale: string;
}

export const GREETING_CONFIG = new InjectionToken<GreetingConfig>('GREETING_CONFIG');
