export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  setDate: string;
  description: string;
}

export interface ExpensesResponse {
  items: Expense[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ExpensesCategoriesResponse {
  items: ExpenseCategory[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ExpenseCategory {
  categoryName: string;
  categoryId: string;
}
