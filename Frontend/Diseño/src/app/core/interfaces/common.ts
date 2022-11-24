export interface API_RESPONSE {
  status: string;
  message: string;
  code: number;
  totalItems: number;
}

export interface ActionResponse extends API_RESPONSE {
  items: {
    id: number | null;
  };
}
