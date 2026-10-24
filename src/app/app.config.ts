import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { loggingInterceptor } from './concepts/10-http/logging.interceptor';
import { mockApiInterceptor } from './concepts/10-http/mock-api.interceptor';

/**
 * The application's providers - the standalone-era replacement for a root
 * NgModule's `providers` array.
 *
 * Each `provide...()` call registers a whole subsystem:
 *   - provideZoneChangeDetection : how Angular knows when to refresh the view
 *   - provideRouter              : the router, given our route table
 *   - provideHttpClient          : HttpClient, plus the interceptors to run
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Coalesce many events in one tick into a single change-detection run.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // withComponentInputBinding lets route params be read as component inputs.
    provideRouter(routes, withComponentInputBinding()),

    // Interceptors are just functions now (Angular 15+). Order matters: they
    // run outermost-first on the way out and reverse on the way back.
    provideHttpClient(withInterceptors([loggingInterceptor, mockApiInterceptor])),
  ],
};
