import { API_RESPONSE } from "./common";

export interface TreatmentResponse extends API_RESPONSE {
  data: Treatment[];
}

export interface TenantResponse extends API_RESPONSE {
  data: Tenant[];
}

export interface MedicineResponse extends API_RESPONSE {
  data: Medicine[];
}

export interface Treatment {
  id: number | null;
  medicineid: Medicine;
  tenantid: Tenant;
  dose: number;
  // period: string;
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

export interface Medicine {
  id: number;
  name: string;
  description: string;
  type: string;
  notes: string;
  data?: string | undefined;
}

export interface UpdateTreatment {
  id: number;
  medicineidId: number;
  tenantidId: number;
  dose: number;
  // period: string;
}

export interface CreateTreatment {
  medicineid: number;
  tenantid: number;
  dose: number;
  // period: string;
}
