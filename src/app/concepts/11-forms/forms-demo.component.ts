import { Component, signal } from '@angular/core';
import { TemplateFormComponent } from './template-form.component';
import { ReactiveFormComponent } from './reactive-form.component';

/**
 * CONCEPT 11 - FORMS (the page).
 *
 * Angular gives you two ways to build a form, and the honest answer to "which
 * one?" is: reactive for anything real, template-driven for quick and small.
 */
@Component({
  selector: 'app-forms-demo',
  imports: [TemplateFormComponent, ReactiveFormComponent],
  template: `
    <h1>11. Forms</h1>
    <p class="lead">
      Both forms below have the same fields and the same rules. Compare how they are built -
      that difference is the whole argument.
    </p>

    <div class="panel">
      <h2>The two approaches</h2>
      <table class="grid">
        <thead><tr><th></th><th>Template-driven</th><th>Reactive</th></tr></thead>
        <tbody>
          <tr><td>Built in</td><td>The HTML</td><td>The class</td></tr>
          <tr><td>Module</td><td class="mono">FormsModule</td><td class="mono">ReactiveFormsModule</td></tr>
          <tr><td>Binding</td><td class="mono">[(ngModel)]</td><td class="mono">formControlName</td></tr>
          <tr><td>Validation</td><td>HTML attributes</td><td>Validators in code</td></tr>
          <tr><td>Dynamic fields</td><td>Awkward</td><td>Natural (FormArray)</td></tr>
          <tr><td>Unit-testable</td><td>Needs the template</td><td>Yes - it is just objects</td></tr>
          <tr><td>Best for</td><td>Small, simple forms</td><td>Everything else</td></tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Live example</h2>
        <div class="row">
          <button [class.primary]="mode() === 'template'" (click)="mode.set('template')">Template-driven</button>
          <button [class.primary]="mode() === 'reactive'" (click)="mode.set('reactive')">Reactive</button>
        </div>
      </div>

      <div style="margin-top:.8rem">
        @if (mode() === 'template') {
          <app-template-form />
        } @else {
          <app-reactive-form />
        }
      </div>
    </div>

    <div class="panel">
      <h2>What you get for free</h2>
      <ul class="tight">
        <li><strong>Control states:</strong> <code class="inline">valid</code>, <code class="inline">invalid</code>, <code class="inline">touched</code>, <code class="inline">dirty</code>, <code class="inline">pending</code>.</li>
        <li><strong>CSS classes:</strong> Angular adds <code class="inline">ng-valid</code>, <code class="inline">ng-touched</code>, <code class="inline">ng-invalid</code> - which is how the red borders in this page work.</li>
        <li><strong>Value stream:</strong> <code class="inline">form.valueChanges</code> lets you react as the user types.</li>
        <li><strong>Async validators:</strong> return a Promise/Observable from a validator (e.g. "is this username free?").</li>
      </ul>
      <div class="note note--warn">
        <strong>Do not rely on the client.</strong> Validation in the browser is for the user's
        benefit. Anything important must be validated again on the server.
      </div>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>Template-driven (FormsModule, ngModel) builds the model from the HTML. Reactive (ReactiveFormsModule, FormBuilder) builds it in the class, so it is typed, testable and easy to make dynamic.</li>
        <li>Default to reactive for anything real; template-driven is fine for one or two fields.</li>
        <li>A validator is a function returning null or an error object. A group validator receives the whole FormGroup, which is how you compare two fields.</li>
        <li>Show an error only when the control is invalid AND touched - shouting at someone mid-typing is the classic form UX mistake.</li>
        <li>patchValue for partial updates, setValue when the whole shape must match. And remember client validation is feedback; the server validates for real.</li>
      </ul>
    </div>
  `,
})
export class FormsDemoComponent {
  readonly mode = signal<'template' | 'reactive'>('reactive');
}
