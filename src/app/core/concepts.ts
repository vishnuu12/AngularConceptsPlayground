/**
 * One source of truth for the concept list.
 *
 * Both the sidebar navigation and the home page render from this array, so
 * adding a concept later means adding one entry here plus its route - nothing
 * else has to be touched.
 */
export interface Concept {
  /** URL segment, e.g. 'data-binding' -> /data-binding */
  readonly slug: string;
  /** Shown in the nav and on the card. */
  readonly title: string;
  /** One-line description of what the concept is. */
  readonly blurb: string;
}

export const CONCEPTS: readonly Concept[] = [
  { slug: 'components',     title: 'Components',        blurb: 'The building blocks: a class + a template + metadata.' },
  { slug: 'modules',        title: 'Modules',           blurb: 'NgModule groups components and services (lazily loaded here).' },
  { slug: 'data-binding',   title: 'Data Binding',      blurb: '{{ }}, [ ], ( ) and [( )] - moving data both ways.' },
  { slug: 'directives',     title: 'Directives',        blurb: '*ngIf / *ngFor, the new @if / @for, and a custom directive.' },
  { slug: 'pipes',          title: 'Pipes',             blurb: 'Transform values in the template, plus your own pipe.' },
  { slug: 'services-di',    title: 'Services & DI',     blurb: 'Share logic through dependency injection.' },
  { slug: 'routing',        title: 'Routing',           blurb: 'URLs -> views, with route and query parameters.' },
  { slug: 'guards',         title: 'Guards',            blurb: 'Allow or block navigation (auth check, unsaved changes).' },
  { slug: 'lazy-loading',   title: 'Lazy Loading',      blurb: 'Download feature code only when the user opens it.' },
  { slug: 'http',           title: 'HttpClient',        blurb: 'Talk to a backend, with an interceptor in front.' },
  { slug: 'forms',          title: 'Forms',             blurb: 'Template-driven and reactive, with validation.' },
  { slug: 'lifecycle',      title: 'Lifecycle Hooks',   blurb: 'ngOnInit, ngOnChanges, ngOnDestroy and friends.' },
  { slug: 'rxjs',           title: 'RxJS & Observables',blurb: 'Streams of values, operators, and the async pipe.' },
  { slug: 'cli',            title: 'Angular CLI',       blurb: 'Scaffold, build, serve, test - the commands you use daily.' },
  { slug: 'state',          title: 'State Management',  blurb: 'A signal store, and where NgRx / Akita fit in.' },
];
