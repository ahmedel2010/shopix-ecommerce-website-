export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface StoredUser extends User {
  passwordHash: string;
}
