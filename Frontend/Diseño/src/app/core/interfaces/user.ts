import { API_RESPONSE } from "./common";


export interface Gender{
 name:string;
}

export interface UsersResponse extends API_RESPONSE {
  data: User[];
}

export interface RolesResponse extends API_RESPONSE {
  data: Rol[];
}

export interface GenderResponse extends API_RESPONSE {
  data: Gender[];
}

export interface User {
  id: number;
  birthday: string;
  firstname: string;
  gender: string;
  lastname: string;
  username: string;
  roleid: Rol;
}

export interface UserPayload {
  id: number;
  birthday: string;
  firstname: string;
  gender: string;
  lastname: string;
  username: string;
  roleidId: string;
}

export interface Rol {
  id: number;
  name: string;
  description: string;
}
