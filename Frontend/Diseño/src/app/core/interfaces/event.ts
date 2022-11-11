import { API_RESPONSE } from "./common";

export interface EventResponse extends API_RESPONSE {
  data: Event[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  notes: string;
}

export interface UpdateEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  notes: string;
}

export interface CreateEvent {
  title: string;
  description: string;
  date: string;
  notes: string;
}
