import { Component, inject } from '@angular/core';
import { CounterService } from './counter.service';
import { CounterBoxComponent, IsolatedCounterComponent } from './counter-box.component';
import { GreetingService } from './greeting.service';
import { GREETING_CONFIG } from './greeting.config';

/**
 * CONCEPT 6a - SERVICES & DEPENDENCY INJECTION.
 *
 * What: a service is a class that holds shared logic/state. DI is how a class
 *       asks for its dependencies instead of building them itself.
 * Why:  `new SomeService()` inside a component hard-codes the dependency: you
 *       cannot swap it for a test double, you cannot share one instance, and
 *       the component now knows how to construct things it should not care about.
 *
 * This component PROVIDES the greeting config, showing that a component can
 * register its own providers too.
 */
@Component({
  selector: 'app-services-di-demo',
  imports: [CounterBoxComponent, IsolatedCounterComponent],
  // Component-level providers: available to this component and its children.
  providers: [
    { provide: GREETING_CONFIG, useValue: { prefix: 'Vanakkam', locale: 'en-IN' } },
  ],
  template: `
    <h1>6. Services &amp; Dependency Injection</h1>
    <p class="lead">
      Services hold shared logic and state; DI hands them to whoever needs them. Nobody writes
      <code class="inline">new CounterService()</code> - Angular builds it and injects it.
    </p>

    <div class="panel">
      <h2>One instance vs many (hierarchical DI)</h2>
      <p class="muted">
        The two <em>shared</em> boxes below use the root singleton - click either and both move.
        The isolated box created its own instance, so it counts alone.
      </p>

      <div class="cards">
        <app-counter-box label="Box A" />
        <app-counter-box label="Box B" />
        <app-isolated-counter label="Box C (isolated)" />
      </div>

      <div class="row" style="margin-top:.8rem">
        <button (click)="resetRoot()">Reset the shared counter</button>
        <span class="badge">root counter = {{ counter.count() }}</span>
      </div>
    </div>

    <div class="panel">
      <h2>A service configured by an InjectionToken</h2>
      <p>
        <code class="inline">GreetingService</code> needs a prefix and a locale. Those are provided
        above with <code class="inline">&#123; provide: GREETING_CONFIG, useValue: ... &#125;</code>
        and read inside the service with <code class="inline">inject(GREETING_CONFIG)</code>.
      </p>
      <dl class="kv">
        <dt>greet('Vishnu')</dt><dd>{{ greeting.greet('Vishnu') }}</dd>
        <dt>formatMoney(950000)</dt><dd>{{ greeting.formatMoney(950000) }}</dd>
        <dt>configured locale</dt><dd>{{ greeting.locale }}</dd>
      </dl>
      <div class="note">
        Swap <code class="inline">useValue</code> for <code class="inline">useClass</code>,
        <code class="inline">useFactory</code> or <code class="inline">useExisting</code> and you
        can supply a different implementation in one line - which is how you replace a real API
        service with a fake one in tests.
      </div>
    </div>

    <div class="panel">
      <h2>Why it matters</h2>
      <ul class="tight">
        <li><strong>Testability:</strong> inject a fake instead of the real HTTP service.</li>
        <li><strong>One source of truth:</strong> the root instance is shared, so state stays consistent.</li>
        <li><strong>Loose coupling:</strong> components depend on a token/type, not on how it is built.</li>
        <li><strong>Configuration:</strong> tokens let you inject plain values safely.</li>
      </ul>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>Dependency injection removes the need to build your own dependencies: you ask for a token, the injector supplies an instance. That is what makes sharing one instance and swapping a fake in tests possible.</li>
        <li>providedIn: 'root' gives one app-wide singleton. Listing a service in a component's providers array gives that component and its children their own private instance.</li>
        <li>An InjectionToken is for plain values - a config object, a string - because the injector needs a unique, typed key to look them up.</li>
        <li>useClass, useValue, useFactory and useExisting are the four ways to describe how a token is built. useClass is how you swap an implementation.</li>
        <li>Modern style is inject(Service) in a field rather than constructor parameters. Same thing, shorter, and it works in field initialisers.</li>
      </ul>
    </div>
  `,
})
export class ServicesDiDemoComponent {
  readonly counter = inject(CounterService);
  readonly greeting = inject(GreetingService);

  resetRoot(): void {
    this.counter.reset();
  }
}
