import { API_RESPONSE } from "./common";

export interface MedicineResponse extends API_RESPONSE {
  totalItems: number;
  items: Medicine[];
}

export interface Medicine {
  id: number;
  name: string;
  description: string;
  type: string;
  notes: string;
}
export interface CreateMedicine {
  name: string;
  description: string;
  type: string;
  notes: string;
}
