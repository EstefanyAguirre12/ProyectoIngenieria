import { API_RESPONSE } from "./common";

export interface ProfileResponse extends API_RESPONSE {
  data: Profile[];
}

export interface Profile {
  id: number;
  birthday: string;
  firstname: string;
  gender: string;
  lastname: string;
  password: string;
  username: string;
  roleid: Role;
}

export interface UpdateProfile {
  id: number;
  birthday: string;
  firstname: string;
  gender: string;
  lastname: string;
  password: string;
  username: string;
  tenantid: number;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}
