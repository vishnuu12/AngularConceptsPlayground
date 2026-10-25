import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InitialsPipe } from './initials.pipe';

/**
 * CONCEPT 5 - PIPES.
 *
 * A pipe transforms a value for DISPLAY, without changing the underlying data.
 * `{{ price | currency }}` shows a formatted price; `price` itself is untouched.
 *
 * Syntax: {{ value | pipeName : arg1 : arg2 }} - and they chain left to right.
 *
 * NOTE ON THIS TEMPLATE: to *show* a pipe expression as text we put
 * `ngNonBindable` on the element. Without it, Angular would evaluate the braces
 * as a real interpolation instead of printing them.
 */
@Component({
  selector: 'app-pipes-demo',
  // Two options for a standalone component:
  //   import CommonModule          -> brings ALL built-in pipes and directives
  //   import CurrencyPipe, ...     -> brings only what you use (smaller bundle)
  // CommonModule is used here so `ngNonBindable` is available too.
  imports: [CommonModule, InitialsPipe],
  template: `
    <h1>5. Pipes</h1>
    <p class="lead">
      Pipes format data in the template. The value in the class never changes - only what the
      user sees.
    </p>

    <div class="panel">
      <h2>Built-in pipes</h2>
      <table class="grid">
        <thead><tr><th>Template</th><th>Result</th></tr></thead>
        <tbody>
          <tr>
            <td class="mono" ngNonBindable>{{ name | uppercase }}</td>
            <td>{{ name | uppercase }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ name | lowercase }}</td>
            <td>{{ name | lowercase }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ salary | currency : 'INR' : 'symbol' : '1.0-0' }}</td>
            <td>{{ salary | currency: 'INR' : 'symbol' : '1.0-0' }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ salary | currency : 'EUR' : 'code' }}</td>
            <td>{{ salary | currency: 'EUR' : 'code' }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ joined | date : 'dd/MM/yyyy' }}</td>
            <td>{{ joined | date: 'dd/MM/yyyy' }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ joined | date : 'fullDate' }}</td>
            <td>{{ joined | date: 'fullDate' }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ completion | percent }}</td>
            <td>{{ completion | percent }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ name | slice : 0 : 3 }}</td>
            <td>{{ name | slice: 0 : 3 }}</td>
          </tr>
        </tbody>
      </table>
      <p class="muted" style="margin-top:.6rem">
        Note how each pipe takes <em>arguments</em> after a colon - that is how you configure it.
      </p>
    </div>

    <div class="panel">
      <h2>Chaining</h2>
      <p>Pipes run left to right, each feeding the next:</p>
      <p class="mono">
        <span ngNonBindable>{{ name | slice : 0 : 6 | uppercase }}</span> &rarr;
        <strong>{{ name | slice: 0 : 6 | uppercase }}</strong>
      </p>
      <p class="mono">
        <span ngNonBindable>{{ joined | date : 'MMM' | uppercase }}</span> &rarr;
        <strong>{{ joined | date: 'MMM' | uppercase }}</strong>
      </p>
    </div>

    <div class="panel">
      <h2>Your own pipe</h2>
      <p class="muted">An <code class="inline">&#64;Pipe</code> class with a <code class="inline">transform</code> method.</p>
      <table class="grid">
        <thead><tr><th>Template</th><th>Result</th></tr></thead>
        <tbody>
          <tr>
            <td class="mono" ngNonBindable>{{ name | initials }}</td>
            <td>{{ name | initials }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ name | initials : 3 }}</td>
            <td>{{ name | initials: 3 }}</td>
          </tr>
          <tr>
            <td class="mono" ngNonBindable>{{ emptyName | initials }}</td>
            <td>"{{ emptyName | initials }}"</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <h2>Debugging helper</h2>
      <p class="muted"><code class="inline">json</code> prints an object, which is handy while developing.</p>
      <pre class="code">{{ employee | json }}</pre>
    </div>

    <div class="panel">
      <h2>Why it matters</h2>
      <p>
        Formatting is a <em>display</em> concern, not a data concern. Pipes keep it out of your
        class: you store <code class="inline">950000</code> and show
        <code class="inline">&#8377;9,50,000</code>, and when the product team asks for a different
        format you change the template, not the data. Pipes are also reused across every template
        in the app.
      </p>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>A pipe transforms a value for display; the underlying data is untouched. Formatting is a view concern, not a data concern.</li>
        <li>Pure by default: it re-runs only when its input changes. An impure pipe runs on every change-detection cycle, which is a performance trap on a list.</li>
        <li>They chain left to right, and arguments come after colons: value | slice : 0 : 6 | uppercase.</li>
        <li>A custom pipe is an &#64;Pipe class with a transform method - and it is the easiest thing in Angular to test: instantiate the class and call transform.</li>
        <li>Do not put behaviour in a pipe that belongs in the component. Pipes format; they do not decide.</li>
      </ul>
    </div>
  `,
})
export class PipesDemoComponent {
  name = 'Vishnu Saravanan';
  emptyName = '';
  salary = 950000;
  completion = 0.7345;
  joined = new Date(2021, 5, 14);
  employee = { id: 1, name: 'Vishnu', role: 'Engineer', active: true };
}
