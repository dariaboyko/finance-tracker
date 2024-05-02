export interface Debt {
  id: string;
  userId: string;
  amount: number;
  setDate: string;
  status: string;
  creditorName: string;
  updatedDate: string;
}

export interface DebtsResponse {
  items: Debt[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
