interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

interface Group {
  id: number;
  name: string;
  owner: string;
}

interface AuthToken {
  readonly access_token: string;
  readonly access_token_expires_at: string;
  readonly username: string;
}

export { type User, type Group, type AuthToken };
