import { API_RESPONSE } from "./common";

export interface DonationResponse extends API_RESPONSE {
  data: Donation[];
}
export interface Donation {
  id: number;
  name: string;
  type: string;
  amout: number;
  date: string;
  notes: string;
}

export interface CreateDonation {
  name: string;
  type: string;
  amout: number;
  date: string;
  notes: string;
}
