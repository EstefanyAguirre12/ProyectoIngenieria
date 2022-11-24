import { API_RESPONSE } from "./common";

export interface BedResponse extends API_RESPONSE {
  items: Bed[];
}

export interface TenantResponse extends API_RESPONSE {
  items: Tenant[];
}

export interface Bed {
  id: number | null;
  number: number;
  tenantid: number;
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
  data?: string | undefined;
}

export interface UpdateBed {
  id: number;
  number: number;
  tenantid: number;
}

export interface CreateBed {
  number: number;
  tenantid: number;
}
