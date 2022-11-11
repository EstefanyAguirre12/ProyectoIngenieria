import { API_RESPONSE } from "./common";

export interface BedResponse extends API_RESPONSE {
  data: Bed[];
}

export interface TenantResponse extends API_RESPONSE {
  data: Tenant[];
}

export interface Bed {
  id: number | null;
  number: number;
  tenantid: Tenant;
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
  tenantidId: number;
}

export interface CreateBed {
  number: number;
  tenantid: number;
}
