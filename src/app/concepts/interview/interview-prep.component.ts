import { Component, computed, signal } from '@angular/core';

/**
 * INTERVIEW PREP
 *
 * The whole playground compressed into question form - one page to practise
 * from, revise from, and read the night before an interview.
 *
 * Every answer is written the way you would say it out loud: short, correct,
 * and with the detail that separates a memorised answer from an understood one.
 * Where an interviewer is really testing a second thing, the answer says so.
 *
 * Try it: filter with "change detection", "guard", "switchMap", "signals".
 */

interface Question {
  readonly q: string;
  readonly a: string;
}

interface Topic {
  readonly topic: string;
  readonly questions: readonly Question[];
}

const TOPICS: readonly Topic[] = [
  {
    topic: '1. Fundamentals and architecture',
    questions: [
      {
        q: 'What is Angular, and how is it different from React?',
        a: "Angular is a full framework from Google: routing, dependency injection, forms, HTTP and testing all ship with it, and it uses TypeScript and templates rather than JSX. React is a view library - you choose the router, the data layer and the state manager yourself. The practical difference is opinion: Angular gives one blessed way to build things, which suits large teams; React gives you the pieces and expects you to decide.",
      },
      {
        q: 'What is a single-page application?',
        a: "An app that loads one HTML shell and then swaps views with JavaScript instead of asking the server for a new page. Navigation is handled by the client-side router, so there are no full page reloads. Angular makes this easy with the router plus lazy-loaded route chunks, but it also means the server must be configured to serve index.html for every route.",
      },
      {
        q: 'Walk me through the files that start an Angular app.',
        a: "index.html has an app-root element. main.ts calls bootstrapApplication with the root component and the app config. app.config.ts registers the providers - the router, HttpClient, and anything global. app.routes.ts is the route table. angular.json configures the build, and the CLI owns it. The root component renders the shell and a router-outlet.",
      },
      {
        q: 'What is a standalone component, and how does it differ from an NgModule-declared one?',
        a: "A standalone component declares what its own template needs in an imports array, instead of being registered in an NgModule. Since Angular 19 standalone is the default. The practical wins are locality - everything a component needs is in one file - and easier lazy loading, because you can lazy-load a single component with loadComponent rather than a whole module.",
      },
      {
        q: 'Do NgModules still matter?',
        a: "Yes, for two reasons. Existing codebases are full of them, and you will be asked to work in one. And a module is still a convenient unit to group and lazy-load a feature as a single chunk. But for new code, standalone components plus loadComponent or loadChildren is the modern default. If you write a component for an NgModule today, remember it must say standalone: false explicitly.",
      },
      {
        q: 'What role does TypeScript play?',
        a: "Angular is written in and expects TypeScript. It gives you typed components, typed services, typed forms and typed HTTP responses, and the Angular compiler type-checks your templates too - with strictTemplates on, a typo in a binding is a build error rather than a runtime surprise. That template checking is the part people underestimate.",
      },
      {
        q: 'What is the Angular CLI actually for?',
        a: "It owns the build, and it is how code gets created consistently. ng generate writes files that follow the project conventions and registers them where needed; ng build, ng serve, ng test and ng update wrap the toolchain; ng add installs a library and runs its schematic so the wiring is done for you. It is not optional plumbing - it is the project's build system.",
      },
    ],
  },
  {
    topic: '2. Components, templates and binding',
    questions: [
      {
        q: 'What are the four forms of data binding?',
        a: "Interpolation {{ value }} for text, property binding [property]=\"expr\" from class to template, event binding (event)=\"handler()\" from template to class, and two-way binding [(ngModel)]=\"x\" which is just the first two combined. Everything else - [class.x], [style.x], [attr.x] - is a variant of property binding.",
      },
      {
        q: 'Property binding versus attribute binding?',
        a: "Property binding sets a DOM property: [disabled]=\"isDisabled\" sets the live disabled property, which is what actually changes behaviour. Attribute binding sets the HTML attribute: [attr.aria-label]=\"text\". Use attribute binding for attributes that have no matching DOM property - ARIA attributes, colspan, data-* - because those only exist as attributes.",
      },
      {
        q: 'How do you pass data into a child component, and how does it send something back?',
        a: "Data goes in with @Input (or the newer signal form, input.required<Employee>()). Events come out with @Output plus an EventEmitter (or output<number>()). The child never reaches up and changes the parent - it emits, and the parent decides. That one-way flow is what keeps a component tree predictable.",
      },
      {
        q: 'What is content projection?',
        a: "ng-content lets a parent put markup inside your component's tags, and your template decides where it appears. It is how you build a reusable card, dialog or layout component without inventing a prop for every possible child. Angular 18+ also has named and fallback slots (ng-content select=\"...\", and a default slot when nothing is projected).",
      },
      {
        q: 'Component, directive or pipe - what is the difference?',
        a: "A component is a directive with a template. A directive attaches behaviour to an existing element and comes in two kinds: attribute directives ([appHighlight], ngClass) and structural directives that add or remove elements (@if, @for, *ngIf). A pipe transforms a value for display in a template. All three are classes with metadata; only the component has a view.",
      },
      {
        q: 'How does the asterisk in *ngIf actually work?',
        a: "It is sugar for an ng-template. *ngIf=\"cond\" desugars to <ng-template [ngIf]=\"cond\">, and the directive stamps that template into a ViewContainerRef when the condition is true. Writing a custom structural directive yourself - inject TemplateRef and ViewContainerRef, then createEmbeddedView - is the fastest way to prove you understand it.",
      },
      {
        q: 'Why does @for require track, and what happens if the key is wrong?',
        a: "track tells Angular how to identify each item so it can move existing DOM nodes rather than destroy and rebuild them. A stable id keeps component state, focus and animations attached to the right row. Using the loop index is the classic mistake: after a removal or reorder the DOM node is reused for a different item, so an uncontrolled input or a checkbox ends up showing the wrong row's state.",
      },
      {
        q: 'What are host bindings and host listeners?',
        a: "They let a directive or component style or listen to its own host element instead of reaching for the DOM. @HostBinding('style.backgroundColor') and @HostListener('mouseenter') - or the modern host object in the decorator metadata. They keep the directive testable, because you never touch element.nativeElement directly.",
      },
      {
        q: 'How would you display a value that must never be re-rendered unnecessarily?',
        a: "That is a change-detection question in disguise. First, make sure the value is not recomputed in a getter or a method called from the template, because those run on every change-detection cycle. Then consider an OnPush component, and if the value is derived from other state, a computed signal - which caches until its dependencies actually change.",
      },
    ],
  },
  {
    topic: '3. Lifecycle and change detection',
    questions: [
      {
        q: 'List the lifecycle hooks in order.',
        a: "ngOnChanges (before ngOnInit, and again on every input change), ngOnInit (once, after the first ngOnChanges - load data here), ngAfterContentInit and ngAfterContentChecked (projected content), ngAfterViewInit and ngAfterViewChecked (this component's view), and ngOnDestroy just before removal. There is also ngDoCheck for custom change detection, which you should reach for rarely.",
      },
      {
        q: 'When does ngOnChanges fire, and why not for a signal input?',
        a: "ngOnChanges fires when an @Input value changes - it is the hook that receives the SimpleChanges object with previous and current values. A signal input (input()) is read as a function and tracked by the reactivity system, so there is no change event to report; you react with computed or effect instead. That is one of the reasons signal inputs are cleaner.",
      },
      {
        q: 'How does Angular know something changed?',
        a: "Historically, zone.js monkey-patches async APIs - setTimeout, promises, DOM events - and tells Angular to run change detection after anything asynchronous finishes. Angular then walks the component tree from the root and checks each binding. Modern Angular can also run zoneless, where signals and explicit notifications drive updates instead of a global patch.",
      },
      {
        q: 'What is OnPush change detection?',
        a: "A component marked ChangeDetectionStrategy.OnPush is only checked when one of its inputs changes by reference, an event originates inside it, an observable it subscribes to via the async pipe emits, or a signal it reads changes. It cuts a lot of unnecessary work in large trees. The catch is that mutating an input object in place will not trigger a check - you must produce a new reference.",
      },
      {
        q: 'Pure versus impure pipes?',
        a: "A pure pipe (the default) runs again only when its input value changes, which is why it is cheap. An impure pipe runs on every change-detection cycle, so it is a performance trap when used on a list. If you need a pipe to react to something other than its input, prefer passing that something in as an argument, or use a signal.",
      },
      {
        q: 'What causes ExpressionChangedAfterItHasBeenCheckedError?',
        a: "A binding changed between the check and the verification pass in development mode - usually because you set a value in ngAfterViewInit, or a child emits during change detection and the parent updates a binding it already rendered. Fix it by moving the change earlier (ngOnInit), using a signal or a setter, or in rare cases ChangeDetectorRef.detectChanges. Do not just disable the check.",
      },
      {
        q: 'Why unsubscribe, and what are your options?',
        a: "A subscription that outlives its component keeps running: it holds memory and fires on state that no longer exists. Options, roughly in order of preference: use the async pipe so Angular manages it; use takeUntilDestroyed() so it is tied to the component's lifetime; keep the subscription in a field and unsubscribe in ngOnDestroy; or use an operator that completes by itself, like take(1) or an HTTP call.",
      },
    ],
  },
  {
    topic: '4. Directives, pipes and forms',
    questions: [
      {
        q: 'Template-driven or reactive forms - how do you choose?',
        a: "Template-driven forms (FormsModule, ngModel) build the form model from the HTML - quick for a couple of fields, harder to test and awkward for dynamic controls. Reactive forms (ReactiveFormsModule, FormBuilder) build the model in the class, so the rules are typed, testable without a template, and easy to grow or reconfigure. Default to reactive for anything real.",
      },
      {
        q: 'How do you write a custom validator?',
        a: "A validator is a function that takes an AbstractControl and returns null when valid or an error object when not. Wrap it in a factory so it can be configured, and for a rule that compares two fields use a group validator, because it receives the whole FormGroup. Register it on the control or the group, then read the error key in the template to show the message.",
      },
      {
        q: 'What is an async validator?',
        a: "A validator that returns a Promise or an Observable of the same error object - typically used to ask the server whether a username is free. While it is pending the control is marked pending, so you can disable the submit button or show a spinner. Remember to debounce it, or you fire a request on every keystroke.",
      },
      {
        q: 'When do you need a FormArray?',
        a: "Whenever the number of controls is not fixed: a list of phone numbers, a set of skills, line items on an invoice. It is an array of controls you can push to and removeAt from, and it works with the same validation and valueChanges plumbing as the rest of the form.",
      },
      {
        q: 'setValue versus patchValue?',
        a: "setValue requires the whole shape - every control, exactly matching - and throws if anything is missing. patchValue updates only the keys you give it and ignores the rest. Use setValue to be strict about a full reset, patchValue for partial updates, for example when an edit form is filled from an API response.",
      },
      {
        q: 'How do you stop a user leaving a form with unsaved changes?',
        a: "A CanDeactivate guard on the route. The component exposes something like canDeactivate() that returns true or false (or a confirm dialog), and the guard calls it before the router leaves. It is the guard people forget exists, and it is a good answer because it shows you know guards are not only about authentication.",
      },
      {
        q: 'How do you show a validation message only after the user has interacted?',
        a: "Check both invalid and touched: control.invalid && control.touched. Angular adds ng-touched, ng-dirty and ng-valid classes to controls, so the simplest approach is to style on .ng-invalid.ng-touched. Showing errors while the user is still typing the first character is the most common form UX mistake.",
      },
    ],
  },
  {
    topic: '5. Services, dependency injection and state',
    questions: [
      {
        q: 'What problem does dependency injection solve?',
        a: "It removes the need to construct your own dependencies. Without it, a component writes new EmployeeService(), which hard-codes the implementation, prevents sharing one instance, and makes the component untestable without editing it. With DI the component asks for a token and the injector supplies an instance - so you can swap in a fake in a test and share a single instance across the app.",
      },
      {
        q: 'Explain the injector hierarchy.',
        a: "Angular has a root injector plus one injector per component that declares its own providers. A request walks up from the component until it finds a provider. That is why providedIn: 'root' gives one app-wide singleton, while listing a service in a component's providers array gives that component and its children their own private instance.",
      },
      {
        q: 'What is an InjectionToken and why not just inject a string?',
        a: "Because there are thousands of strings and no way to tell them apart - the injector needs a unique key. An InjectionToken creates a typed, unique key for a plain value, so a service can ask for a config object and get it, and you can provide it with useValue, useFactory or useExisting depending on how it should be built.",
      },
      {
        q: 'What do useClass, useValue, useFactory and useExisting do?',
        a: "useClass: build this class when the token is requested (the way to swap an implementation). useValue: provide this exact object or primitive. useFactory: run a function to build it, optionally using other injected services - useful for values that need configuration at runtime. useExisting: alias one token to another, so both names resolve to the same instance.",
      },
      {
        q: 'How do you share state between components?',
        a: "For a small app, a service holding signals and providedIn: 'root' is enough: any component injects it, reads the signal and updates it through the service's methods. The service is the single writer, so there is no question about who changed what. Add a store library only when you can name the problem it solves.",
      },
      {
        q: 'When do you actually need NgRx or Akita?',
        a: "When the state is genuinely global and shared across many features, when updates come from many async sources that must not race, or when a large team needs one enforced pattern and time-travel debugging. NgRx gives you actions, reducers, effects and selectors with real boilerplate. For most apps, a signal service is smaller and easier to reason about - and saying that out loud is usually a good sign.",
      },
      {
        q: 'What are Angular signals, and how do they compare with RxJS?',
        a: "A signal is a reactive value: signal() holds it, computed() derives from it and caches, effect() runs a side effect when it changes, and reading it in a template subscribes automatically. Signals are for state - current values that drive rendering. RxJS is for streams - sequences of events over time, with operators like debounce and switchMap. They coexist: a signal for the selected id, an RxJS pipeline for the request that follows.",
      },
    ],
  },
  {
    topic: '6. Routing, guards and performance',
    questions: [
      {
        q: 'How does routing work in Angular?',
        a: "You declare a route table mapping a path to a component, the router matches the current URL, and router-outlet renders the matching component. Nested routes mirror the UI: a parent route renders the shared layout and its own outlet, and child routes fill it. The parent stays mounted while children swap, which is why a sidebar does not reset on navigation.",
      },
      {
        q: 'routerLink versus href?',
        a: "An href does a full page reload, which throws the whole app away and re-downloads everything. routerLink tells the router to handle the navigation on the client, keeping the app alive and the state intact. The same applies to navigation in code: use Router.navigate rather than assigning to location.",
      },
      {
        q: 'How do you read a route parameter?',
        a: "Three ways. The snapshot (route.snapshot.paramMap.get('id')) is simplest but stale if the same component is reused for a different id. The observable (route.paramMap) reacts to changes. Or enable withComponentInputBinding and declare an input named after the parameter - the router fills it in, and it works with signal inputs too. Choose the observable or the input binding when the id can change without the component being destroyed.",
      },
      {
        q: 'What guard types exist, and are they security?',
        a: "CanActivate (may this route open), CanActivateChild (for every child), CanDeactivate (may the user leave), CanMatch (should this route even be considered), and Resolve (fetch data before activation). They are functions that return true, false or a UrlTree to redirect. And no - they are a UX feature, not a security boundary, because anyone can call your API directly. The server must enforce access. Saying that is often the point of the question.",
      },
      {
        q: 'What is a resolver?',
        a: "A resolver fetches data before the route activates, so the component renders with the data already present instead of flashing an empty state. The trade-off is that navigation now waits for the request, so a slow resolver makes the whole app feel slow. Many teams prefer to show the page immediately with a loading state and fetch in the component or through a query library.",
      },
      {
        q: 'What are the three ways to lazy-load in Angular?',
        a: "loadComponent for a single standalone component, loadChildren pointing at a route array for a whole feature, and loadChildren pointing at an NgModule for the older style. Each turns that code into a separate chunk the browser fetches on demand. The highest-value place to start is the route level, because users navigate between pages.",
      },
      {
        q: 'What is preloading?',
        a: "Preloading downloads the lazy chunks in the background after the initial load, so navigating to them later feels instant. You enable it with withPreloading(PreloadAllModules), or write a custom strategy that only preloads the routes a given user is likely to visit. It is the natural follow-up to lazy loading - lazy is about what to send now, preloading is about what to send next.",
      },
      {
        q: 'How would you make an Angular app load faster?',
        a: "Measure first: look at the bundle report and the network waterfall. Then lazy-load by route, keep the initial bundle under the budget in angular.json, preload the likely next routes, avoid importing heavy libraries into the shell, use OnPush and signals to cut change-detection work, and watch for large images and fonts. Tree-shaking and the production build are already on - the wins come from sending less and doing less.",
      },
      {
        q: 'What are bundle budgets?',
        a: "Limits configured in angular.json - maximumWarning and maximumError for the initial bundle and for component styles. Exceed the error threshold and the build fails. They are the cheapest guard against a slow app creeping in one import at a time, and they make bundle size a build-time concern instead of something you notice six months later.",
      },
    ],
  },
  {
    topic: '7. HTTP, RxJS and realtime',
    questions: [
      {
        q: 'How do you make an HTTP call in Angular?',
        a: "Inject HttpClient and call a method that returns an Observable - get<T>, post<T>, put, delete. Observables are lazy, so nothing is sent until something subscribes, which the async pipe does for you in a template. Keep the calls in a typed service rather than in components, so the URL and the shape live in one place and the component only consumes the result.",
      },
      {
        q: 'What is an HttpInterceptor and what would you use one for?',
        a: "A function that sits between your code and the network, so every request and response passes through it. Typical uses: adding an Authorization header, logging and timing, retrying transient failures, showing a global spinner, and normalising errors. In modern Angular they are functions registered with provideHttpClient(withInterceptors([...])). Order matters - they run in order on the way out and in reverse on the way back.",
      },
      {
        q: 'Observable versus Promise.',
        a: "A Promise produces exactly one value, starts immediately, and cannot be cancelled. An Observable can produce zero, one or many values over time, is lazy - nothing happens until you subscribe - and is cancellable by unsubscribing, which is what makes switchMap-style cancellation possible. That is why an HTTP call is an Observable in Angular: you get retries, cancellation and composition for free.",
      },
      {
        q: 'Which RxJS operators do you use most, and switchMap versus mergeMap?',
        a: "map, filter, debounceTime, distinctUntilChanged, switchMap, catchError, tap, takeUntil and combineLatest cover most real work. switchMap cancels the previous inner observable when a new value arrives - correct for search, because you want the latest request to win. mergeMap runs them all in parallel and keeps every result - correct for independent writes where none may be dropped. concatMap queues them in order.",
      },
      {
        q: 'Subject versus BehaviorSubject?',
        a: "A Subject is a stream you push into with next() and subscribe to; late subscribers miss earlier values. A BehaviorSubject also holds the current value and replays it to anyone who subscribes, so it is the usual choice for state you might need to read at any time. A ReplaySubject replays the last N values for cases where a new subscriber needs a little history.",
      },
      {
        q: 'How do you handle errors from an HTTP call?',
        a: "catchError inside the pipeline to recover or translate the error, retry with backoff for transient failures, and an error interceptor for the global cases like a 401 that should bounce the user to login. Remember that an unhandled error in an Observable kills that subscription, so catchError also keeps the stream alive. Show the user something useful, not a raw stack trace.",
      },
      {
        q: 'Why is the async pipe better than subscribing in the component?',
        a: "Because Angular owns the subscription: it subscribes when the view is created, unsubscribes when it is destroyed, and marks the component for check when a new value arrives. Subscribing by hand means you also have to unsubscribe by hand, or leak. The one caveat is that every async pipe in a template creates its own subscription, so for the same stream used in several places, subscribe once and expose the result.",
      },
      {
        q: 'Where does SignalR fit, and how is it different from polling?',
        a: "SignalR gives you real-time, server-to-client push over a persistent connection - WebSockets where possible, falling back to Server-Sent Events or long polling. Polling asks the server again and again whether anything changed; SignalR has the server tell you the moment it does. It is the right tool for notifications, chat, live dashboards and collaborative editing, where the server, not the client, knows when there is news.",
      },
      {
        q: 'What is gRPC and when would you choose it over REST?',
        a: "gRPC is a contract-first RPC framework: you describe the service in a .proto file, tooling generates the client and server, and it runs over HTTP/2 with compact binary protobuf payloads. It gives you streaming and deadlines as first-class features, which makes it a strong fit for service-to-service calls in a microservice or polyglot setup. For browser-facing APIs REST with JSON is usually simpler, because browsers cannot speak raw gRPC.",
      },
      {
        q: 'How do you secure an API call?',
        a: "On the client, attach the token in an interceptor so no call can forget it, and keep the token out of long-lived storage where possible. On the server, verify the token on every request and check authorisation for the specific resource - not just whether the user is logged in. Client-side guards and hidden buttons are convenience, never protection.",
      },
    ],
  },
  {
    topic: '8. Testing, quality and practice',
    questions: [
      {
        q: 'How do you unit test a component in Angular?',
        a: "Use TestBed to configure the component with its dependencies, create it, then query the rendered DOM through the fixture and assert on what the user would see. For a component with inputs, set them and call detectChanges. Prefer testing behaviour through the template over reaching into the class, because the template is the contract.",
      },
      {
        q: 'What is TestBed?',
        a: "Angular's testing utility that creates a mini Angular environment - an injector and a module or component context - so you can instantiate components, directives, pipes and services with real dependency injection. You configure it with the component under test and provide stubs for anything you do not want to exercise, then call createComponent or inject the service.",
      },
      {
        q: 'How do you test a service that makes HTTP calls?',
        a: "Provide provideHttpClientTesting and use HttpTestingController. You call the method, subscribe, then expectOne('/api/users') and flush a fake response, finally verify() that no request is outstanding. That tests your URL, your headers and your mapping without any network, and it is far faster and more deterministic than hitting a real backend.",
      },
      {
        q: 'How do you test a guard or a pipe?',
        a: "A pure pipe is the easiest thing in Angular to test: instantiate the class directly and call transform with inputs and expected outputs, no TestBed needed. A functional guard is a plain function, so call it with a stub route and state and assert on true, false or the UrlTree it returns - again without TestBed.",
      },
      {
        q: 'What makes a large Angular app maintainable?',
        a: "A clear feature folder structure, lazy-loaded routes so features stay independent, smart components that fetch and presentational components that only render, services that own state and side effects, strict TypeScript and template checking, and tests around the logic rather than the markup. Most of all, consistency - one way to do things, enforced by the CLI and the linter.",
      },
      {
        q: 'Smart versus presentational components?',
        a: "A smart (container) component knows about services, routing and state; a presentational component takes inputs and emits outputs and knows nothing else. Splitting them means the presentational pieces are trivially reusable and easy to test, and the data plumbing lives in one place per feature. It is the same idea as a pure function.",
      },
      {
        q: 'How do you keep your Angular knowledge current?',
        a: "Follow the Angular release notes and the official blog, read the update guide before each major version, and upgrade regularly rather than in one terrifying jump - ng update applies the migrations for you. Then build something small with each new feature as it lands, because reading about signals is not the same as using them.",
      },
    ],
  },
];

@Component({
  selector: 'app-interview-prep',
  template: `
    <header class="page-head">
      <h1>
        <span class="badge badge--accent">Q&amp;A</span>
        Interview prep
      </h1>
      <p class="lead">
        {{ total }} questions across {{ topics.length }} areas, answered the way you would say them out
        loud. Click a question to reveal the answer. Every concept page also has its own short
        <em>In an interview</em> panel.
      </p>
    </header>

    <div class="panel">
      <label class="field" style="max-width:420px;margin-bottom:0">
        <span>Filter</span>
        <input
          type="search"
          placeholder="try 'change detection', 'guard', 'switchMap', 'signals'..."
          [value]="query()"
          (input)="onQuery($event)"
        />
      </label>
      <p class="muted" style="font-size:.85rem;margin:.5rem 0 0">
        {{ matched() }} question(s) shown
      </p>
    </div>

    <div class="panel panel--soft">
      <h2>How to answer these</h2>
      <ul class="tight">
        <li><strong>Lead with the one-line answer</strong>, then add the detail. Interviewers are checking the shape of your understanding before the depth.</li>
        <li><strong>Name the trade-off.</strong> "We could use X, but Y is simpler unless ..." is worth more than a confident list of features.</li>
        <li><strong>Say when not to use it.</strong> Knowing that most apps do not need NgRx, or that RxJS is optional in React, reads as experience.</li>
        <li><strong>Use the concrete example you built.</strong> Every page in this playground is a story you can tell: the index-key bug, the switchMap cancellation, the lazy chunk arriving.</li>
        <li><strong>Do not bluff.</strong> "I have not used that in production, but I understand it works by ..." beats inventing an answer you cannot follow up on.</li>
      </ul>
    </div>

    @if (visible().length === 0) {
      <p class="muted">Nothing matches "{{ query() }}".</p>
    } @else {
      @for (topic of visible(); track topic.topic) {
        <section class="panel">
          <h2>{{ topic.topic }}</h2>
          @for (item of topic.questions; track item.q) {
            <details class="qa">
              <summary>{{ item.q }}</summary>
              <p class="muted">{{ item.a }}</p>
            </details>
          }
        </section>
      }
    }
  `,
})
export class InterviewPrepComponent {
  readonly topics = TOPICS;

  readonly total = TOPICS.reduce((sum, topic) => sum + topic.questions.length, 0);

  /** What the user typed in the filter box. */
  readonly query = signal('');

  /** Topics whose questions match the filter (all of them when it is empty). */
  readonly visible = computed(() => {
    const needle = this.query().trim().toLowerCase();

    if (!needle) {
      return this.topics;
    }

    return this.topics
      .map((topic) => ({
        topic: topic.topic,
        questions: topic.questions.filter(
          (item) =>
            item.q.toLowerCase().includes(needle) || item.a.toLowerCase().includes(needle),
        ),
      }))
      .filter((topic) => topic.questions.length > 0);
  });

  readonly matched = computed(() =>
    this.visible().reduce((sum, topic) => sum + topic.questions.length, 0),
  );

  onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
