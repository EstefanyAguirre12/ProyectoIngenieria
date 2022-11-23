import { API_RESPONSE } from "./common";

export interface VisitsResponse extends API_RESPONSE {
  items: Visit[];
}

export interface TenantResponse extends API_RESPONSE {
  items: Tenant[];
}

export interface Visit {
  id: number;
  name: string;
  tenantid: number;
  dui: string;
  date: string;
  note: string;
}

export interface PayloadVisit {
  id: number;
  name: string;
  tenantid: string;
  dui: string;
  date: string;
  note: string;
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
  data?: string;
}
