import { Injectable, computed, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

/**
 * CONCEPT 15b - a small STORE built from signals.
 *
 * A store is a single place that owns a slice of application state, and the
 * only place allowed to change it. Components read from it and call its methods
 * - they never mutate the state directly.
 *
 * Why bother? Because "who changed this?" is the hardest question in a growing
 * UI. One owner, one set of methods, and the answer is always the same.
 *
 * Signals make this tiny: `computed` derives values and updates automatically,
 * and any template reading them re-renders.
 */
@Injectable({ providedIn: 'root' })
export class TodosStore {
  private nextId = 1;

  private readonly _todos = signal<Todo[]>([]);

  // ---- readable state --------------------------------------------------
  readonly todos = this._todos.asReadonly();

  // ---- derived state: recomputed only when _todos changes --------------
  readonly total = computed(() => this._todos().length);
  readonly completed = computed(() => this._todos().filter((t) => t.done).length);
  readonly remaining = computed(() => this.total() - this.completed());
  readonly completion = computed(() => (this.total() === 0 ? 0 : this.completed() / this.total()));

  // ---- the only ways to change state -----------------------------------
  add(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    this._todos.update((todos) => [...todos, { id: this.nextId++, title: trimmed, done: false }]);
  }

  toggle(id: number): void {
    this._todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  remove(id: number): void {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  clearCompleted(): void {
    this._todos.update((todos) => todos.filter((todo) => !todo.done));
  }

  seed(): void {
    this._todos.set([
      { id: this.nextId++, title: 'Learn components', done: true },
      { id: this.nextId++, title: 'Learn routing', done: true },
      { id: this.nextId++, title: 'Learn state management', done: false },
    ]);
  }
}
