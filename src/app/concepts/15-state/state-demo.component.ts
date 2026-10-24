import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TodosStore } from './todos.store';

/**
 * CONCEPT 15 - STATE MANAGEMENT.
 *
 * What: deciding where application state lives and how it changes.
 * Why:  with state scattered across components you get duplicated data, stale
 *       copies, and "I changed it here but the other screen did not update".
 *
 * The demo below uses a signal store (previous file). The page then explains
 * where the bigger libraries - NgRx and Akita - fit.
 */
@Component({
  selector: 'app-state-demo',
  imports: [DecimalPipe],
  template: `
    <h1>15. State Management</h1>
    <p class="lead">
      One store owns the todos. Two independent views read the SAME store, so they can never
      disagree - that is the entire point.
    </p>

    <div class="panel">
      <h2>Add a todo</h2>
      <div class="row">
        <input
          type="text"
          placeholder="what needs doing?"
          style="max-width:320px"
          [value]="draft()"
          (input)="onDraft($event)"
          (keyup.enter)="add()"
        />
        <button class="primary" (click)="add()">Add</button>
        <button (click)="store.seed()">Seed examples</button>
        <button (click)="store.clearCompleted()" [disabled]="store.completed() === 0">Clear done</button>
      </div>
    </div>

    <div class="cards">
      <!-- View 1: the list. -->
      <div class="panel">
        <h2>View A - the list</h2>
        <ul class="tight">
          @for (todo of store.todos(); track todo.id) {
            <li>
              <label style="display:inline-flex;gap:.4rem;align-items:center">
                <input type="checkbox" style="width:auto" [checked]="todo.done" (change)="store.toggle(todo.id)" />
                <span [style.text-decoration]="todo.done ? 'line-through' : 'none'">{{ todo.title }}</span>
              </label>
              <button class="ghost" (click)="store.remove(todo.id)" title="remove">&times;</button>
            </li>
          } @empty {
            <li class="muted">Nothing yet.</li>
          }
        </ul>
      </div>

      <!-- View 2: derived numbers from the same store. -->
      <div class="panel">
        <h2>View B - derived state</h2>
        <p class="muted" style="font-size:.85rem">
          These are <code class="inline">computed()</code> values. Nobody updates them - they
          recalculate when the store changes.
        </p>
        <dl class="kv">
          <dt>total</dt><dd>{{ store.total() }}</dd>
          <dt>completed</dt><dd>{{ store.completed() }}</dd>
          <dt>remaining</dt><dd>{{ store.remaining() }}</dd>
          <dt>completion</dt><dd>{{ store.completion() * 100 | number: '1.0-0' }}%</dd>
        </dl>
      </div>
    </div>

    <div class="panel">
      <h2>Where the libraries fit</h2>
      <table class="grid">
        <thead><tr><th>Approach</th><th>Good for</th><th>Cost</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Component state</strong><br /><span class="muted mono">signal / plain field</span></td>
            <td>State only one component needs</td>
            <td>None - start here</td>
          </tr>
          <tr>
            <td><strong>Service + signals</strong><br /><span class="muted mono">what this page does</span></td>
            <td>Shared state in a small/medium app</td>
            <td>A little discipline</td>
          </tr>
          <tr>
            <td><strong>Akita</strong></td>
            <td>Teams that want a store with less ceremony than NgRx</td>
            <td>One dependency, fewer concepts</td>
          </tr>
          <tr>
            <td><strong>NgRx</strong></td>
            <td>Large apps, many teams, complex async flows, strong devtools/time-travel</td>
            <td>Real boilerplate: actions, reducers, effects, selectors</td>
          </tr>
        </tbody>
      </table>

      <p class="muted" style="margin-top:.6rem">
        NgRx is the same idea with more structure - the store is still the only writer:
      </p>
      <pre class="code">// actions: the only things that can happen
export const addTodo = createAction('[Todos] Add', props&lt;&#123; title: string &#125;&gt;());

// reducer: a PURE function (state, action) =&gt; newState
export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, &#123; title &#125;) =&gt; [...state, &#123; id: nextId(), title, done: false &#125;]),
);

// selectors: derived, memoised reads
export const selectRemaining = createSelector(selectTodos, (todos) =&gt;
  todos.filter(t =&gt; !t.done).length,
);</pre>

      <div class="note note--warn">
        <strong>Do not reach for a state library on day one.</strong> A service with signals covers
        most apps. Add NgRx when you can name the problem it solves - usually cross-cutting async
        workflows or a large team that needs one enforced pattern.
      </div>
    </div>
  `,
})
export class StateDemoComponent {
  readonly store = inject(TodosStore);
  readonly draft = signal('');

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  add(): void {
    this.store.add(this.draft());
    this.draft.set('');
  }
}
