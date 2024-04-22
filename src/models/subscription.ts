export interface Subscription {
  id: string;
  transactionId: string;
  status: number;
  setDate: string;
  endDate: string;
  userId: string;
}

export interface SubscriptionResponse {
  items: Subscription[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
