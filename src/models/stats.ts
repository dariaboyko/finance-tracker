export interface Transaction {
  userId: number;
  id: string;
  type: string;
  setDate: string;
  amount: number;
}

export interface TransactionListItem {
  name: string;
  date: string;
  amount: number;
  id?: number | string;
}
