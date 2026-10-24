/** A row from the (mock) backend. */
export interface User {
  id: number;
  name: string;
  email: string;
}

/** The shape sent when creating one - the server assigns the id. */
export type NewUser = Omit<User, 'id'>;
