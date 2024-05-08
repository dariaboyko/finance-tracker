import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { Expense, ExpenseCategory, ExpensesCategoriesResponse, ExpensesResponse } from 'models';
import axiosInstance from 'utils/axiousInstance';

export async function getExpensesData(
  fromDate: string,
  toDate: string,
  page: number,
  pageSize: number
): Promise<ExpensesResponse> {
  try {
    const response: AxiosResponse<ExpensesResponse> = await axiosInstance.get(`/api/v1/expenses`, {
      params: {
        fromDate: fromDate,
        toDate: toDate,
        page: page,
        pageSize: pageSize
      }
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function addExpense(
  categoryId: number,
  amount: number,
  setDate: string,
  description?: string
): Promise<Expense> {
  try {
    const response: AxiosResponse<Expense> = await axiosInstance.post(`/api/v1/expenses`, {
      categoryId: categoryId,
      amount: amount,
      setDate: setDate,
      description: description
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function getExpensesCategoriesData(
  page: number,
  pageSize: number
): Promise<ExpensesCategoriesResponse> {
  try {
    const response: AxiosResponse<ExpensesCategoriesResponse> = await axiosInstance.get(
      `/api/v1/expenses-categories`,
      {
        params: {
          page: page,
          pageSize: pageSize
        }
      }
    );
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function deleteExpense(id: string): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(`/api/v1/expenses`, {
      params: {
        expenseId: id
      }
    });
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}

export async function addExpenseCategory(categoryName: string): Promise<ExpenseCategory> {
  try {
    const response: AxiosResponse<ExpenseCategory> = await axiosInstance.post(
      `/api/v1/expenses-categories`,
      {
        categoryName: categoryName
      }
    );
    return response.data;
  } catch (error) {
    message.error('Server error. Please try again in a couple of minutes.');
    throw error;
  }
}
