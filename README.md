# Angular Concepts Playground

Fifteen small, self-contained Angular demos - each one **runs**, each one is **commented**, and
each one explains *why* the concept exists, not just how to type it.

Every concept page also ends with an **In an interview** panel, and the whole playground is
collected as question-and-answer on the **[Interview prep](/interview)** page - 55 questions across
8 areas, filterable, in one place.

This is the Angular counterpart to the [ConceptPlayground](https://github.com/vishnuu12/ConceptPlayground)
repo: same idea, different stack.

```bash
npm install     # once
npm start       # dev server on http://localhost:4200
npm run build   # production build into dist/
```

---

## What is in here

Every page is a **lazy-loaded route**, so you can watch the chunks arrive in the Network tab as you
navigate.

| # | Concept | Route | What the page shows |
| --- | --- | --- | --- |
| 1 | **Components** | `/components` | Parent/child, `@Input`, `@Output`, composable UI |
| 2 | **Modules** | `/modules` | A real `NgModule`, declared components, lazily loaded |
| 3 | **Data Binding** | `/data-binding` | `{{ }}`, `[ ]`, `( )` and `[( )]`, all live |
| 4 | **Directives** | `/directives` | `@if`/`@for`/`@switch`, legacy `*ngIf`/`*ngFor`, plus two custom directives |
| 5 | **Pipes** | `/pipes` | Built-in pipes, chaining, and a custom `initials` pipe |
| 6 | **Services & DI** | `/services-di` | Shared vs isolated instances, `InjectionToken` config |
| 7 | **Routing** | `/routing` | Child routes, route params, query params, code navigation |
| 8 | **Guards** | `/guards` | A working `CanActivate` guard protecting `/admin` |
| 9 | **Lazy Loading** | `/lazy-loading` | The three lazy styles, with a real lazy feature |
| 10 | **HttpClient** | `/http` | Typed service, interceptors, a mock backend |
| 11 | **Forms** | `/forms` | Template-driven vs reactive, validators, `FormArray` |
| 12 | **Lifecycle Hooks** | `/lifecycle` | Every hook logged live as it fires |
| 13 | **RxJS & Observables** | `/rxjs` | `debounceTime` + `switchMap`, `async` pipe, cleanup |
| 14 | **Angular CLI** | `/cli` | Interactive command reference |
| 15 | **State Management** | `/state` | A signal store, and where NgRx / Akita fit |
| Q | **Interview prep** | `/interview` | 55 questions and answers, grouped and filterable |

---

## Interview prep

The `/interview` page is the revision companion. It is not a list of trivia - every answer is
written the way you would say it out loud, and where an interviewer is really testing a second
thing, the answer says so.

| Area | Covers |
| --- | --- |
| Fundamentals and architecture | Angular vs React, SPAs, the startup files, standalone vs NgModule, TypeScript, the CLI |
| Components, templates and binding | The four bindings, property vs attribute binding, inputs/outputs, content projection, the asterisk, `track` |
| Lifecycle and change detection | Hook order, `ngOnChanges` vs signal inputs, zone.js, zoneless, `OnPush`, pure vs impure pipes, unsubscribing |
| Directives, pipes and forms | Structural directives from scratch, template-driven vs reactive, custom and async validators, `FormArray` |
| Services, DI and state | The injector hierarchy, `InjectionToken`, `useClass`/`useFactory`, signals vs RxJS, when NgRx is worth it |
| Routing, guards and performance | Nested routes, reading params, every guard type, lazy loading and preloading, budgets, load time |
| HTTP, RxJS and realtime | `HttpClient`, interceptors, Observable vs Promise, `switchMap` vs `mergeMap`, Subjects, SignalR, gRPC |
| Testing, quality and practice | `TestBed`, `HttpTestingController`, testing a pipe or guard, smart vs presentational components |

It pairs with the **In an interview** panel on every concept page: the panel is the short version
you read next to the code, the Q&A page is the long version you revise from.

---

## Project structure

```
src/
  main.ts                          # bootstraps AppComponent with appConfig
  styles.scss                      # global styles (one place, so demos stay about Angular)
  app/
    app.component.ts/.html         # the shell: sidebar + <router-outlet>
    app.config.ts                  # providers: router, HttpClient, interceptors
    app.routes.ts                  # the route table - nearly everything is lazy
    core/concepts.ts               # one source of truth for the concept list
    home/                          # landing page + 404
    concepts/
      01-components/               # one folder per concept, numbered
      02-modules/
      03-data-binding/
      ...
      15-state/
      interview/                   # the Q&A revision page
```

Each concept folder is self-contained. The numbered prefix matches the sidebar order, so you can
read the source top to bottom.

---

## How this app is put together

**Standalone components.** Angular 19 defaults to standalone, so a component declares what it needs
in `imports` instead of being registered in an `NgModule`. Concept 2 shows the older NgModule style
side by side, because existing codebases are full of it.

**Lazy loading everywhere.** Almost every route uses `loadComponent` or `loadChildren`. The
production build proves it works - notice the per-concept chunks:

```
Initial total               | 339.23 kB raw | 98.23 kB transfer
Lazy chunk files
  forms-demo-component      |  12.57 kB
  directives-demo-component |   6.70 kB
  rxjs-demo-component       |   6.29 kB
  legacy-feature-module     |   4.15 kB   <- a whole NgModule, on demand
  ...
```

**No backend required.** `mockApiInterceptor` answers `/api/users` inside the browser with 500 ms
of fake latency, so the HttpClient page works with no server. Swap it out and point `UsersService`
at a real URL and nothing else changes.

**Signals where they help.** Services, guards and the state store use `signal` / `computed`. The
RxJS page covers when Observables are still the right tool.

---

## Notes

- **Angular 19**, built with the official CLI (`ng new`). Angular 22 is the latest release, but it
  requires Node 22+; 19 keeps the repo runnable on Node 20 while still using the modern APIs -
  standalone components, signals, `@if`/`@for` control flow and functional guards.
- **No extra dependencies.** Just Angular, RxJS and TypeScript. No UI kit, no state library, so
  nothing distracts from the framework itself.
- Unit tests are deliberately out of scope here (the CLI's default spec was removed with the
  welcome page). `ng test` works if you add specs.

---

## Roadmap - where this can grow next

- [ ] **Signals in depth** - `input()`/`output()`/`model()`, `linkedSignal`, `resource()`.
- [ ] **NgRx** - a real store with actions, reducers, effects and devtools.
- [ ] **Testing** - specs for the store, the pipe and the guard; `HttpTestingController` for HTTP.
- [ ] **SSR / hydration** - `ng add @angular/ssr`.
- [ ] **Accessibility** - a pass over focus management and ARIA in the demos.
- [ ] **PWA** - `ng add @angular/pwa`.
- [ ] **Standalone-only migration** - move the NgModule demo to a modern equivalent and explain the trade-off.
