import { API_RESPONSE } from './common';
export interface TenantResponse extends API_RESPONSE{
  statusText(statusText: any, arg1: string);
  data: Tenant[];
}
export interface Tenant {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  dui: string;
  gender: string;
  condition: string;
  status: string;
}
export interface CreateTenant{
  firstname: string;
  lastname: string;
  birthday: string;
  dui: string;
  gender: string;
  condition: string;
  status: string;
}
