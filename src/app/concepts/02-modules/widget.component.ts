import { Component, Input } from '@angular/core';

/**
 * CONCEPT 2b - a NON-standalone component, i.e. one that an NgModule declares.
 *
 * Note `standalone: false`. In Angular 19 standalone is the DEFAULT, so a
 * component that is meant to be declared by an NgModule has to say so
 * explicitly. This component does not list its own imports; instead the module
 * that declares it provides the context (CommonModule, other declarations...).
 */
@Component({
  selector: 'app-legacy-widget',
  standalone: false,
  template: `
    <div class="panel panel--soft" style="margin:0">
      <strong>{{ label }}</strong>
      <p class="muted" style="margin:.25rem 0 0;font-size:.85rem">
        Rendered {{ renderCount }} time(s) since it was created.
      </p>
    </div>
  `,
})
export class LegacyWidgetComponent {
  @Input() label = 'widget';
  @Input() renderCount = 1;
}
