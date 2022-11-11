export interface API_RESPONSE {
  status: string;
  message: string;
  code: number;
  registers: number;
}

export interface ActionResponse extends API_RESPONSE {
  data: {
    id: number | null;
  };
}
