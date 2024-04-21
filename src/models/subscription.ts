export interface Subscription {
  id: string;
  transactionId: string;
  status: string;
  setDate: Date;
  endDate: Date;
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
