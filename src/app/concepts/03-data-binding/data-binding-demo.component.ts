import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * CONCEPT 3 - DATA BINDING.
 *
 * Data binding is how the class and the template talk to each other. There are
 * exactly four forms, and the punctuation tells you which direction data flows:
 *
 *   {{ value }}          INTERPOLATION   class -> template (as text)
 *   [property]="expr"    PROPERTY BIND   class -> template (one way)
 *   (event)="handler()"  EVENT BIND      template -> class (one way)
 *   [(property)]="x"     TWO-WAY BIND    both directions (banana in a box)
 *
 * Everything else - [class.x], [style.x], [attr.x] - is just a variant of
 * property binding.
 */
@Component({
  selector: 'app-data-binding-demo',
  // CommonModule supplies the built-in pipes/directives (uppercase, ngNonBindable...).
  imports: [CommonModule, FormsModule],
  template: `
    <h1>3. Data Binding</h1>
    <p class="lead">
      The four binding forms, all live on one small object. Change a field and watch which
      parts of the page update.
    </p>

    <div class="panel">
      <h2>1. Interpolation <code class="inline" ngNonBindable>{{ value }}</code></h2>
      <p>
        Class &rarr; template, as text. Angular evaluates the expression and puts the result in the DOM.
      </p>
      <dl class="kv">
        <dt>name</dt><dd>{{ user.name }}</dd>
        <dt>upper</dt><dd>{{ user.name | uppercase }}</dd>
        <dt>a sum</dt><dd>{{ 2 + 3 * 4 }}</dd>
        <dt>method</dt><dd>{{ describe() }}</dd>
      </dl>
    </div>

    <div class="panel">
      <h2>2. Property binding <code class="inline">[property]="expr"</code></h2>
      <p class="muted">Class &rarr; template, one way. Sets a DOM <em>property</em> (not an attribute).</p>

      <div class="row" style="margin-bottom:.6rem">
        <button (click)="toggleDisabled()">Toggle disabled</button>
        <button (click)="toggleTheme()">Toggle theme</button>
      </div>

      <!-- [disabled] sets the DOM property. [class.x] adds/removes a class. -->
      <button class="primary" [disabled]="isDisabled" [class.ghost]="isGhost">
        {{ isDisabled ? 'I am disabled' : 'I am clickable' }}
      </button>

      <pre class="code">[disabled]="isDisabled"        &#8594; currently {{ isDisabled }}
[class.ghost]="isGhost"       &#8594; currently {{ isGhost }}
[style.color]="'{{ textColor }}'"  &#8594; style binding
[attr.aria-label]="'user name'"   &#8594; attribute binding (for attrs with no property)</pre>
    </div>

    <div class="panel">
      <h2>3. Event binding <code class="inline">(event)="handler()"</code></h2>
      <p class="muted">Template &rarr; class. <code class="inline">$event</code> carries the DOM event.</p>

      <div class="row">
        <button class="primary" (click)="onClick($event)">Click me</button>
        <input type="text" placeholder="type here" (input)="onInput($event)" />
      </div>
      <p style="margin-top:.6rem">
        Last event: <span class="mono">{{ lastEvent }}</span>
      </p>
    </div>

    <div class="panel">
      <h2>4. Two-way binding <code class="inline">[(property)]="x"</code></h2>
      <p class="muted">
        Both directions at once - it is literally shorthand for
        <code class="inline">[value]="x" (input)="x = $event.target.value"</code>.
      </p>

      <label class="field">
        <span>With [(ngModel)] (needs FormsModule)</span>
        <input type="text" [(ngModel)]="user.name" name="name" />
      </label>

      <label class="field">
        <span>Hand-rolled two-way, no FormsModule</span>
        <input type="text" [value]="handRolled" (input)="onHandRolled($event)" />
      </label>

      <dl class="kv">
        <dt>user.name</dt><dd>{{ user.name }}</dd>
        <dt>handRolled</dt><dd>{{ handRolled }}</dd>
      </dl>
      <div class="note">
        Both inputs above write to a field, and both display it back - that is two-way binding.
      </div>
    </div>

    <div class="panel">
      <h2>Why it matters</h2>
      <p>
        You never touch the DOM by hand (<code class="inline">document.getElementById</code>,
        <code class="inline">innerHTML =</code>). You describe the relationship between your data and
        the view, and Angular keeps them in sync. That is the single biggest reason Angular code
        stays maintainable as it grows.
      </p>
    </div>
  `,
})
export class DataBindingDemoComponent {
  user = { name: 'Vishnu', salary: 950000, joined: new Date(2021, 5, 14) };

  isDisabled = false;
  isGhost = false;
  textColor = '#dd0031';
  lastEvent = '(nothing yet)';
  handRolled = 'type here too';

  describe(): string {
    return `${this.user.name} joined in ${this.user.joined.getFullYear()}`;
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  toggleTheme(): void {
    this.isGhost = !this.isGhost;
  }

  onClick(event: MouseEvent): void {
    this.lastEvent = `click at (${event.clientX}, ${event.clientY})`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.lastEvent = `input: "${target.value}"`;
  }

  onHandRolled(event: Event): void {
    this.handRolled = (event.target as HTMLInputElement).value;
  }
}
