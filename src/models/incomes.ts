export interface Income {
  id: string;
  userId: string;
  amount: number;
  setDate: string;
  source: string;
}

export interface IncomesResponse {
  items: Income[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
