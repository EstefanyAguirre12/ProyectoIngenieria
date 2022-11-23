import { API_RESPONSE } from "./common";

export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthRegister {
  username: string;
  password: string;
}

export interface AuthResponse extends API_RESPONSE {
  token: string;
  user: {
  }
}
