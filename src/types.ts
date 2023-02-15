export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface Group {
  id: number;
  name: string;
  owner: string;
}

export interface TokensData {
  readonly session_id: string;
  readonly access_token: string;
  readonly access_token_expires_at: string;
  readonly refresh_token: string;
  readonly refresh_token_expires_at: string;
  readonly user_id: number;
}

export interface JWTData {
  readonly access_token: string;
  readonly access_token_expires_at: string;
}

export class Message {
  public username: string = ""
  public text: string = ""

    public constructor(init?:Partial<Message>) {
        Object.assign(this, init);
    }
}
