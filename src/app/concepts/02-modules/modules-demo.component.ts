import { Component } from '@angular/core';

/**
 * CONCEPT 2a - the page you are looking at, declared by an NgModule.
 *
 * This component is NOT standalone either - `LegacyFeatureModule` declares it.
 * Because the module imports CommonModule, the template below can use built-in
 * directives like *ngIf without importing anything itself.
 */
@Component({
  selector: 'app-modules-demo',
  standalone: false,
  template: `
    <h1>2. Modules (NgModule)</h1>
    <p class="lead">
      An NgModule is a container that <em>groups</em> related components, directives, pipes and
      services into one cohesive block. This whole page - the component, the widget below, and
      the routing that got you here - is one NgModule that was lazily downloaded.
    </p>

    <div class="panel">
      <h2>Proof this page is inside a module</h2>
      <p>
        Nothing on this page is standalone. Both this component and the widget below are
        <code class="inline">declared</code> in <code class="inline">LegacyFeatureModule</code>,
        and this template can use <code class="inline">*ngIf</code> without importing
        <code class="inline">CommonModule</code> itself.
      </p>

      <!-- *ngIf works here because the MODULE imports CommonModule. -->
      <div class="row" style="margin-bottom:.8rem">
        <button (click)="showWidget = !showWidget">
          {{ showWidget ? 'Hide' : 'Show' }} the widget
        </button>
        <span class="badge badge--info">*ngIf (module-provided)</span>
      </div>

      <div *ngIf="showWidget" class="cards">
        <app-legacy-widget label="I am declared, not imported" [renderCount]="3" />
      </div>
    </div>

    <div class="panel">
      <h2>What an NgModule actually holds</h2>
      <table class="grid">
        <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td class="mono">declarations</td><td>Components / directives / pipes that BELONG to this module</td></tr>
          <tr><td class="mono">imports</td><td>Other modules whose exports this module's declarations may use</td></tr>
          <tr><td class="mono">exports</td><td>What this module makes available to whoever imports it</td></tr>
          <tr><td class="mono">providers</td><td>Services registered at this module's injector level</td></tr>
          <tr><td class="mono">bootstrap</td><td>Only for the root module (apps use bootstrapApplication now)</td></tr>
        </tbody>
      </table>
      <div class="note">
        <strong>Modules vs standalone:</strong> since Angular 15 you can build an app entirely
        from standalone components (no NgModules at all) - that is what every other page here
        does. NgModules still matter because <em>existing</em> codebases are full of them, and
        because a module is a convenient unit to lazy-load as one chunk.
      </div>
      <div class="note note--warn">
        <strong>Why not just put everything in one module?</strong> Because everything ends up in
        one bundle. Splitting into feature modules lets the router download only what a user
        actually visits - which is exactly what this page demonstrates.
      </div>
    </div>
  `,
})
export class ModulesDemoComponent {
  showWidget = true;
}
