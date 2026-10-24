import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Employee, EmployeeCardComponent } from './employee-card.component';

/**
 * CONCEPT 1a - COMPONENTS.
 *
 * What: a component is the reusable building block of an Angular UI. It owns a
 *       piece of the screen and the logic behind it.
 * Why:  without components you get one giant HTML file where nothing can be
 *       reused, tested, or reasoned about in isolation.
 *
 * This is the PARENT. It holds the list of employees and renders one
 * <app-employee-card> per employee, listening for the (promote) event.
 */
@Component({
  selector: 'app-components-demo',
  // The parent must import every standalone thing its template uses.
  imports: [EmployeeCardComponent, CurrencyPipe],
  template: `
    <h1>1. Components</h1>
    <p class="lead">
      A component = class + template + metadata. Components are composable:
      this page renders three child cards and reacts to their events.
    </p>

    <div class="panel">
      <h2>The component in use</h2>
      <p class="muted">Click <em>Give a raise</em> - the child emits an event, the parent handles it.</p>

      <div class="cards">
        @for (employee of employees; track employee.id) {
          <!-- [employee] is an input binding; (promote) is an event binding. -->
          <app-employee-card
            [employee]="employee"
            (promote)="giveRaise($event)"
          />
        }
      </div>

      <p style="margin-top:.8rem">
        Total payroll: <strong>{{ totalPayroll() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
      </p>
    </div>

    <div class="panel">
      <h2>Anatomy</h2>
      <table class="grid">
        <thead>
          <tr><th>Piece</th><th>What it does</th></tr>
        </thead>
        <tbody>
          <tr><td class="mono">selector</td><td>The HTML tag other templates use: <code class="inline">&lt;app-employee-card&gt;</code></td></tr>
          <tr><td class="mono">template</td><td>The HTML (inline, or a separate .html file via templateUrl)</td></tr>
          <tr><td class="mono">imports</td><td>What this component's template needs - directives, pipes, child components</td></tr>
          <tr><td class="mono">&#64;Input()</td><td>Data coming IN from the parent</td></tr>
          <tr><td class="mono">&#64;Output()</td><td>Events going OUT to the parent</td></tr>
        </tbody>
      </table>
      <div class="note">
        <strong>Why it matters:</strong> a component hides its own details. The parent does not know
        <em>how</em> a card renders - only that it takes an employee and can emit a promote event.
        That contract is what makes large UIs possible.
      </div>
    </div>
  `,
})
export class ComponentsDemoComponent {
  employees: Employee[] = [
    { id: 1, name: 'Vishnu', role: 'Engineer', salary: 950000 },
    { id: 2, name: 'Vinith', role: 'Designer', salary: 720000 },
    { id: 3, name: 'Rohith', role: 'Manager', salary: 1100000 },
  ];

  /** Handles the child's output event. `$event` is the emitted employee id. */
  giveRaise(id: number): void {
    const employee = this.employees.find((e) => e.id === id);
    if (employee) {
      employee.salary += 50000;
    }
  }

  totalPayroll(): number {
    return this.employees.reduce((sum, e) => sum + e.salary, 0);
  }
}
