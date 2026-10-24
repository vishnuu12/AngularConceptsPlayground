import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { NewUser, User } from './user.model';

/**
 * CONCEPT 10e - a MOCK BACKEND, implemented as an interceptor.
 *
 * This playground has no server, so this interceptor stands in for one: any
 * request to /api/users is answered here and never leaves the browser.
 *
 * It is also a nice demonstration of what interceptors can do - the app's real
 * code (UsersService, the component) is completely unaware that the "server" is
 * a few lines of TypeScript. Swap this out and point the service at a real URL
 * and nothing else changes.
 */
let users: User[] = [
  { id: 1, name: 'Vishnu', email: 'vishnu@example.com' },
  { id: 2, name: 'Vinith', email: 'vinith@example.com' },
  { id: 3, name: 'Rohith', email: 'rohith@example.com' },
];

let nextId = 4;

/** Pretend the network is not instant. */
const LATENCY_MS = 500;

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Anything that is not our fake API goes to the real network.
  if (!req.url.startsWith('/api/users')) {
    return next(req);
  }

  if (req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: [...users] })).pipe(delay(LATENCY_MS));
  }

  if (req.method === 'POST') {
    const body = req.body as NewUser;
    const created: User = { id: nextId++, name: body.name, email: body.email };
    users = [...users, created];
    return of(new HttpResponse({ status: 201, body: created })).pipe(delay(LATENCY_MS));
  }

  if (req.method === 'DELETE') {
    const lastSegment = req.url.split('/').pop() ?? '';
    const id = Number(lastSegment);
    users = users.filter((user) => user.id !== id);
    return of(new HttpResponse({ status: 204 })).pipe(delay(LATENCY_MS));
  }

  // Unknown verb on this URL: let it through and let it fail for real.
  return next(req);
};
