import { API_RESPONSE } from "./common";

export interface TreatmentGivenResponse extends API_RESPONSE {
  data: TreatmentGiven[];
}
export interface TreatmentResponse extends API_RESPONSE {
  data: Treatmentid[];
}
export interface TreatmentGiven {
  id: number;
  date: string;
  treatmentid: Treatmentid;
}
export interface Treatmentid {
  id: number;
  medicineid: Medicineid;
  tenantid: Tenantid;
  dose: number;
  period: string;
  data?: string | undefined;
}
export interface Medicineid {
  id: number;
  name: string;
  description: string;
  type: string;
  notes: string;
}
export interface Tenantid {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  dui: string;
  gender: string;
  condition: string;
  status: string;
}
export interface CreateTreatmentGiven {
  date: string;
  treatmentid: Treatmentid;
}
export interface UpdateTreatmentGiven {
  id: number;
  date: string;
  treatmentidId: number;
}
