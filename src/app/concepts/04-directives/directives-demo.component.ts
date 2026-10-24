import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { RepeatDirective } from './repeat.directive';

interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: 'low' | 'normal' | 'high';
}

/**
 * CONCEPT 4 - DIRECTIVES.
 *
 * A directive is a class that attaches behaviour to the DOM. Three flavours:
 *
 *   COMPONENT      a directive WITH a template      -> <app-foo>
 *   ATTRIBUTE      changes an existing element      -> [appHighlight], [ngClass]
 *   STRUCTURAL     adds/removes elements            -> *ngIf, *ngFor, @if, @for
 *
 * The @if / @for / @switch syntax (Angular 17+) is the modern, built-in control
 * flow and does not need an import. The older *ngIf / *ngFor forms come from
 * CommonModule and still work everywhere.
 */
@Component({
  selector: 'app-directives-demo',
  // CommonModule brings in *ngIf, *ngFor, ngClass and ngStyle for the legacy examples.
  imports: [CommonModule, HighlightDirective, RepeatDirective],
  template: `
    <h1>4. Directives</h1>
    <p class="lead">
      Directives control the DOM. Below: the modern built-in control flow, the classic
      <code class="inline">*ngIf</code>/<code class="inline">*ngFor</code>, and two directives
      written from scratch.
    </p>

    <div class="panel">
      <h2>Structural - modern &#64;if / &#64;for / &#64;switch</h2>
      <div class="row" style="margin-bottom:.6rem">
        <button (click)="tasks = []">Clear tasks</button>
        <button class="primary" (click)="reset()">Reset tasks</button>
      </div>

      @if (tasks.length === 0) {
        <p class="muted">No tasks. (This paragraph only exists in the DOM while the list is empty.)</p>
      } @else {
        <ul class="tight">
          @for (task of tasks; track task.id; let i = $index) {
            <li>
              <strong>{{ i + 1 }}.</strong> {{ task.title }}
              <span class="badge" [class.badge--ok]="task.done" [class.badge--warn]="!task.done">
                {{ task.done ? 'done' : 'open' }}
              </span>
            </li>
          } @empty {
            <li>Nothing to show.</li>
          }
        </ul>
      }

      <p style="margin-top:.6rem">
        Priority of the first task:
        @switch (tasks.length ? tasks[0].priority : '') {
          @case ('high') { <span class="badge badge--accent">high</span> }
          @case ('normal') { <span class="badge badge--info">normal</span> }
          @default { <span class="badge">low / none</span> }
        }
      </p>
      <div class="note">
        <code class="inline">&#64;for</code> requires <code class="inline">track</code> - it tells
        Angular how to identify each item so it can move DOM nodes instead of rebuilding them.
        That single word is the biggest performance win over the old *ngFor.
      </div>
    </div>

    <div class="panel">
      <h2>Structural - the classic <code class="inline">*ngIf</code> / <code class="inline">*ngFor</code></h2>
      <p class="muted">Still everywhere in existing code. Same job, different spelling.</p>

      <div class="row" style="margin-bottom:.5rem">
        <button (click)="showLegacy = !showLegacy">Toggle list</button>
      </div>

      <ul class="tight" *ngIf="showLegacy; else nothingToShow">
        <li *ngFor="let task of tasks; let i = index; let last = last">
          {{ i + 1 }}. {{ task.title }} <span *ngIf="last">(last one)</span>
        </li>
      </ul>
      <ng-template #nothingToShow>
        <p class="muted">The list is hidden.</p>
      </ng-template>
    </div>

    <div class="panel">
      <h2>Attribute - <code class="inline">ngClass</code> / <code class="inline">ngStyle</code></h2>
      <div
        class="panel panel--soft"
        [ngClass]="{ 'badge--ok': tasks.length > 2 }"
        [ngStyle]="{ borderLeft: '4px solid ' + accentColor }"
        style="margin:0"
      >
        <div class="row" style="justify-content:space-between">
          <span>{{ tasks.length }} task(s)</span>
          <button (click)="cycleAccent()">Change accent</button>
        </div>
      </div>
    </div>

    <div class="panel">
      <h2>Your own attribute directive</h2>
      <p class="muted">Hover these - <code class="inline">appHighlight</code> does the work.</p>
      <div class="row">
        <span class="pill" appHighlight>default colour</span>
        <span class="pill" appHighlight="#bfdbfe">[appHighlight]="'#bfdbfe'"</span>
        <span class="pill" [appHighlight]="accentColor">bound to a variable</span>
      </div>
    </div>

    <div class="panel">
      <h2>Your own structural directive</h2>
      <p class="muted">
        <code class="inline">*appRepeat="5; let i"</code> stamps the template five times.
      </p>
      <div class="pill-list">
        <span class="pill" *appRepeat="5; let i">copy {{ i + 1 }}</span>
      </div>
      <div class="note">
        <strong>Why it matters:</strong> directives are how you package a DOM behaviour once and
        reuse it everywhere - instead of copy-pasting the same click/hover/visibility logic
        into twenty templates.
      </div>
    </div>
  `,
})
export class DirectivesDemoComponent {
  showLegacy = true;
  accentColor = '#dd0031';

  tasks: Task[] = [
    { id: 1, title: 'Write the demo', done: true, priority: 'normal' },
    { id: 2, title: 'Explain the why', done: false, priority: 'high' },
    { id: 3, title: 'Push to GitHub', done: false, priority: 'low' },
  ];

  reset(): void {
    this.tasks = [
      { id: 1, title: 'Write the demo', done: true, priority: 'normal' },
      { id: 2, title: 'Explain the why', done: false, priority: 'high' },
      { id: 3, title: 'Push to GitHub', done: false, priority: 'low' },
    ];
  }

  cycleAccent(): void {
    this.accentColor = this.accentColor === '#dd0031' ? '#2563eb' : '#dd0031';
  }
}
