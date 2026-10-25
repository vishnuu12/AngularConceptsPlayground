import { Routes } from '@angular/router';
import { authGuard } from './concepts/08-guards/auth.guard';

/**
 * The route table: URL -> what to render.
 *
 * Notice that almost every concept is loaded with `loadComponent`, which is a
 * LAZY load: the browser only downloads that concept's code when the user
 * actually visits it. The initial bundle stays small.
 *
 * There are three lazy styles here, deliberately:
 *   - loadComponent  -> lazily load a single standalone component
 *   - loadChildren   -> lazily load a set of routes (see 'lazy-loading')
 *   - loadChildren with an NgModule -> lazily load a whole NgModule ('modules')
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Angular Concepts Playground',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },

  // ---- 1. Components ---------------------------------------------------
  {
    path: 'components',
    title: 'Components',
    loadComponent: () =>
      import('./concepts/01-components/components-demo.component').then((m) => m.ComponentsDemoComponent),
  },

  // ---- 2. Modules (a real NgModule, lazily loaded) ---------------------
  {
    path: 'modules',
    title: 'Modules',
    loadChildren: () =>
      import('./concepts/02-modules/legacy-feature.module').then((m) => m.LegacyFeatureModule),
  },

  // ---- 3. Data binding -------------------------------------------------
  {
    path: 'data-binding',
    title: 'Data Binding',
    loadComponent: () =>
      import('./concepts/03-data-binding/data-binding-demo.component').then((m) => m.DataBindingDemoComponent),
  },

  // ---- 4. Directives ---------------------------------------------------
  {
    path: 'directives',
    title: 'Directives',
    loadComponent: () =>
      import('./concepts/04-directives/directives-demo.component').then((m) => m.DirectivesDemoComponent),
  },

  // ---- 5. Pipes --------------------------------------------------------
  {
    path: 'pipes',
    title: 'Pipes',
    loadComponent: () => import('./concepts/05-pipes/pipes-demo.component').then((m) => m.PipesDemoComponent),
  },

  // ---- 6. Services & DI ------------------------------------------------
  {
    path: 'services-di',
    title: 'Services & DI',
    loadComponent: () =>
      import('./concepts/06-services-di/services-di-demo.component').then((m) => m.ServicesDiDemoComponent),
  },

  // ---- 7. Routing (with child routes and a route parameter) ------------
  {
    path: 'routing',
    title: 'Routing',
    loadComponent: () =>
      import('./concepts/07-routing/routing-demo.component').then((m) => m.RoutingDemoComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./concepts/07-routing/route-overview.component').then((m) => m.RouteOverviewComponent),
      },
      {
        // :id is a ROUTE parameter - read with ActivatedRoute or as an input.
        path: 'detail/:id',
        loadComponent: () =>
          import('./concepts/07-routing/route-detail.component').then((m) => m.RouteDetailComponent),
      },
    ],
  },

  // ---- 8. Guards -------------------------------------------------------
  {
    path: 'guards',
    title: 'Guards',
    loadComponent: () =>
      import('./concepts/08-guards/guards-demo.component').then((m) => m.GuardsDemoComponent),
  },
  {
    // Protected by a functional CanActivate guard.
    path: 'admin',
    title: 'Admin (guarded)',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./concepts/08-guards/admin.component').then((m) => m.AdminComponent),
  },

  // ---- 9. Lazy loading -------------------------------------------------
  {
    path: 'lazy-loading',
    title: 'Lazy Loading',
    loadComponent: () =>
      import('./concepts/09-lazy-loading/lazy-demo.component').then((m) => m.LazyDemoComponent),
  },
  {
    // A whole feature (its own route file) that is NOT downloaded until the
    // user follows a link to /heavy.
    path: 'heavy',
    title: 'Heavy feature (lazy)',
    loadChildren: () =>
      import('./concepts/09-lazy-loading/heavy-feature.routes').then((m) => m.HEAVY_FEATURE_ROUTES),
  },

  // ---- 10. HttpClient --------------------------------------------------
  {
    path: 'http',
    title: 'HttpClient',
    loadComponent: () => import('./concepts/10-http/http-demo.component').then((m) => m.HttpDemoComponent),
  },

  // ---- 11. Forms -------------------------------------------------------
  {
    path: 'forms',
    title: 'Forms',
    loadComponent: () => import('./concepts/11-forms/forms-demo.component').then((m) => m.FormsDemoComponent),
  },

  // ---- 12. Lifecycle hooks --------------------------------------------
  {
    path: 'lifecycle',
    title: 'Lifecycle Hooks',
    loadComponent: () =>
      import('./concepts/12-lifecycle/lifecycle-demo.component').then((m) => m.LifecycleDemoComponent),
  },

  // ---- 13. RxJS --------------------------------------------------------
  {
    path: 'rxjs',
    title: 'RxJS & Observables',
    loadComponent: () => import('./concepts/13-rxjs/rxjs-demo.component').then((m) => m.RxjsDemoComponent),
  },

  // ---- 14. Angular CLI -------------------------------------------------
  {
    path: 'cli',
    title: 'Angular CLI',
    loadComponent: () => import('./concepts/14-cli/cli-demo.component').then((m) => m.CliDemoComponent),
  },

  // ---- 15. State management -------------------------------------------
  {
    path: 'state',
    title: 'State Management',
    loadComponent: () =>
      import('./concepts/15-state/state-demo.component').then((m) => m.StateDemoComponent),
  },

  // ---- Interview prep --------------------------------------------------
  // A single page that gathers every concept into question form - the one
  // place to revise from before an interview.
  {
    path: 'interview',
    title: 'Interview prep',
    loadComponent: () =>
      import('./concepts/interview/interview-prep.component').then((m) => m.InterviewPrepComponent),
  },

  // ---- Fallback --------------------------------------------------------
  {
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./home/not-found.component').then((m) => m.NotFoundComponent),
  },
];
