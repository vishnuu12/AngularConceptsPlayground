import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CONCEPTS } from './core/concepts';

/**
 * CONCEPT 0 - the application shell.
 *
 * In Angular 19 a component is "standalone" by default: it declares the things
 * it needs in `imports` instead of being declared by an NgModule. This shell
 * imports the router directives it uses (RouterOutlet, RouterLink,
 * RouterLinkActive) and nothing else.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Rendered as the sidebar navigation. */
  readonly concepts = CONCEPTS;

  /** The router-outlet renders whatever route is active. */
  readonly year = new Date().getFullYear();
}
