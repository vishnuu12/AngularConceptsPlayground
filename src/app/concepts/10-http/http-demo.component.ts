import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './users.service';
import { HttpLogService } from './logging.interceptor';
import { NewUser, User } from './user.model';

/**
 * CONCEPT 10 - HTTPCLIENT.
 *
 * What: HttpClient is Angular's way to call a backend. It returns Observables,
 *       so requests are lazy and cancellable.
 * Why:  rolling your own fetch() wrapper means re-implementing typing,
 *       interceptors, error handling, cancellation and testing support.
 *
 * NOTE: there is no real server here. `mockApiInterceptor` answers every
 * /api/users request inside the browser, with 500 ms of fake latency so you can
 * see the loading state.
 */
@Component({
  selector: 'app-http-demo',
  template: `
    <h1>10. HttpClient</h1>
    <p class="lead">
      A typed service calls <code class="inline">/api/users</code>; an interceptor fakes the
      backend; another interceptor logs every request. All three are ordinary Angular code.
    </p>

    <div class="panel">
      <h2>Add a user (POST)</h2>
      <div class="row">
        <input type="text" placeholder="name" style="max-width:180px" [value]="name()" (input)="onName($event)" />
        <input type="email" placeholder="email" style="max-width:220px" [value]="email()" (input)="onEmail($event)" />
        <button class="primary" (click)="add()" [disabled]="saving()">
          {{ saving() ? 'Saving...' : 'Add user' }}
        </button>
      </div>
    </div>

    <div class="panel">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Users (GET)</h2>
        <button (click)="load()" [disabled]="loading()">
          {{ loading() ? 'Loading...' : 'Reload' }}
        </button>
      </div>

      @if (loading()) {
        <p class="muted">Loading...</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else {
        <table class="grid">
          <thead><tr><th>Id</th><th>Name</th><th>Email</th><th></th></tr></thead>
          <tbody>
            @for (user of users(); track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td class="mono">{{ user.email }}</td>
                <td><button (click)="remove(user)">Delete</button></td>
              </tr>
            } @empty {
              <tr><td colspan="4" class="muted">No users. Add one above.</td></tr>
            }
          </tbody>
        </table>
      }
    </div>

    <div class="panel">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Interceptor log</h2>
        <button (click)="log.clear()">Clear</button>
      </div>
      <div class="log" style="margin-top:.5rem">
        @for (line of log.lines(); track $index) {
          <div>{{ line }}</div>
        } @empty {
          <div class="muted">No requests yet.</div>
        }
      </div>
      <div class="note">
        Every line above was written by <code class="inline">loggingInterceptor</code>, which never
        appears in this component's code - that is the point of an interceptor.
      </div>
    </div>

    <div class="panel">
      <h2>Why it matters</h2>
      <ul class="tight">
        <li><strong>Typed responses:</strong> <code class="inline">http.get&lt;User[]&gt;(url)</code>.</li>
        <li><strong>Cancellable:</strong> unsubscribe (or use <code class="inline">switchMap</code>) and the request is dropped.</li>
        <li><strong>Interceptors:</strong> auth headers, retries, spinners and logging written once for the whole app.</li>
        <li><strong>Testable:</strong> swap the service for a fake; no network in unit tests.</li>
      </ul>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>HttpClient returns Observables, which are lazy: nothing is sent until something subscribes, and the async pipe subscribes for you.</li>
        <li>Keep calls in a typed service so the URL and the response shape live in one place; the component just consumes the result.</li>
        <li>An interceptor sees every request and response - the right place for auth headers, logging, retries, a global spinner and error normalisation. Order matters: they run in order out and in reverse back.</li>
        <li>catchError keeps the stream alive after a failure; retry handles transient ones; a 401 usually belongs in a global interceptor.</li>
        <li>In tests, provideHttpClientTesting plus HttpTestingController lets you assert the URL and flush a fake response - no network, no flakiness.</li>
      </ul>
    </div>
  `,
})
export class HttpDemoComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  readonly log = inject(HttpLogService);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');

  readonly name = signal('Kavya');
  readonly email = signal('kavya@example.com');

  ngOnInit(): void {
    this.load();
  }

  onName(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  onEmail(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');

    // HttpClient is lazy: the request only fires when we subscribe.
    this.usersService.list().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(`Request failed: ${err.message}`);
        this.loading.set(false);
      },
    });
  }

  add(): void {
    const body: NewUser = { name: this.name().trim(), email: this.email().trim() };
    if (!body.name || !body.email) {
      this.error.set('Name and email are required.');
      return;
    }

    this.saving.set(true);
    this.usersService.create(body).subscribe({
      next: () => {
        this.saving.set(false);
        this.load(); // refresh so we see the server's version of the row
      },
      error: () => {
        this.error.set('Could not create the user.');
        this.saving.set(false);
      },
    });
  }

  remove(user: User): void {
    this.usersService.remove(user.id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Could not delete the user.'),
    });
  }
}
