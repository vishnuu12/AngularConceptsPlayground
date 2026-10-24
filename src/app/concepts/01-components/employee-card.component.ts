import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/** A tiny model, so the components have something real to show. */
export interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
}

/**
 * CONCEPT 1b - a CHILD component.
 *
 * A component is three things glued together:
 *   1. a class (the logic),
 *   2. a template (the view),
 *   3. metadata (@Component: selector, inputs, outputs, styles...).
 *
 * This one is reusable: the parent passes data IN with @Input and listens for
 * events OUT with @Output. That is the whole idea of a component - a small,
 * isolated, reusable piece of UI.
 *
 * (Modern alternative: signal inputs - `employee = input.required<Employee>()`
 * and `promote = output<number>()`. Same idea, different spelling. The
 * decorator form below still works and is what most existing code uses.)
 */
@Component({
  selector: 'app-employee-card',
  // The child must import the pipe its own template uses.
  imports: [CurrencyPipe],
  template: `
    <div class="panel panel--soft" style="margin:0">
      <div class="row" style="justify-content:space-between">
        <strong>{{ employee.name }}</strong>
        <span class="badge badge--info">{{ employee.role }}</span>
      </div>
      <p class="muted" style="margin:.35rem 0 .6rem;font-size:.85rem">
        {{ employee.salary | currency: 'INR' : 'symbol' : '1.0-0' }} per year
      </p>
      <button class="primary" (click)="promote.emit(employee.id)">Give a raise</button>
    </div>
  `,
})
export class EmployeeCardComponent {
  /** Data flows IN through an input. `required` makes it a compile-time error to forget it. */
  @Input({ required: true }) employee!: Employee;

  /** Events flow OUT through an output. The parent binds to it with (promote)="...". */
  @Output() promote = new EventEmitter<number>();
}
