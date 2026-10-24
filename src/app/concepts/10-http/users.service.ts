import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser, User } from './user.model';

/**
 * CONCEPT 10b - a typed HTTP service.
 *
 * HttpClient returns Observables, which are lazy: nothing is sent until someone
 * subscribes (or an `async` pipe subscribes for you).
 *
 * Note the generic on each call - `get<User[]>` - which is what gives you type
 * safety on the response. There is no runtime check, so keep the type honest.
 *
 * No backend is running in this playground; `mockApiInterceptor` answers these
 * requests instead. The service does not know or care.
 */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/users';

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  create(user: NewUser): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
