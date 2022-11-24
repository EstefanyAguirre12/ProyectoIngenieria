import { API_RESPONSE } from "./common";

export interface AdminResponse extends API_RESPONSE {
  items: Admin[];
  totalItems: number;
}

export interface Admin {
  id: number;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface CreateAdmin {
  email: string;
  password: string;
  passwordConfirm: string;
}
